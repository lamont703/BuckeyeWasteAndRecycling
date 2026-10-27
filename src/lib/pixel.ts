// First-party tracking pixel. Records page views, clicks, form activity, conversions, errors,
// failed API calls and performance, then batches them to /api/ev, which saves them to the
// Supabase `pixel_events` table. Form field values are never recorded, only field names.
//
// Debug in the browser console: localStorage.setItem("bk_debug", "1") logs every event.

import { getAttribution } from "./attribution";

const ENDPOINT = "/api/ev";
const VISITOR_KEY = "bk_vid";
const SESSION_KEY = "bk_sid";
const SESSION_IDLE_MS = 30 * 60 * 1000;
const FLUSH_MS = 3000;
const MAX_BATCH = 20;
const SCROLL_MARKS = [25, 50, 75, 90];

type Props = Record<string, unknown>;
type PixelEvent = Props & { event: string; ts: string };

let started = false;
const queue: PixelEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | undefined;
let memoryVisitor = "";
let memorySession = { id: "", last: 0, n: 0 };

// Per-page state, reset on every page view (including client-side navigations).
let pageViewId = "";
let pagePath = "";
let pageStartedAt = 0;
let engagedMs = 0;
let visibleSince = 0;
let maxScroll = 0;
let scrollMarks = new Set<number>();
let forms = new Map<string, { startedAt: number; lastField: string; filled: Set<string>; submitted: boolean }>();
let navStartedAt = 0;
let navType = "initial";

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

const clip = (v: unknown, n = 300) => (v == null ? undefined : String(v).slice(0, n));

function store(kind: "local" | "session") {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function visitorId() {
  const ls = store("local");
  let id = ls?.getItem(VISITOR_KEY) || memoryVisitor;
  if (!id) {
    id = uid();
    try {
      ls?.setItem(VISITOR_KEY, id);
    } catch {}
  }
  memoryVisitor = id;
  return id;
}

// A session ends after 30 minutes without activity, matching Google Analytics.
function session(touch = true) {
  const ls = store("local");
  let s = memorySession;
  try {
    const raw = ls?.getItem(SESSION_KEY);
    if (raw) s = JSON.parse(raw);
  } catch {}
  const now = Date.now();
  const isNew = !s.id || now - s.last > SESSION_IDLE_MS;
  if (isNew) s = { id: uid(), last: now, n: 0 };
  if (touch) s.last = now;
  saveSession(s);
  return s;
}

function saveSession(s: typeof memorySession) {
  memorySession = s;
  try {
    store("local")?.setItem(SESSION_KEY, JSON.stringify(s));
  } catch {}
}

/** IDs to attach to lead submissions so a lead can be joined to the visitor's full journey. */
export function pixelIds(): Record<string, string> {
  if (typeof window === "undefined") return {};
  return { visitor_id: visitorId(), session_id: session(false).id };
}

function context() {
  const conn = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
  return {
    // Session-level ad attribution first, so the page-level referrer below wins.
    ...getAttribution(),
    visitor_id: visitorId(),
    session_id: session().id,
    page_view_id: pageViewId,
    url: clip(location.href, 1000),
    path: location.pathname,
    host: location.hostname,
    title: clip(document.title, 200),
    referrer: clip(document.referrer, 500),
    screen: `${screen.width}x${screen.height}`,
    viewport: `${innerWidth}x${innerHeight}`,
    dpr: devicePixelRatio,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    connection: conn?.effectiveType,
    save_data: conn?.saveData || undefined,
    touch: navigator.maxTouchPoints > 0,
  };
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const e: PixelEvent = { ...context(), ...props, event, ts: new Date().toISOString() };
  queue.push(e);
  if (store("local")?.getItem("bk_debug")) console.log("[pixel]", event, e);
  if (queue.length >= MAX_BATCH) flush();
  else if (!flushTimer) flushTimer = setTimeout(() => flush(), FLUSH_MS);
}

function flush(useBeacon = false) {
  clearTimeout(flushTimer);
  flushTimer = undefined;
  if (!queue.length) return;
  const body = JSON.stringify({ events: queue.splice(0, 50) });
  if (useBeacon && navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "application/json" }))) return;
  nativeFetch(ENDPOINT, { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } }).catch(
    () => {},
  );
  if (queue.length) flush(useBeacon);
}

