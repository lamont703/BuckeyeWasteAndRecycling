import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AttributionCapture } from "@/components/AttributionCapture";
import { WebVitals } from "@/components/PixelEvents";
import { JsonLd } from "@/components/sections";
import { site } from "@/data/site";
import { localBusinessSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Valet Trash & Trash Can Service in Columbus, OH | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Waste management",
  // Fallback for pages without pageMeta(); pageMeta() replaces these per page.
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [{ url: "/og/home", width: 1200, height: 630, alt: site.name, type: "image/png" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  // Paste the codes from Google Search Console / Bing Webmaster Tools into Vercel env vars.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    ...(process.env.BING_SITE_VERIFICATION && { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }),
  },
};

export const viewport: Viewport = {
  themeColor: "#0f3a21",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchema} />
        <AttributionCapture />
        <WebVitals />
      </body>
    </html>
  );
}
