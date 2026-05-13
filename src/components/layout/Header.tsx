"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants, Container } from "@/components/ui";
import { navItems, siteConfig } from "@/data/site";

export default function Header() {
  const [isOpen, setIsOpen]       = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      role="banner"
      className={cn(
        "fixed inset-x-0 top-0 z-navbar transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-white/95 shadow-sm backdrop-blur-sm"
          : "bg-white"
      )}
    >
      <nav aria-label="Main navigation">
        <Container className="flex h-16 items-center justify-between">

          {/* Logo */}
          <a
            href="/"
            aria-label={`${siteConfig.name} — return to homepage`}
            className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
          >
            {/*
              Swap the <span> below for <Image> once the logo file is placed
              at public/logo.png:
                <Image src="/logo.png" alt={siteConfig.name} width={120} height={32} priority />
            */}
            <span className="select-none text-xl font-bold tracking-tight text-brand-600">
              {siteConfig.shortName.toUpperCase()}
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 md:flex" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-ink-body transition-colors duration-150 hover:text-brand-600"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA — anchor styled as primary button */}
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "hidden md:inline-flex"
            )}
          >
            Request Quote
          </a>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="rounded-md p-2 text-ink-body transition-colors duration-150 hover:bg-surface-muted hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 md:hidden"
          >
            {isOpen
              ? <X    size={22} aria-hidden="true" />
              : <Menu size={22} aria-hidden="true" />
            }
          </button>

        </Container>
      </nav>

      {/* Mobile drawer — animated via max-height.
          `inert` prevents keyboard focus reaching hidden links when closed. */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "overflow-hidden bg-white transition-all duration-300 ease-in-out md:hidden",
          isOpen ? "max-h-96 border-t border-border" : "max-h-0"
        )}
      >
        <div className="px-4 pb-6 pt-3 shadow-lg">
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-ink-body transition-colors duration-150 hover:bg-surface-muted hover:text-brand-600"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={closeMenu}
            className={cn(
              buttonVariants({ variant: "primary", size: "md", fullWidth: true }),
              "mt-4"
            )}
          >
            Request Quote
          </a>
        </div>
      </div>
    </header>
  );
}
