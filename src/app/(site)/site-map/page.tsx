import Link from "next/link";
import { PageHero, Section } from "@/components/ui";
import { cities } from "@/data/cities";
import { getPage } from "@/data/pages";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

// Human-readable sitemap. Search engines get /sitemap.xml (src/app/sitemap.ts); this page is for
// visitors and gives crawlers one place that links to every page.
export const metadata = pageMeta(
  "Sitemap",
  `Every page on ${site.domain}: services, pricing, the Greater Columbus service area and help pages.`,
  "/site-map",
);

const groups: { title: string; paths: string[] }[] = [
  { title: "Services", paths: ["/valet-trash", "/can-to-curb", "/bin-cleaning", "/junk-removal", "/vacation-rentals"] },
  { title: "Plans & sign-up", paths: ["/pricing", "/how-it-works", "/get-started"] },
  { title: "Help & company", paths: ["/", "/faq", "/contact", "/join-our-team", "/privacy", "/terms"] },
];

export default function SiteMapPage() {
  return (
    <>
      <PageHero path="/site-map" eyebrow="Sitemap" title="Every page on our site" intro="Find any service, city or help page in one place." />
      <Section>
        <div className="grid gap-12 md:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="text-lg font-bold">{g.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {g.paths.map((path) => {
                  const page = getPage(path)!;
                  return (
                    <li key={path}>
                      <Link href={path} className="font-medium text-leaf-700 hover:underline">
                        {page.name}
                      </Link>
                      <p className="text-sm text-muted">{page.summary}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-bold">
            <Link href="/service-area" className="hover:underline">
              Service area
            </Link>
          </h2>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/service-area/${c.slug}`} className="font-medium text-leaf-700 hover:underline">
                  {c.name}, OH
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
