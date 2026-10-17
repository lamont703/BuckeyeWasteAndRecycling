import { HomeScene } from "@/components/Illustrations";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand, FeatureGrid, SplitFeature } from "@/components/sections";
import { Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Airbnb & Vacation Rental Trash Service in Columbus, OH",
  "Trash and recycling service for Airbnb, VRBO and short-term rentals in Columbus, German Village, the Short North and near Ohio State. Cans out on time and overflow cleared after checkouts.",
  "/vacation-rentals",
);

export default function VacationRentalsPage() {
  return (
    <>
      <PageHero
        eyebrow="Airbnb & short-term rentals"
        title="Five-star trash day for your rental properties"
        intro="Guests don't take the cans out. We do. Keep every Columbus rental guest-ready with scheduled can service and overflow pickups after big checkouts."
      >
        <Button href="#quote">Get host pricing</Button>
      </PageHero>

      <Section>
        <SplitFeature
          eyebrow="Built for hosts"
          title="No more overflowing bins in your listing photos"
          body="From German Village and the Short North to game weekends near Ohio State, rentals generate more trash than a typical home. We make sure it never becomes a bad review."
          bullets={[
            "Weekly can-to-curb on your collection day",
            "Overflow and extra-bag pickups after checkouts",
            "Gate codes, lockboxes and access notes stored securely",
            "One invoice for all your properties",
          ]}
          visual={<HomeScene className="w-full drop-shadow-xl" />}
        />
      </Section>

      <Section className="bg-sand/60">
        <FeatureGrid
          items={[
            { icon: "🏈", title: "Game-day ready", body: "Book extra pickups around big weekends and events." },
            { icon: "📸", title: "Photo confirmation", body: "Proof of service you can share with co-hosts or owners." },
            { icon: "🧼", title: "Bin cleaning add-on", body: "Fresh, odor-free bins so guests never notice them." },
          ]}
        />
      </Section>

      <Section id="quote">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Host pricing"
            title="Get a quote for your portfolio"
            intro="Multi-property hosts and property managers get volume pricing."
          />
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-8">
            <LeadForm kind="vacation" submitLabel="Get host pricing" />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
