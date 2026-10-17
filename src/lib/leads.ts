export type Lead = Record<string, string>;

const LABELS: Record<string, string> = {
  valet: "Valet trash proposal",
  residential: "Residential sign-up",
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

/**
 * Delivers a lead to whichever channels are configured:
 *  - RESEND_API_KEY + LEAD_TO_EMAIL → email via Resend
 *  - LEAD_WEBHOOK_URL → JSON POST (GoHighLevel, Zapier, Make, etc.)
 * With neither set (local dev), the lead is only logged.
 */
export async function deliverLead(lead: Lead) {
  const subject = `${LABELS[lead.kind]}: ${lead.name}${lead.zip ? ` (${lead.zip})` : ""}`;
  const tasks: Promise<unknown>[] = [];

  const { RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL, LEAD_WEBHOOK_URL } = process.env;

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
