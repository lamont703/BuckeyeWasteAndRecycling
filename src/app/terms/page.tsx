import { PageHero, Section } from "@/components/ui";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Terms of Service", `Terms for ${site.name} services.`, "/terms");

// TODO: placeholder terms. Have the client's attorney review before launch.
export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" intro="Draft — pending legal review." />
      <Section>
        <div className="mx-auto max-w-3xl space-y-5 leading-7 text-muted">
          <p>
            <strong className="text-ink">Subscriptions.</strong> Residential plans renew monthly after a {site.trialDays}
            -day free trial. You may cancel anytime before your next billing date; cancellations take effect at the end of
            the current billing period.
          </p>
          <p>
            <strong className="text-ink">Service.</strong> We move cans to the curb before your scheduled collection and
            return them afterward. We are not responsible for missed collections caused by your hauler, weather emergencies
            or blocked access.
          </p>
          <p>
            <strong className="text-ink">Access.</strong> You agree to provide accurate access instructions and to keep
            pets secured on service days.
          </p>
          <p>
            <strong className="text-ink">Valet trash.</strong> Multifamily services are governed by the signed service
            agreement with each property.
          </p>
          <p>
            Questions? Contact{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-leaf-700 underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
