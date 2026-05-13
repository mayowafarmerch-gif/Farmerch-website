"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button, Container, Input, Select, Textarea } from "@/components/ui";
import type { SelectOption } from "@/components/ui";
import { SectionWrapper, SectionHeader, IconContainer } from "@/components/shared";

/* ─── Validation schema ──────────────────────────────────────────────
   Zod v4: string error messages passed as the second argument
   (string shorthand, compatible with v4 and v3).
   ─────────────────────────────────────────────────────────────────── */

const schema = z.object({
  organizationType:  z.string().min(1, "Please select an organization type"),
  organizationName:  z.string().min(2, "Organization name is required"),
  contactName:       z.string().min(2, "Contact name is required"),
  email:             z.string().email("Enter a valid email address"),
  /*
    Nigerian mobile: 0[789]\d{9} (local, 11 digits)
    or +234[789]\d{9} (international, 14 chars)
  */
  phone:             z.string().regex(
    /^(\+234|0)[789]\d{9}$/,
    "Enter a valid Nigerian phone number (+234… or 0…)"
  ),
  serviceRequired:   z.string().min(1, "Please select a service type"),
  farmSize:          z.string().min(1, "Farm size is required"),
  location:          z.string().min(2, "Location is required"),
  preferredTimeline: z.string().min(1, "Please select a preferred timeline"),
  additionalInfo:    z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

/* ─── Select options ─────────────────────────────────────────────── */

const ORG_TYPES: SelectOption[] = [
  { value: "commercial-farm",       label: "Commercial Farm"        },
  { value: "government",            label: "Government"             },
  { value: "cooperative",           label: "Cooperative"            },
  { value: "financial-institution", label: "Financial Institution"  },
  { value: "other",                 label: "Other"                  },
];

const SERVICE_TYPES: SelectOption[] = [
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

const DEFAULT_VALUES: FormValues = {
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
  const pref           = useReducedMotion();
  const f              = pref ? STILL : sectionFade;
  const [isSuccess, setIsSuccess] = useState(false);

  /*
    Store the reset timer in a ref so it can be cancelled on unmount,
    preventing a state update on an unmounted component.
  */
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver:      zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = async (data: FormValues) => {
    /*
      No backend yet — simulated 1.5 s async delay.
      Replace the body of this function with a real fetch/mutation
      when the API is ready. The data object is typed and validated;
      pass it directly to your endpoint.
      See docs/PROJECT_STRUCTURE.md § Future backend integration.
    */
    void data;
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    reset(DEFAULT_VALUES);
    setIsSuccess(true);

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setIsSuccess(false), 3000);
  };

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
              {/* Green-100 circle containing the CheckCircle icon */}
              <IconContainer size="lg" className="mb-6">
                <CheckCircle size={32} className="text-brand-600" aria-hidden="true" />
              </IconContainer>

              <h3 className="mb-3 text-2xl font-bold text-ink">
                Request Submitted
              </h3>
              <p className="max-w-sm text-base text-ink-muted">
                Thank you! We've received your project details and will be
                in touch within 48 hours to discuss next steps.
              </p>
            </div>

          ) : (

            /* ── Form ──────────────────────────────────────────── */
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Request a mechanization quote"
            >
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
                  label="Organization Name"
                  placeholder="e.g. Oyo State Agric Investment Corp"
                  error={errors.organizationName?.message}
                />

                {/* 3. Contact Name */}
                <Input
                  {...register("contactName")}
                  label="Contact Name"
                  placeholder="Your full name"
                  autoComplete="name"
                  error={errors.contactName?.message}
                />

                {/* 4. Email */}
                <Input
                  {...register("email")}
                  type="email"
                  label="Email Address"
                  placeholder="you@organization.com"
                  autoComplete="email"
                  error={errors.email?.message}
                />

                {/* 5. Phone */}
                <Input
                  {...register("phone")}
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
                  label="Farm Size"
                  placeholder="e.g. 200 hectares"
                  error={errors.farmSize?.message}
                />

                {/* 8. Location */}
                <Input
                  {...register("location")}
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
                        label="Preferred Timeline"
                        options={TIMELINES}
                        placeholder="When do you need this service?"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>

                {/* 10. Additional Details — full-width */}
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
