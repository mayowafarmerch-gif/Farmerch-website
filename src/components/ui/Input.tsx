import { forwardRef, type InputHTMLAttributes, useId } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec reference §3.6 Form Fields:
     Background: white
     Border: gray-300 (--color-border-input)
     Padding: px-4 py-3
     Border radius: rounded-lg (--radius-button: 0.5rem)
     Focus: ring green-500, border transparent
   ───────────────────────────────────────────────────────────────── */

const fieldBase = [
  "w-full bg-surface text-ink-body text-sm",
  "border border-border-input rounded-button",
  "px-4 py-3 placeholder:text-ink-faint",
  "transition-colors duration-150",
  "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-muted",
].join(" ");

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id: externalId, type = "text", ...props }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-ink-body"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            fieldBase,
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
