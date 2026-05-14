"use client";

import { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button, Container, Input, Select, Textarea } from "@/components/ui";
import type { SelectOption } from "@/components/ui";
import { SectionWrapper, SectionHeader, IconContainer } from "@/components/shared";
import { quoteSchema, type QuoteFormValues } from "@/lib/quote-schema";

/* ─── Select options ─────────────────────────────────────────────── */

const ORG_TYPES: SelectOption[] = [
  { value: "commercial-farm",       label: "Commercial Farm"        },
  { value: "government",            label: "Government"             },
  { value: "cooperative",           label: "Cooperative"            },
  { value: "financial-institution", label: "Financial Institution"  },
  { value: "other",                 label: "Other"                  },
];

const SERVICE_TYPES: SelectOption[] = [
  { value: "land-clearing",       label: "Land Clearing"             },
  { value: "land-preparation",    label: "Land Preparation"          },
  { value: "planting-operations", label: "Planting Operations"       },
  { value: "harvesting-services", label: "Harvesting Services"       },
  { value: "full-cycle",          label: "Full-Cycle Operations"     },
  { value: "custom-enterprise",   label: "Custom Enterprise Project" },
];

const TIMELINES: SelectOption[] = [
  { value: "immediate",  label: "Immediate"  },
  { value: "1-2-weeks",  label: "1–2 Weeks"  },
  { value: "2-4-weeks",  label: "2–4 Weeks"  },
  { value: "1-2-months", label: "1–2 Months" },
  { value: "flexible",   label: "Flexible"   },
];

/* ─── Default values ─────────────────────────────────────────────── */

const DEFAULT_VALUES: QuoteFormValues = {
  organizationType:  "",
  organizationName:  "",
  contactName:       "",
  email:             "",
  phone:             "",
  serviceRequired:   "",
  farmSize:          "",
  location:          "",
  preferredTimeline: "",
  additionalInfo:    "",
};

/* ─── Motion variants ────────────────────────────────────────────── */

const STILL       = { hidden: {}, visible: {} };
const sectionFade = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ─── QuoteForm section ──────────────────────────────────────────── */

