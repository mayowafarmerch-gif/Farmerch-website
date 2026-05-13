import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/*
  Next.js App Router sitemap convention.
  Served at: /sitemap.xml
  Referenced in: robots.ts → sitemap field

  This site is currently single-page (all content lives on /).
  To add a new page, append a route entry to the array below.
  changeFrequency guidance:
    always   — real-time (live data feeds)
    hourly   — very high-frequency content
    daily    — news / blog with daily posts
    weekly   — sections updated regularly
    monthly  — evergreen marketing pages (default for this site)
    yearly   — legal / policy pages
    never    — truly static archived content
  priority is 0.0–1.0 relative to other pages in the same sitemap.
*/

type Route = {
  path:            string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority:        number;
};

const routes: Route[] = [
  /*
    Homepage — all sections (Hero, Services, How It Works, Coverage,
    Quote Form) live here as anchor links. This is the canonical URL
    for the entire site until sub-pages are created.
  */
  { path: "/",         changeFrequency: "monthly", priority: 1.0 },

  /*
    Future routes — uncomment as pages are created.
    Keep priority relative to the homepage (1.0).
  */
  // { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  // { path: "/coverage", changeFrequency: "monthly", priority: 0.8 },
  // { path: "/about",    changeFrequency: "monthly", priority: 0.8 },
  // { path: "/blog",     changeFrequency: "weekly",  priority: 0.7 },
  // { path: "/contact",  changeFrequency: "yearly",  priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url; // https://farmerch.co

  return routes.map(({ path, changeFrequency, priority }) => ({
    url:             `${base}${path}`,
    lastModified:    new Date(),
    changeFrequency,
    priority,
  }));
}
