import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec reference §3.2 Hero CTA Buttons + §5 Responsive Design:
     "Layout: Flex row on desktop, column on mobile"
     "Button groups: Stack vertically on mobile"

   CTAGroup is a pure layout wrapper. It owns zero visual styling —
   the Button children own their own appearance. This keeps
   responsibilities cleanly separated.

   `align`:
     center — hero / modal usage (buttons centred on mobile)
     left   — card / form usage (buttons left-aligned)
   ───────────────────────────────────────────────────────────────── */

type Align = "left" | "center";

interface CTAGroupProps extends HTMLAttributes<HTMLDivElement> {
  align?: Align;
}

function CTAGroup({ align = "left", className, children, ...props }: CTAGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center",
        align === "center" && "items-center",
        align === "left"   && "items-start",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { CTAGroup };
