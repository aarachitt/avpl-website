import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content/site";

const routes = [
  "",
  "/about",
  "/services",
  "/impact",
  "/ai-assistant",
  "/ai-campaign-builder",
  "/consultation",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
