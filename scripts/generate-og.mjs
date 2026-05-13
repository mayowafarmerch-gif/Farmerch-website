/**
 * OG image generator for Farmerch Global Limited.
 * Produces public/og-image.jpg at 1200×630 (standard OG size).
 *
 * Run:  node scripts/generate-og.mjs
 * Deps: sharp (installed as devDependency)
 */

import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/og-image.jpg");

/* ── Brand palette ───────────────────────────────────────── */
const C = {
  brand50:  "#f0fdf4",
  brand100: "#d1fae5",
  brand200: "#a7f3d0",
  brand300: "#6ee7b7",
  brand500: "#10b981",
  brand600: "#059669",
  brand700: "#047857",
  brand800: "#065f46",
  brand900: "#064e3b",
  gray50:   "#f9fafb",
  gray200:  "#e5e7eb",
  gray400:  "#9ca3af",
  gray600:  "#4b5563",
  gray700:  "#374151",
  white:    "#ffffff",
};

/* ── Farmerch logo icon (recreation of brand mark) ───────── */
/*
  Faithful recreation based on the brand logo:
    – Rounded dark-green square background
    – Small circle element (top-left, representing seed/sun)
    – Vertical left accent bar
    – Three stacked horizontal bars (crop rows / field layers)
*/
const ICON_X = 58;
const ICON_Y = 54;
const ICON_SIZE = 78;

const icon = `
  <g transform="translate(${ICON_X}, ${ICON_Y})">
    <!-- Square base -->
    <rect width="${ICON_SIZE}" height="${ICON_SIZE}" rx="13" fill="${C.brand800}"/>

    <!-- Circle element — seed/sun in upper-left quadrant -->
    <circle cx="22" cy="21" r="13" fill="${C.white}" opacity="0.15"/>
    <circle cx="22" cy="21" r="9"  fill="${C.white}" opacity="0.95"/>
    <circle cx="22" cy="21" r="4"  fill="${C.brand800}"/>

    <!-- Vertical stem (left, top area) -->
    <rect x="10" y="10" width="7" height="18" rx="3.5" fill="${C.white}" opacity="0.9"/>

    <!-- Horizontal crop-row bars (lower half) -->
    <rect x="10" y="38" width="58" height="8" rx="4" fill="${C.white}" opacity="0.95"/>
    <rect x="10" y="51" width="58" height="8" rx="4" fill="${C.white}" opacity="0.85"/>
    <rect x="10" y="64" width="58" height="8" rx="4" fill="${C.white}" opacity="0.70"/>
  </g>
`;

/* ── Right-panel decorative element ──────────────────────── */
/*
  Large concentric circle cluster, bled off the right edge.
  Inner circles contain a faint agricultural grid (horizontal
  lines representing fields).
*/
const CX = 1050;
const CY = 315;

const rightPanel = `
  <!-- Outer glow rings -->
  <circle cx="${CX}" cy="${CY}" r="340" fill="${C.brand50}"  opacity="0.55"/>
  <circle cx="${CX}" cy="${CY}" r="270" fill="${C.brand100}" opacity="0.60"/>
  <circle cx="${CX}" cy="${CY}" r="200" fill="${C.brand200}" opacity="0.45"/>
  <circle cx="${CX}" cy="${CY}" r="140" fill="${C.brand300}" opacity="0.30"/>

  <!-- White field-row lines inside the main circle — clipped -->
  <defs>
    <clipPath id="field-clip">
      <circle cx="${CX}" cy="${CY}" r="260"/>
    </clipPath>
  </defs>
  <g clip-path="url(#field-clip)" opacity="0.18">
    ${Array.from({ length: 22 }, (_, i) => {
      const y = 100 + i * 20;
      return `<line x1="780" y1="${y}" x2="1340" y2="${y}" stroke="${C.brand800}" stroke-width="2.5"/>`;
    }).join("\n    ")}
  </g>

  <!-- Decorative dot cluster — lower-left of circle -->
  <circle cx="820" cy="440" r="6" fill="${C.brand600}" opacity="0.35"/>
  <circle cx="840" cy="460" r="4" fill="${C.brand600}" opacity="0.25"/>
  <circle cx="855" cy="430" r="5" fill="${C.brand600}" opacity="0.30"/>
`;

