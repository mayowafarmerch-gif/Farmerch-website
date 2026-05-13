import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec reference §3.3 Service Cards — Icon Container:
     Background: Green 100 (--color-brand-100)
     Size:       w-12 h-12 (default)
     Radius:     rounded-lg (--radius-button)
     Icon color: Green 600 — applied on the icon child via Tailwind
                 (the icon itself is passed as a child)

   Size variants allow reuse across the site:
     sm  — w-10 h-10, smaller icons (inline usage)
     md  — w-12 h-12 (spec default — service cards)
     lg  — w-16 h-16, larger hero/feature icons
   ───────────────────────────────────────────────────────────────── */

const iconContainerVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-button bg-brand-100",
  {
    variants: {
      size: {
        sm: "h-10 w-10",
        md: "h-12 w-12",
        lg: "h-16 w-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface IconContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconContainerVariants> {}

function IconContainer({ size, className, children, ...props }: IconContainerProps) {
  return (
    <div
      className={cn(iconContainerVariants({ size }), className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </div>
  );
}

export { IconContainer };