// ---------------------------------------------------------------- pages & engagement

function pauseEngagement() {
  if (visibleSince) engagedMs += Date.now() - visibleSince;
  visibleSince = 0;
}

function endPage() {
  if (!pageViewId) return;
  pauseEngagement();
  for (const [form, f] of forms) {
    if (!f.submitted) track("form_abandon", { form, last_field: f.lastField, fields_filled: f.filled.size, time_in_form_ms: Date.now() - f.startedAt });
  }
  track("page_leave", { duration_ms: Date.now() - pageStartedAt, engaged_ms: engagedMs, max_scroll_pct: maxScroll });
  pageViewId = "";
}

function pageView() {
  if (location.pathname === pagePath && pageViewId) return;
  endPage();
  const prev = pagePath;
  pageViewId = uid();
  pagePath = location.pathname;
  pageStartedAt = Date.now();
  engagedMs = 0;
  visibleSince = document.visibilityState === "visible" ? Date.now() : 0;
  maxScroll = 0;
  scrollMarks = new Set();
  forms = new Map();

  const s = session();
  s.n += 1;
  saveSession(s);

  const props: Props = { nav_type: navType, previous_path: prev || undefined, session_page_number: s.n };
  if (navType === "initial") {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav) {
      Object.assign(props, {
        load_type: nav.type,
        ttfb_ms: Math.round(nav.responseStart),
        dom_interactive_ms: Math.round(nav.domInteractive),
        transfer_kb: Math.round(nav.transferSize / 1024),
      });
    }
    props.new_visitor = !store("local")?.getItem("bk_seen");
    try {
      store("local")?.setItem("bk_seen", "1");
    } catch {}
  } else if (navStartedAt) {
    props.route_change_ms = Date.now() - navStartedAt;
  }
  if (s.n === 1) track("session_start", { landing_path: location.pathname });
  track("page_view", props);
  navStartedAt = 0;
  // Re-check scroll for short pages that are fully visible without scrolling.
  setTimeout(onScroll, 500);
}

/** Called from instrumentation-client when an App Router navigation starts. */
export function onNavigationStart(type: string) {
  navStartedAt = Date.now();
  navType = type;
}

function onUrlChange() {
  // Give Next.js a moment to render the new page and update document.title.
  setTimeout(() => {
    if (navType === "initial") navType = "push";
    pageView();
  }, 150);
}

function onScroll() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - innerHeight;
  const pct = scrollable <= 0 ? 100 : Math.min(100, Math.round((scrollY / scrollable) * 100));
  if (pct <= maxScroll) return;
  maxScroll = pct;
  for (const m of SCROLL_MARKS) {
    if (pct >= m && !scrollMarks.has(m)) {
      scrollMarks.add(m);
      track("scroll_depth", { percent: m });
    }
  }
}

// ---------------------------------------------------------------- clicks

let recentClicks: { t: number; x: number; y: number }[] = [];

function describe(el: Element) {
  const label =
    el.getAttribute("data-track") ||
    el.getAttribute("aria-label") ||
    (el as HTMLElement).innerText ||
    el.getAttribute("title") ||
    "";
  return clip(label.replace(/\s+/g, " ").trim(), 100);
}

