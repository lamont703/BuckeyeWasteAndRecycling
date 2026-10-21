import { BinCleanScene } from "@/components/Illustrations";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand, FeatureGrid, JsonLd, SplitFeature, Steps } from "@/components/sections";
import { Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { onDemand } from "@/data/site";
import { onDemandOffer, pageMeta, serviceSchema } from "@/lib/seo";

const price = onDemand.find((s) => s.name === "Bin Cleaning")!.from;

export const metadata = pageMeta(
  "Trash Bin Cleaning in Columbus, OH",
  "Hot-water pressure washing, sanitizing and deodorizing for trash and recycling bins across Columbus and its suburbs. One-time, monthly and quarterly service.",
  "/bin-cleaning",
);

export default function BinCleaningPage() {
  return (
    <>
      <PageHero path="/bin-cleaning"
        eyebrow="Bin cleaning"
        title="Say goodbye to stinky, buggy trash cans"
        intro={`We pressure-wash, sanitize and deodorize your bins right at the curb on pickup day. Starting at $${price} for your first two bins.`}
      >
        <Button href="#book">Book a cleaning</Button>
      </PageHero>

      <Section>
        <SplitFeature
          eyebrow="Curbside cleaning"
          title="Fresh bins without lifting a finger"
          body="Dirty bins attract flies, maggots, raccoons and odors, especially during Columbus summers. We clean them on the spot, right after your trash is collected."
          bullets={[
            "High-pressure hot-water wash inside and out",
            "Eco-friendly sanitizer and deodorizer",
            "Wastewater collected, not dumped in your driveway",
            "Bins left clean and ready to use",
          ]}
          visual={<BinCleanScene className="w-full drop-shadow-xl" />}
        />
      </Section>

      <Section className="bg-cream">
        <SectionHeading center eyebrow="How it works" title="Clean bins in three steps" />
        <div className="mt-12">
          <Steps
            steps={[
              { title: "Book online", body: "Choose one-time, monthly or quarterly service. We'll match it to your trash day." },
              { title: "Leave your bins out", body: "After the truck empties your bins, our crew arrives to clean them at the curb." },
              { title: "Enjoy fresh bins", body: "Your bins are washed, sanitized, deodorized and returned to their spot." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <FeatureGrid
          items={[
            { icon: "🦠", title: "Kills germs", body: "Sanitizing removes the bacteria that build up in bins." },
            { icon: "🪰", title: "Stops pests", body: "No residue means fewer flies, maggots and critters." },
            { icon: "🌿", title: "Eco-friendly", body: "Biodegradable cleaners and contained wastewater." },
          ]}
        />
      </Section>

      <Section className="bg-sand/60" id="book">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Book a cleaning"
            title="Get your bins on the schedule"
            intro="Can-to-curb members on the Buckeye or Estate plan save 20% on every cleaning."
          />
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-8">
            <LeadForm kind="cleaning" submitLabel="Book my cleaning" />
          </div>
        </div>
      </Section>

      <CtaBand />

      <JsonLd
        data={serviceSchema({
          name: "Trash Bin Cleaning",
          path: "/bin-cleaning",
          description:
            "Curbside hot-water pressure washing, sanitizing and deodorizing of trash and recycling bins, one-time, monthly or quarterly.",
          offers: onDemandOffer("Bin Cleaning"),
        })}
      />
    </>
  );
}
