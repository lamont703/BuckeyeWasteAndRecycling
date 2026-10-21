import { PageHero, Section } from "@/components/ui";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Privacy Policy", `How ${site.name} collects and uses your information.`, "/privacy");

// TODO: placeholder policy. Have the client's attorney review before launch.
export default function PrivacyPage() {
  return (
    <>
      <PageHero path="/privacy" eyebrow="Legal" title="Privacy Policy" intro="Draft — pending legal review." />
      <Section>
        <div className="mx-auto max-w-3xl space-y-5 leading-7 text-muted">
          <p>
            {site.name} collects the information you provide through our forms, such as your name, phone, email, service
            address and access notes, so we can deliver and bill for the services you request.
          </p>
          <p>
            We share your information only with providers that help us operate, such as our payment processor (Stripe)
            and messaging tools, and only as needed to provide service. We never sell your personal information.
          </p>
          <p>
            Gate codes and access instructions are shared only with the team members assigned to your property. Service
            photos are used to confirm completed work.
          </p>
          <p>
            To access, update or delete your information, contact us at{" "}
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
