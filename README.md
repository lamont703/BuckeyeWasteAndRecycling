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

- Per-page titles, descriptions and canonical URLs (`src/lib/seo.ts`)
- LocalBusiness, Service and FAQPage structured data (JSON-LD)
- One landing page per city at `/service-area/<city>`
- `sitemap.xml`, `robots.txt` and a generated Open Graph share image