export default function QuoteForm() {
  const pref                          = useReducedMotion();
  const f                             = pref ? STILL : sectionFade;
  const [isSuccess, setIsSuccess]     = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver:      zodResolver(quoteSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = useCallback(async (data: QuoteFormValues) => {
    setErrorMessage(null);

    const res = await fetch("/api/quote", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: string };
      setErrorMessage(
        body.error ?? "Something went wrong. Please try again or email us at farmerchltd@gmail.com."
      );
      return;
    }

    reset(DEFAULT_VALUES);
    setIsSuccess(true);
  }, [reset]);

  return (
    <SectionWrapper id="contact" background="white">
      {/*
        `narrow` applies max-w-4xl — matching §3.6 "max-w-4xl" spec.
        The form is intentionally narrower than the page max-w-7xl to
        reduce line length and keep field pairs legible on large screens.
      */}
      <Container narrow>

        {/* ── Section header ──────────────────────────────────── */}
        <motion.div
          variants={f}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            eyebrow="Get Started"
            heading="Request a Mechanization Quote"
            description="Fill in your project details and our team will prepare a tailored proposal within 48 hours."
            align="center"
          />
        </motion.div>

        {/* ── Form container ───────────────────────────────────── */}
        <motion.div
          variants={f}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-border bg-surface-muted p-8 sm:p-12"
        >
          {isSuccess ? (

            /* ── Success state ─────────────────────────────────── */
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col items-center rounded-xl border-2 border-brand-200 bg-brand-50 py-12 text-center"
            >
              <IconContainer size="lg" className="mb-6">
                <CheckCircle size={32} className="text-brand-600" aria-hidden="true" />
              </IconContainer>

              <h3 className="mb-3 text-2xl font-bold text-ink">
                Request Submitted
              </h3>
              <p className="max-w-sm text-base text-ink-muted">
                {"Thank you! We've received your project details and will be in touch within 48 hours to discuss next steps."}
              </p>
            </div>

          ) : (

            /* ── Form ──────────────────────────────────────────── */
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Request a mechanization quote"
            >
              {/* Required field note */}
              <p className="mb-6 text-xs text-ink-muted">
                Fields marked <span className="text-red-500" aria-hidden="true">*</span> are required.
              </p>

              {/* ── Submission error banner ─────────────────────── */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/*
                Responsive 2-column grid:
                  • mobile  (<md): all fields in 1 column, stacked
                  • tablet+ (≥md): 2-column pairs, with select exceptions
                    for Timeline, Message, and Submit spanning both columns
                    via md:col-span-2 on their wrapper divs.
              */}
              <div className="grid gap-6 md:grid-cols-2">

                {/* 1. Organization Type — Controller because Select reads
                    field.value to apply placeholder-colour logic correctly.
                    register() does not pass value to props. */}
                <Controller
                  name="organizationType"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Select
                      {...field}
                      required
                      label="Organization Type"
                      options={ORG_TYPES}
                      placeholder="Select organization type"
                      error={fieldState.error?.message}
                    />
                  )}
                />

                {/* 2. Organization Name */}
                <Input
                  {...register("organizationName")}
                  required
                  label="Organization Name"
                  placeholder="e.g. Oyo State Agric Investment Corp"
                  error={errors.organizationName?.message}
                />

                {/* 3. Contact Name */}
                <Input
                  {...register("contactName")}
                  required
                  label="Contact Name"
                  placeholder="Your full name"
                  autoComplete="name"
                  error={errors.contactName?.message}
                />

                {/* 4. Email */}
                <Input
                  {...register("email")}
                  required
                  type="email"
                  label="Email Address"
                  placeholder="you@organization.com"
                  autoComplete="email"
                  error={errors.email?.message}
                />

                {/* 5. Phone */}
                <Input
                  {...register("phone")}
                  required
                  type="tel"
                  label="Phone Number"
                  placeholder="+234 803 123 4567"
                  autoComplete="tel"
                  error={errors.phone?.message}
                />

                {/* 6. Service Required — Controller for same reason as #1 */}
                <Controller
                  name="serviceRequired"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Select
                      {...field}
                      required
                      label="Service Required"
                      options={SERVICE_TYPES}
                      placeholder="Select a service"
                      error={fieldState.error?.message}
                    />
                  )}
                />

                {/* 7. Farm Size */}
                <Input
                  {...register("farmSize")}
                  required
                  label="Farm Size"
                  placeholder="e.g. 200 hectares"
                  error={errors.farmSize?.message}
                />

                {/* 8. Location */}
                <Input
                  {...register("location")}
                  required
                  label="Location"
                  placeholder="City, State"
                  error={errors.location?.message}
                />

                {/* 9. Preferred Timeline — full-width (col-span-2) */}
                <div className="md:col-span-2">
                  <Controller
                    name="preferredTimeline"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Select
                        {...field}
                        required
                        label="Preferred Timeline"
                        options={TIMELINES}
                        placeholder="When do you need this service?"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>

                {/* 10. Additional Details — full-width, optional */}
                <div className="md:col-span-2">
                  <Textarea
                    {...register("additionalInfo")}
                    label="Additional Details"
                    placeholder="Describe your project — crop type, specific requirements, site challenges, or anything else that helps us prepare an accurate proposal."
                    rows={4}
                    error={errors.additionalInfo?.message}
                  />
                </div>

                {/* Submit button — full-width */}
                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                        Submitting Request…
                      </>
                    ) : (
                      <>
                        <Send size={18} aria-hidden="true" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </div>

              </div>
            </form>
          )}
        </motion.div>

      </Container>
    </SectionWrapper>
  );
}
