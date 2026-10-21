import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbTrail } from "@/data/pages";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-[0.14em] text-leaf-700">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}

const buttonStyles = {
  primary: "bg-amber-cta text-white hover:bg-amber-cta-dark shadow-sm",
  secondary: "bg-white text-ink ring-1 ring-line hover:ring-ink/30",
  dark: "bg-leaf-800 text-white hover:bg-leaf-900",
  ghostLight: "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold transition ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Check({ className = "h-5 w-5 text-leaf-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`shrink-0 ${className}`} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] text-ink">
          <Check />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Breadcrumbs({ path }: { path: string }) {
  const trail = breadcrumbTrail(path);
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
          {trail.map((p, i) => (
            <li key={p.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === trail.length - 1 ? (
                <span aria-current="page" className="text-white">
                  {p.name}
                </span>
              ) : (
                <Link href={p.path} className="hover:text-white hover:underline">
                  {p.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(path)} />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  path,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  /** Page path; renders breadcrumbs (visible + BreadcrumbList structured data). */
  path?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-leaf-900 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-leaf-700/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-nut-500/30 blur-3xl" />
      <Container className="relative py-16 sm:py-24">
        {path && <Breadcrumbs path={path} />}
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-leaf-100">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/80">{intro}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}
