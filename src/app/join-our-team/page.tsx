import { LeadForm } from "@/components/LeadForm";
import { FeatureGrid, Steps } from "@/components/sections";
import { Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Join Our Team: Part-Time Trash Valet Jobs in Columbus",
  "Earn money on a flexible schedule with Buckeye Waste and Recycling. Evening valet trash and can-to-curb routes across Columbus, Ohio.",
  "/join-our-team",
);

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Earn on your schedule with Buckeye"
        intro="We're hiring dependable people across Greater Columbus for evening valet trash and can-to-curb routes. Great for students, second jobs and anyone who likes staying active."
      >
        <Button href="#apply">Apply now</Button>
      </PageHero>

      <Section>
        <FeatureGrid
          items={[
            { icon: "🕗", title: "Flexible hours", body: "Most routes run in the evening, so they fit around school or a day job." },
            { icon: "💵", title: "Reliable pay", body: "Get paid on a regular schedule for every route you complete." },
            { icon: "🏃", title: "Stay active", body: "Get your steps in while you earn. No desk required." },
          ]}
        />
      </Section>

      <Section className="bg-cream">
        <SectionHeading center eyebrow="How to start" title="From application to first route" />
        <div className="mt-12">
          <Steps
            steps={[
              { title: "Apply online", body: "Fill out the short form below. It takes about two minutes." },
              { title: "Background check & training", body: "We run a background check and show you the ropes on a ride-along." },
              { title: "Run your routes", body: "Pick up routes near you and start earning." },
            ]}
          />
        </div>
      </Section>

      <Section id="apply">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Apply"
            title="Join the Buckeye team"
            intro="Requirements: 18+, a valid driver's license, a reliable vehicle and a phone with data."
          />
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-8">
            <LeadForm kind="careers" submitLabel="Submit application" />
          </div>
        </div>
      </Section>
    </>
  );
}
