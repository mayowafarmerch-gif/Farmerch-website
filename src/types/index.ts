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
