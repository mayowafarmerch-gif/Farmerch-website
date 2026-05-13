import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec references:
     §3.1  Nav CTA:      Green 600, white text, px-6 py-2 rounded-lg
     §3.2  Hero primary: px-8 py-4, Green 600, ArrowRight icon
     §3.2  Hero secondary: border-2 Green 600, Green 600 text
     §3.6  Submit:       full-width, px-8 py-4, Green 600
   ───────────────────────────────────────────────────────────────── */

const buttonVariants = cva(
  // Base — shared across all variants and sizes
  [
    "inline-flex items-center justify-center gap-2 font-medium",
    "transition-colors duration-150 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "rounded-button",
  ],
  {
    variants: {
      variant: {
        // §Color Usage: Green 600 background, white text; hover Green 700
        primary: [
          "bg-brand-600 text-white",
          "hover:bg-brand-700",
        ],
        // §Color Usage: Green 600 border, Green 600 text, transparent bg
        secondary: [
          "border-2 border-brand-600 text-brand-600 bg-transparent",
          "hover:bg-brand-50",
        ],
        // Minimal — for subtle actions, no strong visual weight
        ghost: [
          "text-ink-muted bg-transparent",
          "hover:text-ink hover:bg-surface-muted",
        ],
      },
      size: {
        // §3.1 Nav CTA: px-6 py-2
        sm:  "px-6 py-2 text-sm",
        // Default interactive size
        md:  "px-6 py-3 text-sm",
        // §3.2 Hero / §3.6 Form submit: px-8 py-4
        lg:  "px-8 py-4 text-base",
      },
      fullWidth: {
        true:  "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant:   "primary",
      size:      "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
