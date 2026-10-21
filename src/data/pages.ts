// One entry per public page. Drives share images (/og/...), breadcrumbs, the sitemap and llms.txt,
// so a new page only needs an entry here plus a pageMeta() call.
import { cities, type City } from "./cities";
import { site } from "./site";

export type PageInfo = {
  path: string;
  /** Short label for breadcrumbs and llms.txt. */
  name: string;
  /** Small line above the headline on the share image. */
  ogEyebrow: string;
  /** Headline on the share image. Keep under ~60 characters. */
  ogTitle: string;
  /** One line for llms.txt describing what the page answers. */
  summary: string;
  priority: number;
  /** false for ad landing pages and post-signup pages kept out of search. */
  index?: boolean;
};

const weeks = Math.round(site.trialDays / 7);

export const staticPages: PageInfo[] = [
  {
    path: "/",
    name: "Home",
    ogEyebrow: "Columbus, Ohio",
    ogTitle: "Never take the trash out again.",
    summary: "Overview of every service, plans and the Greater Columbus service area.",
    priority: 1,
  },
  {
    path: "/valet-trash",
    name: "Valet Trash",
    ogEyebrow: "Valet trash · Apartments",
    ogTitle: "Doorstep valet trash for Columbus apartment communities",
    summary: "Doorstep trash and recycling pickup for apartment communities, packages and proposal requests.",
    priority: 0.9,
  },
  {
    path: "/can-to-curb",
    name: "Trash Can to Curb",
    ogEyebrow: "Trash can to curb",
    ogTitle: "Your cans out. Your cans back. Every week.",
    summary: "Weekly residential service that rolls trash and recycling cans to the curb and back.",
    priority: 0.9,
  },
  {
    path: "/bin-cleaning",
    name: "Bin Cleaning",
    ogEyebrow: "Trash bin cleaning",
    ogTitle: "Washed, sanitized and deodorized at your curb",
    summary: "Curbside hot-water trash bin cleaning: one-time, monthly or quarterly.",
    priority: 0.8,
  },
  {
    path: "/junk-removal",
    name: "Junk & Bulk Removal",
    ogEyebrow: "Junk & bulk removal",
    ogTitle: "Point to it. We'll haul it.",
    summary: "Furniture, appliance, yard waste and cleanout hauling, usually within 24 to 48 hours.",
    priority: 0.8,
  },
  {
    path: "/vacation-rentals",
    name: "Vacation Rentals",
    ogEyebrow: "Airbnb & short-term rentals",
    ogTitle: "Five-star trash day for your rental properties",
    summary: "Can service and overflow pickups for Airbnb, VRBO and short-term rental hosts.",
    priority: 0.7,
  },
  {
    path: "/pricing",
    name: "Pricing",
    ogEyebrow: "Pricing",
    ogTitle: "Straightforward plans. No contracts.",
    summary: "Monthly can-to-curb plan prices, on-demand service prices and valet trash packages.",
    priority: 0.8,
  },
  {
    path: "/how-it-works",
    name: "How It Works",
    ogEyebrow: "How it works",
    ogTitle: "Trash day, handled from start to finish",
    summary: "Step-by-step setup for homeowners and apartment communities.",
    priority: 0.6,
  },
  {
    path: "/service-area",
    name: "Service Area",
    ogEyebrow: "Service area",
    ogTitle: "Serving Columbus and Central Ohio",
    summary: "Every city and ZIP code served across Greater Columbus.",
    priority: 0.8,
  },
  {
    path: "/faq",
    name: "FAQ",
    ogEyebrow: "FAQ",
    ogTitle: "Answers about trash day, valet trash and more",
    summary: "Common questions about service, scheduling, access, holidays, contracts and valet trash.",
    priority: 0.6,
  },
  {
    path: "/get-started",
    name: "Get Started",
    ogEyebrow: `First ${site.trialDays} days free`,
    ogTitle: "Start your free trial",
    summary: "Residential sign-up: choose a plan and start a free trial.",
    priority: 0.7,
  },
  {
    path: "/contact",
    name: "Contact",
    ogEyebrow: "Contact",
    ogTitle: "Talk to a real person in Columbus",
    summary: "Phone, email, hours and a contact form.",
    priority: 0.5,
  },
  {
    path: "/join-our-team",
    name: "Join Our Team",
    ogEyebrow: "Now hiring in Columbus",
    ogTitle: "Earn on your schedule with Buckeye",
    summary: "Part-time evening route jobs and the application form.",
    priority: 0.4,
  },
  {
    path: "/privacy",
    name: "Privacy Policy",
    ogEyebrow: "Legal",
    ogTitle: "Privacy Policy",
    summary: "How customer information is collected and used.",
    priority: 0.2,
  },
  {
    path: "/terms",
    name: "Terms of Service",
    ogEyebrow: "Legal",
    ogTitle: "Terms of Service",
    summary: "Service and subscription terms.",
    priority: 0.2,
  },
  {
    path: "/site-map",
    name: "Sitemap",
    ogEyebrow: "Sitemap",
    ogTitle: "Every page on BuckeyeWR.com",
    summary: "Links to every service, city and help page.",
    priority: 0.3,
  },
  {
    path: "/free-trial",
    name: "Free Trial",
    ogEyebrow: `Try it free for ${weeks} weeks`,
    ogTitle: "Make trash day easier. We'll roll your cans out and back.",
    summary: "Ad landing page for the free trial.",
    priority: 0,
    index: false,
  },
];

export function cityPage(city: City): PageInfo {
  return {
    path: `/service-area/${city.slug}`,
    name: city.name,
    ogEyebrow: `${city.name}, Ohio`,
    ogTitle: `Trash day, handled in ${city.name}`,
    summary: `Services, plans and FAQs for ${city.name} (${city.zips.join(", ")}).`,
    priority: 0.7,
  };
}

export const allPages: PageInfo[] = [...staticPages, ...cities.map(cityPage)];

export function getPage(path: string) {
  return allPages.find((p) => p.path === path);
}

/** Home → parent section (if any) → page, for breadcrumbs. */
export function breadcrumbTrail(path: string): PageInfo[] {
  const trail: PageInfo[] = [getPage("/")!];
  const segments = path.split("/").filter(Boolean);
  for (let i = 1; i <= segments.length; i++) {
    const page = getPage(`/${segments.slice(0, i).join("/")}`);
    if (page) trail.push(page);
  }
  return trail;
}

/** Share-image URL for a page path, e.g. "/" → "/og/home", "/service-area/dublin" → "/og/service-area/dublin". */
export function ogImagePath(path: string) {
  return path === "/" ? "/og/home" : `/og${path}`;
}