/* ── Full SVG ─────────────────────────────────────────────── */
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="1200" height="630" viewBox="0 0 1200 630">

  <!-- ── Background ──────────────────────────────────────── -->
  <rect width="1200" height="630" fill="${C.white}"/>

  <!-- ── Right decorative circle cluster ─────────────────── -->
  ${rightPanel}

  <!-- ── Left green accent bar ───────────────────────────── -->
  <rect x="0" y="0" width="8" height="630" fill="${C.brand600}"/>

  <!-- ── Bottom brand bar ────────────────────────────────── -->
  <rect x="0" y="598" width="1200" height="32" fill="${C.brand700}"/>

  <!-- ── Logo mark ────────────────────────────────────────── -->
  ${icon}

  <!-- ── Logo wordmark ─────────────────────────────────────── -->
  <text x="152" y="103"
        font-family="Arial, Helvetica, sans-serif"
        font-size="38" font-weight="700"
        fill="${C.brand900}" letter-spacing="2">FARMERCH</text>
  <text x="153" y="124"
        font-family="Arial, Helvetica, sans-serif"
        font-size="14" font-weight="400"
        fill="${C.brand600}" letter-spacing="3.5">GLOBAL LIMITED</text>

  <!-- ── Divider ───────────────────────────────────────────── -->
  <rect x="58" y="152" width="640" height="2" rx="1" fill="${C.gray200}"/>

  <!-- ── Eyebrow ───────────────────────────────────────────── -->
  <text x="58" y="198"
        font-family="Arial, Helvetica, sans-serif"
        font-size="14" font-weight="700"
        fill="${C.brand600}" letter-spacing="3">ENTERPRISE MECHANIZATION · SOUTHWESTERN NIGERIA</text>

  <!-- ── Headline ──────────────────────────────────────────── -->
  <text x="58" y="268"
        font-family="Arial, Helvetica, sans-serif"
        font-size="70" font-weight="700"
        fill="${C.brand900}">Professional Farm</text>
  <text x="58" y="350"
        font-family="Arial, Helvetica, sans-serif"
        font-size="70" font-weight="700"
        fill="${C.brand600}">Mechanization at Scale</text>

  <!-- ── Supporting copy ───────────────────────────────────── -->
  <text x="58" y="408"
        font-family="Arial, Helvetica, sans-serif"
        font-size="23" font-weight="400"
        fill="${C.gray700}">Connecting enterprise agricultural projects with verified</text>
  <text x="58" y="438"
        font-family="Arial, Helvetica, sans-serif"
        font-size="23" font-weight="400"
        fill="${C.gray700}">tractor operators across Southwestern Nigeria.</text>

  <!-- ── URL in bottom bar ─────────────────────────────────── -->
  <text x="58" y="620"
        font-family="Arial, Helvetica, sans-serif"
        font-size="17" font-weight="600"
        fill="${C.white}" opacity="0.90" letter-spacing="0.5">farmerch.co</text>

  <!-- ── Tagline in bottom bar ─────────────────────────────── -->
  <text x="1142" y="620"
        font-family="Arial, Helvetica, sans-serif"
        font-size="15" font-weight="400"
        fill="${C.white}" opacity="0.65"
        text-anchor="end">Powering Agriculture Across Southwestern Nigeria</text>

</svg>`;

/* ── Convert SVG → JPEG ───────────────────────────────────── */
await sharp(Buffer.from(svg))
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(OUT);

console.log(`✓ OG image written to ${OUT}`);
