import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui";
import { Logo } from "@/components/shared";
import { siteConfig, contact, footerLinks, socialLinks } from "@/data/site";

/* ── Social brand icons ────────────────────────────────────────────────
   lucide-react@1.14 ships no brand/platform icons.
   Paths below are from Simple Icons (simpleicons.org, CC0) — the same
   source used by most icon systems. They are fill-based (viewBox 0 0 24 24)
   so they inherit `currentColor` from the parent anchor's text colour.
   ──────────────────────────────────────────────────────────────────── */

interface SvgIconProps { className?: string }

function LinkedInIcon({ className }: SvgIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: SvgIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: SvgIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: SvgIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<string, (props: SvgIconProps) => React.JSX.Element> = {
  LinkedIn:  LinkedInIcon,
  Instagram: InstagramIcon,
  Facebook:  FacebookIcon,
  X:         XIcon,
};

const YEAR = new Date().getFullYear();

export default function Footer() {

  return (
    <footer className="bg-gray-900 text-white" aria-label="Site footer">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — return to homepage`}
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              <Logo variant="inverted" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Professional farm mechanization services for commercial agriculture across Nigeria.
            </p>

            <div className="mt-6 flex gap-3" aria-label="Social media links">
              {socialLinks.map(({ label, href }) => {
                const Icon = SOCIAL_ICON_MAP[label];
                if (!Icon) return null;
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={`${label} (opens in new tab)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-brand-400 transition-colors duration-150"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-400" aria-hidden="true" />
                <span className="text-sm text-gray-400">{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-brand-400" aria-hidden="true" />
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-brand-400" aria-hidden="true" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-xs text-gray-400">
            © {YEAR} {siteConfig.name}. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