function onClick(e: MouseEvent) {
  const now = Date.now();
  recentClicks = recentClicks.filter((c) => now - c.t < 1000);
  recentClicks.push({ t: now, x: e.clientX, y: e.clientY });
  const near = recentClicks.filter((c) => Math.abs(c.x - e.clientX) < 30 && Math.abs(c.y - e.clientY) < 30);
  const target = e.target instanceof Element ? e.target : null;

  if (near.length === 3) {
    track("rage_click", { element: target ? selector(target) : undefined, text: target ? describe(target) : undefined });
  }

  const el = target?.closest("a, button, [role=button], [data-track], summary, input[type=submit]");
  if (!el) return;

  const base = { text: describe(el), element: selector(el), section: el.closest("section[id], [data-section]")?.id || undefined };
  if (el instanceof HTMLAnchorElement && el.href) {
    const href = el.getAttribute("href") || "";
    if (href.startsWith("tel:")) return track("phone_click", { ...base, href });
    if (href.startsWith("mailto:")) return track("email_click", { ...base, href });
    if (href.startsWith("sms:")) return track("sms_click", { ...base, href });
    const url = new URL(el.href, location.href);
    if (url.host !== location.host) return track("outbound_click", { ...base, href: clip(url.href, 500) });
    return track("link_click", { ...base, href: url.pathname + url.search + url.hash });
  }
  track("button_click", { ...base, type: el.getAttribute("type") || undefined });
}

function selector(el: Element) {
  const parts: string[] = [];
  let node: Element | null = el;
  for (let i = 0; node && i < 4 && node !== document.body; i++, node = node.parentElement) {
    if (node.id) {
      parts.unshift(`#${node.id}`);
      break;
    }
    const named = node.getAttribute("name") || node.getAttribute("data-form");
    parts.unshift(node.tagName.toLowerCase() + (named ? `[${node.hasAttribute("name") ? "name" : "data-form"}=${named}]` : ""));
  }
  return clip(parts.join(" > "), 200);
}

// ---------------------------------------------------------------- forms

function formName(form: HTMLFormElement) {
  return form.getAttribute("data-form") || form.id || form.getAttribute("name") || `${location.pathname}#form`;
}

function formState(form: HTMLFormElement) {
  const name = formName(form);
  let f = forms.get(name);
  if (!f) {
    f = { startedAt: Date.now(), lastField: "", filled: new Set(), submitted: false };
    forms.set(name, f);
    track("form_start", { form: name });
  }
  return { name, f };
}

function fieldOf(t: EventTarget | null) {
  if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement)) return null;
  if (!t.form || t.name === "company_website") return null;
  return t;
}

function onFocusIn(e: FocusEvent) {
  const field = fieldOf(e.target);
  if (field) formState(field.form!).f.lastField = field.name;
}

function onChange(e: Event) {
  const field = fieldOf(e.target);
  if (!field || !field.name) return;
  const { name, f } = formState(field.form!);
  f.lastField = field.name;
  const filled = field instanceof HTMLInputElement && (field.type === "checkbox" || field.type === "radio") ? field.checked : !!field.value;
  if (filled && !f.filled.has(field.name)) {
    f.filled.add(field.name);
    track("form_field_complete", { form: name, field: field.name, field_type: field.type });
  }
}

const VALIDITY = ["valueMissing", "typeMismatch", "patternMismatch", "tooLong", "tooShort", "rangeUnderflow", "rangeOverflow", "stepMismatch", "badInput", "customError"] as const;

function onInvalid(e: Event) {
  const field = fieldOf(e.target);
  if (!field) return;
  const v = field.validity;
  const reason = VALIDITY.find((k) => v[k]) || "invalid";
  track("form_invalid", { form: formName(field.form!), field: field.name, reason });
}

function onSubmit(e: SubmitEvent) {
  const form = e.target instanceof HTMLFormElement ? e.target : null;
  if (!form) return;
  const { name, f } = formState(form);
  f.submitted = true;
  track("form_submit", { form: name, fields_filled: f.filled.size, time_to_submit_ms: Date.now() - f.startedAt });
}

// ---------------------------------------------------------------- errors & network

