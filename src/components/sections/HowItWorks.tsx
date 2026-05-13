"use client";

import {
  FileText, Users, Calendar,
  Settings, CheckCircle, TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, Container } from "@/components/ui";
import {
  SectionWrapper,
  SectionHeader,
  IconContainer,
  FeatureList,
} from "@/components/shared";
import { processSteps } from "@/data/site";

/* ─── Icon registry ──────────────────────────────────────────────── */

const ICON_MAP: Record<string, LucideIcon> = {
  FileText, Users, Calendar, Settings, CheckCircle, TrendingUp,
};

/* ─── Benefit cards data ─────────────────────────────────────────────
   Section-specific content; lives here rather than in data/site.ts
   because it is not referenced anywhere else in the application.
   ─────────────────────────────────────────────────────────────────── */

const BENEFITS = [
  {
    id:          "project-owners",
    title:       "For Project Owners",
    description: "Get reliable farm mechanization at commercial scale — with fixed per-hectare pricing, verified operators, and full operational oversight from mobilization to handover.",
    items: [
      "Per-hectare pricing with no hidden costs",
      "Guaranteed on-time deployment windows",
      "Certified, vetted operator teams",
      "Full operational supervision included",
      "Detailed performance reporting",
      "Government contract compliance support",
    ],
  },
  {
    id:          "tractor-operators",
    title:       "For Tractor Operators",
    description: "Join a managed network that handles contracts, scheduling, and payments — so you focus on operating, not sourcing work or chasing invoices.",
    items: [
      "Consistent project pipeline year-round",
      "Prompt, transparent payment cycles",
      "Training and certification support",
      "Centralised scheduling and dispatch",
      "Maintenance coordination assistance",
      "Formal operator certification pathway",
    ],
  },
];

/* ─── Motion variants ────────────────────────────────────────────── */

const STILL       = { hidden: {}, visible: {} };
const gridStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const sectionFade = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── How It Works section ───────────────────────────────────────── */

export default function HowItWorks() {
  const pref = useReducedMotion();
  const s = pref ? STILL : gridStagger;
  const u = pref ? STILL : fadeUp;
  const f = pref ? STILL : sectionFade;

  return (
    <SectionWrapper id="how-it-works" background="muted">
      <Container>

        {/* ── Section header ──────────────────────────────────── */}
        <motion.div
          variants={f}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            eyebrow="How We Work"
            heading="A Proven Six-Step Process"
            description="From first contact to final report, every project follows a structured workflow designed to maximise quality, minimise delays, and keep you informed at every stage."
            align="center"
          />
        </motion.div>

        {/* ── Process steps grid ──────────────────────────────── */}
        <motion.ol
          variants={s}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid list-none gap-8 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Six-step process"
        >
          {processSteps.map((step, index) => {
            const Icon           = ICON_MAP[step.icon] ?? FileText;
            /*
              isLastInRow: true for indices 2 and 5 (positions 3 and 6
              in a 3-column desktop layout). These cards never receive a
              right-side connector because there is no adjacent card.
            */
            const isLastInRow    = (index + 1) % 3 === 0;

            return (
              <motion.li
                key={step.step}
                variants={u}
                /*
                  `relative` is required so the absolutely-positioned
                  connector div is positioned within this list item and
                  can overflow into the CSS Grid gap on the right.
                */
                className="relative"
              >
                {/*
                  hover:border-brand-300 overrides the default
                  border-border token via tailwind-merge.
                  transition-all (from className) supersedes the
                  variant's transition-shadow so that the border
                  colour change also animates smoothly.
                */}
                <Card
                  variant="default"
                  className="flex h-full flex-col transition-all duration-200 hover:border-brand-300"
                >
                  {/* Icon — at the top so `top-12` connector aligns */}
                  <IconContainer size="md" className="mb-4">
                    <Icon size={24} className="text-brand-600" aria-hidden="true" />
                  </IconContainer>

                  {/* Step label + title in one semantic unit */}
                  <div className="mb-3">
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-600">
                      Step {step.step}
                    </p>
                    <h3 className="text-xl font-bold text-ink">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-base text-ink-muted">
                    {step.description}
                  </p>
                </Card>

                {/*
                  Desktop connector — a 1px horizontal line that spans
                  the grid gap to the right, visually linking adjacent
                  steps in the same row.

                  Geometry:
                  • `left-full`  — starts at the li's right edge
                  • `w-8`        — 2 rem = 32 px = gap-8, reaches the
                                   next card's left edge exactly
                  • `top-12`     — 3 rem ≈ card padding-top (1.5rem) +
                                   icon-container centre (1.5rem)
                  • `lg:flex`    — visible only in the 3-column layout;
                                   hidden at mobile and tablet so it
                                   never breaks the 1- or 2-col grids
                  • `pointer-events-none` — purely decorative
                */}
                {!isLastInRow && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-full top-12 hidden w-8 items-center lg:flex"
                  >
                    <div className="h-px w-full bg-gray-200" />
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ol>

        {/* ── Benefits section ────────────────────────────────── */}
        <section aria-labelledby="benefits-heading" className="mt-20">
          <motion.div
            variants={f}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionHeader
              eyebrow="Why Choose Farmerch"
              heading="Built for Both Sides of the Value Chain"
              description="Whether you're commissioning a large-scale harvest or growing your tractor business, Farmerch is structured to deliver value at every level."
              align="center"
            />
          </motion.div>

          <motion.div
            variants={s}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {BENEFITS.map((benefit) => (
              <motion.div key={benefit.id} variants={u}>
                <Card
                  variant="feature"
                  className="flex h-full flex-col"
                  aria-labelledby={`benefit-${benefit.id}`}
                >
                  <h3
                    id={`benefit-${benefit.id}`}
                    className="mb-3 text-xl font-bold text-ink"
                  >
                    {benefit.title}
                  </h3>

                  {/* flex-1 pushes the FeatureList to the bottom so
                      both cards have their lists vertically aligned */}
                  <p className="mb-6 flex-1 text-base text-ink-muted">
                    {benefit.description}
                  </p>

                  <FeatureList
                    items={benefit.items}
                    variant="check"
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </Container>
    </SectionWrapper>
  );
}
