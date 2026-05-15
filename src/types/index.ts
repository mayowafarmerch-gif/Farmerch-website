/* ── Navigation ────────────────────────────────────────────── */

export interface NavItem {
  label: string;
  href: string;
}

/* ── Services ──────────────────────────────────────────────── */

export interface ServiceFeature {
  label: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

/* ── Process steps ─────────────────────────────────────────── */

export interface ProcessStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

/* ── Coverage ──────────────────────────────────────────────── */

export interface CoverageRegion {
  state: string;
  cities: string[];
  activeProjects: string;
  hectaresServiced: string;
}

/* ── Stats ─────────────────────────────────────────────────── */

export interface Stat {
  value: string;
  label: string;
}

/* ── Social links ──────────────────────────────────────────── */

export interface SocialLink {
  label: string;
  href:  string;
}

/* ── Blog ──────────────────────────────────────────────────── */

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;           // ISO 8601, e.g. "2025-04-10"
  author: string;
  category: string;
  tags: string[];
  readingTime: number;    // minutes
  featuredImage: string;  // path relative to /public
  wordCount: number;
}

export interface BlogPost extends BlogPostMeta {
  Content: React.ComponentType;
}

/* ── Quote form ────────────────────────────────────────────── */

export interface QuoteFormValues {
  organizationType: string;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  farmSize: string;
  location: string;
  preferredTimeline: string;
  additionalInfo?: string;
}
