import { cacheLife } from "next/cache";
import Link from "next/link";
import { cities } from "@/data/cities";
import { site } from "@/data/site";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Valet Trash", href: "/valet-trash" },
      { label: "Trash Can to Curb", href: "/can-to-curb" },
      { label: "Bin Cleaning", href: "/bin-cleaning" },
      { label: "Junk & Bulk Removal", href: "/junk-removal" },
      { label: "Vacation Rentals", href: "/vacation-rentals" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Join Our Team", href: "/join-our-team" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// Cache Components forbids a bare `new Date()` during prerender, so cache the year.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-6">{site.description}</p>
            <div className="mt-5 space-y-1 text-sm">
              <a href={site.phoneHref} className="block font-semibold text-white hover:underline">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block hover:underline">
                {site.email}
              </a>
              <p>{site.hours}</p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold uppercase tracking-wider text-white">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white">Service Area</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-area/${c.slug}`} className="hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. Proudly serving {site.region}.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
