import { HomeScene, PhoneNotice } from "@/components/Illustrations";
import { CtaBand, FaqList, FeatureGrid, JsonLd, ResidentialPricing, SplitFeature, Steps } from "@/components/sections";
import { Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { ZipChecker } from "@/components/ZipChecker";
import { residentialFaqs } from "@/data/faqs";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Trash Can to Curb Service in Columbus, OH",
  "We roll your trash and recycling cans to the curb and back every week. Serving Columbus, Dublin, Westerville, Upper Arlington, New Albany and more. First 2 weeks free.",
  "/can-to-curb",
);

export default function CanToCurbPage() {
  return (
    <>
      <PageHero
        eyebrow="Trash can to curb"
        title="Your cans out. Your cans back. Every single week."
        intro="We roll your trash and recycling to the curb the evening before pickup and bring them back after the truck comes. You get a photo text every time."
      >
        <Button href="/get-started">Start {site.trialDays}-day free trial</Button>
        <Button href="#plans" variant="ghostLight">
          See plans
        </Button>
      </PageHero>

      <Section>
        <SplitFeature
          eyebrow="Built for real life"
          title="Late nights, long driveways and Ohio winters"
          body="Forgot it was trash night? Out of town? Snow on the driveway? Can-to-curb service means your cans are always out on time and never left sitting at the street."
          bullets={[
            "Cans out the evening before pickup",
            "Returned to your garage, side yard or gate",
            "Holiday schedule changes handled for you",
            "Skip or pause anytime",
          ]}
          visual={<HomeScene className="w-full drop-shadow-xl" />}
        />
      </Section>

      <Section className="bg-cream">
        <SectionHeading center eyebrow="How it works" title="Three steps to never thinking about trash day" />
        <div className="mt-12">
          <Steps
            steps={[
              { title: "Sign up in 2 minutes", body: "Choose a plan and tell us your collection days and where your cans live." },
              { title: "We roll them out", body: "A Buckeye team member brings your cans to the curb the night before and texts you a photo." },
              { title: "We bring them back", body: "After pickup, your cans go right back where they belong." },
            ]}
          />
        </div>
      </Section>

      <Section id="plans">
        <SectionHeading center eyebrow="Plans" title="Pick the plan that fits your home" />
        <div className="mt-12">
          <ResidentialPricing />
        </div>
      </Section>

      <Section className="bg-sand/60">
        <SplitFeature
          reverse
          eyebrow="Photo proof"
          title="You'll always know it's done"
          body="Every visit ends with a photo text, so you never have to wonder whether your cans made it out."
          visual={<PhoneNotice />}
        />
        <div className="mt-16">
          <FeatureGrid
            items={[
              { icon: "👵", title: "Great for seniors", body: "Skip the heavy lifting and the slippery winter walk to the curb." },
              { icon: "✈️", title: "Travel worry-free", body: "We keep your cans moving while you're away, so your home looks lived-in." },
              { icon: "🏘️", title: "HOA friendly", body: "Cans come back the same day, keeping you in line with neighborhood rules." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center text-center">
          <SectionHeading center eyebrow="Check your address" title="Do we serve your neighborhood?" />
          <div className="mt-8 flex w-full justify-center">
            <ZipChecker />
          </div>
        </div>
      </Section>

      <Section className="bg-cream">
        <SectionHeading center eyebrow="FAQ" title="Can-to-curb questions" />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList faqs={residentialFaqs} />
        </div>
      </Section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Trash Can to Curb Service",
          provider: { "@id": `${site.url}/#business` },
          areaServed: "Columbus, OH metropolitan area",
          url: `${site.url}/can-to-curb`,
        }}
      />
    </>
  );
}
