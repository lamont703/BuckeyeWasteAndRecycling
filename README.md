# BuckeyeWR.com

Marketing site for **Buckeye Waste and Recycling**: valet trash, trash can to curb, bin cleaning and
junk removal across Greater Columbus, Ohio. Built with Next.js 16 (App Router, Cache Components) and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Where to edit things

| What | File |
|---|---|
| Phone, email, hours, trust badges, trial length | `src/data/site.ts` |
| Residential plans & prices, on-demand prices, valet tiers | `src/data/site.ts` |
| Service-area cities, ZIP codes, neighborhood copy | `src/data/cities.ts` (each entry creates `/service-area/<slug>`) |
| FAQ content | `src/data/faqs.ts` |
| Logo | `src/components/Logo.tsx` and `src/app/icon.svg` |
| Brand colors | `src/app/globals.css` (`@theme` block) |
| Illustrations (swap for real photos) | `src/components/Illustrations.tsx` |

Search the code for `TODO` to find every placeholder that must be confirmed before launch.

## Forms & payments

- All forms POST to `/api/lead`, which delivers the lead to every configured channel (see `.env.example`):
  - **Supabase**: every lead becomes a row in the `leads` table, with ad attribution (UTM tags, `gclid`,
    `fbclid`, landing page) captured on the visitor's first page. Schema: `supabase/migrations`; apply with
    `supabase db push`.
  - **GoHighLevel** (`src/lib/ghl.ts`): upserts the contact, adds tags (`website lead`, plus the service,
    e.g. `valet trash`, `free trial`), attaches every form answer as a note, and, if `GHL_PIPELINE_ID` is set,
    opens an opportunity. Build GHL workflows off those tags to text/email new leads automatically.
  - Email via Resend, and/or a generic JSON webhook.
- A lead only fails if every configured channel fails, so one outage doesn't lose it.
- The residential sign-up (`/get-started`) opens Stripe Checkout with a free trial when `STRIPE_SECRET_KEY`
  and the three `STRIPE_PRICE_*` variables are set. Otherwise it falls back to a lead submission.

## SEO built in

- **Page registry** (`src/data/pages.ts`): one entry per page drives share images, breadcrumbs, the sitemap and
  `llms.txt`. Adding a page = add an entry + call `pageMeta()` (`src/lib/seo.ts`) in the page.
- **Metadata**: title, description, `www` canonical, full Open Graph + Twitter/X tags on every page.
- **Share images**: a branded 1200×630 card per page at `/og/<path>` (e.g. `/og/service-area/dublin`), prerendered.
- **Structured data (JSON-LD)**: LocalBusiness (hours, geo, service area, plan prices), WebSite, BreadcrumbList,
  Service with offers, FAQPage.
- **AI search (GEO)**: `/llms.txt` plain-text brief generated from site data; `robots.txt` explicitly allows
  GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and other AI crawlers.
- **Crawling**: `/sitemap.xml` (submit this in Google Search Console), human-readable `/site-map`, web app
  manifest, Apple touch icon. Verification tags via `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`.
- One landing page per city at `/service-area/<city>`. The `/free-trial` ad page is `noindex` but has share tags.
