import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import type { ReactNode } from "react";
import { HomeScene } from "@/components/Illustrations";
import { Logo } from "@/components/Logo";
import { FaqList } from "@/components/sections";
import { CheckList, Container, Section, SectionHeading } from "@/components/ui";
import { cities } from "@/data/cities";
import type { Faq } from "@/data/faqs";
import { residentialPlans, site } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { TrialForm } from "./TrialForm";

// Paid-ad landing page. Every link stays on this page (anchors) except click-to-call,
// and it's kept out of search so it doesn't compete with /can-to-curb.
// Kept out of search (noindex) but with full share tags, since ad clicks and shared links land here.
export const metadata: Metadata = pageMeta(
  "Make Trash Day Easier: Try Us Free for 2 Weeks",
  "We roll your trash and recycling bins to the curb and bring them back after pickup. Columbus, Ohio and nearby suburbs. Try it free for 2 weeks, no payment required.",
  "/free-trial",
  { noindex: true },
);

const weeks = Math.round(site.trialDays / 7);

const anchors = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Why Us", href: "#why-us" },
  { label: "Service Area", href: "#service-area" },
  { label: "FAQ", href: "#faq" },
];

const faqs: Faq[] = [
  {
    q: `What is the free ${weeks}-week trial?`,
    a: `For ${site.trialDays} days we roll your trash and recycling bins to the curb on collection day and bring them back afterward, at no cost. No payment is needed to get started.`,
  },
  {
    q: "What does the service include?",
    a: "We move your bins from where they normally sit to the curb for your scheduled collection, then return them to their spot after the truck comes. You get a photo text each time so you know it's done.",
  },
  {
    q: "Do I have to sign a contract?",
    a: "No. There's no long-term contract, and the free trial doesn't turn into a paid plan on its own. After your trial, you decide whether to continue.",
  },
  {
    q: "When can I start?",
    a: "Pick your preferred start date in the form. Our team will contact you to confirm availability and lock in your first service day.",
  },
  {
    q: "Do you service my address?",
    a: `We serve Columbus and nearby suburbs across ${site.region}. We confirm every address before service begins, so just submit the form and we'll check for you.`,
  },
  {
    q: "How much does it cost after the trial?",
    a: "Plans start at $" + Math.min(...residentialPlans.map((p) => p.price)) + "/month, depending on how many bins you have and how many collection days you need. We confirm your exact price before any paid service begins.",
  },
];

const reasons = [
  { icon: "💪", title: "No more heavy lifting", body: "Skip hauling full bins down the driveway, in the rain, snow and dark." },
  { icon: "📸", title: "Photo proof every time", body: "A quick text with a photo lets you know your bins are out and back." },
  { icon: "🧠", title: "Nothing to remember", body: "Trash night, holiday schedule changes and bringing bins back are all on us." },
  { icon: "🏡", title: "Locally owned", body: "A Columbus team with background-checked members who treat your property right." },
];

// Cache Components forbids a bare `new Date()` during prerender, so cache the year.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

function CtaButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href="#signup-form"
      className={`inline-flex items-center justify-center rounded-full bg-amber-cta px-7 py-3.5 text-[15px] font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-amber-cta-dark ${className}`}
    >
      {children}
    </a>
  );
}

