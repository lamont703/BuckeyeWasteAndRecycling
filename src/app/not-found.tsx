import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button, Section } from "@/components/ui";

// Lives outside the (site) group, so it renders the site chrome itself.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Section>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-6xl" aria-hidden="true">
              🗑️
            </p>
            <h1 className="mt-4 text-4xl font-extrabold">This page got picked up.</h1>
            <p className="mt-3 text-muted">We couldn&apos;t find what you were looking for. Let&apos;s get you back on route.</p>
            <div className="mt-8 flex justify-center gap-3">
              <Button href="/">Home</Button>
              <Button href="/contact" variant="secondary">
                Contact us
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
