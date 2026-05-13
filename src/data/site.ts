import type { NavItem, Service, ProcessStep, CoverageRegion, Stat, SocialLink } from "@/types";

/* ── Navigation ────────────────────────────────────────────── */

export const navItems: NavItem[] = [
  { label: "Services",   href: "#services"  },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Coverage",   href: "#coverage"  },
  { label: "Contact",    href: "#contact"   },
];

/* ── Hero ──────────────────────────────────────────────────── */

export const hero = {
  badge:       "Powering Agriculture Across Nigeria",
  heading:     "Professional Farm Mechanization at Scale",
  description: "Farmerch Global Limited provides timely, quality mechanization services to farmers, governmental agencies, agribusinesses and cooperatives. We coordinate a trusted network of tractor owners and mechanization service providers to deliver efficient agricultural mechanization services when you need them.",
  highlights: [
    "B2B mechanization contracts",
    "Quality-controlled operations",
    "Trusted operator network",
    "On-time project delivery",
  ],
  stat: { value: "2,000+", label: "Hectares Serviced Annually" },
};

/* ── Services ──────────────────────────────────────────────── */

export const services: Service[] = [
  {
    id:          "land-preparation",
    icon:        "Tractor",
    title:       "Land Preparation",
    description: "Ploughing, harrowing, and ridging services for optimal soil preparation across all farm sizes.",
    features:    ["Disc ploughing", "Harrowing", "Ridging", "Bed formation"],
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
    id:          "tractor-network",
    icon:        "Network",
    title:       "Tractor Network Coordination",
    description: "We coordinate a vetted pool of tractor owners and certified operators, matching the right machine and crew to each project's requirements.",
    features:    ["Vetted operator pool", "Machine-to-job matching", "Operator certification", "Fleet scheduling"],
  },
  {
    id:          "project-supervision",
    icon:        "ShieldCheck",
    title:       "Project Supervision",
    description: "Dedicated field supervisors ensure every operation meets our quality standards — from mobilization through to final client sign-off.",
    features:    ["On-site supervision", "Quality assurance", "Progress reporting", "Client sign-off"],
  },
  {
    id:          "multi-state-deployment",
    icon:        "Globe",
    title:       "Multi-State Deployment",
    description: "Coordinated field operations across multiple states, scaling seamlessly from a single farm to government-wide agricultural programmes.",
    features:    ["Cross-state logistics", "Seasonal planning", "Rapid mobilization", "Government contracts"],
  },
];

/* ── Process ───────────────────────────────────────────────── */

export const processSteps: ProcessStep[] = [
  {
    step:        1,
    icon:        "FileText",
    title:       "Submit Project Requirements",
    description: "Share your farm size, location, required services, and preferred timeline. We assess your needs and prepare a tailored mechanization proposal.",
  },
  {
    step:        2,
    icon:        "Users",
    title:       "Match With Verified Operators",
    description: "Your project is allocated to vetted tractor owners and certified operators from our trusted network, matched by machine type and regional availability.",
  },
  {
    step:        3,
    icon:        "Calendar",
    title:       "Deployment Scheduling",
    description: "Our operations team coordinates timing, logistics, and field sequencing to ensure machinery arrives on-site precisely when your planting or harvest window opens.",
  },
  {
    step:        4,
    icon:        "Settings",
    title:       "Operations Coordination",
    description: "We manage on-ground field operations across all assigned sites — handling fuel, maintenance coordination, and operator shift management throughout.",
  },
  {
    step:        5,
    icon:        "CheckCircle",
    title:       "Quality Assurance",
    description: "Dedicated field supervisors inspect every completed pass, verifying coverage standards and confirming operations meet our documented quality benchmarks.",
  },
  {
    step:        6,
    icon:        "TrendingUp",
    title:       "Project Completion & Reporting",
    description: "On close, we deliver a full performance report covering hectares serviced, operational efficiency, and quality metrics — ready for your records or government submission.",
  },
];

/* ── Stats banner ──────────────────────────────────────────── */

export const statsPartner: Stat[] = [
  { value: "4,000+",  label: "Hectares Serviced"  },
  { value: "50+",   label: "Tractor Partners"   },
  { value: "5",     label: "Active States"      },
  { value: "100%",  label: "Enterprise Ready"   },
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
  phone:   "+234 813 951 6150",
  email:   "info@farmerch.co",
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/farmerch-global-ltd/" },
  { label: "Instagram", href: "https://www.instagram.com/farmerchnig?igsh=b2hhejZhOTRyZnNi" },
];

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
  url:         "https://farmerch.co",
};
