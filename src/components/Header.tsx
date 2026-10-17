"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/data/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[72px] sm:px-6">
        <Link href="/" aria-label={`${site.name} home`} onClick={close}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) =>
            "children" in item && item.children ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium text-ink hover:bg-sand">
                  {item.label}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-muted" aria-hidden="true">
                    <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
                  </svg>
                </button>
                <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-2xl border border-line bg-white p-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 text-[15px] text-ink hover:bg-cream"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="rounded-full px-3 py-2 text-[15px] font-medium text-ink hover:bg-sand"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="text-[15px] font-semibold text-leaf-800 hover:underline">
            {site.phone}
          </a>
          <Link
            href="/get-started"
            className="rounded-full bg-amber-cta px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-amber-cta-dark"
          >
            Get Started
          </Link>
        </div>

        <button
          className="rounded-full p-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-4 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {nav.map((item) =>
            "children" in item && item.children ? (
              <div key={item.label} className="py-2">
                <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted">{item.label}</p>
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href} onClick={close} className="block rounded-lg px-2 py-2 text-base">
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={item.label} href={item.href!} onClick={close} className="block rounded-lg px-2 py-2 text-base font-medium">
                {item.label}
              </Link>
            ),
          )}
          <div className="mt-4 grid gap-2">
            <Link href="/get-started" onClick={close} className="rounded-full bg-amber-cta px-5 py-3 text-center font-semibold text-white">
              Get Started
            </Link>
            <a href={site.phoneHref} className="rounded-full px-5 py-3 text-center font-semibold text-leaf-800 ring-1 ring-line">
              Call {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
