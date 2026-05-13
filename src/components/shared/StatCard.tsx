import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec references — three distinct uses of the value+label pattern:

     default  §3.2 Hero overlay card:
       White bg, shadow-xl, p-6 (card rendered by parent)
       Number: text-3xl font-bold text-green-600
       Label:  text-sm text-gray-600
       StatCard itself is transparent — positioning done by parent.

     surface  §3.5 Coverage statistics:
       Self-contained: bg-green-50, rounded-lg, p-6
       Number: text-3xl font-bold text-green-600
       Label:  text-sm text-gray-700

     inverse  §3.3 Partnership CTA banner:
       On green gradient background — no container styling
       Number: text-4xl font-bold text-white
       Label:  text-green-100 text-sm
   ───────────────────────────────────────────────────────────────── */

const statCardVariants = cva("flex flex-col gap-1", {
  variants: {
    variant: {
      // Used inside a Card component (parent provides bg/shadow/padding)
      default: "",
      // Self-contained with green-50 bg — §3.5 Coverage stats
      surface: "bg-brand-50 rounded-card p-6",
      // On dark/green background — §3.3 Partnership banner
      inverse: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const valueVariants = cva("font-bold leading-none", {
  variants: {
    variant: {
      default: "text-3xl text-brand-600",
      surface: "text-3xl text-brand-600",
      inverse: "text-4xl text-white",
    },
  },
  defaultVariants: { variant: "default" },
});

const labelVariants = cva("", {
  variants: {
    variant: {
      default: "text-sm text-ink-muted",
      surface: "text-sm text-ink-body",
      inverse: "text-sm text-brand-100",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  value: string;
  label: string;
  className?: string;
}

function StatCard({ value, label, variant, className }: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ variant }), className)}>
      <span className={valueVariants({ variant })}>{value}</span>
      <span className={labelVariants({ variant })}>{label}</span>
    </div>
  );
}

export { StatCard };
