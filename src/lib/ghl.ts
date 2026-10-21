import { residentialPlans } from "@/data/site";
import type { Lead } from "./leads";

// GoHighLevel (LeadConnector) API v2 via a Private Integration token.
// Create the token in GHL: Settings → Private Integrations, with the scopes
// contacts.write, contacts.readonly and opportunities.write.

const TAGS: Record<string, string[]> = {
  valet: ["valet trash", "multifamily"],
  residential: ["can to curb", "residential"],
  trial: ["can to curb", "residential", "free trial"],
  junk: ["junk removal"],
  cleaning: ["bin cleaning"],
  vacation: ["vacation rental"],
  careers: ["job applicant"],
  contact: ["general inquiry"],
};

// Leads that represent a sale worth tracking in a pipeline.
const SALES_KINDS = new Set(["valet", "residential", "trial", "junk", "cleaning", "vacation"]);

// Fields that map to native contact fields; everything else goes in the note.
const CONTACT_FIELDS = new Set(["kind", "name", "email", "phone", "address", "city", "zip"]);

export function ghlConfigured() {
  return Boolean(process.env.GHL_PRIVATE_TOKEN && process.env.GHL_LOCATION_ID);
}

async function ghl<T>(path: string, body: unknown): Promise<T> {
  const base = process.env.GHL_API_BASE || "https://services.leadconnectorhq.com";
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GHL_PRIVATE_TOKEN}`,
      Version: process.env.GHL_API_VERSION || "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`GHL ${path} responded ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.json() as Promise<T>;
}

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
}

function noteBody(lead: Lead, label: string) {
  const details = Object.entries(lead)
    .filter(([k, v]) => v && !CONTACT_FIELDS.has(k))
    .map(([k, v]) => `• ${k}: ${v}`)
    .join("\n");
  return `${label} from BuckeyeWR.com\n${lead.address ? `Address: ${lead.address}\n` : ""}${details}`;
}

const PAID_MEDIUMS = new Set(["cpc", "ppc", "paid", "paid_social", "paidsocial", "paid-social", "display", "ads"]);

// Turns the ad attribution captured on the landing page into tags, so GHL can filter,
// report and trigger workflows by channel and campaign.
function adTags(lead: Lead) {
  const tags: string[] = [];
  const medium = lead.utm_medium?.toLowerCase();
  if (lead.gclid) tags.push("google ads");
  if (lead.fbclid) tags.push("meta ads");
  if (lead.gclid || lead.fbclid || (medium && PAID_MEDIUMS.has(medium))) tags.push("paid ad");
  if (lead.utm_source) tags.push(`source: ${lead.utm_source.toLowerCase()}`.slice(0, 60));
  if (lead.utm_campaign) tags.push(`campaign: ${lead.utm_campaign.toLowerCase()}`.slice(0, 60));
  if (tags.length === 0) tags.push("organic / direct");
  return tags;
}

/** Upserts the contact, tags it, attaches the form details as a note, and optionally opens an opportunity. */
export async function pushLeadToGhl(lead: Lead, label: string) {
  const locationId = process.env.GHL_LOCATION_ID!;

  const { contact } = await ghl<{ contact: { id: string } }>("/contacts/upsert", {
    locationId,
    ...splitName(lead.name),
    email: lead.email,
    phone: lead.phone || undefined,
    address1: lead.address || undefined,
    city: lead.city || undefined,
    postalCode: lead.zip || undefined,
    state: "OH",
    country: "US",
    source: `BuckeyeWR.com – ${label}`,
  });

  // Tags go through the add-tags endpoint because upsert would overwrite a returning contact's existing tags.
  const tags = ["website lead", ...(TAGS[lead.kind] ?? []), ...adTags(lead)];
  if (lead.plan) tags.push(`plan: ${lead.plan}`);
  // Lets GHL SMS workflows target only people who opted in to texts.
  if (lead.smsUpdates === "yes") tags.push("sms opt-in");
  await ghl(`/contacts/${contact.id}/tags`, { tags });

  await ghl(`/contacts/${contact.id}/notes`, { body: noteBody(lead, label) });

  const pipelineId = process.env.GHL_PIPELINE_ID;
  if (pipelineId && SALES_KINDS.has(lead.kind)) {
    const plan = residentialPlans.find((p) => p.id === lead.plan);
    // Non-fatal: GHL can reject a duplicate opportunity for a returning contact, and the contact is already saved.
    await ghl("/opportunities/", {
      locationId,
      pipelineId,
      pipelineStageId: process.env.GHL_PIPELINE_STAGE_ID || undefined,
      contactId: contact.id,
      name: `${label} – ${lead.name}${lead.zip ? ` (${lead.zip})` : ""}`,
      status: "open",
      monetaryValue: plan ? plan.price * 12 : undefined,
    }).catch((err) => console.error("[ghl] opportunity not created", err));
  }

  return contact.id;
}
