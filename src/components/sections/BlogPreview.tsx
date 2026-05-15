"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getFeaturedPosts, formatDate } from "@/lib/blog";
import { Container } from "@/components/ui";
import { SectionWrapper, SectionHeader } from "@/components/shared";
import { cn } from "@/lib/utils";

/* ── Motion variants ─────────────────────────────────────────────── */

const STILL       = { hidden: {}, visible: {} };
const sectionFade = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const gridStagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ── BlogPreview section ─────────────────────────────────────────── */

export default function BlogPreview() {
  const pref = useReducedMotion();
  const f = pref ? STILL : sectionFade;
  const s = pref ? STILL : gridStagger;
  const u = pref ? STILL : fadeUp;

  const posts = getFeaturedPosts(3);

  if (posts.length === 0) return null;

  return (
    <SectionWrapper id="blog-preview" background="subtle">
      <Container>

        {/* ── Section header ──────────────────────────────────── */}
        <motion.div
          variants={f}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            eyebrow="Resources"
            heading="Insights & Agricultural Mechanization Resources"
            description="Practical guides and field intelligence for commercial farmers, agribusinesses, and government project managers navigating Nigerian agricultural mechanization."
            align="center"
          />
        </motion.div>

        {/* ── Post cards ──────────────────────────────────────── */}
        <motion.ul
          variants={s}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          role="list"
          className="grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Latest blog posts"
        >
          {posts.map((post, index) => (
            <motion.li key={post.slug} variants={u}>
              <Link
                href={`/blog/${post.slug}`}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-xl bg-surface",
                  "shadow-card transition-shadow duration-200 hover:shadow-card-hover",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                )}
                aria-label={`Read: ${post.title}`}
              >
                {/* Card image */}
                <div className="relative aspect-video overflow-hidden bg-brand-100">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={index === 0}
                  />
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-brand-700">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-ink-muted">
                      <Clock size={11} aria-hidden="true" />
                      {post.readingTime} min read
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-brand-600">
                    {post.title}
                  </h3>

                  <p className="flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <time dateTime={post.date} className="text-xs text-ink-faint">
                      {formatDate(post.date)}
                    </time>
                    <span
                      className="flex items-center gap-1 text-xs font-semibold text-brand-600"
                      aria-hidden="true"
                    >
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── View all CTA ─────────────────────────────────────── */}
        <motion.div
          variants={f}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2",
              "rounded-button border border-brand-600 px-6 py-3",
              "text-sm font-semibold text-brand-600",
              "transition-colors duration-200 hover:bg-brand-600 hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            )}
          >
            View all articles
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>

      </Container>
    </SectionWrapper>
  );
}
