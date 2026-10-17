"use client";

import Link from "next/link";
import { useState } from "react";
import { findCityByZip } from "@/data/cities";

type Result = { status: "yes"; city: string; slug: string } | { status: "no"; zip: string } | null;

export function ZipChecker({ dark = false }: { dark?: boolean }) {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<Result>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    const clean = zip.trim().slice(0, 5);
    if (!/^\d{5}$/.test(clean)) return;
    const city = findCityByZip(clean);
    setResult(city ? { status: "yes", city: city.name, slug: city.slug } : { status: "no", zip: clean });
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={check} className="flex gap-2 rounded-full bg-white p-1.5 shadow-lg ring-1 ring-line">
        <label htmlFor="zip" className="sr-only">
          ZIP code
        </label>
        <input
          id="zip"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="Enter your ZIP code"
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, ""));
            setResult(null);
          }}
          className="min-w-0 flex-1 rounded-full px-4 text-base text-ink outline-none placeholder:text-muted"
        />
        <button className="rounded-full bg-amber-cta px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-amber-cta-dark">
          Check
        </button>
      </form>
      <div aria-live="polite" className={`mt-3 min-h-6 text-[15px] ${dark ? "text-white" : "text-ink"}`}>
        {result?.status === "yes" && (
          <p>
            ✅ Great news, we serve <strong>{result.city}</strong>!{" "}
            <Link href={`/get-started?zip=${zip}`} className="font-semibold underline underline-offset-2">
              Start your free trial →
            </Link>
          </p>
        )}
        {result?.status === "no" && (
          <p>
            We&apos;re not in {result.zip} yet, but we&apos;re expanding.{" "}
            <Link href="/contact#form" className="font-semibold underline underline-offset-2">
              Join the waitlist →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
