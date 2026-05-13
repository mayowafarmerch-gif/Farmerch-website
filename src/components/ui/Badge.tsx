import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec references:
     default — §3.2 Hero badge:
       Green 100 bg, Green 800 text, px-4 py-2, rounded-full, text-sm
     tag     — §3.5 Coverage state tags:
       Green 50 bg, Green 700 text, px-3 py-1, rounded-full, text-sm
   ───────────────────────────────────────────────────────────────── */

const badgeVariants = cva(
  "inline-flex items-center rounded-badge font-medium text-sm",
  {
    variants: {
      variant: {
        // Hero section badge — more prominent
        default: "bg-brand-100 text-brand-800 px-4 py-2",
        // Coverage/state tags — compact
        tag:     "bg-brand-50  text-brand-700 px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
