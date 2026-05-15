import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { getAllPostMeta, formatDate } from "@/lib/blog";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui";
import { SectionWrapper, SectionHeader } from "@/components/shared";

/* ── SEO Metadata ──────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       "Blog — Agricultural Mechanization Insights",
  description: "Expert guides, industry resources, and practical insights on farm mechanization, land preparation, and commercial agriculture in Nigeria from the Farmerch team.",
  alternates:  { canonical: "/blog" },
  openGraph: {
    type:        "website",
    title:       `Blog | ${siteConfig.name}`,
    description: "Expert guides on farm mechanization, land clearing, soil preparation, and commercial agriculture in Nigeria.",
    url:         `${siteConfig.url}/blog`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${siteConfig.name} Blog` }],
  },
};

/* ── Blog listing page ─────────────────────────────────────────────── */

export default function BlogPage() {
  const posts = getAllPostMeta();

  return (
    <SectionWrapper id="blog" background="muted" as="div">
      <Container>

        {/* ── Page header ──────────────────────────────────────── */}
        <SectionHeader
          eyebrow="Resources & Insights"
          heading="Agricultural Mechanization Blog"
          description="Practical guides, industry analysis, and field insights from the Farmerch team — written for commercial farmers, agribusinesses, cooperatives, and government project managers."
          align="center"
        />

        {/* ── Featured post (first in list) ────────────────────── */}
        {posts[0] && (
          <Link
            href={`/blog/${posts[0].slug}`}
            className="group mb-12 block overflow-hidden rounded-2xl bg-surface shadow-card transition-shadow duration-200 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            aria-label={`Read: ${posts[0].title}`}
          >
            <div className="grid lg:grid-cols-2">
              {/* Featured image */}
              <div className="relative aspect-video lg:aspect-auto">
                <Image
                  src={posts[0].featuredImage}
                  alt={posts[0].title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  onError={undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-700">
                    {posts[0].category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <Clock size={12} aria-hidden="true" />
                    {posts[0].readingTime} min read
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-ink transition-colors duration-200 group-hover:text-brand-600 sm:text-3xl">
                  {posts[0].title}
                </h2>

                <p className="text-base leading-relaxed text-ink-muted">
                  {posts[0].excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <time
                    dateTime={posts[0].date}
                    className="text-sm text-ink-muted"
                  >
                    {formatDate(posts[0].date)}
                  </time>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    Read article <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── Remaining posts grid ─────────────────────────────── */}
        {posts.length > 1 && (
          <ul
            role="list"
            className="grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Blog posts"
          >
            {posts.slice(1).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-card transition-shadow duration-200 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  aria-label={`Read: ${post.title}`}
                >
                  {/* Card image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-brand-700">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-ink-muted">
                        <Clock size={11} aria-hidden="true" />
                        {post.readingTime} min
                      </span>
                    </div>

                    <h2 className="text-lg font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-brand-600">
                      {post.title}
                    </h2>

                    <p className="flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5" aria-label="Post tags">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-ink-muted"
                        >
                          <Tag size={10} aria-hidden="true" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <time
                      dateTime={post.date}
                      className="mt-auto text-xs text-ink-faint"
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

      </Container>
    </SectionWrapper>
  );
}
