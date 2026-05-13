# Farmerch Website — Production Readiness Report

**Date:** 2026-05-13  
**Build status:** ✓ Clean (`npm run build` — zero errors, zero warnings)  
**TypeScript:** ✓ Clean (`npx tsc --noEmit` — zero errors)

---

## Audit Summary

### Build output

| Route | Type |
|---|---|
| `/` | Static (SSG) |
| `/_not-found` | Static (SSG) |
| `/icon.svg` | Static (SSG) |
| `/manifest.webmanifest` | Static (SSG) |

All routes pre-rendered at build time. Zero server-side rendering overhead.

---

## Improvements Made

### 1. SEO + Metadata (`src/app/layout.tsx`)

| Added | Detail |
|---|---|
| `applicationName` | Identifies the app to OS and browser |
| `keywords` | 11 agricultural/Nigeria-specific search terms |
| `authors`, `creator`, `publisher` | Proper content attribution |
| `category: "Agriculture"` | Page classification for search engines |
| `alternates.canonical` | Prevents duplicate-content indexing |
| OG `images` array | Enables rich social link previews (requires `/og-image.jpg`) |
| Twitter `description` + `images` | Complete Twitter Card metadata |
| `robots.googleBot` | Extended crawl controls — full snippet, large image preview |
| `viewport` export | Separated from metadata per Next.js 14+ best practice |
| `themeColor: "#059669"` | Mobile browser address bar tints brand green |
| JSON-LD (`ProfessionalService`) | Structured data for rich search results — includes name, address, areaServed, serviceType, contact |

### 2. Accessibility

| Fixed | Location | Detail |
|---|---|---|
| Mobile drawer keyboard leak | `Header.tsx` | Added `inert={!isOpen}` — hidden links are now completely non-focusable when menu is closed |
| `role="list"` on `<ul>` with `list-none` | `FeatureList.tsx`, `Services.tsx` | VoiceOver (macOS Safari) strips list semantics when `list-style: none` is set; explicit `role="list"` preserves them |
| Required field indicators | `Input.tsx`, `Select.tsx`, `Textarea.tsx` | Labels now render a `*` when `required` prop is present; `aria-hidden="true"` prevents double-reading |
| Required field note | `QuoteForm.tsx` | "Fields marked * are required" added above the form grid |
| `required` on all non-optional fields | `QuoteForm.tsx` | 9 required fields now have HTML `required` attribute; implies `aria-required` for screen readers |
| Nav link token fix | `Header.tsx` | `text-gray-700` → `text-ink-body` |
| Hamburger hover token fix | `Header.tsx` | `hover:bg-gray-50` → `hover:bg-surface-muted` |

### 3. Performance

| Fixed | Location | Detail |
|---|---|---|
| `year` constant moved out of component | `Footer.tsx` | `new Date().getFullYear()` now computed once at module load, not re-evaluated on every render |
| `min-height: 100dvh` on body | `globals.css` | Dynamic viewport height for mobile browsers — fixes the address-bar-overlap issue with `100vh` |

### 4. Token Consistency

| Fixed | Location | Detail |
|---|---|---|
| `border-gray-200` → `border-border` | `Header.tsx` (2 occurrences) | Scrolled header border and mobile drawer border-top now use the semantic token |
| `bg-gray-200` → `bg-border` | `HowItWorks.tsx` | Desktop step-connector line now uses the semantic border token |

### 5. Animation Standardization

All `sectionFade` and `fadeUp` Framer Motion variants are now consistent across all five sections:

| Variant | Before | After (standardized) |
|---|---|---|
| `sectionFade` duration | 0.55 / **0.60** | 0.55 (all sections) |
| `fadeUp` duration | 0.50 / **0.45** | 0.50 (all sections) |
| `fadeUp` easing | `[0.22, 1, 0.36, 1]` | unchanged — all were consistent |

### 6. Typography

| Added | Location | Detail |
|---|---|---|
| `text-wrap: balance` on `h1, h2, h3` | `globals.css` | Prevents orphan words in headings across all sections |

### 7. Browser / PWA Setup

