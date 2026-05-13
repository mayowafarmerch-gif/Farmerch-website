"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants, Container } from "@/components/ui";
import { navItems, siteConfig } from "@/data/site";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
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
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200"
          : "bg-white"
      )}
    >
      <nav aria-label="Main navigation">
        <Container className="flex h-16 items-center justify-between">

          {/* Logo */}
          <a
            href="/"
            aria-label={`${siteConfig.name} — return to homepage`}
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1 rounded-sm"
          >
            {/*
              Swap the <span> below for <Image> once the logo file is placed
              at public/logo.png:
                <Image src="/logo.png" alt={siteConfig.name} width={120} height={32} priority />
            */}
            <span className="text-xl font-bold text-brand-600 tracking-tight select-none">
              {siteConfig.shortName.toUpperCase()}
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors duration-150"
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
            className="md:hidden rounded-md p-2 text-gray-700 hover:text-brand-600 hover:bg-gray-50 transition-colors duration-150"
          >
            {isOpen
              ? <X size={22} aria-hidden="true" />
              : <Menu size={22} aria-hidden="true" />
            }
          </button>

        </Container>
      </nav>

      {/* Mobile drawer — animated via max-height */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        className={cn(
          "md:hidden overflow-hidden bg-white transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 border-t border-gray-200" : "max-h-0"
        )}
      >
        <div className="px-4 pb-6 pt-3 shadow-lg">
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 transition-colors duration-150"
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
