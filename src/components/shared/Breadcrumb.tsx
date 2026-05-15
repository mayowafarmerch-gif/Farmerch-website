import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui";

export interface BreadcrumbItem {
  label: string;
  href?: string; // omit on the current (last) item — renders as non-interactive span
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/*
  Semantic breadcrumb nav per WCAG 2.1 SC 2.4.8.
  - <nav aria-label="Breadcrumb"> identifies the landmark
  - <ol> communicates ordered structure to screen readers
  - aria-current="page" on the last item
  - Separators are aria-hidden so they are not read aloud
  - Last item is a <span> (not a link) — current page is not navigable
*/
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("border-b border-border bg-surface", className)}
    >
      <Container>
        <ol
          role="list"
          className="flex flex-wrap items-center gap-y-1 py-3 text-sm"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5">
                {/* Separator — hidden from assistive technology */}
                {index > 0 && (
                  <ChevronRight
                    size={13}
                    className="shrink-0 text-ink-faint"
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  /* Current page: visually prominent but not a link */
                  <span
                    aria-current="page"
                    className="max-w-[12rem] truncate font-medium text-ink sm:max-w-sm md:max-w-none"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href ?? "/"}
                    className={cn(
                      "text-ink-muted transition-colors duration-150",
                      "hover:text-brand-600",
                      "rounded-sm focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-brand-600 focus-visible:ring-offset-1"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
