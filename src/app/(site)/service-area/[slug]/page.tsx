import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomeScene } from "@/components/Illustrations";
import { CtaBand, FaqList, JsonLd, OnDemandCards, ResidentialPricing, SplitFeature } from "@/components/sections";
import { Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { cities, getCity } from "@/data/cities";
import { residentialPlans, site } from "@/data/site";
import { pageMeta, planOffers, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/service-area/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return pageMeta(
    `Valet Trash & Trash Can Service in ${city.name}, OH`,
    `Trash can to curb service, apartment valet trash, bin cleaning and junk removal in ${city.name}, Ohio (${city.zips.join(", ")}). Local, photo-verified and ${site.trialDays} days free.`,
    `/service-area/${city.slug}`,
  );
}

export default async function CityPage({ params }: PageProps<"/service-area/[slug]">) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const nearby = cities.filter((c) => c.slug !== city.slug).slice(0, 8);
  const areaList = city.areas.join(", ");
  const faqs = [
    {
      q: `Do you offer trash can to curb service in ${city.name}?`,
      a: `Yes. We roll trash and recycling cans to the curb and back for homes throughout ${city.name}, including ${areaList}. Plans start at $${residentialPlans[0].price}/month with ${site.trialDays} days free.`,
    },
    {
      q: `Do you provide valet trash for apartments in ${city.name}?`,
      a: `Yes. We provide doorstep valet trash collection for apartment and townhome communities in ${city.name} and across ${city.county}. Request a free proposal and we'll schedule a walk-through.`,
    },
    {
      q: `Which ${city.name} ZIP codes do you serve?`,
      a: `We currently serve ${city.zips.join(", ")}. Not sure if you're covered? Enter your ZIP on our site or give us a call.`,
    },
  ];

  return (
    <>
      <PageHero path={`/service-area/${city.slug}`}
        eyebrow={`${city.name}, Ohio · ${city.county}`}
        title={`Trash day, handled in ${city.name}`}
        intro={city.intro}
      >
        <Button href="/get-started">Start {site.trialDays}-day free trial</Button>
        <Button href="/valet-trash#proposal" variant="ghostLight">
          Apartment valet trash
        </Button>
      </PageHero>

      <Section>
        <SplitFeature
          eyebrow={`Serving ${city.name}`}
          title={`Local trash services for ${city.name} homes and apartments`}
          body={`Buckeye Waste and Recycling serves ${areaList} and the rest of ${city.name}. Every visit is handled by our background-checked Columbus team and confirmed with a photo.`}
          bullets={[
            `Trash can to curb service in ${city.name}`,
            `Valet trash for ${city.name} apartment communities`,
            "Curbside bin cleaning",
            "Junk and bulk item removal",
          ]}
          visual={<HomeScene className="w-full drop-shadow-xl" />}
        />
      </Section>

      <Section className="bg-cream">
        <SectionHeading center eyebrow="Plans" title={`Can-to-curb plans in ${city.name}`} />
        <div className="mt-12">
          <ResidentialPricing />
        </div>
      </Section>

      <Section>
        <SectionHeading center eyebrow="On demand" title={`One-time services in ${city.name}`} />
        <div className="mt-12">
          <OnDemandCards />
        </div>
      </Section>

      <Section className="bg-cream">
        <SectionHeading center eyebrow="FAQ" title={`${city.name} questions`} />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList faqs={faqs} />
        </div>
      </Section>

      <Section>
        <SectionHeading center title="Also serving nearby" />
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {nearby.map((c) => (
            <Link
              key={c.slug}
              href={`/service-area/${c.slug}`}
              className="rounded-full bg-white px-4 py-2 text-[15px] font-medium ring-1 ring-line hover:bg-leaf-50"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand title={`Ready for easier trash days in ${city.name}?`} />

      <JsonLd
        data={serviceSchema({
          name: `Trash Can to Curb and Valet Trash Service in ${city.name}, OH`,
          path: `/service-area/${city.slug}`,
          description: `Trash can to curb service, apartment valet trash, bin cleaning and junk removal in ${city.name}, Ohio (ZIP ${city.zips.join(", ")}).`,
          area: `${city.name}, OH`,
          offers: planOffers,
        })}
      />
    </>
  );
}
