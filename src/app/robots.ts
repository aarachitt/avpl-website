import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content/site";

// Per brief §6.3 / §17: explicitly allow AI crawlers alongside
// standard search bots. Do not accidentally block them — if this
// site is later put behind Cloudflare, its default bot-blocking
// settings must be checked separately (see LAUNCH_CHECKLIST.md);
// this file only controls what Next.js itself serves.
const AI_CRAWLERS = ["GPTBot", "PerplexityBot", "ClaudeBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
