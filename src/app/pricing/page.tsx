import { CtaBand, FaqList, OnDemandCards, ResidentialPricing, ValetTiers } from "@/components/sections";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { residentialFaqs } from "@/data/faqs";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Pricing for Trash Can, Valet Trash & Bin Cleaning Service",
  "Simple monthly plans for trash can to curb service in Columbus, OH, plus on-demand bin cleaning, junk removal and custom valet trash pricing for apartments.",
  "/pricing",
);

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Straightforward pricing. No contracts."
        intro={`Every residential plan starts with ${site.trialDays} days free. Apartment communities get custom per-unit pricing.`}
      />

      <Section>
        <SectionHeading center eyebrow="Homes" title="Trash can to curb plans" />
        <div className="mt-12">
          <ResidentialPricing />
        </div>
      </Section>

      <Section className="bg-cream">
        <SectionHeading center eyebrow="On demand" title="One-time services, no subscription required" />
        <div className="mt-12">
          <OnDemandCards />
        </div>
      </Section>

      <Section>
        <SectionHeading center eyebrow="Apartments" title="Valet trash packages" />
        <div className="mt-12">
          <ValetTiers />
        </div>
      </Section>

      <Section className="bg-cream">
        <SectionHeading center eyebrow="FAQ" title="Billing & plan questions" />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList faqs={residentialFaqs} withSchema={false} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
