import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec reference §3.3 Services Section Header (canonical usage):
     Text align:  center
     Heading:     text-3xl sm:text-4xl font-bold text-gray-900
     Description: text-lg text-gray-600 max-w-3xl mx-auto
     Spacing:     mb-16 below the header block

   The `eyebrow` prop renders a small coloured label above the heading
   (e.g. "HOW WE WORK"), consistent with the process steps section.

   The `align` prop allows left-aligned usage in split-layout contexts
   (e.g. the partnership CTA card left column).
   ───────────────────────────────────────────────────────────────── */

type Align = "center" | "left";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: Align;
  className?: string;
}

function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-16",
        isCenter ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-bold uppercase tracking-widest text-brand-600",
            isCenter && "mx-auto"
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "text-3xl font-bold text-ink sm:text-4xl",
          isCenter && "mx-auto"
        )}
      >
        {heading}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 text-lg text-ink-muted",
            isCenter && "mx-auto max-w-3xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionHeader };
