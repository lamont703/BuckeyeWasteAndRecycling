-- First-party pixel: every page view, click, form interaction, conversion, error and
-- performance measurement on the site (written by src/app/api/ev and src/lib/pixel-server.ts).
-- Common fields get their own columns for filtering; everything else lands in `properties`.
create table public.pixel_events (
  id bigint generated always as identity primary key,
  received_at timestamptz not null default now(),
  client_ts timestamptz,
  event text not null,
  -- 'client' = browser pixel, 'server' = API route (lead delivery, Stripe), which ad blockers can't stop.
  source text not null default 'client',
  visitor_id text,
  session_id text,
  page_view_id text,
  -- Page
  host text,
  path text,
  url text,
  title text,
  referrer text,
  landing_page text,
  -- Ad attribution for the session
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  -- Device (parsed from the user agent on the server)
  user_agent text,
  browser text,
  browser_version text,
  os text,
  os_version text,
  device_type text,
  is_bot boolean not null default false,
  screen text,
  viewport text,
  language text,
  timezone text,
  -- Location (Vercel IP geolocation). The IP itself is never stored, only a salted hash.
  ip_hash text,
  country text,
  region text,
  city text,
  postal_code text,
  latitude double precision,
  longitude double precision,
  properties jsonb not null default '{}'::jsonb
);

create index pixel_events_received_at_idx on public.pixel_events (received_at desc);
create index pixel_events_event_idx on public.pixel_events (event, received_at desc);
create index pixel_events_visitor_idx on public.pixel_events (visitor_id, received_at);
create index pixel_events_session_idx on public.pixel_events (session_id, received_at);
create index pixel_events_path_idx on public.pixel_events (path, received_at desc);

-- Same lockdown as `leads`: only the server's secret key can read or write.
alter table public.pixel_events enable row level security;
revoke all on public.pixel_events from anon, authenticated;

-- Leads carry the pixel's visitor/session IDs in `details`, so a lead joins to its journey:
--   select * from pixel_events where visitor_id = (select details->>'visitor_id' from leads where id = '…');
create index leads_visitor_id_idx on public.leads ((details->>'visitor_id'));

-- ---------------------------------------------------------------- audit views
-- security_invoker makes the views respect the table's RLS; the grants keep them off the public API.
-- Production traffic only: localhost and preview hosts are excluded, as are known bots.

create view public.pixel_traffic with (security_invoker = true) as
  select * from public.pixel_events
  where not is_bot and (host is null or host like '%buckeyewr.com' or host like '%.vercel.app');

-- One row per visit: where they came from, what they saw, and whether they converted.
create view public.pixel_sessions with (security_invoker = true) as
  select
    session_id,
    min(visitor_id) as visitor_id,
    min(received_at) as started_at,
    max(received_at) as ended_at,
    extract(epoch from max(received_at) - min(received_at))::int as duration_s,
    count(*) filter (where event = 'page_view') as page_views,
    (array_agg(path order by received_at) filter (where event = 'page_view'))[1] as entry_page,
    (array_agg(path order by received_at desc) filter (where event = 'page_view'))[1] as exit_page,
    (array_agg(referrer order by received_at) filter (where event = 'page_view'))[1] as referrer,
    max(utm_source) as utm_source,
    max(utm_medium) as utm_medium,
    max(utm_campaign) as utm_campaign,
    bool_or(gclid is not null) as from_google_ads,
    bool_or(fbclid is not null) as from_meta_ads,
    max(device_type) as device_type,
    max(browser) as browser,
    max(city) as city,
    max(region) as region,
    count(*) filter (where event in ('lead_submitted', 'lead_received')) > 0 as converted,
    count(*) filter (where event in ('phone_click', 'email_click', 'sms_click')) as contact_clicks,
    count(*) filter (where event in ('js_error', 'api_error', 'resource_error', 'lead_failed', 'rage_click')) as problems
  from public.pixel_traffic
  where session_id is not null
  group by session_id;

-- Daily scorecard.
create view public.pixel_daily with (security_invoker = true) as
  select
    (received_at at time zone 'America/New_York')::date as day,
    count(distinct visitor_id) as visitors,
    count(distinct session_id) as sessions,
    count(*) filter (where event = 'page_view') as page_views,
    count(*) filter (where event = 'lead_received') as leads,
    count(*) filter (where event = 'checkout_started') as checkouts,
    count(*) filter (where event = 'trial_started') as trials_started,
    count(*) filter (where event = 'phone_click') as phone_clicks,
    count(*) filter (where event in ('js_error', 'api_error', 'resource_error')) as errors,
    round(100.0 * count(distinct session_id) filter (where event = 'lead_received')
      / nullif(count(distinct session_id), 0), 2) as conversion_rate_pct
  from public.pixel_traffic
  group by 1;

-- Each form from first touch to delivered lead, and where people give up.
create view public.pixel_form_funnel with (security_invoker = true) as
  select
    properties->>'form' as form,
    count(*) filter (where event = 'form_start') as starts,
    count(*) filter (where event = 'form_invalid') as validation_errors,
    count(*) filter (where event = 'form_submit') as submits,
    count(*) filter (where event in ('lead_submitted', 'checkout_redirect')) as successes,
    count(*) filter (where event = 'lead_failed') as failures,
    count(*) filter (where event = 'form_abandon') as abandons,
    mode() within group (order by properties->>'last_field') filter (where event = 'form_abandon') as most_common_abandon_field,
    round(100.0 * count(*) filter (where event in ('lead_submitted', 'checkout_redirect'))
      / nullif(count(*) filter (where event = 'form_start'), 0), 1) as completion_rate_pct
  from public.pixel_traffic
  where properties ? 'form'
  group by 1;

-- What's broken: JS errors, failed API calls, missing images/scripts, failed lead delivery.
create view public.pixel_errors with (security_invoker = true) as
  select
    event,
    coalesce(properties->>'message', properties->>'endpoint', properties->>'src', properties->>'element') as what,
    properties->>'status' as status,
    path,
    count(*) as occurrences,
    count(distinct session_id) as sessions_affected,
    min(received_at) as first_seen,
    max(received_at) as last_seen,
    (array_agg(browser || ' ' || coalesce(browser_version, '') order by received_at desc))[1] as last_browser
  from public.pixel_traffic
  where event in ('js_error', 'api_error', 'resource_error', 'csp_violation', 'lead_failed',
                  'lead_delivery_failed', 'checkout_error', 'rage_click', 'page_not_found')
  group by 1, 2, 3, 4;

-- Real-user Core Web Vitals per page (p75 is what Google uses for ranking).
-- Values are milliseconds, except CLS, which is stored ×1000 (100 = 0.1).
create view public.pixel_web_vitals with (security_invoker = true) as
  select
    path,
    properties->>'metric' as metric,
    count(*) as samples,
    percentile_cont(0.75) within group (order by (properties->>'value')::numeric) as p75,
    round(100.0 * count(*) filter (where properties->>'rating' = 'good') / count(*), 1) as good_pct
  from public.pixel_traffic
  where event = 'web_vital'
  group by 1, 2;

-- Traffic and engagement per page.
create view public.pixel_pages with (security_invoker = true) as
  select
    path,
    count(*) filter (where event = 'page_view') as views,
    count(distinct visitor_id) filter (where event = 'page_view') as visitors,
    round(avg((properties->>'engaged_ms')::numeric) filter (where event = 'page_leave') / 1000, 1) as avg_engaged_s,
    round(avg((properties->>'max_scroll_pct')::numeric) filter (where event = 'page_leave'), 0) as avg_scroll_pct,
    count(*) filter (where event = 'phone_click') as phone_clicks,
    count(*) filter (where event = 'form_start') as form_starts
  from public.pixel_traffic
  group by 1;

revoke all on public.pixel_traffic, public.pixel_sessions, public.pixel_daily, public.pixel_form_funnel,
  public.pixel_errors, public.pixel_web_vitals, public.pixel_pages from anon, authenticated;
