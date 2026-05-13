import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/*
  Next.js App Router robots convention.
  Served at: /robots.txt

  Policy:
    – All well-behaved crawlers may index the public site (allow: "/").
    – /_next/ contains compiled static assets (JS, CSS, images served
      through Next.js internals). Crawlers can't usefully index these
      and blocking them conserves the site's crawl budget.
    – /api/ is blocked preemptively; no API routes exist yet but this
      prevents accidental indexing if endpoints are added later.
    – No other paths need blocking on a fully public marketing site.
*/

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url; // https://farmerch.co

  return {
    rules: [
      {
        userAgent: "*",
        allow:     "/",
        disallow:  ["/_next/", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
