"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge, buttonVariants, Container } from "@/components/ui";
import { CTAGroup, FeatureList, StatCard } from "@/components/shared";
import { hero } from "@/data/site";

/* ─── Motion variants ────────────────────────────────────────────────
   Rules:
   • Left column uses a stagger container so children animate in sequence
   • Right column (image) fades in with a slight delay after text begins
   • All variants are swapped for no-ops when prefers-reduced-motion is on
   ─────────────────────────────────────────────────────────────────── */

const STILL = { hidden: {}, visible: {} };

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden:   { opacity: 0, y: 20 },
  visible:  {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
  },
};

/* ─── Hero ───────────────────────────────────────────────────────── */

export default function Hero() {
  const pref = useReducedMotion();

  /* When reduced-motion is preferred every variant collapses to STILL,
     which holds the element at its default (visible) state throughout. */
  const s = pref ? STILL : stagger;
  const u = pref ? STILL : fadeUp;
  const f = pref ? STILL : fadeIn;

  return (
    <section
      aria-label="Hero"
      className="relative bg-gradient-to-br from-brand-50 to-blue-50 pt-24 pb-16"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left column: text content ──────────────────────── */}
          <motion.div
            variants={s}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={u}>
              <Badge>{hero.badge}</Badge>
            </motion.div>

            {/* Heading — 4xl mobile → 5xl tablet → 6xl desktop */}
            <motion.h1
              variants={u}
              className="text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              {hero.heading}
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p
              variants={u}
              className="max-w-xl text-lg leading-relaxed text-ink-muted"
            >
              {hero.description}
            </motion.p>

            {/* CTA group — stacks on mobile, rows on ≥sm */}
            <motion.div variants={u}>
              <CTAGroup align="left">
                {/* Primary CTA — styled via buttonVariants on an <a> to avoid
                    nesting <button> inside <a>, which is invalid HTML. */}
                <Link
                  href="/#contact"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Request a Quote
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  href="/#how-it-works"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
                >
                  How It Works
                </Link>
              </CTAGroup>
            </motion.div>

            {/* Feature highlights — 2-column check list */}
            <motion.div variants={u}>
              <FeatureList
                items={hero.highlights}
                variant="check"
                columns={2}
              />
            </motion.div>
          </motion.div>

          {/* ── Right column: image + stats card ──────────────── */}
          <motion.div
            variants={f}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* 4:3 image container — overflow-hidden clips the Image to
                the rounded corners without affecting the stats card below */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-farm.jpg"
                alt="Prepared agricultural farmland in Nigeria serviced by Farmerch mechanization operations"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Stats card — desktop-only, absolute bottom-left of image.
                The parent is `relative` without overflow-hidden, so this
                card renders outside the image bounds as the spec intends. */}
            <div
              aria-label="Service statistics"
              className="absolute -bottom-6 -left-6 hidden rounded-card bg-white p-6 shadow-xl lg:block"
            >
              <StatCard
                value={hero.stat.value}
                label={hero.stat.label}
              />
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
