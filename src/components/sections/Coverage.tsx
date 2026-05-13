"use client";

import { TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge, Card, Container } from "@/components/ui";
import {
  SectionWrapper,
  SectionHeader,
  IconContainer,
  StatCard,
} from "@/components/shared";

/* ─── Section-local data ─────────────────────────────────────────────
   Coverage stats, state tags, and the enriched expansion timeline are
   specific to this section and not referenced anywhere else, so they
   live here rather than in data/site.ts.
   ─────────────────────────────────────────────────────────────────── */

const STATE_TAGS = [
  "Oyo", "Ogun", "Osun", "Ekiti", "Ondo",
] as const;

const COVERAGE_STATS = [
  { value: "5",    label: "Active States"        },
  { value: "50+",  label: "Tractor Partners"     },
  { value: "20+",  label: "Enterprise Projects"  },
  { value: "48h",  label: "Response Time"        },
] satisfies { value: string; label: string }[];

const TIMELINE = [
  {
    year:  "2026",
    title: "5+ Nigerian States",
    text:  "Scaling proven operations to cover the full South West region and the Federal Capital Territory.",
  },
  {
    year:  "2027",
    title: "Nationwide Coverage",
    text:  "Full mechanization network across all 36 states, aligned with federal agricultural investment programmes.",
  },
  {
    year:  "2028+",
    title: "West African Expansion",
    text:  "Bringing our coordination model to West Africa, starting with Ghana, Côte d'Ivoire, and Benin Republic.",
  },
] satisfies { year: string; title: string; text: string }[];

/* ─── Motion variants ────────────────────────────────────────────── */

const STILL       = { hidden: {}, visible: {} };

const sectionFade = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const gridStagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Coverage section ───────────────────────────────────────────── */

export default function Coverage() {
  const pref = useReducedMotion();
  const f = pref ? STILL : sectionFade;
  const s = pref ? STILL : gridStagger;
  const u = pref ? STILL : fadeUp;

  return (
    <SectionWrapper id="coverage" background="gradient">
      <Container>

        {/* ── Section header ──────────────────────────────────── */}
        <motion.div
          variants={f}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            eyebrow="Coverage"
            heading="Serving Southwestern Nigeria — and Growing"
            description="Farmerch currently operates across five South Western states, coordinating tractor deployments for commercial farms, cooperatives, and government-backed agricultural programmes."
            align="center"
          />
        </motion.div>

        {/* ── Main coverage card ───────────────────────────────── */}
        <motion.div
          variants={f}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/*
            Card "elevated" provides: white bg, rounded-card-lg (1rem = rounded-2xl),
            shadow-overlay, p-8 sm:p-12 — matching §3.5 spec exactly.
          */}
          <Card variant="elevated">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

              {/* ── Left column: coverage explanation + state tags ── */}
              <div>
                <h3 className="mb-4 text-2xl font-bold text-ink">
                  Current Operational Coverage
                </h3>
                <p className="mb-4 text-base leading-relaxed text-ink-muted">
                  We coordinate mechanization deployments across five South Western
                  states — matching vetted tractor teams to commercial farms,
                  smallholder cooperatives, and government agricultural initiatives.
                </p>
                <p className="mb-6 text-base leading-relaxed text-ink-muted">
                  Enterprise partners benefit from a single point of contact for
                  multi-state programmes, with consistent quality standards and
                  unified reporting across all active sites.
                </p>

                {/* State tags — flex-wrap so tags reflow on narrow screens */}
                <div
                  className="flex flex-wrap gap-3"
                  role="list"
                  aria-label="States currently served"
                >
                  {STATE_TAGS.map((state) => (
                    <span key={state} role="listitem">
                      {/*
                        Badge "tag" variant: bg-brand-50, text-brand-700,
                        px-3 py-1, rounded-full, text-sm — matches §3.5 spec.
                      */}
                      <Badge variant="tag">{state} State</Badge>
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Right column: 2×2 operational statistics ──────── */}
              <motion.div
                variants={s}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
                role="list"
                aria-label="Operational statistics"
              >
                {COVERAGE_STATS.map((stat) => (
                  <motion.div key={stat.label} variants={u} role="listitem">
                    {/*
                      StatCard "surface" variant: bg-brand-50, rounded-card,
                      p-6, text-3xl text-brand-600, text-sm text-ink-body.
                    */}
                    <StatCard
                      variant="surface"
                      value={stat.value}
                      label={stat.label}
                    />
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </Card>
        </motion.div>

        {/* ── Expansion plans card ─────────────────────────────── */}
        {/*
          This card uses a 2px green-200 border per §3.5 spec.
          No Card primitive is used here because no existing Card
          variant combines border-2, border-brand-200, and the
          rounded-2xl without shadow — a direct div is cleaner
          than overriding multiple variant properties.
        */}
        <motion.section
          variants={f}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          aria-labelledby="expansion-heading"
          className="mt-8 rounded-2xl border-2 border-brand-200 bg-white p-8 sm:p-12"
        >
          {/* Card header: icon + label + heading */}
          <div className="mb-10 flex items-center gap-4">
            <IconContainer size="md">
              <TrendingUp size={24} className="text-brand-600" aria-hidden="true" />
            </IconContainer>
            <div>
              <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-brand-600">
                Expansion Roadmap
              </p>
              <h3
                id="expansion-heading"
                className="text-2xl font-bold text-ink"
              >
                Growing With Nigeria
              </h3>
            </div>
          </div>

          {/* Timeline: 1-col mobile → 3-col from sm upward */}
          <motion.div
            variants={s}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-3"
            role="list"
            aria-label="Expansion milestones"
          >
            {TIMELINE.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={u}
                role="listitem"
                className={
                  /*
                    On tablet+ (sm:), add a left-border accent between
                    milestone columns for visual flow — matches the
                    connector-line pattern from the process-steps section.
                    The first milestone has no left border.
                  */
                  index === 0
                    ? ""
                    : "sm:border-l-2 sm:border-brand-100 sm:pl-8"
                }
              >
                <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-brand-600">
                  {milestone.year}
                </span>
                <h4 className="mb-2 text-lg font-bold text-ink">
                  {milestone.title}
                </h4>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {milestone.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </motion.section>

      </Container>
    </SectionWrapper>
  );
}
