import Link from "next/link";
import { CtaBand } from "@/components/sections";
import { PageHero, Section } from "@/components/ui";
import { ZipChecker } from "@/components/ZipChecker";
import { cities } from "@/data/cities";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Service Area: Columbus & Central Ohio",
  "Buckeye Waste and Recycling serves Columbus, Dublin, Westerville, Hilliard, Grove City, Gahanna, Upper Arlington, Worthington, New Albany, Powell and more.",
  "/service-area",
);

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title="Serving Columbus and Central Ohio"
        intro="Valet trash, can-to-curb, bin cleaning and junk removal across Franklin, Delaware, Fairfield, Licking and Union counties."
      />
      <Section>
        <div className="mb-12 flex justify-center">
          <ZipChecker />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/service-area/${c.slug}`}
              className="group rounded-3xl bg-white p-6 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <h2 className="text-xl font-bold">{c.name}, OH</h2>
              <p className="mt-1 text-sm text-muted">{c.county}</p>
              <p className="mt-3 text-sm text-muted">ZIP codes: {c.zips.slice(0, 6).join(", ")}{c.zips.length > 6 ? "…" : ""}</p>
              <span className="mt-4 inline-block font-semibold text-leaf-700 group-hover:underline">
                Services in {c.name} →
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-muted">
          Don&apos;t see your area?{" "}
          <Link href="/contact#form" className="font-semibold text-leaf-700 underline">
            Contact us
          </Link>
          . We&apos;re adding new neighborhoods all the time.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
