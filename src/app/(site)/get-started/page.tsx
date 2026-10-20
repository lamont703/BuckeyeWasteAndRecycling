import { Suspense } from "react";
import { PageHero, Section } from "@/components/ui";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { SignupForm } from "./SignupForm";

export const metadata = pageMeta(
  "Get Started: Start Your Free Trial",
  `Sign up for trash can to curb service in Columbus, OH. Your first ${site.trialDays} days are free and you can cancel anytime.`,
  "/get-started",
);

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get started"
        title="Never take the trash out again"
        intro={`Pick a plan and tell us about your home. Your first ${site.trialDays} days are free, with no contracts and cancel anytime.`}
      />
      <Section className="bg-cream">
        {/* SignupForm reads ?plan= and ?zip= from the URL, so it renders client-side inside Suspense. */}
        <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-3xl bg-white ring-1 ring-line" />}>
          <SignupForm />
        </Suspense>
      </Section>
    </>
  );
}
