import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?:  "default" | "inverted";
  priority?: boolean;
  className?: string;
}

export function Logo({ variant = "default", priority = false, className }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Farmerch Global Limited logo"
      width={140}
      height={40}
      priority={priority}
      className={cn(
        "h-8 w-auto",
        variant === "inverted" && "brightness-0 invert",
        className
      )}
    />
  );
}
