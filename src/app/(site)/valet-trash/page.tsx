import { ApartmentScene } from "@/components/Illustrations";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand, FaqList, FeatureGrid, JsonLd, SplitFeature, Steps, ValetTiers } from "@/components/sections";
import { Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { valetFaqs } from "@/data/faqs";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Valet Trash Service for Apartments in Columbus, OH",
  "Doorstep valet trash and recycling collection for apartment communities across Columbus, Dublin, Hilliard, Westerville and Central Ohio. Request a free proposal.",
  "/valet-trash",
);

export default function ValetTrashPage() {
  return (
    <>
      <PageHero
        eyebrow="Valet trash · Multifamily"
        title="Doorstep valet trash for Columbus apartment communities"
        intro="Give residents a real amenity and give your maintenance team their evenings back. Our uniformed porters collect trash from every door, keep your property spotless and report back every night."
      >
        <Button href="#proposal">Request a free proposal</Button>
        <Button href={site.phoneHref} variant="ghostLight">
          Call {site.phone}
        </Button>
      </PageHero>

      <Section>
        <SplitFeature
          eyebrow="Why valet trash"
          title="Cleaner breezeways, happier residents, stronger renewals"
          body="Residents rank doorstep trash pickup among the amenities they'll pay for. You get fewer overflowing dumpsters, fewer pest complaints and a cleaner property for every tour."
          bullets={[
            "Adds a monthly amenity fee line you can pass through to residents",
            "Cuts trash bags left in hallways, stairwells and parking lots",
            "Frees your maintenance staff for work orders and unit turns",
            "Nightly service log and photo violation reports",
          ]}
          visual={<ApartmentScene className="w-full drop-shadow-xl" />}
        />
      </Section>

      <Section className="bg-cream">
        <SectionHeading center eyebrow="How it works" title="Up and running in about two weeks" />
        <div className="mt-12">
          <Steps
            steps={[
              { title: "Property walk-through", body: "We tour your community, map every building and door, and recommend a schedule and package." },
              { title: "Resident launch", body: "We provide doorstep containers, welcome flyers and door tags so residents know exactly how it works." },
              { title: "Nightly service", body: "Porters collect at your set window, take everything to the compactor and send your office a service report." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHeading center eyebrow="Packages" title="Choose the level of service your community needs" intro="Every package is quoted per unit, per month, based on your layout and schedule." />
        <div className="mt-12">
          <ValetTiers />
        </div>
      </Section>

      <Section className="bg-sand/60">
        <FeatureGrid
          items={[
            { icon: "🦺", title: "Uniformed, vetted porters", body: "Background-checked team members who represent your community well." },
            { icon: "📸", title: "Violation reporting", body: "Photos of rule violations so your office can enforce the resident agreement." },
            { icon: "♻️", title: "Recycling collection", body: "Doorstep recycling pickup alongside trash to support your sustainability goals." },
            { icon: "🛋️", title: "Bulk item removal", body: "Couches, mattresses and move-out piles cleared before they become a problem." },
            { icon: "🐾", title: "Pet waste stations", body: "Stations emptied and restocked so your grounds stay clean." },
            { icon: "📍", title: "Local management", body: "A Columbus-based account manager you can actually reach." },
          ]}
        />
      </Section>

      <Section id="proposal">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Free proposal"
              title="Get a valet trash quote for your property"
              intro="Tell us about your community and we'll schedule a walk-through and send a proposal within 48 hours."
            />
            <p className="mt-6 text-muted">
              Prefer to talk? Call{" "}
              <a href={site.phoneHref} className="font-semibold text-leaf-700 underline">
                {site.phone}
              </a>
              .
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-8">
            <LeadForm kind="valet" submitLabel="Request my proposal" />
          </div>
        </div>
      </Section>

      <Section className="bg-cream">
        <SectionHeading center eyebrow="FAQ" title="Valet trash questions" />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList faqs={valetFaqs} />
        </div>
      </Section>

      <CtaBand title="Make trash the easiest amenity at your community" body="Join apartment communities across Central Ohio that trust Buckeye with doorstep pickup." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Valet Trash Service",
          provider: { "@id": `${site.url}/#business` },
          areaServed: "Columbus, OH metropolitan area",
          url: `${site.url}/valet-trash`,
        }}
      />
    </>
  );
}