let errorCount = 0;
let originalFetch: typeof fetch | undefined;
const nativeFetch: typeof fetch = (...args) => (originalFetch ?? window.fetch).call(window, ...args);

function trackError(event: string, props: Props) {
  // Cap per page load so a looping error can't flood the table.
  if (++errorCount > 25) return;
  track(event, props);
}

function onError(e: ErrorEvent | Event) {
  if (e instanceof ErrorEvent) {
    return trackError("js_error", {
      message: clip(e.message, 500),
      source: clip(e.filename, 300),
      line: e.lineno,
      column: e.colno,
      stack: clip(e.error?.stack, 2000),
    });
  }
  // Resource failures (images, scripts, stylesheets) don't bubble, so they arrive in the capture phase.
  const t = e.target as HTMLElement & { src?: string; href?: string };
  if (t && t !== (window as unknown) && t.tagName) {
    trackError("resource_error", { tag: t.tagName.toLowerCase(), src: clip(t.src || t.href, 500) });
  }
}

function onRejection(e: PromiseRejectionEvent) {
  const r = e.reason;
  trackError("js_error", { kind: "unhandled_rejection", message: clip(r?.message ?? r, 500), stack: clip(r?.stack, 2000) });
}

function onCspViolation(e: SecurityPolicyViolationEvent) {
  trackError("csp_violation", { directive: e.violatedDirective, blocked: clip(e.blockedURI, 300) });
}

// Records every call to our own /api routes with its status and timing, so broken or slow
// endpoints (checkout, lead delivery) show up even when the visitor sees a generic error.
function wrapFetch() {
  originalFetch = window.fetch;
  const orig = originalFetch;
  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    const url = new URL(input instanceof Request ? input.url : String(input), location.href);
    const watched = url.origin === location.origin && url.pathname.startsWith("/api/") && url.pathname !== ENDPOINT;
    if (!watched) return orig.call(window, input, init);
    const started = performance.now();
    const method = (init?.method || (input instanceof Request ? input.method : "GET")).toUpperCase();
    try {
      const res = await orig.call(window, input, init);
      const duration_ms = Math.round(performance.now() - started);
      track(res.ok ? "api_request" : "api_error", { endpoint: url.pathname, method, status: res.status, duration_ms });
      return res;
    } catch (err) {
      trackError("api_error", {
        endpoint: url.pathname,
        method,
        status: 0,
        duration_ms: Math.round(performance.now() - started),
        message: clip((err as Error)?.message, 300),
      });
      throw err;
    }
  };
}

// ---------------------------------------------------------------- start

export function startPixel() {
  if (started || typeof window === "undefined") return;
  started = true;
  try {
    wrapFetch();
    for (const method of ["pushState", "replaceState"] as const) {
      const orig = history[method];
      history[method] = function (...args: Parameters<History["pushState"]>) {
        const before = location.pathname;
        const result = orig.apply(this, args);
        if (location.pathname !== before) onUrlChange();
        return result;
      };
    }
    addEventListener("popstate", () => {
      navType = "traverse";
      onUrlChange();
    });
    addEventListener("click", onClick, { capture: true, passive: true });
    addEventListener("focusin", onFocusIn, true);
    addEventListener("change", onChange, true);
    addEventListener("invalid", onInvalid, true);
    addEventListener("submit", onSubmit as EventListener, true);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("error", onError, true);
    addEventListener("unhandledrejection", onRejection);
    addEventListener("securitypolicyviolation", onCspViolation);
    addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        pauseEngagement();
        flush(true);
      } else if (!visibleSince) {
        visibleSince = Date.now();
      }
    });
    addEventListener("pagehide", () => {
      endPage();
      flush(true);
    });
    // instrumentation-client runs before the page is interactive; wait for the DOM title.
    if (document.readyState === "loading") addEventListener("DOMContentLoaded", pageView, { once: true });
    else pageView();
  } catch (err) {
    console.error("[pixel] failed to start", err);
  }
}
