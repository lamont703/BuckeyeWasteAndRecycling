import { after } from "next/server";
import { requestContext, saveEvents, toRow } from "@/lib/pixel-server";

const MAX_BYTES = 64 * 1024;
const MAX_EVENTS = 50;

// Ingest endpoint for the first-party pixel (lib/pixel.ts). Named /api/ev rather than
// "pixel" or "track" so common ad blockers don't drop it.
export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > MAX_BYTES) return new Response(null, { status: 413 });

  let events: unknown;
  try {
    events = (JSON.parse(text) as { events?: unknown }).events;
  } catch {
    return new Response(null, { status: 400 });
  }
  if (!Array.isArray(events)) return new Response(null, { status: 400 });

  const ctx = await requestContext(request);
  const rows = events
    .slice(0, MAX_EVENTS)
    .map((e) => (e && typeof e === "object" ? toRow(e as Record<string, unknown>, ctx, "client") : null))
    .filter((r) => r !== null);

  // Answer immediately; the Supabase insert finishes after the response is sent.
  after(() => saveEvents(rows).catch((err) => console.error("[pixel] save failed", err)));
  return new Response(null, { status: 204 });
}
