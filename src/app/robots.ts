import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const disallow = ["/api/", "/get-started/success"];

// AI search and assistant crawlers, explicitly welcomed so the business can be cited in AI answers.
// A crawler that matches a named group ignores the "*" group, so each group repeats the disallow list.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
