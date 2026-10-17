import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { site } from "@/data/site";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/valet-trash", priority: 0.9 },
  { path: "/can-to-curb", priority: 0.9 },
  { path: "/bin-cleaning", priority: 0.8 },
  { path: "/junk-removal", priority: 0.8 },
  { path: "/vacation-rentals", priority: 0.7 },
  { path: "/pricing", priority: 0.8 },
  { path: "/how-it-works", priority: 0.6 },
  { path: "/service-area", priority: 0.8 },
  { path: "/faq", priority: 0.6 },
  { path: "/get-started", priority: 0.7 },
  { path: "/contact", priority: 0.5 },
  { path: "/join-our-team", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((r) => ({ url: `${site.url}${r.path}`, priority: r.priority })),
    ...cities.map((c) => ({ url: `${site.url}/service-area/${c.slug}`, priority: 0.7 })),
  ];
}
