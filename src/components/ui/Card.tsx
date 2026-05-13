import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec references:
     default  — §3.3 Service cards:   white, border-gray-200, rounded-xl, p-6, hover shadow
     elevated — §3.5 Coverage card / §3.6 Form: white, rounded-2xl, deeper shadow/padding
     feature  — §3.4 Benefit cards:   white, gray border, rounded-xl, p-8 (larger padding)
     stats    — §3.5 Coverage stats:  green-50 bg, rounded-lg, p-6 (self-contained stat box)
   ───────────────────────────────────────────────────────────────── */

const cardVariants = cva(
  // Base
  "bg-surface",
  {
    variants: {
      variant: {
        // Service cards — hover lifts shadow
        default: [
          "border border-border rounded-card p-6",
          "transition-shadow duration-200 hover:shadow-card-hover",
        ],
        // Coverage card, form container — no border, stronger rounding
        elevated: [
          "rounded-card-lg shadow-overlay p-8 sm:p-12",
        ],
        // Benefit cards (How It Works section) — same as default but larger padding
        feature: [
          "border border-border rounded-card p-8",
          "transition-shadow duration-200 hover:shadow-card-hover",
        ],
        // Coverage section stat boxes — self-contained with green-tinted bg
        stats: [
          "bg-brand-50 rounded-card p-6",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Card, cardVariants };
