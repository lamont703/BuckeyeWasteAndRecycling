import type { MetadataRoute } from "next";
import { allPages, ogImagePath } from "@/data/pages";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${site.updated}T00:00:00Z`);
  return allPages
    .filter((p) => p.index !== false)
    .map((p) => ({
      url: `${site.url}${p.path === "/" ? "" : p.path}`,
      lastModified,
      changeFrequency: p.priority >= 0.7 ? "weekly" : "monthly",
      priority: p.priority,
      images: [`${site.url}${ogImagePath(p.path)}`],
    }));
}
