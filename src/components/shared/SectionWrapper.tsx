import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec reference §2 Spacing System + per-section backgrounds:
     Services:      white bg,       py-20
     How It Works:  gray-50 bg,     py-20
     Coverage:      gradient bg,    py-20
     Quote Form:    white bg,       py-20
     Hero:          gradient bg,    pt-24 pb-16 (handled by Hero itself)

   SectionWrapper enforces:
     1. Vertical rhythm — every section gets consistent py-20
     2. Background selection via the `background` prop
     3. Anchor id for smooth-scroll nav links
   ───────────────────────────────────────────────────────────────── */

type Background =
  | "white"      // §3.3 Services, §3.6 Quote Form
  | "muted"      // §3.4 How It Works (gray-50)
  | "subtle"     // brand-50 tint
  | "gradient"   // §3.2 Hero, §3.5 Coverage — green-50 → blue-50
  | "dark";      // §3.7 Footer (not usually used here, but available)

type Spacing =
  | "default"    // py-20 — standard sections
  | "compact";   // py-16 — component-level spacing

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  background?: Background;
  spacing?: Spacing;
  as?: "section" | "div";
}

const backgroundMap: Record<Background, string> = {
  white:    "bg-surface",
  muted:    "bg-surface-muted",
  subtle:   "bg-surface-subtle",
  gradient: "bg-gradient-to-br from-brand-50 to-blue-50",
  dark:     "bg-gray-900",
};

const spacingMap: Record<Spacing, string> = {
  default: "py-20",
  compact: "py-16",
};

function SectionWrapper({
  id,
  background = "white",
  spacing = "default",
  as = "section",
  className,
  children,
  ...props
}: SectionWrapperProps) {
  const Tag = as;

  return (
    <Tag
      id={id}
      className={cn(
        backgroundMap[background],
        spacingMap[spacing],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { SectionWrapper };
