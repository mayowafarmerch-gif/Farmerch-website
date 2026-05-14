# Farmerch Global Limited — Deployment Checklist

## Pre-Deployment Verification

### Build health
- [ ] `npm run lint` — zero errors, zero warnings
- [ ] `npm run build` — TypeScript clean, all 8 static routes generated
- [ ] No `console.error` or `console.warn` in the browser during a dev run
- [ ] No hydration warnings in browser console (React 19 strict mode)

### Content
- [ ] All six site sections render: Hero, Services, How It Works, Coverage, Contact/QuoteForm, Footer
- [ ] Phone number clickable via `tel:` link: +234 813 951 6150
- [ ] Email clickable via `mailto:` link: info@farmerch.co
- [ ] LinkedIn and Instagram links open correct profiles in a new tab
- [ ] Logo renders in header (color) and footer (white/inverted)
- [ ] Hero stat: "2,000+ Hectares Serviced Annually"
- [ ] Stats banner: "4,000+ Hectares Serviced"
- [ ] Services: "Ploughing" spelling used throughout (not "Plowing")
- [ ] Partnership CTA includes "financial institutions"

### Images
- [ ] `public/logo.png` present (429×147 px PNG)
- [ ] `public/og-image.jpg` present (1200×630 px JPEG, ≤ 150 KB)
- [ ] `src/app/icon.svg` present (favicon)
- [ ] Hero image loads from Unsplash CDN (allowed in `next.config.ts`)
- [ ] No broken image icons anywhere on page

### SEO / Discovery
- [ ] `https://farmerch.co/sitemap.xml` returns valid XML
- [ ] `https://farmerch.co/robots.txt` returns correct directives
- [ ] `https://farmerch.co/manifest.webmanifest` returns valid JSON
- [ ] Open Graph image referenced at `/og-image.jpg`
- [ ] Canonical URL set to `https://farmerch.co/`
- [ ] JSON-LD `ProfessionalService` schema present in page `<head>`
- [ ] `sameAs` contains LinkedIn and Instagram URLs

### Accessibility
- [ ] Skip-to-content link appears on Tab keypress at page load
- [ ] Focus ring visible on all interactive elements
- [ ] Mobile drawer closes when a nav link is activated
- [ ] Form validation errors are announced (aria-live regions)
- [ ] All images have descriptive alt text
- [ ] No heading levels are skipped (h1 → h2 → h3 sequence)

### Performance
- [ ] Logo uses `next/image` with `priority` in header
- [ ] Hero image uses `next/image` with `priority` and `fill`
- [ ] No layout shift on logo (width/height props match actual 429×147 px)
- [ ] `brightness-0 invert` filter applies correctly to footer logo

---

## Deployment Steps (Vercel — Recommended)

### First deployment
```bash
# 1. Ensure you are on the main/production branch
git status

# 2. Run final pre-flight checks locally
npm run lint && npm run build

# 3. Push to GitHub (or connect repo directly in Vercel dashboard)
git push origin main

# 4. In Vercel dashboard:
#    - Import the GitHub repository
#    - Framework preset: Next.js (auto-detected)
#    - Root directory: . (project root)
#    - Build command: npm run build  (default, no override needed)
#    - Output directory: .next       (default)
#    - No environment variables required for the current static build
#    - Click Deploy
```

### Custom domain setup
```
1. In Vercel project → Settings → Domains
2. Add: farmerch.co
3. Add: www.farmerch.co  (redirect to apex)
4. Update DNS at your registrar:
   - A record:     @   →  76.76.21.21
   - CNAME record: www →  cname.vercel-dns.com
5. Wait for SSL certificate provisioning (~5 min)
6. Verify HTTPS: https://farmerch.co
```

---

## Environment Assumptions

| Assumption | Value |
|---|---|
| Node.js version | ≥ 20 (LTS) |
| Package manager | npm |
| Deployment target | Vercel Edge Network (static export preferred) |
| Backend API | None — form submission is currently a simulated delay |
| Database | None — no server state |
| Auth | None |
| Environment variables | None required for v1 |
| CDN for images | Vercel Image Optimization (built-in) + Unsplash CDN for hero |
| Analytics | Not yet configured |

---

## Post-Deployment Verification

Run these checks within 10 minutes of going live:

### URLs to test
```
https://farmerch.co/              → renders homepage
https://farmerch.co/sitemap.xml   → returns XML with one URL entry
https://farmerch.co/robots.txt    → "Allow: /" present
https://farmerch.co/og-image.jpg  → 1200×630 JPEG loads
https://farmerch.co/logo.png      → PNG logo loads
https://farmerch.co/icon.svg      → SVG favicon loads
https://farmerch.co/manifest.webmanifest → JSON manifest
```

### Functional checks
- [ ] Open Graph preview: paste URL into https://opengraph.xyz — image, title, description all appear
- [ ] Click "Request a Quote" → scrolls to form section
- [ ] Fill and submit the form → success message appears (no actual data is sent yet)
- [ ] Click phone number on mobile → opens dialler
- [ ] Click email → opens mail client
- [ ] Click LinkedIn → opens correct company page in new tab
- [ ] Click Instagram → opens correct profile in new tab
- [ ] Resize to 375px wide → mobile nav hamburger appears, opens/closes correctly
- [ ] Tab through page from address bar → skip-to-content link appears on first Tab

### Lighthouse (run in Chrome DevTools → Lighthouse tab)
Target scores on the live URL:
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

---

## Rollback Strategy

### Vercel instant rollback
Vercel keeps every deployment in history. A rollback takes under 30 seconds:
```
Vercel dashboard → Project → Deployments
→ Find the previous successful deployment
→ Click ⋯ → Promote to Production
```
The previous deployment is live immediately; no redeployment required.

### Git-based rollback
```bash
# Identify the last known-good commit
git log --oneline -10

# Create a revert commit (non-destructive)
git revert <bad-commit-hash>
git push origin main
# Vercel auto-deploys the revert commit
```

---

## Known Outstanding Items (Pre-Launch)

These items exist and are flagged — they are not blockers for v1 launch but should be addressed before significant traffic:

| Item | Risk | Resolution |
|---|---|---|
| Quote form submits to nowhere | Medium — users expect a response | Wire `onSubmit` to a real endpoint (email via Resend, or Zoho CRM webhook) |
| Privacy Policy / Terms / Cookie Policy links point to `#` | Low — legal risk depends on jurisdiction | Draft and publish as static pages at `/privacy`, `/terms`, `/cookies` |
| Hero image is from Unsplash CDN | Low — external dependency, possible content change | Replace with owned photography of actual Farmerch field operations |
| No analytics | Low — flying blind on conversion | Add Vercel Analytics (one-line config) or Plausible |
| No error monitoring | Low | Add Sentry or Vercel's built-in error tracking |
| `sharp` in devDependencies | None (build-time only) | Verify Vercel uses its own image optimizer in production (it does) |
