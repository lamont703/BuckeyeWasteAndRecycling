import { cities } from "@/data/cities";
import { generalFaqs, valetFaqs } from "@/data/faqs";
import { staticPages } from "@/data/pages";
import { onDemand, residentialPlans, site, valetTiers } from "@/data/site";

// /llms.txt (https://llmstxt.org): a plain-Markdown brief that AI assistants and answer engines
// can read to describe and cite the business accurately. Generated from the same data as the site.

function buildLlmsTxt() {
  const link = (path: string) => `${site.url}${path === "/" ? "" : path}`;
  const faqs = [...generalFaqs, ...valetFaqs.filter((v) => !generalFaqs.some((g) => g.q === v.q))];

  return `# ${site.name}

> ${site.description} Phone ${site.phone}. Website ${site.domain}.

${site.name} (${site.shortName}) is a locally owned trash service company based in Columbus, Ohio. It serves homeowners, apartment communities, property managers, HOAs and short-term rental hosts across ${site.region}. Every visit is photo-verified and handled by a background-checked local team.

## Key facts

- Business: ${site.name}
- Location: Columbus, Ohio, USA (service-area business, no storefront)
- Phone: ${site.phone}
- Email: ${site.email}
- Hours: ${site.hours}
- Free trial: first ${site.trialDays} days free on residential plans, no contract, cancel anytime
- Last updated: ${site.updated}

## Services

- [Valet trash for apartments](${link("/valet-trash")}): doorstep trash and recycling pickup 3 to 7 nights a week for apartment and townhome communities, with nightly service reports and photo violation reporting. Quoted per unit, per month.
- [Trash can to curb](${link("/can-to-curb")}): cans rolled to the curb the evening before pickup and returned after collection, with a photo text each visit.
- [Bin cleaning](${link("/bin-cleaning")}): curbside hot-water wash, sanitize and deodorize; one-time, monthly or quarterly.
- [Junk & bulk removal](${link("/junk-removal")}): furniture, appliances, yard waste and cleanouts, usually within 24 to 48 hours. No hazardous materials.
- [Vacation rentals](${link("/vacation-rentals")}): can service and overflow pickups for Airbnb and VRBO hosts.

## Pricing

Residential can-to-curb plans (monthly, ${site.trialDays} days free):
${residentialPlans.map((p) => `- ${p.name}: $${p.price}/month. ${p.features.join("; ")}.`).join("\n")}

On-demand services (no subscription):
${onDemand.map((s) => `- ${s.name}: from $${s.from} ${s.unit}. ${s.description}`).join("\n")}

Valet trash packages (custom per-unit pricing):
${valetTiers.map((t) => `- ${t.name}: ${t.features.join("; ")}.`).join("\n")}

## Service area

${cities.map((c) => `- [${c.name}, OH](${link(`/service-area/${c.slug}`)}) (${c.county}): ZIP ${c.zips.join(", ")}`).join("\n")}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Pages

${staticPages
  .filter((p) => p.index !== false)
  .map((p) => `- [${p.name}](${link(p.path)}): ${p.summary}`)
  .join("\n")}
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
