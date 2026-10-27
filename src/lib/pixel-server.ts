import { userAgent } from "next/server";

// Server half of the first-party pixel: turns raw events into rows for the Supabase
// `pixel_events` table (schema in supabase/migrations), enriched with Vercel geo headers
// and a parsed user agent. Raw IPs are never stored, only a salted hash.

type Row = Record<string, unknown>;

// Fields with their own column; everything else an event carries goes into `properties`.
const COLUMNS = new Set([
  "visitor_id", "session_id", "page_view_id", "url", "path", "host", "title", "referrer", "landing_page",
  "screen", "viewport", "language", "timezone",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid",
]);

const MAX_STRING = 2000;

function clean(v: unknown, depth = 0): unknown {
  if (typeof v === "string") return v.slice(0, MAX_STRING);
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "boolean" || v == null) return v ?? null;
  if (depth < 2 && typeof v === "object") {
    return Object.fromEntries(Object.entries(v).slice(0, 40).map(([k, x]) => [k.slice(0, 40), clean(x, depth + 1)]));
  }
  return null;
}

async function hashIp(ip: string) {
  const salt = process.env.PIXEL_SALT || process.env.SUPABASE_SECRET_KEY || "buckeye";
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest).slice(0, 12), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Request-level context shared by every event in a batch. */
export async function requestContext(request: Request) {
  const h = request.headers;
  const ua = userAgent(request);
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip");
  const decode = (v: string | null) => (v ? decodeURIComponent(v) : null);
  const num = (v: string | null) => (v && Number.isFinite(Number(v)) ? Number(v) : null);
  return {
    user_agent: h.get("user-agent")?.slice(0, 500) ?? null,
    browser: ua.browser.name ?? null,
    browser_version: ua.browser.version ?? null,
    os: ua.os.name ?? null,
    os_version: ua.os.version ?? null,
    device_type: ua.device.type ?? "desktop",
    is_bot: ua.isBot,
    ip_hash: ip ? await hashIp(ip) : null,
    country: h.get("x-vercel-ip-country"),
    region: h.get("x-vercel-ip-country-region"),
    city: decode(h.get("x-vercel-ip-city")),
    postal_code: h.get("x-vercel-ip-postal-code"),
    latitude: num(h.get("x-vercel-ip-latitude")),
    longitude: num(h.get("x-vercel-ip-longitude")),
  };
}

export function toRow(event: Row, ctx: Row, source: "client" | "server"): Row | null {
  const name = typeof event.event === "string" ? event.event : "";
  if (!/^[a-z][a-z0-9_]{0,39}$/.test(name)) return null;
  const row: Row = { ...ctx, event: name, source };
  const properties: Row = {};
  for (const [k, v] of Object.entries(event)) {
    if (k === "event") continue;
    if (k === "ts") {
      const t = typeof v === "string" ? Date.parse(v) : NaN;
      row.client_ts = Number.isNaN(t) ? null : new Date(t).toISOString();
    } else if (COLUMNS.has(k)) {
      row[k] = typeof v === "string" && v ? v.slice(0, MAX_STRING) : null;
    } else if (Object.keys(properties).length < 40) {
      properties[k.slice(0, 40)] = clean(v);
    }
  }
  row.properties = properties;
  return row;
}

export function pixelConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}

export async function saveEvents(rows: Row[]) {
  if (!rows.length) return;
  const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env;
  if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    if (process.env.NODE_ENV === "development") console.log("[pixel]", rows.map((r) => r.event).join(", "));
    return;
  }
  // PostgREST bulk inserts need every row to have the same keys.
  const keys = [...new Set(rows.flatMap(Object.keys))];
  const body = rows.map((r) => Object.fromEntries(keys.map((k) => [k, r[k] ?? null])));
  const res = await fetch(`${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/pixel_events`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SECRET_KEY,
      // Same key handling as lib/leads.ts: legacy JWT keys also go in the bearer header.
      ...(SUPABASE_SECRET_KEY.startsWith("eyJ") && { Authorization: `Bearer ${SUPABASE_SECRET_KEY}` }),
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error(`[pixel] Supabase responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

/**
 * Records an event from server code (lead delivery, Stripe checkout). These can't be blocked
 * by ad blockers, so they are the source of truth for conversions; the client sends the
 * visitor/session IDs with each form so the two halves join up.
 */
export async function trackServer(request: Request, event: string, data: Row = {}) {
  try {
    const row = toRow({ ...data, event }, await requestContext(request), "server");
    if (row) await saveEvents([row]);
  } catch (err) {
    console.error("[pixel] server event failed", event, err);
  }
}
