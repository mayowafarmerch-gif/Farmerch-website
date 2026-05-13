import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec reference §2 Layout Structure:
     Max Width:  max-w-7xl (1280px)
     Padding:    px-4 (mobile) / px-6 (tablet) / px-8 (desktop)
     Centering:  mx-auto

     narrow variant — §3.6 Quote Form:
       max-w-4xl (used to constrain the form section)
   ───────────────────────────────────────────────────────────────── */

type ContainerElement = "div" | "section" | "article" | "main" | "header" | "footer";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ContainerElement;
  narrow?: boolean;
}

function Container({
  as,
  narrow = false,
  className,
  children,
  ...props
}: ContainerProps) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-4xl" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { Container };
