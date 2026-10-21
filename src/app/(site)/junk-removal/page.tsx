import { TruckScene } from "@/components/Illustrations";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand, FeatureGrid, JsonLd, SplitFeature } from "@/components/sections";
import { Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { onDemand, site } from "@/data/site";
import { onDemandOffer, pageMeta, serviceSchema } from "@/lib/seo";

const price = onDemand.find((s) => s.name === "Junk & Bulk Removal")!.from;

export const metadata = pageMeta(
  "Junk & Bulk Trash Removal in Columbus, OH",
  "Fast junk removal and bulk trash pickup for homes, apartments and rentals across Columbus. Furniture, appliances, yard waste and cleanouts. Usually within 24 to 48 hours.",
  "/junk-removal",
);

export default function JunkRemovalPage() {
  return (
    <>
      <PageHero path="/junk-removal"
        eyebrow="Junk & bulk removal"
        title="Point to it. We'll haul it."
        intro={`Furniture, appliances, yard waste, move-out leftovers and overflowing bins, usually cleared within 24 to 48 hours. Starting at $${price}.`}
      >
        <Button href="#book">Request a pickup</Button>
        <Button href={site.phoneHref} variant="ghostLight">
          Call {site.phone}
        </Button>
      </PageHero>

      <Section>
        <SplitFeature
          eyebrow="What we take"
          title="If two people can lift it, we can probably take it"
          body="We sort what we collect, sending recyclable and donatable items where they belong instead of the landfill."
          bullets={[
            "Couches, mattresses and furniture",
            "Appliances and electronics",
            "Yard waste, branches and debris",
            "Garage, basement and estate cleanouts",
            "Apartment move-outs and unit turns",
            "Overflow bags and extra trash after parties",
          ]}
          visual={<TruckScene className="w-full drop-shadow-xl" />}
        />
        <p className="mt-8 rounded-2xl bg-cream p-5 text-[15px] text-muted ring-1 ring-line">
          <strong className="text-ink">We can&apos;t take:</strong> hazardous materials such as paint, chemicals, motor oil,
          propane tanks or medical waste.
        </p>
      </Section>

      <Section className="bg-sand/60">
        <FeatureGrid
          items={[
            { icon: "⚡", title: "Fast scheduling", body: "Most pickups are completed within 24 to 48 hours." },
            { icon: "💵", title: "Upfront pricing", body: "Send a photo and get a quote before we show up." },
            { icon: "♻️", title: "Responsible disposal", body: "We recycle and donate whatever we can." },
          ]}
        />
      </Section>

      <Section id="book">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Request a pickup"
            title="Tell us what needs to go"
            intro="We'll reply with a quote and the next available time slot."
          />
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-8">
            <LeadForm kind="junk" submitLabel="Get my quote" />
          </div>
        </div>
      </Section>

      <CtaBand />

      <JsonLd
        data={serviceSchema({
          name: "Junk & Bulk Trash Removal",
          path: "/junk-removal",
          description:
            "Removal of furniture, mattresses, appliances, yard waste and cleanout debris for homes, apartments and rentals, usually within 24 to 48 hours.",
          offers: onDemandOffer("Junk & Bulk Removal"),
        })}
      />
    </>
  );
}
