import type { Metadata } from "next";
import { cities } from "@/data/cities";
import { site } from "@/data/site";

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  description: site.description,
  image: `${site.url}/opengraph-image`,
  priceRange: "$$",
  areaServed: cities.map((c) => ({ "@type": "City", name: `${c.name}, OH` })),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Columbus",
    addressRegion: "OH",
    addressCountry: "US",
  },
  makesOffer: [
    "Valet Trash Service",
    "Trash Can to Curb Service",
    "Trash Bin Cleaning",
    "Junk Removal",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};
