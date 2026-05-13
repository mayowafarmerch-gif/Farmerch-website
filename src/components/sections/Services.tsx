"use client";

import {
  Tractor, Sprout, Wheat,
  Network, ShieldCheck, Globe,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants, Card, Container } from "@/components/ui";
import {
  SectionWrapper,
  SectionHeader,
  IconContainer,
  FeatureList,
  StatCard,
  CTAGroup,
} from "@/components/shared";
import { services, statsPartner } from "@/data/site";

/* ─── Icon registry ──────────────────────────────────────────────────
   Maps the icon string stored in data/site.ts to the lucide-react
   component. Adding a new service only requires registering its icon
   here — no changes to the render path below.
   ─────────────────────────────────────────────────────────────────── */

const ICON_MAP: Record<string, LucideIcon> = {
  Tractor,
  Sprout,
  Wheat,
  Network,
  ShieldCheck,
  Globe,
};

/* ─── Motion variants ────────────────────────────────────────────────
   Services is below the fold — whileInView triggers are used instead
   of mount animations. staggerChildren on the grid parent staggers
   each card without requiring per-card delay management.
   ─────────────────────────────────────────────────────────────────── */

const STILL = { hidden: {}, visible: {} };

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridStagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const sectionFade = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ─── Services Section ───────────────────────────────────────────── */

export default function Services() {
  const pref = useReducedMotion();

  const s = pref ? STILL : gridStagger;
  const u = pref ? STILL : fadeUp;
  const f = pref ? STILL : sectionFade;

  return (
    <SectionWrapper id="services" background="white">
      <Container>

        {/* ── Section header ───────────────────────────────────── */}
        <motion.div
          variants={f}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            eyebrow="Our Services"
            heading="Complete Farm Mechanization Solutions"
            description="From land preparation through to post-harvest operations, we coordinate the full mechanization cycle — deploying quality-assured tractor teams wherever your project needs them."
            align="center"
          />
        </motion.div>

        {/* ── Services grid ────────────────────────────────────── */}
        <motion.ul
          variants={s}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          role="list"
          className="grid list-none grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Services offered by Farmerch"
        >
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Tractor;

            return (
              <motion.li key={service.id} variants={u}>
                {/*
                  Card uses `h-full flex flex-col` so that in each grid
                  row the description grows to fill available height and
                  every feature list bottom-aligns — regardless of
                  copy length differences between cards.
                */}
                <Card
                  variant="default"
                  className="flex h-full flex-col"
                  aria-labelledby={`svc-${service.id}`}
                >
                  {/* Icon badge */}
                  <IconContainer size="md" className="mb-5">
                    <Icon size={24} className="text-brand-600" aria-hidden="true" />
                  </IconContainer>

                  {/* Title */}
                  <h3
                    id={`svc-${service.id}`}
                    className="mb-2 text-xl font-bold text-ink"
                  >
                    {service.title}
                  </h3>

                  {/* Description — flex-1 keeps feature list bottom-aligned */}
                  <p className="mb-5 flex-1 text-base text-ink-muted">
                    {service.description}
                  </p>

                  {/* Feature bullet list */}
                  <FeatureList
                    items={service.features}
                    variant="dot"
                  />
                </Card>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* ── Partnership CTA block ─────────────────────────────── */}
        <motion.div
          variants={f}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700"
        >
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">

            {/* Left column: enterprise messaging + CTA */}
            <div>
              {/*
                SectionHeader is not used here — it targets light
                backgrounds with `text-ink` / `text-ink-muted`.
                The CTA block is a dark-green surface that needs
                white text, so headings are rendered directly.
              */}
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-200">
                Enterprise Partnerships
              </p>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Built for Commercial-Scale Agriculture
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-brand-100">
                We partner with commercial farms, government agencies, financial institutions, and cooperatives
                to deliver coordinated, quality-controlled mechanization at any scale —
                backed by a trusted network of certified operators.
              </p>

              <CTAGroup align="left">
                {/* White button on the green surface — overrides
                    buttonVariants primary colours via tailwind-merge */}
                <a
                  href="#contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white text-brand-700 hover:bg-brand-50"
                  )}
                >
                  Request a Quote
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </CTAGroup>
            </div>

            {/* Right column: 2×2 stats grid */}
            <div
              className="grid grid-cols-2 gap-6"
              aria-label="Partnership statistics"
            >
              {statsPartner.map((stat) => (
                <StatCard
                  key={stat.label}
                  variant="inverse"
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>

          </div>
        </motion.div>

      </Container>
    </SectionWrapper>
  );
}
