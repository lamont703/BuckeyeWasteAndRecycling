import Link from "next/link";
import type { Faq } from "@/data/faqs";
import { onDemand, residentialPlans, site, valetTiers } from "@/data/site";
import { JsonLd } from "./JsonLd";
import { Button, CheckList, Container, SectionHeading } from "./ui";

export { JsonLd };

export function TrustBar() {
  return (
    <div className="border-y border-line bg-cream">
      <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5">
        {site.trustPoints.map((t) => (
          <span key={t} className="flex items-center gap-2 text-[15px] font-semibold text-leaf-800">
            <span className="h-2 w-2 rounded-full bg-amber-cta" />
            {t}
          </span>
        ))}
      </Container>
    </div>
  );
}

export function ResidentialPricing({ showTrialNote = true }: { showTrialNote?: boolean }) {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        {residentialPlans.map((p) => (
          <div
            key={p.id}
            className={`relative flex flex-col rounded-3xl bg-white p-8 ring-1 ${
              p.popular ? "shadow-xl ring-2 ring-leaf-600" : "ring-line"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-8 rounded-full bg-leaf-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="mt-1 text-muted">{p.blurb}</p>
            <p className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold tracking-tight">${p.price}</span>
              <span className="text-muted">/month</span>
            </p>
            <CheckList items={p.features} className="mt-6 flex-1" />
            <Button href={`/get-started?plan=${p.id}`} variant={p.popular ? "primary" : "secondary"} className="mt-8 w-full">
              Start free trial
            </Button>
          </div>
        ))}
      </div>
      {showTrialNote && (
        <p className="mt-6 text-center text-[15px] text-muted">
          First {site.trialDays} days free. No contracts, cancel anytime. Need more than one property?{" "}
          <Link href="/contact#form" className="font-semibold text-leaf-700 underline underline-offset-2">
            Talk to us about HOA and multi-property pricing.
          </Link>
        </p>
      )}
    </div>
  );
}

export function ValetTiers() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {valetTiers.map((t) => (
        <div
          key={t.name}
          className={`relative flex flex-col rounded-3xl bg-white p-8 ring-1 ${
            t.popular ? "shadow-xl ring-2 ring-leaf-600" : "ring-line"
          }`}
        >
          {t.popular && (
            <span className="absolute -top-3 left-8 rounded-full bg-leaf-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Most Requested
            </span>
          )}
          <h3 className="text-xl font-bold">{t.name}</h3>
          <p className="mt-1 text-muted">{t.blurb}</p>
          <p className="mt-6 text-lg font-bold text-leaf-800">Custom per-unit pricing</p>
          <CheckList items={t.features} className="mt-6 flex-1" />
          <Button href="/valet-trash#proposal" variant={t.popular ? "primary" : "secondary"} className="mt-8 w-full">
            Request a proposal
          </Button>
        </div>
      ))}
    </div>
  );
}

export function OnDemandCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {onDemand.map((s) => (
        <Link
          key={s.name}
          href={s.href}
          className="group flex flex-col rounded-3xl bg-white p-7 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <h3 className="text-lg font-bold">{s.name}</h3>
          <p className="mt-2 flex-1 text-muted">{s.description}</p>
          <p className="mt-6 text-sm text-muted">
            From <span className="text-2xl font-extrabold text-ink">${s.from}</span> {s.unit}
          </p>
          <span className="mt-4 font-semibold text-leaf-700 group-hover:underline">Book now →</span>
        </Link>
      ))}
    </div>
  );
}

export function FaqList({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  return (
    <div className="divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
      {faqs.map((f) => (
        <details key={f.q} className="group px-6 py-5 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink">
            {f.q}
            <span className="text-2xl leading-none text-leaf-700 transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 leading-7 text-muted">{f.a}</p>
        </details>
      ))}
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
    </div>
  );
}

export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-3xl bg-white p-7 ring-1 ring-line">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf-700 text-lg font-extrabold text-white">
            {i + 1}
          </span>
          <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
          <p className="mt-2 leading-7 text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function FeatureGrid({ items }: { items: { title: string; body: string; icon: string }[] }) {
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <div key={f.title}>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-50 text-2xl ring-1 ring-leaf-100" aria-hidden="true">
            {f.icon}
          </span>
          <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
          <p className="mt-2 leading-7 text-muted">{f.body}</p>
        </div>
      ))}
    </div>
  );
}

export function CtaBand({
  title = "Ready to never think about trash day again?",
  body = `Start with ${site.trialDays} days free, or get a custom proposal for your apartment community.`,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-leaf-800 px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-leaf-600/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-nut-500/40 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/get-started">Start free trial</Button>
              <Button href="/valet-trash#proposal" variant="ghostLight">
                Valet trash proposal
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function SplitFeature({
  eyebrow,
  title,
  body,
  bullets,
  visual,
  reverse = false,
  cta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  visual: React.ReactNode;
  reverse?: boolean;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <SectionHeading eyebrow={eyebrow} title={title} intro={body} />
        {bullets && <CheckList items={bullets} className="mt-6" />}
        {cta && (
          <Button href={cta.href} variant="dark" className="mt-8">
            {cta.label}
          </Button>
        )}
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{visual}</div>
    </div>
  );
}
