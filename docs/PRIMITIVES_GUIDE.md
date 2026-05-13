# Farmerch UI Primitives — Usage Guide

> This document covers every reusable primitive built in `src/components/ui/` and
> `src/components/shared/`. Read this before building any page section.
> All design decisions trace back to `docs/FIGMA_DESIGN_SPEC.md`.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Design Token Contract](#2-design-token-contract)
3. [UI Primitives (`src/components/ui/`)](#3-ui-primitives)
   - [Button](#button)
   - [Card](#card)
   - [Input](#input)
   - [Textarea](#textarea)
   - [Select](#select)
   - [Badge](#badge)
   - [Container](#container)
4. [Shared Composition Components (`src/components/shared/`)](#4-shared-composition-components)
   - [SectionWrapper](#sectionwrapper)
   - [SectionHeader](#sectionheader)
   - [FeatureList](#featurelist)
   - [StatCard](#statcard)
   - [CTAGroup](#ctagroup)
   - [IconContainer](#iconcontainer)
5. [Import Patterns](#5-import-patterns)
6. [Rules & Best Practices](#6-rules--best-practices)
7. [Section Assembly Reference](#7-section-assembly-reference)

---

## 1. Architecture Overview

The component system is organised in three strict layers. No layer may import from a layer above it.

```
Layer 3 — Page Sections    src/components/sections/
           ↑ uses
Layer 2 — Shared           src/components/shared/
           ↑ uses
Layer 1 — UI Primitives    src/components/ui/
           ↑ uses
Layer 0 — Utilities        src/lib/utils.ts  +  src/styles/tokens.css
```

**`ui/`** — knows nothing about Farmerch's content. Pure presentation: buttons, inputs, cards.

**`shared/`** — knows the Farmerch design language (spacing rhythm, section anatomy) but not page content.

**`sections/`** — assembles shared + ui components around actual site content from `src/data/site.ts`.

---

## 2. Design Token Contract

All color, spacing, shadow, and radius values live in `src/styles/tokens.css` and are
auto-exposed as Tailwind utilities via the `@theme {}` block.

### Color tokens → Tailwind utilities

| Token | Utility class | Spec value |
|---|---|---|
| `--color-brand-600` | `bg-brand-600 / text-brand-600 / border-brand-600` | `#059669` (primary CTA) |
| `--color-brand-700` | `bg-brand-700` | `#047857` (hover state) |
| `--color-brand-100` | `bg-brand-100` | `#d1fae5` (icon container bg) |
| `--color-brand-50`  | `bg-brand-50`  | `#f0fdf4` (section tint, stat bg) |
| `--color-ink`       | `text-ink`     | `#111827` (headings) |
| `--color-ink-body`  | `text-ink-body`| `#374151` (body paragraphs) |
| `--color-ink-muted` | `text-ink-muted`| `#4b5563` (descriptions) |
| `--color-ink-faint` | `text-ink-faint`| `#9ca3af` (placeholders, footer text) |
| `--color-surface`   | `bg-surface`   | `#ffffff` |
| `--color-surface-muted` | `bg-surface-muted` | `#f9fafb` (gray-50) |
| `--color-border`    | `border-border` | `#e5e7eb` (card borders) |
| `--color-border-input` | `border-border-input` | `#d1d5db` (form inputs) |

### Radius tokens

| Token | Utility | Value | Used on |
|---|---|---|---|
| `--radius-button` | `rounded-button` | `0.5rem` | Buttons, inputs |
| `--radius-card`   | `rounded-card`   | `0.75rem`| Service cards, process steps |
| `--radius-card-lg`| `rounded-card-lg`| `1rem`   | Coverage card, form container |
| `--radius-badge`  | `rounded-badge`  | `9999px` | Badges, state tags |

### Shadow tokens

| Token | Utility | Used on |
|---|---|---|
| `--shadow-card`       | `shadow-card`       | Default resting state |
| `--shadow-card-hover` | `shadow-card-hover` | Card hover lift |
| `--shadow-overlay`    | `shadow-overlay`    | Hero stat card |

**Rule:** Never write a raw hex value or `arbitrary value` like `bg-[#059669]` in a component file. Always use a named token class.

---

## 3. UI Primitives

### Button

**File:** [src/components/ui/Button.tsx](../src/components/ui/Button.tsx)

**Why it exists:** Every interactive CTA on the site (nav, hero, footer, form) must share the same focus ring, disabled state, hover transition, and sizing. A shared Button prevents drift across 6+ usages.

**Variants (spec §1.2, §3.2, §3.6):**

| `variant` | Appearance | Spec reference |
|---|---|---|
| `primary` | Green 600 bg, white text, hover Green 700 | §3.2 Hero CTA, §3.6 Submit |
| `secondary` | 2px Green 600 border, Green 600 text, transparent bg | §3.2 Hero secondary CTA |
| `ghost` | No border/bg, ink-muted text | Internal navigation, icon buttons |

| `size` | Padding | Spec reference |
|---|---|---|
| `sm` | `px-6 py-2` | §3.1 Nav CTA |
| `md` | `px-6 py-3` | Default interactive |
| `lg` | `px-8 py-4` | §3.2 Hero / §3.6 Form submit |

```tsx
import { Button } from "@/components/ui";

// Nav CTA
<Button size="sm">Request Quote</Button>

// Hero primary — with icon child
<Button size="lg">
  Request a Quote <ArrowRight size={18} />
</Button>

// Hero secondary
<Button variant="secondary" size="lg">How It Works</Button>

// Form submit — full width
<Button size="lg" fullWidth>
  Submit Quote Request <Send size={18} />
</Button>

// Disabled state (aria + visual)
<Button disabled>Submitting...</Button>
```

---

### Card

**File:** [src/components/ui/Card.tsx](../src/components/ui/Card.tsx)

**Why it exists:** Four distinct card surfaces appear in the spec. One component with variants prevents four different ad-hoc styling implementations that would inevitably drift.

**Variants (spec §3.3, §3.4, §3.5):**

| `variant` | Appearance | Where used |
|---|---|---|
| `default` | White, gray-200 border, rounded-xl, p-6, hover shadow | §3.3 Service cards, §3.4 Process steps |
| `elevated` | White, rounded-2xl, overlay shadow, p-8 sm:p-12 | §3.5 Coverage card, §3.6 Form container |
| `feature` | White, gray border, rounded-xl, p-8 | §3.4 Benefit cards |
| `stats` | Brand-50 bg, rounded-xl, p-6 | §3.5 Coverage stat boxes |

```tsx
import { Card } from "@/components/ui";

// Service card
<Card variant="default">
  <IconContainer>...</IconContainer>
  <h3>Land Preparation</h3>
</Card>

// Coverage main card
<Card variant="elevated">...</Card>

// Benefit card (HowItWorks)
<Card variant="feature">...</Card>

// Coverage stat box
<Card variant="stats">
  <StatCard value="40+" label="Active Projects" />
</Card>
```

---

### Input

**File:** [src/components/ui/Input.tsx](../src/components/ui/Input.tsx)

**Why it exists:** Consistent field styling across 7 text inputs in the quote form. Includes label, error message, and auto-generated `id` linking — things that must never be forgotten.

**Spec:** §3.6 — white bg, gray-300 border, px-4 py-3, rounded-lg, green-500 ring on focus.

```tsx
import { Input } from "@/components/ui";

// Uncontrolled (with React Hook Form ref)
<Input
  label="Contact Name"
  placeholder="Full name"
  {...register("contactName", { required: true })}
  error={errors.contactName?.message}
/>

// Controlled
<Input
  label="Organization Name"
  value={value}
  onChange={handleChange}
/>

// No label (inline usage)
<Input placeholder="Search..." type="search" />
```

**React Hook Form integration:** Pass `{...register("fieldName")}` directly — `Input` forwards its ref.

---

### Textarea

**File:** [src/components/ui/Textarea.tsx](../src/components/ui/Textarea.tsx)

**Why it exists:** The quote form's "Additional Information" field (spec §3.6: 4 rows, non-resizable). Same API as Input but for `<textarea>`.

```tsx
import { Textarea } from "@/components/ui";

<Textarea
  label="Additional Information"
  placeholder="Tell us more about your project requirements..."
  rows={4}
  {...register("additionalInfo")}
/>
```

**Note:** `resize-none` is applied by default to match the spec's "non-resizable" requirement.

---

### Select

**File:** [src/components/ui/Select.tsx](../src/components/ui/Select.tsx)

**Why it exists:** Three dropdown fields in the quote form (Organization Type, Service Type, Timeline). Native `<select>` with `appearance-none` + custom chevron gives consistent cross-browser styling without a JS dropdown library.

```tsx
import { Select } from "@/components/ui";

<Select
  label="Organization Type"
  placeholder="Select type"
  options={[
    { value: "commercial-farm", label: "Commercial Farm" },
    { value: "government",      label: "Government"      },
    { value: "cooperative",     label: "Cooperative"     },
  ]}
  {...register("organizationType")}
  error={errors.organizationType?.message}
/>
```

**Accessibility:** Uses `<label>` linked by `id`, `aria-invalid`, and `aria-describedby` on error.

---

### Badge

**File:** [src/components/ui/Badge.tsx](../src/components/ui/Badge.tsx)

**Why it exists:** Two badge surfaces appear in the spec — the hero "Powering Agriculture" badge and the coverage state tags. Same component, different padding and background.

| `variant` | Bg | Text | Padding | Where |
|---|---|---|---|---|
| `default` | brand-100 | brand-800 | px-4 py-2 | §3.2 Hero badge |
| `tag` | brand-50  | brand-700 | px-3 py-1 | §3.5 State tags (Oyo, Ekiti, etc.) |

```tsx
import { Badge } from "@/components/ui";

// Hero badge
<Badge>Powering Agriculture Across Southwestern Nigeria</Badge>

// Coverage state tag
<Badge variant="tag">Oyo</Badge>
<Badge variant="tag">Ekiti</Badge>
```

---

### Container

**File:** [src/components/ui/Container.tsx](../src/components/ui/Container.tsx)

**Why it exists:** Every section uses `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Without a shared component, this 4-class string gets copy-pasted 8+ times and inevitably drifts (someone drops `lg:px-8`, someone uses `px-5`).

```tsx
import { Container } from "@/components/ui";

// Standard — max-w-7xl
<Container>
  <SectionHeader heading="Our Services" />
</Container>

// Narrow — max-w-4xl (quote form section)
<Container narrow>
  <Card variant="elevated">...</Card>
</Container>

// Renders as a different element
<Container as="article">...</Container>
```

---

## 4. Shared Composition Components

### SectionWrapper

**File:** [src/components/shared/SectionWrapper.tsx](../src/components/shared/SectionWrapper.tsx)

**Why it exists:** Enforces two global invariants — (1) every section has `py-20` vertical padding and (2) every section's background matches the spec. Without this, a developer changing one section's `py-` value silently breaks the rhythm.

**`background` prop:**

| Value | CSS | Spec reference |
|---|---|---|
| `white` | `bg-surface` | §3.3 Services, §3.6 Quote Form |
| `muted` | `bg-surface-muted` | §3.4 How It Works |
| `subtle` | `bg-surface-subtle` | brand-50 tint |
| `gradient` | `bg-gradient-to-br from-brand-50 to-blue-50` | §3.2 Hero, §3.5 Coverage |
| `dark` | `bg-gray-900` | Footer |

```tsx
import { SectionWrapper } from "@/components/shared";

// Services section
<SectionWrapper id="services" background="white">
  <Container>...</Container>
</SectionWrapper>

// How It Works
<SectionWrapper id="how-it-works" background="muted">
  <Container>...</Container>
</SectionWrapper>

// Coverage (gradient)
<SectionWrapper id="coverage" background="gradient">
  <Container>...</Container>
</SectionWrapper>
```

**Important:** The `id` prop feeds the `href="#services"` nav links. The `id` values must match exactly what's defined in `src/data/site.ts` `navItems`.

---

### SectionHeader

**File:** [src/components/shared/SectionHeader.tsx](../src/components/shared/SectionHeader.tsx)

**Why it exists:** Every section (Services, How It Works, Coverage) uses the same heading + description pattern: centred, `text-3xl sm:text-4xl font-bold`, `text-lg text-ink-muted`, `max-w-3xl`. One component enforces this. Without it, each section would write its own heading markup and the scale would drift.

```tsx
import { SectionHeader } from "@/components/shared";

// Standard section header
<SectionHeader
  heading="Our Mechanization Services"
  description="Comprehensive agricultural mechanization solutions designed for commercial farms, cooperatives, and government agricultural projects."
/>

// With eyebrow label
<SectionHeader
  eyebrow="How We Work"
  heading="How We Deliver Excellence"
  description="Our proven B2B model connects agricultural projects with professional mechanization services."
/>

// Left-aligned (split-layout card columns)
<SectionHeader
  heading="For Agricultural Enterprises"
  align="left"
/>
```

**Spacing:** `mb-16` is baked in — don't add margin to the wrapper around it.

---

### FeatureList

**File:** [src/components/shared/FeatureList.tsx](../src/components/shared/FeatureList.tsx)

**Why it exists:** Bullet lists appear in three distinct sections — hero (2-column CheckCircle), service cards (dot bullets), and benefit cards (1-column CheckCircle). One component with variants eliminates repeated icon + list item markup.

```tsx
import { FeatureList } from "@/components/shared";

// Hero — 2-column check variant
<FeatureList
  variant="check"
  columns={2}
  items={[
    "B2B mechanization contracts",
    "Quality-controlled operations",
    "Trusted operator network",
    "On-time project delivery",
  ]}
/>

// Service card — dot variant, 1 column
<FeatureList
  variant="dot"
  items={service.features}
/>

// Benefit card — check, 1 column (default)
<FeatureList
  variant="check"
  items={[
    "Access to reliable mechanization without fleet ownership",
    "Guaranteed on-time delivery for critical farming windows",
  ]}
/>
```

---

### StatCard

**File:** [src/components/shared/StatCard.tsx](../src/components/shared/StatCard.tsx)

**Why it exists:** The value+label pair appears in three visual contexts — an overlay on white, a self-contained green-50 box, and a banner on a green background. The `variant` prop handles the colour inversion rather than each section applying its own ad-hoc styling.

| `variant` | Number colour | Label colour | Container | Spec |
|---|---|---|---|---|
| `default` | `text-brand-600 text-3xl` | `text-ink-muted text-sm` | Transparent (parent Card provides bg) | §3.2 Hero overlay |
| `surface` | `text-brand-600 text-3xl` | `text-ink-body text-sm` | `bg-brand-50 rounded-card p-6` | §3.5 Coverage stats |
| `inverse` | `text-white text-4xl` | `text-brand-100 text-sm` | Transparent (on green bg) | §3.3 Partnership banner |

```tsx
import { StatCard } from "@/components/shared";

// Hero overlay — inside a white Card
<Card variant="elevated" className="...absolute positioning...">
  <StatCard value="500+" label="Hectares Serviced Monthly" />
</Card>

// Coverage — self-contained
<StatCard variant="surface" value="40+" label="Active Projects" />
<StatCard variant="surface" value="600+" label="Hectares Serviced" />

// Partnership banner — on green gradient
<StatCard variant="inverse" value="2"     label="States Covered" />
<StatCard variant="inverse" value="50+"   label="Tractor Owners" />
<StatCard variant="inverse" value="1000+" label="Hectares Serviced" />
<StatCard variant="inverse" value="98%"   label="On-Time Delivery" />
```

---

### CTAGroup

**File:** [src/components/shared/CTAGroup.tsx](../src/components/shared/CTAGroup.tsx)

**Why it exists:** The spec explicitly states "Layout: Flex row on desktop, column on mobile" for CTA button groups (§3.2, §5). Every section with two buttons needs this behaviour. Without CTAGroup, each section writes its own `flex flex-col sm:flex-row` string — inconsistent stacking direction and gap sizing follows.

```tsx
import { CTAGroup } from "@/components/shared";
import { Button } from "@/components/ui";

// Hero — centred on mobile
<CTAGroup align="center">
  <Button size="lg">
    Request a Quote <ArrowRight size={18} />
  </Button>
  <Button variant="secondary" size="lg">
    How It Works
  </Button>
</CTAGroup>

// Card — left-aligned
<CTAGroup align="left">
  <Button>Get Started Today</Button>
</CTAGroup>
```

---

### IconContainer

**File:** [src/components/shared/IconContainer.tsx](../src/components/shared/IconContainer.tsx)

**Why it exists:** The spec (§3.3) defines a precise icon container: `bg-brand-100, w-12 h-12, rounded-lg`. Six service cards use it. If each card renders its own icon box, any change (size, rounding, colour) requires 6+ edits. One component = one edit point.

**Pass the icon as a child and apply `text-brand-600` on the icon itself:**

```tsx
import { IconContainer } from "@/components/shared";
import { Tractor, Sprout, Wheat } from "lucide-react";

// Default — service cards
<IconContainer>
  <Tractor size={24} className="text-brand-600" />
</IconContainer>

// Small — inline context
<IconContainer size="sm">
  <MapPin size={18} className="text-brand-600" />
</IconContainer>

// Large — hero or feature emphasis
<IconContainer size="lg">
  <CheckCircle size={32} className="text-brand-600" />
</IconContainer>
```

**Note:** `aria-hidden="true"` is baked in — icons are decorative and screen readers should not read them. Ensure the surrounding card/text provides the accessible label.

---

## 5. Import Patterns

Always import from the barrel index, not from individual files:

```tsx
// ✅ Correct
import { Button, Card, Badge, Container } from "@/components/ui";
import { SectionWrapper, SectionHeader, FeatureList, StatCard } from "@/components/shared";

// ❌ Wrong — bypasses the public API
import { Button } from "@/components/ui/Button";
```

Import layout components directly (no barrel needed since layout/ only has 2 files):

```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// or via barrel:
import { Navbar, Footer } from "@/components/layout";
```

---

## 6. Rules & Best Practices

### The golden rules

1. **Never use raw hex values in JSX.** Always use a token class (`text-brand-600`, `bg-surface-muted`).
2. **Never use arbitrary values** (`w-[47px]`, `text-[13px]`). If a value isn't in the token system, add it to `tokens.css` first.
3. **No inline styles.** Use `className` only.
4. **One concern per layer.** `ui/` components don't know about Farmerch's content. `shared/` components don't know about data. `sections/` assembles everything.
5. **Always use `Container` inside sections.** Never hardcode `max-w-7xl mx-auto px-4 ...` directly in a section file.
6. **Always use `SectionWrapper` for top-level sections.** Never hardcode `py-20 bg-surface` on a `<section>` tag.

### Token class gotchas

Tailwind v4 generates classes from `@theme` variables. These classes work in JSX but **will not appear in autocomplete** unless your editor has Tailwind IntelliSense configured for v4. Trust the build — if the token is in `tokens.css`, the class works.

### `cn()` for conditional classes

Always use `cn()` from `@/lib/utils` for conditional or merged class strings:

```tsx
import { cn } from "@/lib/utils";

// ✅
<div className={cn("base-class", isActive && "text-brand-600", className)} />

// ❌ — string concatenation breaks Tailwind Merge
<div className={"base-class " + (isActive ? "text-brand-600" : "")} />
```

### CVA components accept `className`

Every CVA-powered component accepts a `className` prop for one-off overrides (positioning, margin). Use this sparingly — if the same override appears in 2+ places, it belongs in a variant.

```tsx
// Fine — unique positioning for the hero stat overlay
<StatCard className="absolute -bottom-6 -left-6" value="500+" label="Hectares" />
```

---

## 7. Section Assembly Reference

This table shows which primitives compose each spec section. Use it as a checklist when building sections.

| Section | SectionWrapper bg | Primitives used |
|---|---|---|
| **Hero** | `gradient` | `Badge`, `Button` (×2 via `CTAGroup`), `FeatureList` (check, 2-col), `StatCard` (default inside Card elevated) |
| **Services** | `white` | `SectionHeader`, `Card` (default ×6), `IconContainer`, `FeatureList` (dot), Partnership: `StatCard` (inverse ×4) |
| **How It Works** | `muted` | `SectionHeader`, `Card` (default ×6 process, feature ×2 benefit), `IconContainer`, `FeatureList` (check) |
| **Coverage** | `gradient` | `SectionHeader`, `Card` (elevated), `Badge` (tag ×5), `StatCard` (surface ×2–4), Expansion card |
| **Quote Form** | `white` | `SectionHeader`, `Container` (narrow), `Card` (elevated), `Input` ×5, `Textarea` ×1, `Select` ×3, `Button` (lg fullWidth) |
