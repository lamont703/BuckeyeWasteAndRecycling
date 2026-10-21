-- Every form submission on the site (free trial, sign-up, quotes, contact, careers).
-- Common fields get their own columns for filtering; everything else lands in `details`.
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null,
  status text not null default 'new',
  name text not null,
  email text not null,
  phone text,
  address text,
  city text,
  zip text,
  message text,
  -- Ad attribution, captured from the landing URL.
  source text,
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  details jsonb not null default '{}'::jsonb
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_kind_idx on public.leads (kind);
create index leads_utm_campaign_idx on public.leads (utm_campaign);

-- Leads hold personal info: RLS on with no policies, so only the server's secret key
-- (which bypasses RLS) can read or write. The public publishable key gets nothing.
alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;
