import type { Metadata } from "next";
import { TrackOnView } from "@/components/PixelEvents";
import { Button, Section } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "You're all set!",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <Section className="bg-cream">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-line">
        <p className="text-5xl" aria-hidden="true">
          🎉
        </p>
        <h1 className="mt-4 text-3xl font-extrabold">Welcome to Buckeye!</h1>
        <p className="mt-3 text-muted">
          Your {site.trialDays}-day free trial has started. We&apos;ll text you within one business day to confirm your
          collection days and exactly where your cans live.
        </p>
        <Button href="/" className="mt-8">
          Back to home
        </Button>
      </div>
      <TrackOnView event="trial_started" props={{ value: 0, via: "stripe_checkout" }} />
    </Section>
  );
}
