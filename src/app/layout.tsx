import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { WhatsAppButton } from "@/components/shared";
import { siteConfig, contact, socialLinks } from "@/data/site";

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
});

/* ─── Viewport ───────────────────────────────────────────────────── */

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor:   "#059669",
};

/* ─── Metadata ───────────────────────────────────────────────────── */

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  title: {
    default:  `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "farm mechanization Nigeria",
    "agricultural services Nigeria",
    "tractor services",
    "commercial farming Nigeria",
    "land preparation services Nigeria",
    "planting operations Nigeria",
    "harvesting services Nigeria",
    "agritech Nigeria",
    "Farmerch",
    "Farmerch Global Limited",
    "southwest Nigeria agriculture",
  ],
  authors:   [{ name: siteConfig.name, url: siteConfig.url }],
  creator:   siteConfig.name,
  publisher: siteConfig.name,
  category:  "Agriculture",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type:        "website",
    locale:      "en_NG",
    url:         siteConfig.url,
    siteName:    siteConfig.name,
    title:       `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url:    "/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    `${siteConfig.name} — Professional Farm Mechanization`,
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images:      ["/og-image.jpg"],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:              true,
      follow:             true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
};

/* ─── Structured data (JSON-LD) ──────────────────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type":    "ProfessionalService",
  name:        siteConfig.name,
  url:         siteConfig.url,
  description: siteConfig.description,
  telephone:   contact.phone,
  email:       contact.email,
  address: {
    "@type":          "PostalAddress",
    streetAddress:    "House 9, Coker Adewoyin Street",
    addressLocality:  "Ile-Ife",
    addressRegion:    "Osun State",
    addressCountry:   "NG",
  },
  areaServed: ["Oyo State", "Ekiti State", "Osun State", "Ogun State", "Ondo State"],
  knowsAbout: [
    "Farm Mechanization",
    "Land Preparation",
    "Planting Operations",
    "Harvesting Services",
    "Agricultural Tractor Operations",
  ],
  serviceType: "Agricultural Mechanization Services",
  sameAs:      socialLinks.map((l) => l.href),
};

/* ─── Root layout ────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        {/*
          Skip-to-content link — MUST be the first focusable element in <body>
          so it is the first thing a keyboard or screen reader user encounters.

          Hidden by default via upward translateY(-5rem from its top-4 anchor),
          which places it at top: 16px − 80px = −64px — fully off-screen above
          the viewport. On :focus-visible it translates back to top: 16px,
          slides over the header, and receives focus.

          tabIndex={-1} on <main> is the critical companion: without it the
          browser cannot move focus to a non-interactive element via href="#id",
          so after activating this link focus would snap back to the header
          instead of continuing forward through the page content.
        */}
        <a
          href="#main-content"
          className={[
            "skip-link",
            // Positioning — floats above everything (z > z-navbar=50)
            "fixed left-4 top-4 z-[200]",
            // Appearance
            "inline-flex items-center",
            "rounded-button bg-brand-600 px-6 py-3",
            "text-sm font-medium text-white",
            "shadow-overlay",
            // Hidden state — shifted off-screen upward
            "-translate-y-20",
            // Revealed on keyboard focus
            "focus-visible:translate-y-0",
            // Smooth reveal animation
            "transition-transform duration-200 ease-out",
          ].join(" ")}
        >
          Skip to main content
        </a>

        <Header />

        {/*
          id="main-content"   — anchor target for the skip link
          tabIndex={-1}       — makes <main> programmatically focusable without
                                inserting it into the natural tab sequence
          focus:outline-none  — suppresses the focus ring on this non-interactive
                                container; the ring is for controls, not regions
        */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 pt-16 focus:outline-none"
        >
          {children}
        </main>

        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
