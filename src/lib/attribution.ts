// Ad attribution (UTM tags, Google/Meta click IDs). Captured on the first page a visitor
// lands on and kept for the session, so a lead submitted pages later still credits the ad.

const KEY = "buckeye_attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

function fromCurrentUrl() {
  const url = new URL(window.location.href);
  const data: Record<string, string> = { landing_page: url.pathname + url.search, referrer: document.referrer };
  for (const p of PARAMS) {
    const v = url.searchParams.get(p);
    if (v) data[p] = v;
  }
  return data;
}

export function captureAttribution() {
  try {
    if (!sessionStorage.getItem(KEY)) sessionStorage.setItem(KEY, JSON.stringify(fromCurrentUrl()));
  } catch {
    // Storage blocked (private mode etc.); getAttribution falls back to the current URL.
  }
}

export function getAttribution(): Record<string, string> {
  try {
    captureAttribution();
    const stored = sessionStorage.getItem(KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return fromCurrentUrl();
}
