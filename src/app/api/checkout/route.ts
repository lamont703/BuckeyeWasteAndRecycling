import { after } from "next/server";
import Stripe from "stripe";
import { residentialPlans, site } from "@/data/site";
import { cleanLead, deliverLead } from "@/lib/leads";
import { trackServer } from "@/lib/pixel-server";

// Map each plan to a recurring Stripe Price created in the Stripe Dashboard.
const PRICE_ENV: Record<string, string | undefined> = {
  neighbor: process.env.STRIPE_PRICE_NEIGHBOR,
  buckeye: process.env.STRIPE_PRICE_BUCKEYE,
  estate: process.env.STRIPE_PRICE_ESTATE,
};

export async function POST(request: Request) {
  const lead = cleanLead(await request.json().catch(() => null));
  if (!lead) return Response.json({ error: "invalid" }, { status: 400 });

  const plan = residentialPlans.find((p) => p.id === lead.plan);
  const price = plan && PRICE_ENV[plan.id];
  const key = process.env.STRIPE_SECRET_KEY;

  // Until Stripe is set up, tell the client to fall back to a plain lead submission.
  if (!key || !price) return Response.json({ error: "not_configured" }, { status: 501 });

  const ids = { visitor_id: lead.visitor_id, session_id: lead.session_id, path: lead.form_page };
  const stripe = new Stripe(key);
  const origin = new URL(request.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      customer_email: lead.email,
      phone_number_collection: { enabled: true },
      subscription_data: {
        trial_period_days: site.trialDays,
        metadata: {
          plan: plan.id,
          address: lead.address ?? "",
          zip: lead.zip ?? "",
          days: lead.days ?? "",
          notes: (lead.message ?? "").slice(0, 500),
        },
      },
      metadata: { name: lead.name, phone: lead.phone ?? "" },
      success_url: `${origin}/get-started/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/get-started?plan=${plan.id}`,
    });

    // Notify the team right away so abandoned checkouts can still be followed up.
    await deliverLead({ ...lead, stripeSession: session.id }).catch((err) =>
      console.error("[checkout] lead delivery failed", err),
    );

    after(() => trackServer(request, "checkout_started", { ...ids, plan: plan.id, value: plan.price, stripe_session: session.id }));
    return Response.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] stripe error", err);
    after(() => trackServer(request, "checkout_error", { ...ids, plan: plan.id, message: String(err).slice(0, 500) }));
    return Response.json({ error: "stripe_error" }, { status: 502 });
  }
}
