import { ApartmentScene, PhoneNotice } from "@/components/Illustrations";
import { CtaBand, FeatureGrid, SplitFeature, Steps } from "@/components/sections";
import { Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "How It Works",
  "See how Buckeye Waste and Recycling handles trash day for Columbus homes and apartment communities, from sign-up to photo-verified service.",
  "/how-it-works",
);

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Trash day, handled from start to finish"
        intro="Whether you own a home in Dublin or manage 300 units in Hilliard, setup takes minutes and service runs on autopilot."
      >
        <Button href="/get-started">Start free trial</Button>
        <Button href="/valet-trash#proposal" variant="ghostLight">
          Apartment proposal
        </Button>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="For homeowners" title="Can-to-curb in three steps" />
        <div className="mt-10">
          <Steps
            steps={[
              { title: "Choose a plan", body: "Enter your address, collection days and any gate or access details. You only do this once." },
              { title: "We take the cans out", body: "The evening before pickup, a Buckeye team member rolls your cans to the curb and texts you a photo." },
              { title: "We bring them back", body: "After collection, your cans go back exactly where you told us: garage, side yard or behind the gate." },
            ]}
          />
        </div>
      </Section>

      <Section className="bg-cream">
        <SplitFeature
          eyebrow="For apartment communities"
          title="Valet trash that runs itself"
          body="We walk your property, launch the program with residents and run nightly doorstep collection, with a report to your office every morning."
          bullets={[
            "Property walk-through and custom schedule",
            "Resident containers, flyers and door tags provided",
            "Nightly collection during a set window",
            "Morning service report with photo violations",
          ]}
          visual={<ApartmentScene className="w-full drop-shadow-xl" />}
        />
      </Section>

      <Section>
        <SplitFeature
          reverse
          eyebrow="You're in control"
          title="Change anything with a quick text"
          body={`Skip a week, add a can, book a bin cleaning or schedule a bulk pickup. Just text or call ${site.phone} and a real person in Columbus takes care of it.`}
          visual={<PhoneNotice />}
        />
        <div className="mt-16">
          <FeatureGrid
            items={[
              { icon: "📍", title: "Exact can spots", body: "Tell us precisely where your cans live and where they go at the curb." },
              { icon: "🔐", title: "Gates and keypads", body: "Access codes are stored securely and only shared with your assigned team member." },
              { icon: "❄️", title: "All-weather service", body: "Rain, snow or July heat, we're out there so you don't have to be." },
            ]}
          />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