| Added | File | Detail |
|---|---|---|
| SVG favicon | `src/app/icon.svg` | Green rounded-square with white "F"; auto-detected by Next.js App Router |
| Web manifest | `src/app/manifest.ts` | PWA name, short name, theme color, display mode, icon reference |

---

## Verified Passing

| Check | Status |
|---|---|
| `npx tsc --noEmit` | ✓ Zero errors |
| `npm run build` | ✓ Clean — zero errors, zero warnings |
| Hydration warnings | ✓ None (all dynamic content server-safe) |
| Heading hierarchy | ✓ `h1` in Hero → `h2` per section → `h3` per card |
| ARIA landmark structure | ✓ `<header role="banner">`, `<nav>`, `<main>`, `<footer aria-label="Site footer">` |
| `prefers-reduced-motion` | ✓ All animated sections swap to `STILL = { hidden: {}, visible: {} }` via `useReducedMotion()` |
| Focus ring | ✓ Global `focus-visible` ring (`2px solid var(--color-brand-600), offset 2px`) on all interactive elements |
| Keyboard navigation | ✓ All interactive elements reachable; mobile drawer links blocked when closed via `inert` |
| Smooth scroll | ✓ `scroll-behavior: smooth` + `scroll-padding-top: 4rem` for fixed header |
| Image alt text | ✓ Hero image has descriptive alt text |
| Form `noValidate` + Zod | ✓ Native browser popups suppressed; Zod validation is sole source of truth |
| Form error association | ✓ All inputs use `aria-invalid` + `aria-describedby` linking to error `<p role="alert">` |

---

## Remaining Future Improvements

### Required before full launch

| Item | Priority | Detail |
|---|---|---|
| `/og-image.jpg` | **High** | OG image referenced in metadata but file does not exist. Social sharing will fall back to no image. Create a 1200×630px PNG/JPG and place in `public/`. |
| Real contact info | **High** | `contact.phone` in `data/site.ts` is `"+234 XXX XXX XXXX"` — update with actual number before going live. |
| Real social links | **Medium** | Footer social links point to `"#"`. Replace with actual platform URLs. |
| Privacy Policy, Terms, Cookie pages | **Medium** | Footer legal links point to `"#"`. Create or link to actual legal documents. |

### Performance enhancements (post-launch)

| Item | Detail |
|---|---|
| Apple touch icon | Add `src/app/apple-icon.png` (180×180px) for iOS home screen |
| Web font subsetting | Inter is loaded with `subsets: ["latin"]`; verify no Yoruba/other characters need extended subsets |
| Image sitemap | Add `sitemap.ts` for indexing when content grows |
| Core Web Vitals monitoring | Wire up Vercel Analytics or equivalent after deploy |
| `next/font` for brand icon | If a logo image is added, use `next/image` with `priority` and explicit dimensions |

### Accessibility (phase 2)

| Item | Detail |
|---|---|
| Skip-to-content link | Add `<a href="#main-content">Skip to main content</a>` as the first focusable element in `<body>` for keyboard users |
| `aria-live` on form errors | Currently individual error `<p role="alert">` elements are used. A single live region at the top of the form announcing the count of errors would improve SR UX on submit. |
| Focus management on form submit | On success state display, move focus to the success panel heading so SR users are aware of the state change |

### SEO (phase 2)

| Item | Detail |
|---|---|
| Sitemap | Add `src/app/sitemap.ts` for search-engine discovery |
| `hreflang` | If multi-language support is added (Phase 2 — Yoruba, Igbo, Hausa), add alternate hreflang links |
| Local business pages | State-specific landing pages (`/coverage/oyo`, `/coverage/ekiti`, etc.) would improve local SEO |

---

## Architecture Confirmed Solid

- **Three-layer component hierarchy** (`ui/` → `shared/` → `sections/`) is clean, no cross-layer violations
- **Token-only styling** — no raw hex values in component files
- **Single source of truth** — all copy in `data/site.ts`
- **Smooth-scroll + offset** — `scroll-behavior: smooth` + `scroll-padding-top: 4rem` consistent
- **`"use client"` boundary** — correctly placed only on components using browser APIs or hooks
- **No circular imports** — barrel exports (`index.ts`) are flat
