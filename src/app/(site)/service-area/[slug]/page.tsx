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
  // Pages with a local trash guide target "trash pickup <city>" searches; the rest stay service-led.
  return city.trash
    ? pageMeta(
        `${city.name}, OH Trash Pickup Day, Rules & Can-to-Curb Service`,
        `Who picks up trash in ${city.name}, Ohio, what day, when cans go out and come back in, holiday delays and bulk pickup. Or let us roll your cans to the curb and back, ${site.trialDays} days free.`,
        `/service-area/${city.slug}`,
      )
    : pageMeta(
        `Trash Can to Curb & Valet Trash Service in ${city.name}, OH`,
        `Trash can to curb service for homes and doorstep valet trash for apartments in ${city.name}, Ohio (${city.zips.join(", ")}). Local, photo-verified and ${site.trialDays} days free.`,
        `/service-area/${city.slug}`,
      );
}

export default async function CityPage({ params }: PageProps<"/service-area/[slug]">) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const nearby = cities.filter((c) => c.slug !== city.slug).slice(0, 8);
  const areaList = city.areas.join(", ");
  const t = city.trash;
  const guideFaqs = t
    ? [
        { q: `Who picks up trash in ${city.name}, Ohio?`, a: t.collector },
        { q: `What day is trash pickup in ${city.name}?`, a: t.pickupDay },
        { q: `When can trash cans go out, and when must they come back in, in ${city.name}?`, a: t.setOut },
        { q: `Does ${city.name} trash pickup change on holidays?`, a: t.holidays },
        { q: `How does bulk pickup work in ${city.name}?`, a: t.bulk },
      ]
    : [];
  const faqs = [
    ...guideFaqs,
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
          body={`Buckeye Waste and Recycling serves ${areaList} and the rest of ${city.name}. We don't replace your city's trash collection. We make sure your cans are out on time and back where they belong. Every visit is handled by our background-checked Columbus team and confirmed with a photo.`}
          bullets={[
            `Trash can to curb service in ${city.name}`,
            `Valet trash for ${city.name} apartment communities`,
            "Cans back up the driveway after the truck comes",
            "Vacation holds and one-time visits",
          ]}
          visual={<HomeScene className="w-full drop-shadow-xl" />}
        />
      </Section>

      {t && (
        <Section className="bg-sand/60">
          <SectionHeading
            center
            eyebrow={`${city.name} trash guide`}
            title={`Trash pickup in ${city.name}: day, rules and holidays`}
            intro={`What every ${city.name} household needs to know about trash day, from the city's own rules.`}
          />
          <dl className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              ["Who collects", t.collector],
              ["Pickup day", t.pickupDay],
              ["Trash, recycling & yard waste", t.frequency],
              ["Set-out & take-in rules", t.setOut],
              ["Holiday weeks", t.holidays],
              ["Bulk items", t.bulk],
              ["Carts", t.carts],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl bg-white p-6 ring-1 ring-line">
                <dt className="text-sm font-bold uppercase tracking-wide text-leaf-700">{label}</dt>
                <dd className="mt-2 leading-7 text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mx-auto mt-6 max-w-4xl text-center text-sm text-muted">
            {t.lookup && (
              <>
                Look up your day:{" "}
                <a href={t.lookup.url} className="font-semibold text-leaf-700 underline" rel="noopener" target="_blank">
                  {t.lookup.label}
                </a>
                .{" "}
              </>
            )}
            Source:{" "}
            <a href={t.source.url} className="underline" rel="noopener" target="_blank">
              {t.source.label}
            </a>
            , checked {t.checked}. Rules can change, so the city&apos;s page is the final word.
          </p>
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-ink">Rather not keep track of it all? We roll your cans out and bring them back on schedule.</p>
            <div className="mt-4">
              <Button href="/get-started">Start {site.trialDays}-day free trial</Button>
            </div>
          </div>
        </Section>
      )}

      <Section className="bg-cream">
        <SectionHeading center eyebrow="Plans" title={`Can-to-curb plans in ${city.name}`} />
        <div className="mt-12">
          <ResidentialPricing />
        </div>
      </Section>

      <Section>
        <SectionHeading center eyebrow="On demand" title={`One-time services in ${city.name}`} />
        <div className="mt-12">
          <OnDemandCards exclude={["Junk & Bulk Removal"]} />
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
          description: `Trash can to curb service and apartment valet trash in ${city.name}, Ohio (ZIP ${city.zips.join(", ")}).`,
          area: `${city.name}, OH`,
          offers: planOffers,
        })}
      />
    </>
  );
}
