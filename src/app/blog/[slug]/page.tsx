import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays, User, Tag } from "lucide-react";
import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/blog";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui";
import { Breadcrumb } from "@/components/shared";

/* ── Static generation ─────────────────────────────────────────────── */

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ── Per-post SEO metadata ─────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title:       post.title,
    description: post.excerpt,
    alternates:  { canonical: `/blog/${post.slug}` },
    openGraph: {
      type:          "article",
      title:         post.title,
      description:   post.excerpt,
      url:           `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.date,
      authors:       [post.author],
      tags:          post.tags,
      images: [
        {
          url:    post.featuredImage,
          width:  1200,
          height: 630,
          alt:    post.title,
        },
      ],
    },
    twitter: {
      card:        "summary_large_image",
      title:       post.title,
      description: post.excerpt,
      images:      [post.featuredImage],
    },
  };
}

/* ── Article JSON-LD ───────────────────────────────────────────────── */

function ArticleSchema({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const jsonLd = {
    "@context":       "https://schema.org",
    "@type":          "Article",
    headline:          post.title,
    description:       post.excerpt,
    datePublished:     post.date,
    dateModified:      post.date,
    author: {
      "@type": "Organization",
      name:    post.author,
      url:     siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name:    siteConfig.name,
      url:     siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url:     `${siteConfig.url}/logo.png`,
      },
    },
    image:            `${siteConfig.url}${post.featuredImage}`,
    url:              `${siteConfig.url}/blog/${post.slug}`,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    keywords:          post.tags.join(", "),
    articleSection:    post.category,
    wordCount:         post.wordCount,
    timeRequired:     `PT${post.readingTime}M`,
    inLanguage:       "en-NG",
    about: {
      "@type": "Thing",
      name:    "Agricultural Mechanization in Nigeria",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ── BreadcrumbList JSON-LD ────────────────────────────────────────── */

function BreadcrumbSchema({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      {
        "@type":  "ListItem",
        position: 1,
        name:     "Home",
        item:     siteConfig.url,
      },
      {
        "@type":  "ListItem",
        position: 2,
        name:     "Blog",
        item:     `${siteConfig.url}/blog`,
      },
      {
        "@type":  "ListItem",
        position: 3,
        name:     post.title,
        item:     `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ── Blog post page ────────────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { Content } = post;

  return (
    <>
      <ArticleSchema post={post} />
      <BreadcrumbSchema post={post} />

      <article className="bg-surface" aria-labelledby="post-title">

        {/* ── Breadcrumb ───────────────────────────────────────── */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        {/* ── Hero image ──────────────────────────────────────── */}
        <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[28rem]">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent" />

          {/* Category pill overlaid on hero */}
          <div className="absolute bottom-6 left-6">
            <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              {post.category}
            </span>
          </div>
        </div>

        {/* ── Post content ─────────────────────────────────────── */}
        <Container>
          <div className="mx-auto max-w-3xl py-12 sm:py-16">

            {/* Title */}
            <h1
              id="post-title"
              className="mb-6 text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl"
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-border pb-8">
              <span className="flex items-center gap-1.5 text-sm text-ink-muted">
                <User size={14} aria-hidden="true" />
                {post.author}
              </span>
              <time
                dateTime={post.date}
                className="flex items-center gap-1.5 text-sm text-ink-muted"
              >
                <CalendarDays size={14} aria-hidden="true" />
                {formatDate(post.date)}
              </time>
              <span className="flex items-center gap-1.5 text-sm text-ink-muted">
                <Clock size={14} aria-hidden="true" />
                {post.readingTime} min read
              </span>
            </div>

            {/* Article body */}
            <div className="prose prose-farmerch">
              <Content />
            </div>

            {/* Tags */}
            <div className="mt-12 border-t border-border pt-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-muted">
                Topics
              </p>
              <div className="flex flex-wrap gap-2" aria-label="Post tags">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-ink-muted"
                  >
                    <Tag size={12} aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA footer */}
            <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 p-8 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-brand-200">
                Ready to start your project?
              </p>
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Request a Mechanization Quote
              </h2>
              <p className="mb-6 text-brand-100">
                Speak with our operations team about your farm size, location, and timeline.
                We respond within 24 hours.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-button bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Get a Quote
                <ArrowLeft size={14} className="rotate-180" aria-hidden="true" />
              </Link>
            </div>

            {/* Back to blog */}
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 underline-offset-4 hover:underline"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back to all articles
              </Link>
            </div>

          </div>
        </Container>
      </article>
    </>
  );
}
