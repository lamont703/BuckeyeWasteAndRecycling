"use client";

import { useState } from "react";
import { getAttribution } from "@/lib/attribution";

export type LeadKind = "valet" | "residential" | "junk" | "cleaning" | "vacation" | "careers" | "contact";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  full?: boolean;
};

const base: Field[] = [
  { name: "name", label: "Full name", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: true, full: true },
];

const extras: Record<LeadKind, Field[]> = {
  valet: [
    { name: "property", label: "Property / community name", required: true, full: true },
    { name: "address", label: "Property address", required: true, full: true },
    { name: "units", label: "Number of units", type: "number", required: true },
    { name: "role", label: "Your role", type: "select", options: ["Property Manager", "Regional Manager", "Owner", "Other"] },
    { name: "message", label: "Current setup or anything we should know", type: "textarea", full: true },
  ],
  residential: [
    { name: "address", label: "Service address", required: true, full: true },
    { name: "message", label: "Gate codes, can location, or notes", type: "textarea", full: true },
  ],
  junk: [
    { name: "address", label: "Pickup address", required: true, full: true },
    { name: "message", label: "What needs to go?", type: "textarea", required: true, full: true, placeholder: "e.g. old couch, mattress, 10 bags of yard waste" },
  ],
  cleaning: [
    { name: "address", label: "Service address", required: true, full: true },
    { name: "bins", label: "Number of bins", type: "number", required: true },
    { name: "frequency", label: "How often?", type: "select", options: ["One-time", "Monthly", "Quarterly"] },
  ],
  vacation: [
    { name: "properties", label: "Number of properties", type: "number", required: true },
    { name: "address", label: "Property address(es) or areas", required: true, full: true },
    { name: "message", label: "Checkout schedule, access codes, other needs", type: "textarea", full: true },
  ],
  careers: [
    { name: "zip", label: "Home ZIP code", required: true },
    { name: "vehicle", label: "Reliable vehicle?", type: "select", options: ["Yes", "No"], required: true },
    { name: "availability", label: "Availability", type: "select", options: ["Evenings", "Early mornings", "Weekends", "Flexible"] },
    { name: "message", label: "Tell us about yourself", type: "textarea", full: true },
  ],
  contact: [
    { name: "zip", label: "ZIP code" },
    { name: "message", label: "How can we help?", type: "textarea", required: true, full: true },
  ],
};

const inputCls =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-leaf-600 focus:ring-2 focus:ring-leaf-100";

export function LeadForm({
  kind,
  submitLabel = "Send request",
  extraData,
}: {
  kind: LeadKind;
  submitLabel?: string;
  extraData?: Record<string, string>;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const fields = [...base, ...extras[kind]];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind, ...getAttribution(), ...extraData, ...data }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl bg-leaf-50 p-8 text-center ring-1 ring-leaf-100">
        <p className="text-2xl font-extrabold text-leaf-800">Thanks, we got it!</p>
        <p className="mt-2 text-muted">A member of our Columbus team will reach out within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {/* Honeypot: real visitors never see or fill this. */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {fields.map((f) => (
        <label key={f.name} className={`block text-sm font-medium text-ink ${f.full ? "sm:col-span-2" : ""}`}>
          {f.label}
          {f.required && <span className="text-amber-cta"> *</span>}
          {f.type === "textarea" ? (
            <textarea name={f.name} required={f.required} rows={4} placeholder={f.placeholder} className={inputCls} />
          ) : f.type === "select" ? (
            <select name={f.name} required={f.required} className={inputCls} defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              {f.options!.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              name={f.name}
              type={f.type ?? "text"}
              required={f.required}
              placeholder={f.placeholder}
              min={f.type === "number" ? 1 : undefined}
              className={inputCls}
            />
          )}
        </label>
      ))}
      <div className="sm:col-span-2">
        <button
          disabled={state === "sending"}
          className="w-full rounded-full bg-amber-cta px-6 py-3.5 text-base font-semibold text-white hover:bg-amber-cta-dark disabled:opacity-60 sm:w-auto"
        >
          {state === "sending" ? "Sending…" : submitLabel}
        </button>
        {state === "error" && (
          <p className="mt-3 text-sm text-red-700">Something went wrong. Please call us or try again.</p>
        )}
      </div>
    </form>
  );
}
