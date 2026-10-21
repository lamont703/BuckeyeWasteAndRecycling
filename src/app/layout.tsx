import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AttributionCapture } from "@/components/AttributionCapture";
import { JsonLd } from "@/components/sections";
import { site } from "@/data/site";
import { localBusinessSchema } from "@/lib/seo";
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
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
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
        <AttributionCapture />
      </body>
    </html>
  );
}
