import { forwardRef, type SelectHTMLAttributes, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Spec reference §3.6 Form Fields:
     Dropdowns: Organization Type, Service Type, Timeline
     Same visual styling as Input — but <select> requires
     appearance-none + a custom chevron icon overlay.
   ───────────────────────────────────────────────────────────────── */

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      id: externalId,
      options,
      placeholder = "Select an option",
      ...props
    },
    ref
  ) => {
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

        {/* Wrapper provides relative positioning for the chevron overlay */}
        <div className="relative">
          <select
            id={id}
            ref={ref}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              "w-full appearance-none bg-surface text-ink-body text-sm",
              "border border-border-input rounded-button",
              "px-4 py-3 pr-10",
              "transition-colors duration-150 cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-muted",
              // Unselected placeholder styling
              props.value === "" || props.value === undefined
                ? "text-ink-faint"
                : "text-ink-body",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Custom chevron — non-interactive, pointer-events-none */}
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint"
            aria-hidden="true"
          />
        </div>

        {error && (
          <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
