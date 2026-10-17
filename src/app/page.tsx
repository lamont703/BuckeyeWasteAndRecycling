import Link from "next/link";
import { ApartmentScene, HomeScene, PhoneNotice } from "@/components/Illustrations";
import {
  CtaBand,
  FaqList,
  FeatureGrid,
  OnDemandCards,
  ResidentialPricing,
  SplitFeature,
  Steps,
  TrustBar,
} from "@/components/sections";
import { Button, Container, Section, SectionHeading } from "@/components/ui";
import { ZipChecker } from "@/components/ZipChecker";
import { cities } from "@/data/cities";
import { generalFaqs } from "@/data/faqs";
import { residentialPlans, site } from "@/data/site";

const audiences = [
  { title: "Homeowners", body: "Weekly can-to-curb service so you never drag a bin down the driveway again.", href: "/can-to-curb", icon: "🏡" },
  { title: "Apartment Communities", body: "Doorstep valet trash that residents love and that keeps your breezeways clean.", href: "/valet-trash", icon: "🏢" },
  { title: "Property Managers", body: "One partner for valet trash, bulk pickups and move-out cleanouts across your portfolio.", href: "/valet-trash", icon: "📋" },
  { title: "Airbnb & Rentals", body: "Cans out on time between guests, with overflow handled after checkouts.", href: "/vacation-rentals", icon: "🔑" },
  { title: "HOAs & Neighborhoods", body: "Keep streets tidy and cans out of sight with community-wide pricing.", href: "/contact#form", icon: "🌳" },
  { title: "Seniors & Busy Families", body: "Heavy cans, icy driveways and late nights are our problem now, not yours.", href: "/can-to-curb", icon: "💪" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-leaf-100 blur-3xl" />
        <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-leaf-800 ring-1 ring-line">
              <span className="h-2 w-2 rounded-full bg-leaf-600" /> Serving Columbus &amp; Central Ohio
            </p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Never take the trash out <span className="text-leaf-700">again.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Buckeye rolls your cans to the curb and back, collects apartment trash right from residents&apos; doors, scrubs
              smelly bins and hauls away junk. All by a local, background-checked Columbus team.
            </p>
            <div className="mt-8">
              <ZipChecker />
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href="/get-started">Start {site.trialDays}-day free trial</Button>
              <Button href="/valet-trash" variant="secondary">
                Valet trash for apartments
              </Button>
            </div>
          </div>
          <div className="relative">
            <HomeScene className="w-full drop-shadow-xl" />
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-line sm:block">
              <p className="text-sm font-semibold">✅ Cans at the curb</p>
              <p className="text-xs text-muted">Photo sent · Tue 8:42 PM</p>
            </div>
          </div>
        </Container>
      </section>

      <TrustBar />

      {/* Services */}
      <Section>
        <SectionHeading
          center
          eyebrow="What we do"
          title="Every part of trash day, handled"
          intro="Subscribe for hands-off weekly service, or book a one-time job whenever you need it."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link href="/valet-trash" className="group rounded-3xl bg-leaf-900 p-8 text-white transition hover:-translate-y-0.5 hover:shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-leaf-100">For apartments</p>
            <h3 className="mt-2 text-2xl font-extrabold">Valet Trash</h3>
            <p className="mt-3 text-white/80">
              Doorstep collection up to 7 nights a week, violation reporting with photos, and compactor-area cleanup. Your
              residents get a real amenity and your property stays spotless.
            </p>
            <span className="mt-6 inline-block font-semibold text-amber-cta group-hover:underline">Request a proposal →</span>
          </Link>
          <Link href="/can-to-curb" className="group rounded-3xl bg-sand p-8 transition hover:-translate-y-0.5 hover:shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-nut-700">For homes</p>
            <h3 className="mt-2 text-2xl font-extrabold">Trash Can to Curb</h3>
            <p className="mt-3 text-muted">
              We roll your trash and recycling to the curb the night before pickup and bring them back after. Plans from ${residentialPlans[0].price}/month with photo proof every visit.
            </p>
            <span className="mt-6 inline-block font-semibold text-leaf-700 group-hover:underline">See plans →</span>
          </Link>
        </div>
        <div className="mt-6">
          <OnDemandCards />
        </div>
      </Section>

      {/* How it works */}
      <Section className="bg-cream">
        <SectionHeading center eyebrow="How it works" title="Set it up once. We handle every week after." />
        <div className="mt-12">
          <Steps
            steps={[
              { title: "Pick a plan", body: "Enter your address, collection days and where your cans live, including gate codes or side-yard notes." },
              { title: "We roll them out", body: "The evening before pickup, a Buckeye team member brings your cans to the curb and texts you a photo." },
              { title: "We bring them back", body: "After the truck comes through, your cans go right back to their spot. No more cans sitting out for days." },
            ]}
          />
        </div>
      </Section>

      {/* Valet split */}
      <Section>
        <SplitFeature
          eyebrow="Valet trash for multifamily"
          title="An amenity residents notice, and one less job for your maintenance team"
          body="Our uniformed porters collect bagged trash from every door on a set schedule, keep breezeways and compactor areas clean, and send your office a nightly service report."
          bullets={[
            "Doorstep pickup 3 to 7 nights a week",
            "Photo violation reports for lease enforcement",
            "Recycling, bulk pickup and pet station add-ons",
            "Local Columbus team with real-time response",
          ]}
          visual={<ApartmentScene className="w-full drop-shadow-xl" />}
          cta={{ href: "/valet-trash", label: "Explore valet trash" }}
        />
      </Section>

      {/* Audiences */}
      <Section className="bg-sand/60">
        <SectionHeading center eyebrow="Who we serve" title="Built for every type of property in Central Ohio" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <Link key={a.title} href={a.href} className="rounded-3xl bg-white p-7 ring-1 ring-line transition hover:shadow-lg">
              <span className="text-3xl" aria-hidden="true">
                {a.icon}
              </span>
              <h3 className="mt-3 text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-muted">{a.body}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Peace of mind */}
      <Section>
        <SplitFeature
          reverse
          eyebrow="Peace of mind"
          title="Know it's done, even when you're nowhere near home"
          body="Every visit is photo-verified and texted to you. Out of town for the week? We'll keep your cans moving so your home looks lived-in."
          visual={<PhoneNotice />}
        />
        <div className="mt-20">
          <FeatureGrid
            items={[
              { icon: "📅", title: "Never miss a pickup", body: "We track your hauler's schedule, including holiday shifts, so your cans are out on the right night." },
              { icon: "🏋️", title: "No more heavy lifting", body: "Long driveways, hills, snow and ice: we do the hauling so you don't have to." },
              { icon: "✨", title: "Keep your curb appeal", body: "Cans go back the same day as pickup. No more bins lining the street all week." },
              { icon: "🔐", title: "Gates and codes handled", body: "Gated communities, keypads and side yards are no problem. Save the details once." },
              { icon: "📸", title: "Photo proof every time", body: "A quick photo text after each visit means you never have to wonder." },
              { icon: "🤝", title: "Local and accountable", body: "We live and work in Columbus. Call or text and talk to a real person." },
            ]}
          />
        </div>
      </Section>

      {/* Pricing */}
      <Section className="bg-cream" id="pricing">
        <SectionHeading center eyebrow="Pricing" title="Simple plans for Columbus homes" intro={`Every plan starts with ${site.trialDays} days free.`} />
        <div className="mt-12">
          <ResidentialPricing />
        </div>
      </Section>

      {/* Service area */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Service area"
              title="Proudly serving Greater Columbus"
              intro="From downtown to the suburbs, Buckeye covers Franklin, Delaware, Fairfield and surrounding counties."
            />
            <div className="mt-6">
              <ZipChecker />
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-area/${c.slug}`}
                className="rounded-full bg-white px-4 py-2 text-[15px] font-medium ring-1 ring-line hover:bg-leaf-50 hover:ring-leaf-600"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-cream">
        <SectionHeading center eyebrow="FAQ" title="Questions we hear a lot" />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList faqs={generalFaqs.slice(0, 6)} />
        </div>
      </Section>

      {/* Hiring */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-sand p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">Want to earn money on your schedule?</h2>
            <p className="mt-2 max-w-xl text-muted">
              We&apos;re hiring reliable Columbus-area team members for evening routes. Flexible hours, weekly pay.
            </p>
          </div>
          <Button href="/join-our-team" variant="dark">
            Join our team
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
