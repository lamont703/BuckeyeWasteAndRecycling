import { LeadForm } from "@/components/LeadForm";
import { PageHero, Section } from "@/components/ui";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contact Us",
  "Call, text or email Buckeye Waste and Recycling for trash can service, valet trash, bin cleaning or junk removal in Columbus, OH.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to a real person in Columbus" intro="Questions, quotes, HOA pricing or a waitlist for your neighborhood: we usually reply within one business day." />
      <Section id="form">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-cream p-6 ring-1 ring-line">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted">Call or text</p>
              <a href={site.phoneHref} className="mt-1 block text-2xl font-extrabold text-leaf-800">
                {site.phone}
              </a>
            </div>
            <div className="rounded-3xl bg-cream p-6 ring-1 ring-line">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted">Email</p>
              <a href={`mailto:${site.email}`} className="mt-1 block text-lg font-bold text-leaf-800">
                {site.email}
              </a>
            </div>
            <div className="rounded-3xl bg-cream p-6 ring-1 ring-line">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted">Hours</p>
              <p className="mt-1 text-lg font-bold">{site.hours}</p>
              <p className="mt-1 text-muted">Service runs evenings and weekends.</p>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-8">
            <LeadForm kind="contact" submitLabel="Send message" />
          </div>
        </div>
      </Section>
    </>
  );
}