export default function FreeTrialPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6">
          <a href="#top" aria-label="Back to top">
            <Logo />
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Page sections">
            {anchors.map((a) => (
              <a key={a.href} href={a.href} className="rounded-full px-3 py-2 text-[15px] font-medium text-ink hover:bg-sand">
                {a.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={site.phoneHref} className="hidden text-[15px] font-semibold text-leaf-800 hover:underline sm:block">
              {site.phone}
            </a>
            <a
              href="#signup-form"
              className="rounded-full bg-amber-cta px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-cta-dark sm:px-5 sm:text-[15px]"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-leaf-900 text-white">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-leaf-700/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-nut-500/30 blur-3xl" />
          <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-leaf-100">
                Columbus, Ohio curbside bin service
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl">Make trash day easier.</h1>
              <p className="mt-5 max-w-xl text-lg text-white/80">
                We roll your trash and recycling bins to the curb for collection and bring them back afterward. You
                never touch them.
              </p>
              <div className="mt-8 rounded-3xl bg-white/10 p-6 ring-1 ring-white/20">
                <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Try us <span className="text-amber-cta">free</span> for {weeks} weeks!
                </p>
                <p className="mt-2 text-white/80">See how easy trash day can be before you choose a monthly plan.</p>
                <CtaButton className="mt-5 w-full sm:w-auto">Start my free trial</CtaButton>
              </div>
              <p className="mt-4 text-sm text-white/60">
                Serving Columbus and nearby suburbs. Availability confirmed for every address.
              </p>
            </div>
            <HomeScene className="w-full drop-shadow-2xl" />
          </Container>
        </section>

        {/* Trust strip */}
        <div className="border-b border-line bg-cream">
          <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5">
            {["No payment to start", "No contracts", ...site.trustPoints.slice(0, 2)].map((t) => (
              <span key={t} className="flex items-center gap-2 text-[15px] font-semibold text-leaf-800">
                <span className="h-2 w-2 rounded-full bg-amber-cta" />
                {t}
              </span>
            ))}
          </Container>
        </div>

        {/* How it works */}
        <Section id="how-it-works" className="scroll-mt-16">
          <SectionHeading
            center
            eyebrow="How it works"
            title="Three steps. We handle the curb."
            intro="You skip the chore. We take care of the heavy lifting on collection day, every week."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: "Sign up", body: "Fill out the quick form with your address, your bins and your collection day." },
              { title: "We handle the curb", body: "We roll your bins out for pickup and return them to their spot afterward, with a photo text each time." },
              { title: "Enjoy an easier trash day", body: "Spend less time hauling bins and more time on what matters to you." },
            ].map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-white p-7 ring-1 ring-line">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf-700 text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 leading-7 text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <CtaButton>Start my free {weeks}-week trial</CtaButton>
          </div>
        </Section>

        {/* Stat band */}
        <section className="bg-leaf-800 text-white">
          <Container className="grid gap-8 py-14 text-center sm:grid-cols-3">
            {[
              { n: "104", label: "trips to the curb and back each year. Now they're ours." },
              { n: "0", label: "heavy bins for you to drag down the driveway" },
              { n: String(site.trialDays), label: "days free to try it, no payment required" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-5xl font-extrabold tracking-tight text-amber-cta sm:text-6xl">{s.n}</p>
                <p className="mx-auto mt-2 max-w-[16rem] text-white/80">{s.label}</p>
              </div>
            ))}
          </Container>
        </section>

        {/* Signup form */}
        <Section id="signup-form" className="scroll-mt-16 bg-cream">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              center
              eyebrow="Free trial"
              title={`Start your free ${weeks}-week trial`}
              intro="Tell us a little about your home. It takes about two minutes, and our team will contact you to confirm availability and get you started."
            />
            <div className="mt-10 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-10">
              <TrialForm trialDays={site.trialDays} />
            </div>
          </div>
        </Section>

        {/* Pricing */}
        <Section id="pricing" className="scroll-mt-16">
          <SectionHeading
            center
            eyebrow="Simple monthly plans"
            title="Pick the plan that fits your curb"
            intro={`Every plan starts with your free ${weeks}-week trial. No contracts, no pressure.`}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
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
                <a
                  href="#signup-form"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold transition ${
                    p.popular
                      ? "bg-amber-cta text-white shadow-sm hover:bg-amber-cta-dark"
                      : "bg-white text-ink ring-1 ring-line hover:ring-ink/30"
                  }`}
                >
                  Try it free for {weeks} weeks
                </a>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-[15px] text-muted">
            Final pricing depends on your number of bins and collection days. We confirm your price before any paid
            service begins, and the free trial never turns into a paid plan on its own.
          </p>
        </Section>

        {/* Why us */}
        <Section id="why-us" className="scroll-mt-16 bg-sand/60">
          <SectionHeading center eyebrow="Why neighbors choose us" title="Less chore, more weekend." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-3xl bg-white p-7 ring-1 ring-line">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-50 text-2xl ring-1 ring-leaf-100" aria-hidden="true">
                  {r.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 leading-7 text-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Service area */}
        <Section id="service-area" className="scroll-mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              center
              eyebrow="Service area"
              title="Proudly serving Columbus, Ohio"
              intro="We make trash day easier for homes across Columbus and the surrounding suburbs. Send us your address and we'll confirm it's in our service area."
            />
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {cities.map((c) => (
                <li key={c.slug} className="rounded-full bg-leaf-50 px-4 py-2 text-[15px] font-semibold text-leaf-800 ring-1 ring-leaf-100">
                  {c.name}
                </li>
              ))}
            </ul>
            <CtaButton className="mt-10">Check my service availability</CtaButton>
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" className="scroll-mt-16 bg-cream">
          <SectionHeading center eyebrow="Good to know" title="Frequently asked questions" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqList faqs={faqs} withSchema={false} />
          </div>
        </Section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="relative overflow-hidden rounded-[2rem] bg-leaf-800 px-6 py-14 text-center text-white sm:px-12">
              <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-leaf-600/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-nut-500/40 blur-3xl" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Ready for an easier trash day?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                  Try us free for {weeks} weeks. No payment, no contract.
                </p>
                <CtaButton className="mt-8">Start my free trial</CtaButton>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="bg-ink text-white/70">
        <Container className="flex flex-col items-center gap-3 py-10 text-center text-sm">
          <Logo light />
          <p>Serving communities one pickup at a time. {site.region}.</p>
          <p>
            Questions? Call{" "}
            <a href={site.phoneHref} className="font-semibold text-white hover:underline">
              {site.phone}
            </a>
          </p>
          <p className="text-xs text-white/50">
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
        </Container>
      </footer>
    </>
  );
}
