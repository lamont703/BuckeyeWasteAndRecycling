"use client";

import { useRef, useState } from "react";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-leaf-600 focus:ring-2 focus:ring-leaf-100";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Not sure"];
const binSpots = ["Garage", "Beside the house", "Behind the house", "Near the driveway", "Another location"];

function Field({
  label,
  name,
  type = "text",
  required,
  full,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email";
}) {
  return (
    <label className={`block text-sm font-medium text-ink ${full ? "sm:col-span-2" : ""}`}>
      {label}
      {required && <span className="text-amber-cta"> *</span>}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={inputCls}
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      {required && <span className="text-amber-cta"> *</span>}
      <select name={name} required={required} className={inputCls} defaultValue="">
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Group({ letter, title, children }: { letter: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-6 first:border-t-0 first:pt-0">
      <legend className="flex items-center gap-3 text-base font-bold text-ink">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-leaf-700 text-sm font-extrabold text-white">
          {letter}
        </span>
        {title}
      </legend>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function TrialForm({ trialDays }: { trialDays: number }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const top = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "trial", source: "free-trial landing page", ...data }),
      });
      setState(res.ok ? "sent" : "error");
      if (res.ok) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setState("error");
    }
  }

  return (
    <div ref={top} className="scroll-mt-24">
      {state === "sent" ? (
        <div className="rounded-3xl bg-leaf-50 p-8 text-center ring-1 ring-leaf-100 sm:p-12">
          <p className="text-5xl" aria-hidden="true">
            🎉
          </p>
          <h3 className="mt-4 text-2xl font-extrabold text-leaf-800 sm:text-3xl">
            Thanks for choosing Buckeye Waste &amp; Recycling!
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-lg text-muted">
            We got your free-trial request. Our Columbus team will reach out within one business day to confirm your
            address, your start date and what happens next.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Honeypot: real visitors never see or fill this. */}
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <Group letter="A" title="Your contact information">
            <Field label="Full name" name="name" required full autoComplete="name" />
            <Field label="Street address" name="address" required full autoComplete="street-address" />
            <Field label="City" name="city" required autoComplete="address-level2" />
            <Field label="ZIP code" name="zip" required autoComplete="postal-code" inputMode="numeric" />
            <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
          </Group>

          <Group letter="B" title="Your trash and recycling bins">
            <Select label="Number of trash cans" name="trashCans" options={["1", "2", "3", "4", "5+"]} required />
            <Select label="Number of recycling bins" name="recyclingBins" options={["0", "1", "2", "3", "4+"]} required />
            <Field label="Preferred trial start date" name="startDate" type="date" required full />
          </Group>

          <Group letter="C" title="Collection and property details">
            <Select label="Collection day" name="collectionDay" options={days} />
            <Select label="Where do your bins usually sit?" name="binLocation" options={binSpots} />
            <Field label="Gate code or access instructions (optional)" name="access" full />
            <label className="block text-sm font-medium text-ink sm:col-span-2">
              Anything else we should know? (optional)
              <textarea
                name="message"
                rows={4}
                placeholder="Where to return your bins, pets, access restrictions, or anything that helps us do it right."
                className={inputCls}
              />
            </label>
          </Group>

          <div className="space-y-3 border-t border-line pt-6">
            <label className="flex gap-3 text-[15px] text-ink">
              <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 shrink-0 accent-leaf-700" />
              <span>
                I agree to be contacted by Buckeye Waste &amp; Recycling about my trial request.
                <span className="text-amber-cta"> *</span>
              </span>
            </label>
            <label className="flex gap-3 text-[15px] text-ink">
              <input type="checkbox" name="smsUpdates" value="yes" className="mt-1 h-4 w-4 shrink-0 accent-leaf-700" />
              <span>Text me service updates (optional). Message and data rates may apply. Reply STOP to opt out.</span>
            </label>
          </div>

          <div>
            <button
              disabled={state === "sending"}
              className="w-full rounded-full bg-amber-cta px-6 py-4 text-base font-bold uppercase tracking-wide text-white shadow-sm hover:bg-amber-cta-dark disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : `Claim my free ${trialDays}-day trial`}
            </button>
            <p className="mt-3 text-center text-sm text-muted">No payment required to request your trial.</p>
            {state === "error" && (
              <p className="mt-3 text-center text-sm text-red-700">Something went wrong. Please call us or try again.</p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
