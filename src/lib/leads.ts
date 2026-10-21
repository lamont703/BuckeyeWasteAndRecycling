import { ghlConfigured, pushLeadToGhl } from "./ghl";

export type Lead = Record<string, string>;

const LABELS: Record<string, string> = {
  valet: "Valet trash proposal",
  residential: "Residential sign-up",
  trial: "Free trial request (ad landing page)",
  junk: "Junk removal request",
  cleaning: "Bin cleaning booking",
  vacation: "Vacation rental quote",
  careers: "Job application",
  contact: "Contact form",
};

const MAX_FIELD = 2000;

export function cleanLead(input: unknown): Lead | null {
  if (!input || typeof input !== "object") return null;
  const lead: Lead = {};
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (typeof v === "string" && k.length < 40) lead[k] = v.trim().slice(0, MAX_FIELD);
  }
  // Honeypot: bots fill hidden fields, people don't.
  if (lead.company_website) return null;
  if (!lead.kind || !LABELS[lead.kind]) return null;
  if (!lead.name || !lead.email || !/^\S+@\S+\.\S+$/.test(lead.email)) return null;
  delete lead.company_website;
  return lead;
}

// Fields with their own column in the Supabase `leads` table; the rest go into `details`.
const COLUMNS = new Set([
  "kind", "name", "email", "phone", "address", "city", "zip", "message", "source", "landing_page", "referrer",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid",
]);

function toSupabaseRow(lead: Lead) {
  const row: Record<string, unknown> = {};
  const details: Lead = {};
  for (const [k, v] of Object.entries(lead)) {
    if (COLUMNS.has(k)) row[k] = v || null;
    else details[k] = v;
  }
  return { ...row, details };
}

/**
 * Delivers a lead to whichever channels are configured:
 *  - NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRET_KEY → row in the Supabase `leads` table
 *  - GHL_PRIVATE_TOKEN + GHL_LOCATION_ID → GoHighLevel contact, tags, note (+ opportunity)
 *  - RESEND_API_KEY + LEAD_TO_EMAIL → email via Resend
 *  - LEAD_WEBHOOK_URL → JSON POST (GHL inbound webhook, Zapier, Make, etc.)
 * With none set (local dev), the lead is only logged.
 */
export async function deliverLead(lead: Lead) {
  const subject = `${LABELS[lead.kind]}: ${lead.name}${lead.zip ? ` (${lead.zip})` : ""}`;
  const tasks: Promise<unknown>[] = [];

  if (ghlConfigured()) tasks.push(pushLeadToGhl(lead, LABELS[lead.kind]));

  const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY, RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL, LEAD_WEBHOOK_URL } =
    process.env;

  if (NEXT_PUBLIC_SUPABASE_URL && SUPABASE_SECRET_KEY) {
    tasks.push(
      fetch(`${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          // Legacy service_role keys are JWTs and must also be sent as a bearer token;
          // new sb_secret_ keys work from the apikey header alone.
          ...(SUPABASE_SECRET_KEY.startsWith("eyJ") && { Authorization: `Bearer ${SUPABASE_SECRET_KEY}` }),
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(toSupabaseRow(lead)),
      }).then(async (r) => {
        if (!r.ok) throw new Error(`Supabase responded ${r.status}: ${(await r.text()).slice(0, 300)}`);
      }),
    );
  }

  if (RESEND_API_KEY && LEAD_TO_EMAIL) {
    const text = Object.entries(lead)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: LEAD_FROM_EMAIL || "Buckeye Website <leads@buckeyewr.com>",
          to: LEAD_TO_EMAIL.split(","),
          reply_to: lead.email,
          subject,
          text,
        }),
      }).then((r) => {
        if (!r.ok) throw new Error(`Resend responded ${r.status}`);
      }),
    );
  }

  if (LEAD_WEBHOOK_URL) {
    tasks.push(
      fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, subject, source: "buckeyewr.com", submittedAt: new Date().toISOString() }),
      }).then((r) => {
        if (!r.ok) throw new Error(`Webhook responded ${r.status}`);
      }),
    );
  }

  if (tasks.length === 0) {
    console.log("[lead] no delivery channel configured", subject, lead);
    return;
  }

  const results = await Promise.allSettled(tasks);
  const failures = results.filter((r) => r.status === "rejected");
  // Only fail the request if every channel failed, so one outage doesn't lose the lead.
  if (failures.length === results.length) {
    throw new Error(failures.map((f) => String((f as PromiseRejectedResult).reason)).join("; "));
  }
}
