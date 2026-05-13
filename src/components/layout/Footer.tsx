import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui";
import { Logo } from "@/components/shared";
import { siteConfig, contact, footerLinks, socialLinks } from "@/data/site";

const YEAR = new Date().getFullYear();

export default function Footer() {

  return (
    <footer className="bg-gray-900 text-white" aria-label="Site footer">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <a
              href="/"
              aria-label={`${siteConfig.name} — return to homepage`}
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              <Logo variant="inverted" />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Professional farm mechanization services for commercial agriculture across Nigeria.
            </p>

            {/* Social links — text initials; lucide-react v1.14 has no social icons */}
            <div className="mt-6 flex gap-3" aria-label="Social media links">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`${label} (opens in new tab)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-150 text-xs font-bold"
                >
                  {label[0]}
                </a>
              ))}
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
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-400 transition-colors duration-150"
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-400 transition-colors duration-150"
                  >
                    {link.label}
                  </a>
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
