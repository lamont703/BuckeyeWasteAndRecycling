import { CtaBand, FaqList, JsonLd } from "@/components/sections";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { residentialFaqs, valetFaqs } from "@/data/faqs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Frequently Asked Questions",
  "Answers about trash can to curb service, valet trash for apartments, bin cleaning and junk removal in Columbus, Ohio.",
  "/faq",
);

export default function FaqPage() {
  return (
    <>
      <PageHero path="/faq" eyebrow="FAQ" title="Frequently asked questions" intro="Can't find your answer? Call or text us and a real person will help." />
      <Section>
        <div className="mx-auto max-w-3xl space-y-14">
          <div>
            <SectionHeading title="Homes & can-to-curb" />
            <div className="mt-6">
              <FaqList faqs={residentialFaqs} withSchema={false} />
            </div>
          </div>
          <div>
            <SectionHeading title="Apartments & valet trash" />
            <div className="mt-6">
              <FaqList faqs={valetFaqs} withSchema={false} />
            </div>
          </div>
        </div>
        {/* One combined FAQPage schema for the whole page. */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [...residentialFaqs, ...valetFaqs].map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      </Section>
      <CtaBand />
    </>
  );
}
