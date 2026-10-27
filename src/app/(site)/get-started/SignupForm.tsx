"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Check } from "@/components/ui";
import { getLeadContext } from "@/lib/attribution";
import { track } from "@/lib/pixel";
import { findCityByZip } from "@/data/cities";
import { residentialPlans, site, type Plan } from "@/data/site";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const inputCls =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-leaf-600 focus:ring-2 focus:ring-leaf-100";

export function SignupForm() {
  const params = useSearchParams();
  const initialPlan = residentialPlans.find((p) => p.id === params.get("plan"))?.id ?? "buckeye";
  const oneTime = params.get("service") === "one-time";

  const [plan, setPlan] = useState<Plan["id"]>(initialPlan);
  const [zip, setZip] = useState(params.get("zip") ?? "");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const city = /^\d{5}$/.test(zip) ? findCityByZip(zip) : undefined;
  const outOfArea = /^\d{5}$/.test(zip) && !city;
  const selected = residentialPlans.find((p) => p.id === plan)!;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const payload = {
      ...getLeadContext(),
      ...Object.fromEntries(fd),
      days: fd.getAll("days").join(", "),
      plan: oneTime ? "one-time" : plan,
      kind: "residential",
    };

    try {
      // Try Stripe Checkout first; if Stripe isn't configured yet, fall back to a lead email.
      if (!oneTime) {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const { url } = await res.json();
          if (url) {
            track("checkout_redirect", { form: "signup", plan });
            window.location.href = url;
            return;
          }
        }
      }
      const lead = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      setState(lead.ok ? "sent" : "error");
      track(lead.ok ? "lead_submitted" : "lead_failed", { form: "signup", lead_kind: "residential", plan: payload.plan, status: lead.status });
    } catch {
      setState("error");
      track("lead_failed", { form: "signup", lead_kind: "residential", plan: payload.plan, status: 0 });
    }
  }

  if (state === "sent") {
    return (
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-line">
        <p className="text-3xl font-extrabold text-leaf-800">You&apos;re on the list! 🎉</p>
        <p className="mt-3 text-muted">
          We&apos;ll text you within one business day to confirm your collection days and can location. Questions? Call{" "}
          <a href={site.phoneHref} className="font-semibold text-leaf-700 underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} data-form="signup" className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line sm:p-8">
        {oneTime ? (
          <div className="rounded-2xl bg-leaf-50 p-5 ring-1 ring-leaf-100">
            <p className="font-bold text-leaf-800">One-time curb service</p>
            <p className="text-sm text-muted">No subscription. We&apos;ll confirm your date and price by text.</p>
          </div>
        ) : (
          <fieldset>
            <legend className="text-lg font-bold">1. Choose your plan</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {residentialPlans.map((p) => (
                <label
                  key={p.id}
                  className={`cursor-pointer rounded-2xl p-4 ring-1 transition ${
                    plan === p.id ? "bg-leaf-50 ring-2 ring-leaf-600" : "ring-line hover:ring-ink/30"
                  }`}
                >
                  <input type="radio" name="planChoice" value={p.id} checked={plan === p.id} onChange={() => setPlan(p.id)} className="sr-only" />
                  <span className="block font-bold">{p.name}</span>
                  <span className="block text-2xl font-extrabold">
                    ${p.price}
                    <span className="text-sm font-medium text-muted">/mo</span>
                  </span>
                  <span className="block text-sm text-muted">{p.features[0]}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className="text-lg font-bold">{oneTime ? "1" : "2"}. Your service address</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_9rem]">
            <label className="block text-sm font-medium">
              Street address <span className="text-amber-cta">*</span>
              <input name="address" required autoComplete="street-address" className={inputCls} />
            </label>
            <label className="block text-sm font-medium">
              ZIP <span className="text-amber-cta">*</span>
              <input
                name="zip"
                required
                inputMode="numeric"
                maxLength={5}
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                autoComplete="postal-code"
                className={inputCls}
              />
            </label>
          </div>
          {city && <p className="mt-2 text-sm font-semibold text-leaf-700">✅ We serve {city.name}!</p>}
          {outOfArea && (
            <p className="mt-2 text-sm text-nut-700">
              We&apos;re not in {zip} yet, but submit anyway and we&apos;ll add you to the waitlist.
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend className="text-lg font-bold">{oneTime ? "2" : "3"}. Collection days</legend>
          <p className="text-sm text-muted">Which days does your hauler pick up? Not sure? Skip it and we&apos;ll look it up.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {days.map((d) => (
              <label key={d} className="cursor-pointer">
                <input type="checkbox" name="days" value={d} className="peer sr-only" />
                <span className="block rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-line peer-checked:bg-leaf-700 peer-checked:text-white peer-checked:ring-leaf-700 peer-focus-visible:ring-2 peer-focus-visible:ring-leaf-600">
                  {d}
                </span>
              </label>
            ))}
          </div>
          <label className="mt-4 block text-sm font-medium">
            Where do your cans live? Gate codes or notes
            <textarea name="message" rows={3} placeholder="e.g. Left side of garage, gate code 1234" className={inputCls} />
          </label>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-bold">{oneTime ? "3" : "4"}. Your contact info</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Full name <span className="text-amber-cta">*</span>
              <input name="name" required autoComplete="name" className={inputCls} />
            </label>
            <label className="block text-sm font-medium">
              Mobile phone <span className="text-amber-cta">*</span>
              <input name="phone" type="tel" required autoComplete="tel" className={inputCls} />
            </label>
            <label className="block text-sm font-medium sm:col-span-2">
              Email <span className="text-amber-cta">*</span>
              <input name="email" type="email" required autoComplete="email" className={inputCls} />
            </label>
          </div>
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        </fieldset>
      </div>

      <aside className="h-fit rounded-3xl bg-leaf-900 p-6 text-white shadow-xl sm:p-8 lg:sticky lg:top-24">
        <p className="text-sm font-semibold uppercase tracking-wider text-leaf-100">Your plan</p>
        {oneTime ? (
          <p className="mt-2 text-2xl font-extrabold">One-time curb service</p>
        ) : (
          <>
            <p className="mt-2 text-2xl font-extrabold">{selected.name}</p>
            <p className="mt-1 text-4xl font-extrabold">
              ${selected.price}
              <span className="text-base font-medium text-white/70">/month</span>
            </p>
            <ul className="mt-6 space-y-2.5">
              {selected.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[15px] text-white/90">
                  <Check className="h-5 w-5 text-leaf-100" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-white/10 p-4 text-sm">
              <strong>Today: $0.</strong> Your first {site.trialDays} days are free. Cancel anytime before then and you won&apos;t be charged.
            </p>
          </>
        )}
        <button
          disabled={state === "sending"}
          className="mt-6 w-full rounded-full bg-amber-cta px-6 py-3.5 text-base font-semibold text-white hover:bg-amber-cta-dark disabled:opacity-60"
        >
          {state === "sending" ? "Submitting…" : oneTime ? "Request service" : "Start free trial"}
        </button>
        {state === "error" && <p className="mt-3 text-sm text-red-200">Something went wrong. Please call {site.phone}.</p>}
      </aside>
    </form>
  );
}
