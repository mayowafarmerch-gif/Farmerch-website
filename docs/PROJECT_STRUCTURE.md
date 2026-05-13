# Farmerch Website — Project Structure

## Root layout

```
c:/Users/USER/Farmerch Website/   ← workspace root (run npm/npx from here)
├── public/                        ← static assets served at /
├── src/
│   ├── app/                       ← Next.js App Router files
│   │   ├── layout.tsx             ← root layout (Header + Footer shell)
│   │   ├── page.tsx               ← homepage (section assembly)
│   │   └── globals.css            ← base resets + Tailwind import
│   ├── components/
│   │   ├── layout/                ← page-level shell components
│   │   │   ├── Header.tsx         ← fixed nav, desktop + mobile responsive
│   │   │   ├── Footer.tsx         ← 4-column dark footer
│   │   │   └── index.ts           ← barrel export
│   │   ├── sections/              ← full-page section components (built per feature)
│   │   │   ├── Hero.tsx           ← hero section (done)
│   │   │   ├── Services.tsx       ← services grid + partnership CTA (done)
│   │   │   ├── HowItWorks.tsx     ← process steps + benefit cards (done)
│   │   │   ├── Coverage.tsx       ← coverage card + expansion roadmap (done)
│   │   │   └── QuoteForm.tsx      ← quote request form — RHF + Zod v4 + success state (done)
│   │   ├── shared/                ← Farmerch design-language primitives
│   │   │   ├── SectionWrapper.tsx ← background + spacing shell for every section
│   │   │   ├── SectionHeader.tsx  ← eyebrow / heading / description block
│   │   │   ├── FeatureList.tsx    ← check or dot bullet lists
│   │   │   ├── StatCard.tsx       ← metric display (3 variants)
│   │   │   ├── CTAGroup.tsx       ← paired primary + secondary buttons
│   │   │   ├── IconContainer.tsx  ← icon badge (brand-100 bg, brand-600 icon)
│   │   │   └── index.ts           ← barrel export
│   │   └── ui/                    ← pure presentation primitives
│   │       ├── Button.tsx         ← primary / secondary / ghost; exports buttonVariants
│   │       ├── Card.tsx           ← default / elevated / feature / stats
│   │       ├── Input.tsx          ← labeled input with error state
│   │       ├── Textarea.tsx       ← labeled textarea with error state
│   │       ├── Select.tsx         ← labeled native select with ChevronDown
│   │       ├── Badge.tsx          ← default (pill) / tag variants
│   │       ├── Container.tsx      ← max-w-7xl / max-w-4xl centered wrapper
│   │       └── index.ts           ← barrel export
│   ├── data/
│   │   └── site.ts                ← single source of truth for all site copy
│   ├── hooks/                     ← custom React hooks (as needed)
│   ├── lib/
│   │   └── utils.ts               ← cn() helper (clsx + tailwind-merge)
│   ├── styles/
│   │   └── tokens.css             ← all design tokens via Tailwind v4 @theme {}
│   └── types/
│       └── index.ts               ← shared TypeScript interfaces
├── docs/
│   ├── FIGMA_DESIGN_SPEC.md            ← authoritative UI/UX spec (colors, spacing, anatomy)
│   ├── PRIMITIVES_GUIDE.md             ← usage guide for all 13 shared/ui components
│   ├── PRODUCTION_READINESS_REPORT.md  ← audit findings, improvements, remaining TODOs
│   └── PROJECT_STRUCTURE.md            ← this file
├── next.config.ts
├── tsconfig.json                  ← paths: "@/*" → "./src/*"
└── package.json

## Browser + PWA assets

`src/app/icon.svg`        — SVG favicon, auto-detected by Next.js App Router convention
`src/app/manifest.ts`     — Web app manifest (name, theme color, icons) → served at /manifest.webmanifest
`public/og-image.jpg`     — [PENDING] 1200×630 Open Graph image for social sharing

## Production hardening (2026-05-13)

See `docs/PRODUCTION_READINESS_REPORT.md` for the full audit. Key changes:
- `layout.tsx`: full metadata, JSON-LD structured data, themeColor, OG/Twitter images, keywords
- `globals.css`: `text-wrap: balance` on headings, `min-height: 100dvh`
- `Header.tsx`: `inert={!isOpen}` closes keyboard access to hidden mobile menu; semantic tokens
- `Input/Select/Textarea.tsx`: `required` prop renders asterisk in label; forwards `required` to element
- `QuoteForm.tsx`: required attributes on 9 fields; required-field note above form
- `FeatureList.tsx` + `Services.tsx`: `role="list"` preserves semantics with `list-style: none`
- `HowItWorks.tsx`: connector `bg-gray-200` → `bg-border` (token)
- `Coverage.tsx`: fadeUp duration standardized 0.45 → 0.5
- `Services.tsx`: sectionFade duration standardized 0.6 → 0.55
- `Footer.tsx`: `YEAR` constant computed outside component
```

## Architectural decisions

### Three-layer component hierarchy

```
ui/          Pure presentational atoms — no business logic, no site copy
shared/      Farmerch design language — themed wrappers around ui/ primitives
sections/    Page sections — assemble shared/ with data/ content
```

Each layer imports only downward. `sections/` never imports from other `sections/`.

### Token-only styling

All color, radius, shadow, and z-index values live exclusively in `src/styles/tokens.css`
as Tailwind v4 `@theme {}` tokens. Components use token utility classes (`bg-brand-600`,
`rounded-button`, `shadow-card`) — never raw hex or hardcoded Tailwind defaults.

### Single source of truth for copy

All text, nav items, service data, stats, coverage, and contact info lives in
`src/data/site.ts`. Sections import from there — never hardcode strings in TSX.

### Smooth-scroll anchor navigation

- `globals.css`: `scroll-behavior: smooth` on `html`
- `globals.css`: `scroll-padding-top: 4rem` offsets the 64px fixed header
- `layout.tsx`: `<main className="pt-16">` pushes content below the fixed header
- Nav links use `href="#section-id"` anchors; sections carry matching `id` props

### Responsive strategy

| Breakpoint | Behavior |
|---|---|
| `< md` (< 768px) | Mobile: hamburger toggle, collapsible drawer |
| `md+` (≥ 768px) | Desktop: inline nav + CTA |

Mobile drawer animates via `max-height` transition (`max-h-0` → `max-h-96`),
avoiding layout-thrashing alternatives. `aria-expanded` + `aria-hidden` keep it
accessible to screen readers.

### Accessibility

- `<header role="banner">`, `<nav aria-label="Main navigation">`, `<footer aria-label="Site footer">`
- Mobile toggle: `aria-expanded`, `aria-controls="mobile-menu"`, `aria-label` updates with state
- Mobile drawer: `aria-hidden={!isOpen}`
- All icon-only elements carry `aria-hidden="true"`; interactive links have descriptive `aria-label`
- Focus ring: `focus-visible:ring-2 focus-visible:ring-brand-600` on all interactive elements
- `scroll-behavior: smooth` respects `prefers-reduced-motion` in modern browsers

### Logo swap path

Both Header and Footer use a `<span>` text fallback. When the logo asset is ready:

1. Place the file at `public/logo.png`
2. In Header.tsx — replace `<span>` with:
   ```tsx
   <Image src="/logo.png" alt={siteConfig.name} width={120} height={32} priority />
   ```
3. In Footer.tsx — same Image tag, add `className="brightness-0 invert filter"`
