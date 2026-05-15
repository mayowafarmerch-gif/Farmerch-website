"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  Section IDs that correspond to nav items.
  Order matters: the first ID found in the visible Set wins
  when multiple sections are simultaneously intersecting.
*/
const OBSERVED_SECTIONS = [
  "services",
  "how-it-works",
  "coverage",
  "contact",
] as const;

/*
  rootMargin: "-80px 0px -40% 0px"

  -80px top  : clears the fixed 64px header + 16px buffer so a section
               does not activate the moment its top peeks under the navbar.
  -40% bottom: only the upper 60% of the viewport counts as the active
               zone, preventing a distant section from pre-firing while
               the user is still reading the one above it.
*/
const ROOT_MARGIN = "-80px 0px -40% 0px";

export function useActiveNav(): string | null {
  const pathname = usePathname();

  /* activeSection tracks which homepage section is in view.
     It is only used when pathname === "/"; for all other routes
     the value is ignored so there is no need to reset it. */
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    /* Only run scroll spy on the homepage. */
    if (pathname !== "/") return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.add(entry.target.id);
        } else {
          visible.delete(entry.target.id);
        }
      }

      /* Walk the canonical section order and pick the topmost visible. */
      for (const id of OBSERVED_SECTIONS) {
        if (visible.has(id)) {
          setActiveSection(`/#${id}`);
          return;
        }
      }
      setActiveSection(null);
    }, { rootMargin: ROOT_MARGIN, threshold: 0 });

    for (const id of OBSERVED_SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  /* Route-level match: any /blog URL highlights the Blog nav item. */
  if (pathname === "/blog" || pathname.startsWith("/blog/")) return "/blog";

  /* Scroll-spy result — only surfaced on the homepage.
     On other pages the stale value is intentionally ignored. */
  if (pathname === "/") return activeSection;

  return null;
}
