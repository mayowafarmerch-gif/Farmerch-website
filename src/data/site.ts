import type { NavItem, Service, ProcessStep, CoverageRegion, Stat } from "@/types";

/* ── Navigation ────────────────────────────────────────────── */

export const navItems: NavItem[] = [
  { label: "Services",   href: "#services"  },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Coverage",   href: "#coverage"  },
  { label: "Contact",    href: "#contact"   },
];

/* ── Hero ──────────────────────────────────────────────────── */

export const hero = {
  badge:       "Powering Agriculture Across Southwestern Nigeria",
  heading:     "Professional Farm Mechanization at Scale",
  description: "Farmerch Global Limited provides timely, quality mechanization services to commercial farms, government projects, and cooperatives. We coordinate a trusted network of tractor owners and operators to deliver efficient agricultural services when you need them.",
  highlights: [
    "B2B mechanization contracts",
    "Quality-controlled operations",
    "Trusted operator network",
    "On-time project delivery",
  ],
  stat: { value: "500+", label: "Hectares Serviced Monthly" },
};

/* ── Services ──────────────────────────────────────────────── */

export const services: Service[] = [
  {
    id:          "land-preparation",
    icon:        "Tractor",
    title:       "Land Preparation",
    description: "Plowing, harrowing, and ridging services for optimal soil preparation across all farm sizes.",
    features:    ["Disc plowing", "Harrowing", "Ridging", "Bed formation"],
  },
  {
    id:          "planting-operations",
    icon:        "Sprout",
    title:       "Planting Operations",
    description: "Precision planting services ensuring optimal seed placement and germination rates.",
    features:    ["Mechanized planting", "Seed drilling", "Row spacing", "Depth control"],
  },
  {
    id:          "harvesting-services",
    icon:        "Wheat",
    title:       "Harvesting Services",
    description: "Efficient harvesting operations to minimize post-harvest losses and ensure timely crop collection.",
    features:    ["Combine harvesting", "Grain collection", "Field clearing", "Crop transport"],
  },
  {
    id:          "project-coordination",
    icon:        "Users",
    title:       "Project Coordination",
    description: "End-to-end project management for large-scale agricultural operations and government contracts.",
    features:    ["Scheduling", "Quality control", "Operator deployment", "Progress monitoring"],
  },
  {
    id:          "multi-location-coverage",
    icon:        "MapPin",
    title:       "Multi-Location Coverage",
    description: "Coordinated services across Oyo and Ekiti States with expansion plans across Nigeria.",
    features:    ["Fleet coordination", "Logistics support", "Regional coverage", "Site management"],
  },
  {
    id:          "timely-deployment",
    icon:        "Clock",
    title:       "Timely Deployment",
    description: "Guaranteed on-time service delivery to meet critical planting and harvesting windows.",
    features:    ["Seasonal planning", "Weather coordination", "Rapid response", "24/7 support"],
  },
];

/* ── Process ───────────────────────────────────────────────── */

export const processSteps: ProcessStep[] = [
  {
    step:        1,
    icon:        "FileText",
    title:       "Contract Agreement",
    description: "We secure mechanization contracts on a per-hectare basis with farms, cooperatives, and government projects.",
  },
  {
    step:        2,
    icon:        "Users",
    title:       "Network Allocation",
    description: "Projects are allocated to qualified tractor owners and operators within our trusted network.",
  },
  {
    step:        3,
    icon:        "CalendarCheck",
    title:       "Deployment Scheduling",
    description: "We coordinate timing, logistics, and field operations to ensure on-time service delivery.",
  },
  {
    step:        4,
    icon:        "Settings",
    title:       "Quality Monitoring",
    description: "Our team provides operational oversight, quality control, and community engagement throughout.",
  },
  {
    step:        5,
    icon:        "CheckCircle",
    title:       "Project Completion",
    description: "Services are delivered professionally with quality assurance and performance verification.",
  },
  {
    step:        6,
    icon:        "TrendingUp",
    title:       "Continuous Improvement",
    description: "We gather feedback and optimize operations to improve service quality and efficiency.",
  },
];

/* ── Stats banner ──────────────────────────────────────────── */

export const statsPartner: Stat[] = [
  { value: "2",     label: "States Covered"      },
  { value: "50+",   label: "Tractor Owners"       },
  { value: "1000+", label: "Hectares Serviced"    },
  { value: "98%",   label: "On-Time Delivery"     },
];

/* ── Coverage ──────────────────────────────────────────────── */

export const coverageRegions: CoverageRegion[] = [
  {
    state:            "Oyo State",
    cities:           ["Ibadan", "Ogbomoso", "Oyo", "Iseyin", "Saki"],
    activeProjects:   "40+",
    hectaresServiced: "600+",
  },
  {
    state:            "Ekiti State",
    cities:           ["Ado-Ekiti", "Ikere", "Ijero", "Ikole"],
    activeProjects:   "25+",
    hectaresServiced: "400+",
  },
];

export const expansionTimeline = [
  { year: "2026", label: "Expansion to 5+ Nigerian states"    },
  { year: "2027", label: "Nationwide coverage across Nigeria" },
  { year: "2028+", label: "West African market expansion"     },
];

/* ── Contact / Footer ──────────────────────────────────────── */

export const contact = {
  address: "Southwestern Nigeria — Oyo & Ekiti States",
  phone:   "+234 XXX XXX XXXX",
  email:   "info@farmerchglobal.com",
};

export const footerLinks = {
  quickLinks: [
    { label: "Our Services",   href: "#services"      },
    { label: "How It Works",   href: "#how-it-works"  },
    { label: "Coverage Area",  href: "#coverage"      },
    { label: "Request Quote",  href: "#contact"       },
  ],
  services: [
    { label: "Land Preparation",    href: "#services" },
    { label: "Planting Operations", href: "#services" },
    { label: "Harvesting Services", href: "#services" },
    { label: "Project Coordination",href: "#services" },
    { label: "Tractor Network",     href: "#services" },
  ],
};

/* ── Metadata ──────────────────────────────────────────────── */

export const siteConfig = {
  name:        "Farmerch Global Limited",
  shortName:   "Farmerch",
  tagline:     "Professional Farm Mechanization at Scale",
  description: "Farmerch Global Limited provides timely, quality mechanization services to commercial farms, government projects, and cooperatives across Southwestern Nigeria.",
  url:         "https://farmerchglobal.com",
};
