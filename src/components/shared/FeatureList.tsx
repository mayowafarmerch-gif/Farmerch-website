import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec references:
     check variant — §3.2 Hero feature list, §3.4 Benefit cards:
       CheckCircle icon, Green 600, w-5 h-5
       Text: gray-700

     dot variant   — §3.3 Service card feature list:
       w-1.5 h-1.5 bg-green-600 rounded-full bullet
       Text: text-sm gray-700

   `columns` prop drives the 2-column layout used in the hero.
   ───────────────────────────────────────────────────────────────── */

type FeatureVariant = "check" | "dot";

interface FeatureListProps {
  items: string[];
  variant?: FeatureVariant;
  columns?: 1 | 2;
  className?: string;
}

function FeatureList({
  items,
  variant = "check",
  columns = 1,
  className,
}: FeatureListProps) {
  return (
    <ul
      role="list"
      className={cn(
        "grid gap-3",
        columns === 2 ? "grid-cols-2" : "grid-cols-1",
        className
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          {variant === "check" ? (
            <CheckCircle
              size={20}
              className="mt-0.5 shrink-0 text-brand-600"
              aria-hidden="true"
            />
          ) : (
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
              aria-hidden="true"
            />
          )}
          <span
            className={cn(
              "text-ink-body",
              variant === "dot" ? "text-sm" : "text-base"
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export { FeatureList };
