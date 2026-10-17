import { cleanLead, deliverLead } from "@/lib/leads";

export async function POST(request: Request) {
  const lead = cleanLead(await request.json().catch(() => null));
  if (!lead) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  try {
    await deliverLead(lead);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[lead] delivery failed", err);
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
