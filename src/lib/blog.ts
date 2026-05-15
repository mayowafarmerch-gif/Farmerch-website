import type { BlogPost, BlogPostMeta } from "@/types";

/* ── Post registry ───────────────────────────────────────────────────
   Each post is a TypeScript module that exports:
     metadata : BlogPostMeta  — all frontmatter-equivalent fields
     Content  : React.ComponentType — the article body as JSX
   Import every post here and push to ALL_POSTS.
   ─────────────────────────────────────────────────────────────────── */

import * as LandClearing from "@/data/posts/land-clearing-nigeria";
import * as Mechanization from "@/data/posts/farm-mechanization-guide";
import * as SoilPreparation from "@/data/posts/soil-preparation-best-practices";

export const ALL_POSTS: BlogPost[] = [
  { ...LandClearing.metadata,   Content: LandClearing.Content   },
  { ...Mechanization.metadata,  Content: Mechanization.Content  },
  { ...SoilPreparation.metadata, Content: SoilPreparation.Content },
];

/* ── Utilities ───────────────────────────────────────────────────── */

export function getAllPostMeta(): BlogPostMeta[] {
  return ALL_POSTS
    .map((post): BlogPostMeta => ({
      slug:         post.slug,
      title:        post.title,
      excerpt:      post.excerpt,
      date:         post.date,
      author:       post.author,
      category:     post.category,
      tags:         post.tags,
      readingTime:  post.readingTime,
      featuredImage: post.featuredImage,
      wordCount:    post.wordCount,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return ALL_POSTS.map((p) => p.slug);
}

export function getFeaturedPosts(count = 3): BlogPostMeta[] {
  return getAllPostMeta().slice(0, count);
}

export function estimateReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 225));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}
