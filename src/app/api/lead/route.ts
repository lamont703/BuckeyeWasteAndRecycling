import { after } from "next/server";
import { cleanLead, deliverLead } from "@/lib/leads";
import { trackServer } from "@/lib/pixel-server";

export async function POST(request: Request) {
  const lead = cleanLead(await request.json().catch(() => null));
  if (!lead) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const ids = { visitor_id: lead.visitor_id, session_id: lead.session_id, path: lead.form_page, lead_kind: lead.kind };
  try {
    await deliverLead(lead);
    after(() => trackServer(request, "lead_received", { ...ids, ...utm(lead) }));
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[lead] delivery failed", err);
    after(() => trackServer(request, "lead_delivery_failed", { ...ids, message: String(err).slice(0, 500) }));
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}

function utm(lead: Record<string, string>) {
  const keys = ["landing_page", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
  return Object.fromEntries(keys.filter((k) => lead[k]).map((k) => [k, lead[k]]));
}
