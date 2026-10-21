import type { Metadata } from "next";
import { cities } from "@/data/cities";
import { breadcrumbTrail, getPage, ogImagePath } from "@/data/pages";
import { onDemand, residentialPlans, site } from "@/data/site";

const BUSINESS_ID = `${site.url}/#business`;
const phoneE164 = site.phoneHref.replace("tel:", "");

/**
 * Full metadata for a page: title, description, canonical, Open Graph and Twitter/X tags,
 * and a page-specific share image from /og/... (see src/data/pages.ts).
 *
 * Next.js merges metadata shallowly, so `openGraph` and `twitter` are spelled out completely here —
 * a partial object would drop the site name, type and image inherited from the root layout.
 */
export function pageMeta(
  title: string | { absolute: string },
  description: string,
  path: string,
  { noindex = false }: { noindex?: boolean } = {},
): Metadata {
  const page = getPage(path);
  const socialTitle = typeof title === "string" ? title : title.absolute;
  const image = {
    url: ogImagePath(path),
    width: 1200,
    height: 630,
    alt: page ? `${page.ogTitle} | ${site.name}` : site.name,
    type: "image/png",
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      title: socialTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [image] },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/brand/logo-512.png`,
  image: `${site.url}/og/home`,
  telephone: phoneE164,
  email: site.email,
  description: site.description,
  slogan: site.tagline,
  priceRange: "$$",
  currenciesAccepted: "USD",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Columbus",
    addressRegion: "OH",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
  areaServed: [
    {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
      geoRadius: site.geo.radiusMeters,
    },
    ...cities.map((c) => ({ "@type": "City", name: `${c.name}, OH`, url: `${site.url}/service-area/${c.slug}` })),
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hoursSpec.days,
      opens: site.hoursSpec.opens,
      closes: site.hoursSpec.closes,
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: phoneE164,
    email: site.email,
    contactType: "customer service",
    areaServed: "US-OH",
    availableLanguage: "English",
  },
  sameAs: Object.values(site.social).filter(Boolean),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Trash services",
    itemListElement: [
      ...residentialPlans.map((p) => ({
        "@type": "Offer",
        name: `${p.name} can-to-curb plan`,
        description: p.features.join("; "),
        price: p.price,
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", price: p.price, priceCurrency: "USD", unitText: "MONTH" },
        itemOffered: { "@type": "Service", name: "Trash Can to Curb Service" },
      })),
      ...onDemand.map((s) => ({
        "@type": "Offer",
        name: s.name,
        description: s.description,
        priceSpecification: { "@type": "PriceSpecification", minPrice: s.from, priceCurrency: "USD" },
        itemOffered: { "@type": "Service", name: s.name },
      })),
      {
        "@type": "Offer",
        name: "Valet Trash Service",
        description: "Doorstep trash and recycling collection for apartment communities, quoted per unit.",
        itemOffered: { "@type": "Service", name: "Valet Trash Service" },
      },
    ],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en-US",
  publisher: { "@id": BUSINESS_ID },
};

export function breadcrumbSchema(path: string, currentName?: string) {
  const trail = breadcrumbTrail(path);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: i === trail.length - 1 && currentName ? currentName : p.name,
      item: `${site.url}${p.path === "/" ? "" : p.path}`,
    })),
  };
}

export function serviceSchema({
  name,
  path,
  description,
  area,
  offers,
}: {
  name: string;
  path: string;
  description: string;
  /** Defaults to the whole metro area; city pages pass their city. */
  area?: string;
  offers?: { name: string; price?: number; minPrice?: number; monthly?: boolean }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name,
    serviceType: name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: area ? { "@type": "City", name: area } : { "@type": "AdministrativeArea", name: "Greater Columbus, Ohio" },
    ...(offers && {
      offers: offers.map((o) => ({
        "@type": "Offer",
        name: o.name,
        priceCurrency: "USD",
        ...(o.price !== undefined && { price: o.price }),
        priceSpecification: o.monthly
          ? { "@type": "UnitPriceSpecification", price: o.price, priceCurrency: "USD", unitText: "MONTH" }
          : { "@type": "PriceSpecification", minPrice: o.minPrice ?? o.price, priceCurrency: "USD" },
      })),
    }),
  };
}

export const planOffers = residentialPlans.map((p) => ({ name: `${p.name} plan`, price: p.price, monthly: true }));

export function onDemandOffer(serviceName: string) {
  const s = onDemand.find((o) => o.name === serviceName);
  return s ? [{ name: s.name, minPrice: s.from }] : undefined;
}
