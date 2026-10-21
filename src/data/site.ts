// Central business config. Everything marked TODO needs to be confirmed with the client
// before launch — the site reads all contact info, pricing and offers from this file.

export const site = {
  name: "Buckeye Waste and Recycling",
  shortName: "Buckeye WR",
  // Canonical origin. buckeyewr.com 308-redirects here, so canonicals and share images must use www.
  url: "https://www.buckeyewr.com",
  domain: "BuckeyeWR.com",
  phone: "(614) 900-0389",
  phoneHref: "tel:+16149000389",
  // TODO: confirm the inbox the client wants leads sent to
  email: "hello@buckeyewr.com",
  region: "Greater Columbus, Ohio",
  hours: "Mon–Sat, 8am–6pm",
  // Machine-readable version of `hours` for structured data. Keep the two in sync.
  hoursSpec: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "18:00" },
  // Center of the service area (downtown Columbus) and how far out it reaches, for local search.
  geo: { latitude: 39.9612, longitude: -82.9988, radiusMeters: 48000 },
  // Bump when page content changes meaningfully; feeds the sitemap and llms.txt.
  updated: "2026-10-21",
  tagline: "Central Ohio's trash day, handled.",
  description:
    "Locally owned valet trash, trash can to curb, bin cleaning and junk removal for homes, apartments and rentals across Columbus, Ohio and its suburbs.",
  // TODO: add real profile URLs once created
  social: {
    facebook: "",
    instagram: "",
    google: "",
  },
  // TODO: confirm every claim here is true (e.g. insurance) before launch
  trustPoints: [
    "Locally owned in Columbus",
    "Background-checked team",
    "Photo-verified service",
    "Fully insured",
  ],
  trialDays: 14,
};

export type Plan = {
  id: "neighbor" | "buckeye" | "estate";
  name: string;
  price: number;
  blurb: string;
  features: string[];
  popular?: boolean;
};

// TODO: placeholder pricing modeled on the national competitor — confirm with client
export const residentialPlans: Plan[] = [
  {
    id: "neighbor",
    name: "Neighbor",
    price: 39,
    blurb: "For most single-family homes.",
    features: [
      "Up to 2 cans",
      "1 collection day per week",
      "Cans out the night before, back after pickup",
      "Text alerts with photo proof",
    ],
  },
  {
    id: "buckeye",
    name: "Buckeye",
    price: 49,
    blurb: "Separate trash and recycling days.",
    popular: true,
    features: [
      "Up to 4 cans",
      "Up to 2 collection days per week",
      "Text alerts with photo proof",
      "Holiday schedule handled automatically",
      "20% off bin cleaning",
    ],
  },
  {
    id: "estate",
    name: "Estate",
    price: 59,
    blurb: "Big households and long driveways.",
    features: [
      "Up to 6 cans",
      "Up to 2 collection days per week",
      "Long driveways and gated access",
      "Priority on-demand pickups",
      "20% off bin cleaning",
    ],
  },
];

// TODO: placeholder pricing — confirm with client
export const onDemand = [
  {
    name: "One-Time Curb Service",
    from: 25,
    unit: "per visit",
    href: "/get-started?service=one-time",
    description: "Out of town or just one busy week? We'll roll your cans out and back, no subscription.",
  },
  {
    name: "Bin Cleaning",
    from: 45,
    unit: "first 2 bins",
    href: "/bin-cleaning",
    description: "Hot-water pressure wash, sanitize and deodorize, right at your curb.",
  },
  {
    name: "Junk & Bulk Removal",
    from: 89,
    unit: "minimum load",
    href: "/junk-removal",
    description: "Furniture, appliances, yard waste, move-outs and garage cleanouts hauled away.",
  },
];

export const valetTiers = [
  {
    name: "Essentials",
    blurb: "Doorstep pickup that residents notice.",
    features: [
      "Doorstep trash pickup up to 5 nights a week",
      "Uniformed, background-checked porters",
      "Resident welcome flyers and door tags",
      "Nightly service log for management",
    ],
  },
  {
    name: "Complete",
    blurb: "Our most requested package.",
    popular: true,
    features: [
      "Everything in Essentials",
      "Doorstep recycling collection",
      "Violation reporting with photos",
      "Compactor and dumpster area tidy-up",
      "Discounted bulk item removal",
    ],
  },
  {
    name: "Premier",
    blurb: "Full-service community support.",
    features: [
      "Everything in Complete",
      "Pet waste station servicing",
      "Breezeway and grounds litter pickup",
      "Unit turn and move-out cleanouts",
      "Dedicated account manager",
    ],
  },
];

export const nav = [
  {
    label: "Services",
    children: [
      { label: "Valet Trash (Apartments)", href: "/valet-trash" },
      { label: "Trash Can to Curb", href: "/can-to-curb" },
      { label: "Bin Cleaning", href: "/bin-cleaning" },
      { label: "Junk & Bulk Removal", href: "/junk-removal" },
      { label: "Vacation Rentals", href: "/vacation-rentals" },
    ],
  },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Service Area", href: "/service-area" },
  { label: "FAQ", href: "/faq" },
];
