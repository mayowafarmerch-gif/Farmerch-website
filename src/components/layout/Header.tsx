"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants, Container } from "@/components/ui";
import { Logo } from "@/components/shared";
import { navItems, siteConfig } from "@/data/site";
import { useActiveNav } from "@/hooks/useActiveNav";

export default function Header() {
  const [isOpen, setIsOpen]         = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeHref                  = useActiveNav();

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
        "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-white/95 shadow-sm backdrop-blur-sm"
          : "bg-white"
      )}
    >
      <nav aria-label="Main navigation">
        <Container className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — return to homepage`}
            className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
          >
            <Logo priority />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 md:flex" role="list">
            {navItems.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "font-semibold text-brand-600 underline decoration-brand-600 decoration-2 underline-offset-4"
                        : "text-ink-body hover:text-brand-600"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "hidden md:inline-flex"
            )}
          >
            Request Quote
          </Link>

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

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-x-0 top-16 z-[110] border-t border-border bg-white shadow-lg",
          isOpen ? "md:hidden" : "hidden"
        )}
      >
        <div className="px-4 pb-6 pt-3">
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-base font-medium transition-colors duration-150",
                      isActive
                        ? "bg-surface-subtle font-semibold text-brand-600"
                        : "text-ink-body hover:bg-surface-muted hover:text-brand-600"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile CTA */}
          <Link
            href="/#contact"
            onClick={closeMenu}
            className={cn(
              buttonVariants({ variant: "primary", size: "md", fullWidth: true }),
              "mt-4"
            )}
          >
            Request Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
