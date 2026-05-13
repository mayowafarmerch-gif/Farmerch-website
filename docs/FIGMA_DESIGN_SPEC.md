# Farmerch Global Limited — Website Design Specifications

> **Authoritative UI/UX Implementation Reference**
>
> This file is the single authoritative design contract for the Farmerch Global Limited website.
> Every component, section, and interactive element built for this project must be implemented
> in accordance with the specifications defined below. When a design decision is unclear, this
> document takes precedence. Do not deviate from color values, spacing rules, typography scales,
> or component structures without updating this file first.

---

## Table of Contents

1. [Brand Identity](#1-brand-identity)
2. [Layout Structure](#2-layout-structure)
3. [Components Specifications](#3-components-specifications)
4. [Interactive Elements](#4-interactive-elements)
5. [Responsive Design](#5-responsive-design)
6. [Imagery](#6-imagery)
7. [Icons](#7-icons)
8. [Accessibility](#8-accessibility)
9. [Performance](#9-performance)
10. [Content Guidelines](#10-content-guidelines)
11. [Technical Implementation](#11-technical-implementation)
12. [Future Enhancements](#12-future-enhancements)

---

## 1. Brand Identity

### Logo

- **File:** `src/imports/Picture1.png`
- **Usage:**
  - Header: Height of `32px` (`h-8`)
  - Footer: Height of `32px` (`h-8`) with white color treatment (`brightness-0 invert` for dark backgrounds)
  - Placement: Left-aligned in header navigation, top of footer

---

### Color Palette

#### Primary Colors

| Token | Hex | Usage |
|---|---|---|
| Green 600 | `#059669` | Primary brand color for CTAs, headings, icons |
| Green 700 | `#047857` | Hover states for primary buttons |
| Green 500 | `#10b981` | Accent elements |
| Green 400 | `#34d399` | Light accents (footer icons) |
| Green 100 | `#d1fae5` | Background for icon containers |
| Green 50  | `#f0fdf4` | Section backgrounds, subtle highlights |

#### Secondary Colors

| Token | Hex | Usage |
|---|---|---|
| Blue 50   | `#eff6ff` | Used in gradient backgrounds |
| Gray 900  | `#111827` | Primary text, footer background |
| Gray 800  | `#1f2937` | Secondary dark elements |
| Gray 700  | `#374151` | Body text |
| Gray 600  | `#4b5563` | Muted text |
| Gray 400  | `#9ca3af` | Footer text on dark backgrounds |
| Gray 200  | `#e5e7eb` | Borders |
| Gray 100  | `#f3f4f6` | Subtle borders |
| Gray 50   | `#f9fafb` | Light section backgrounds |
| White     | `#ffffff` | Backgrounds, card surfaces |

#### Color Usage Guidelines

- **Primary CTAs:** Green 600 background, white text
- **Secondary CTAs:** Green 600 border, green 600 text, transparent background
- **Hover States:** Green 700 for buttons, Green 600 for text links
- **Service Cards:** White background with Gray 200 borders
- **Statistics:** Green 600 for numbers, gray for labels
- **Success States:** Green 50 background with Green 200 border

---

### Typography

#### Font Family

- **Primary Font:** System font stack (default Tailwind)
- Use browser defaults for optimal performance

#### Font Sizes

**Hero Heading:**
- Mobile: `text-4xl` (36px)
- Tablet: `text-5xl` (48px)
- Desktop: `text-6xl` (60px)

**Section Headings:**
- Mobile: `text-3xl` (30px)
- Desktop: `text-4xl` (36px)

**Card Headings:** `text-xl` (20px) to `text-2xl` (24px)

**Body Text:** `text-base` (16px) to `text-lg` (18px)

**Small Text:** `text-sm` (14px)

**Caption:** `text-xs` (12px)

#### Font Weights

- **Bold:** `font-bold` (700) — Headings, CTAs, statistics
- **Medium:** `font-medium` (500) — Button text, labels
- **Normal:** `font-normal` (400) — Body text

---

## 2. Layout Structure

### Container

- **Max Width:** `max-w-7xl` (1280px)
- **Horizontal Padding:**
  - Mobile: `px-4` (16px)
  - Tablet: `px-6` (24px)
  - Desktop: `px-8` (32px)
- **Centering:** `mx-auto`

### Spacing System

| Context | Class | Value |
|---|---|---|
| Section Padding | `py-20` | 80px top/bottom |
| Component Padding | `py-16` | 64px top/bottom |
| Card Padding | `p-6` to `p-8` | 24px to 32px |
| Gap — Small | `gap-4` | 16px |
| Gap — Medium | `gap-6` | 24px |
| Gap — Large | `gap-8` | 32px |
| Gap — Extra Large | `gap-12` | 48px |

### Grid System

- **2-Column:** `grid md:grid-cols-2`
- **3-Column:** `grid lg:grid-cols-3`
- **4-Column:** `grid lg:grid-cols-4`
- **Responsive:** Mobile-first, stacks to single column on mobile

---

## 3. Components Specifications

### 3.1 Header / Navigation

#### Structure

| Property | Value |
|---|---|
| Position | Fixed (`fixed top-0 left-0 right-0`) |
| Z-Index | `z-50` |
| Background | Semi-transparent white (`bg-white/95 backdrop-blur-sm`) |
| Border | Bottom border (`border-b border-gray-200`) |
| Height | `h-16` (64px) |

#### Desktop Navigation

- **Items:** Services, How It Works, Coverage, Contact
- **Text Color:** Gray 700, hover to Green 600
- **CTA Button:** Green 600 background, white text, `px-6 py-2 rounded-lg`
- **Spacing:** `gap-8` between items

#### Mobile Navigation

- **Toggle:** Hamburger icon (`Menu`/`X` from `lucide-react`)
- **Menu:** Slides down below header
- **Items:** Stacked vertically with `gap-4`
- **Breakpoint:** Hidden on `md:` and above

---

### 3.2 Hero Section

#### Layout

- **Grid:** 2 columns on desktop (`grid lg:grid-cols-2`)
- **Vertical Padding:** `pt-24 pb-16` (extra top padding for fixed header)
- **Background:** Gradient from `green-50` to `blue-50`

#### Content Elements

**Badge:**
- Background: Green 100
- Text: Green 800
- Padding: `px-4 py-2`
- Border radius: `rounded-full`
- Font size: `text-sm`

**Heading:**
- Font size: Responsive (`4xl` to `6xl`)
- Color: Gray 900
- Weight: Bold
- Margin bottom: `mb-6`

**Description:**
- Font size: `text-lg`
- Color: Gray 600
- Margin bottom: `mb-8`

**CTA Buttons:**
- Layout: Flex row on desktop, column on mobile
- Primary: Green 600 bg, white text, with arrow icon
- Secondary: Border `2px` Green 600, green text
- Padding: `px-8 py-4`
- Border radius: `rounded-lg`
- Icons: From `lucide-react` (`ArrowRight`)

**Feature List:**
- Grid: 2 columns
- Icons: Green 600 `CheckCircle`
- Icon size: `w-5 h-5`
- Text: Gray 700

#### Image Section

- **Aspect Ratio:** 4:3
- **Border Radius:** `rounded-2xl`
- **Shadow:** `shadow-2xl`
- **Source:** Unsplash images of tractors/farming

**Stats Card (Desktop only):**
- Position: Absolute bottom-left (`-bottom-6 -left-6`)
- Background: White
- Shadow: `shadow-xl`
- Padding: `p-6`
- Number: `text-3xl font-bold text-green-600`
- Label: `text-sm text-gray-600`

---

### 3.3 Services Section

#### Section

- **Background:** White
- **Padding:** `py-20`

#### Section Header

- **Text align:** Center
- **Heading:** `text-3xl sm:text-4xl font-bold`
- **Description:** `text-lg text-gray-600` with `max-w-3xl mx-auto`
- **Margin bottom:** `mb-16`

#### Service Cards

**Grid:** 3 columns on desktop (`grid md:grid-cols-2 lg:grid-cols-3`)

**Card Styling:**
- Background: White
- Border: `border border-gray-200`
- Border radius: `rounded-xl`
- Padding: `p-6`
- Hover: `hover:shadow-lg transition-shadow`

**Icon Container:**
- Background: Green 100
- Size: `w-12 h-12`
- Border radius: `rounded-lg`
- Icon: Green 600, `w-6 h-6`
- Icons: `Tractor`, `Sprout`, `Wheat`, `Users`, `MapPin`, `Clock`

**Card Title:** `text-xl font-bold text-gray-900 mb-2`

**Card Description:** `text-gray-600 mb-4`

**Feature List:**
- Bullet: Green 600 circle (`w-1.5 h-1.5 bg-green-600 rounded-full`)
- Text: `text-sm text-gray-700`

#### Partnership CTA Card

- **Background:** Gradient Green 600 to Green 700
- **Border radius:** `rounded-2xl`
- **Padding:** `p-8 sm:p-12`
- **Text color:** White
- **Grid:** 2 columns on desktop

**Stats Grid:**
- 2×2 grid
- Number: `text-4xl font-bold`
- Label: `text-green-100 text-sm`

---

### 3.4 How It Works Section

#### Section

- **Background:** Gray 50
- **Padding:** `py-20`

#### Process Steps

**Grid:** 3 columns (`grid md:grid-cols-2 lg:grid-cols-3`)

**Card Styling:**
- Background: White
- Border: Gray 200
- Border radius: `rounded-xl`
- Padding: `p-6`
- Hover: Border changes to Green 300

**Step Number:**
- Text: `"STEP 1"`, `"STEP 2"`, etc.
- Color: Green 600
- Font: `text-sm font-bold`

**Icons:** `FileText`, `Users`, `Calendar`, `Settings`, `CheckCircle`, `TrendingUp`

**Connector (Desktop):** Gray 200 line between cards

#### Benefit Cards

- **Grid:** 2 columns
- **Styling:** White background, gray border, `rounded-xl p-8`
- **Title:** `text-xl font-bold text-gray-900`
- **List Items:** Green 600 `CheckCircle` icons with gray text

---

### 3.5 Coverage Section

#### Section

- **Background:** Gradient from `green-50` to `blue-50`
- **Padding:** `py-20`

#### Current Coverage Card

- **Background:** White
- **Border radius:** `rounded-2xl`
- **Padding:** `p-8 sm:p-12`
- **Grid:** 2 columns on desktop

**State Tags:**
- Background: Green 50
- Text: Green 700
- Padding: `px-3 py-1`
- Border radius: `rounded-full`
- Font size: `text-sm`
- States: Oyo, Ekiti, Osun, Ogun, Ondo

**Statistics:**
- Background: Green 50
- Border radius: `rounded-lg`
- Padding: `p-6`
- Number: `text-3xl font-bold text-green-600`
- Label: `text-sm text-gray-700`

#### Expansion Plans Card

- **Border:** `2px` Green 200
- **Icon:** `TrendingUp`
- **Timeline Grid:** 3 columns

**Milestones:**
- 2026: 5+ Nigerian states
- 2027: Nationwide coverage
- 2028+: West African expansion

---

### 3.6 Quote Request Form

#### Section

- **Background:** White
- **Padding:** `py-20`
- **Max width:** `max-w-4xl`

#### Form Container

- **Background:** Gray 50
- **Border:** Gray 200
- **Border radius:** `rounded-2xl`
- **Padding:** `p-8 sm:p-12`

#### Form Fields

**Layout:** 2-column grid on desktop (`grid md:grid-cols-2`)

**Input Styling:**
- Background: White
- Border: Gray 300
- Padding: `px-4 py-3`
- Border radius: `rounded-lg`
- Focus: Ring Green 500, border transparent

**Field Types:**

| Field | Type | Options |
|---|---|---|
| Organization Type | Dropdown | Commercial Farm, Government, Cooperative, Financial Institution, Other |
| Organization Name | Text input | — |
| Contact Name | Text input | — |
| Email | Email input | — |
| Phone | Tel input | +234 format |
| Service Type | Dropdown | Land Preparation, Planting, Harvesting, Full Cycle, Custom |
| Farm Size | Text input | Hectares |
| Location | Text input | City, State |
| Timeline | Dropdown | Immediate, 1–2 weeks, 2–4 weeks, 1–2 months, Flexible |
| Message | Textarea | 4 rows, non-resizable |

#### Submit Button

- **Width:** Full width
- **Background:** Green 600
- **Text:** White
- **Padding:** `px-8 py-4`
- **Icon:** `Send` (lucide-react)
- **Hover:** Green 700

#### Success State

- **Background:** Green 50
- **Border:** `2px` Green 200
- **Icon:** Green `CheckCircle` in Green 100 circle
- **Display:** Shows for 3 seconds after submission
- **Reset:** Form clears after success message

---

### 3.7 Footer

#### Structure

- **Background:** Gray 900
- **Text:** White
- **Padding:** `py-16`

#### Grid Layout

- **Columns:** 4 on desktop (`grid md:grid-cols-2 lg:grid-cols-4`)
- **Gap:** `gap-12`

#### Column 1: Brand

- **Logo:** White version (inverted)
- **Description:** Gray 400 text
- **Social Icons:**
  - Background: Gray 800
  - Hover: Gray 700
  - Size: `w-5 h-5`
  - Platforms: Facebook, Twitter, LinkedIn, Instagram

#### Column 2: Quick Links

- **Links:** Services, How It Works, Coverage, Request Quote
- **Color:** Gray 400
- **Hover:** Green 400
- **Behavior:** Smooth scroll to sections

#### Column 3: Services List

- **Items:** Static list in Gray 400
  - Land Preparation
  - Planting Operations
  - Harvesting
  - Project Coordination
  - Tractor Network

#### Column 4: Contact Information

- **Icons:** `MapPin`, `Phone`, `Mail` (Green 400)
- **Address:** "Southwestern Nigeria / Osun, Ogun, Oyo, Ekiti, Ondo"
- **Phone:** +234 813 951 6150
- **Email:** info@farmerch.co
- **Links:** Hover to Green 400

#### Copyright Bar

- **Border:** Top border Gray 800
- **Padding:** `pt-8`
- **Layout:** Flex row (desktop), column (mobile)
- **Text:** Gray 400, `text-sm`
- **Links:** Privacy Policy, Terms of Service, Cookie Policy

---

## 4. Interactive Elements

### Smooth Scrolling

- All navigation links use smooth scroll behavior
- **Implementation:** `element.scrollIntoView({ behavior: 'smooth' })`

### Hover States

- **Buttons:** Background color transition
- **Links:** Text color transition
- **Cards:** Shadow transition
- **Duration:** Default Tailwind transition

### Mobile Menu

- **Toggle:** `useState` for menu open/close
- **Animation:** Slide down effect
- **Close:** Automatically closes when nav item clicked

### Form Interactions

- **Validation:** HTML5 `required` attributes
- **Focus States:** Green ring on active inputs
- **Submit:** Prevents default, shows success state
- **Reset:** Auto-reset after 3 seconds

---

## 5. Responsive Design

### Breakpoints

| Label | Width |
|---|---|
| Mobile | `< 768px` (default) |
| Tablet | `≥ 768px` (`md:`) |
| Desktop | `≥ 1024px` (`lg:`) |
| Wide | `≥ 1280px` (`xl:`) |

### Mobile-First Approach

- Base styles target mobile
- Use `md:` and `lg:` prefixes for larger screens
- Grids collapse to single column on mobile
- Text sizes scale down on mobile
- Padding/spacing reduces on mobile
- Navigation switches to hamburger menu

### Key Responsive Behaviors

| Element | Mobile | Desktop |
|---|---|---|
| Hero | Image below text | 2-column grid |
| Stats card | Hidden | Visible (`lg:block`) |
| Navigation | Hamburger menu | Inline links |
| Grids | 1 column | 2–3+ columns |
| Button groups | Stack vertically | Flex row |
| Footer columns | Stack | 4-column grid |

---

## 6. Imagery

### Image Sources

- **Hero/Sections:** Unsplash photos
- **Search Terms:** `"tractor farming agriculture"`, `"farm machinery field work"`
- **Optimization:** Use Unsplash CDN with appropriate sizing parameters

### Image Component

- **Component:** `ImageWithFallback`
- **Path:** `src/app/components/figma/ImageWithFallback.tsx`
- **Usage:** For dynamically added images only

---

## 7. Icons

### Library

- **Package:** `lucide-react`
- **Size:** Typically `w-5 h-5` or `w-6 h-6`

### Common Icons

| Category | Icons |
|---|---|
| Navigation | `Menu`, `X`, `ArrowRight` |
| Services | `Tractor`, `Sprout`, `Wheat`, `Users`, `MapPin`, `Clock` |
| Process | `FileText`, `Calendar`, `Settings`, `CheckCircle`, `TrendingUp` |
| Contact | `Phone`, `Mail`, `MapPin` |
| Social | `Facebook`, `Twitter`, `Linkedin`, `Instagram` |

---

## 8. Accessibility

### Color Contrast

- Ensure WCAG AA compliance
- Green 600 on white: ✓ Pass
- White on Green 600: ✓ Pass
- Gray 700 on white: ✓ Pass

### Interactive Elements

- All buttons have hover states
- Form inputs have focus states
- Links are clearly distinguishable
- Icon buttons include text labels

### Semantic HTML

- Proper heading hierarchy (`h1`, `h2`, `h3`)
- `<section>` elements for major sections
- `<nav>` element for navigation
- `<form>` with proper labels

---

## 9. Performance

### Optimization Strategies

- Use Tailwind CSS for minimal CSS payload
- Lazy load images below the fold
- Use Unsplash CDN for optimized images
- Minimize JavaScript bundle size
- Leverage browser caching with fixed header

---

## 10. Content Guidelines

### Tone of Voice

- Professional and authoritative
- Industry-focused (B2B language)
- Clear and direct
- Solution-oriented

### Key Messages

- Professional farm mechanization at scale
- B2B model connecting projects with operators
- Trusted network of tractor owners
- Quality-controlled, on-time delivery
- Currently serving Southwest Nigeria
- Expansion plans across Nigeria and West Africa

### Call-to-Actions

- **Primary:** "Request a Quote" / "Request Quote"
- **Secondary:** "How It Works", "Get Started Today"
- **Urgency:** "For urgent inquiries, call..."

---

## 11. Technical Implementation

### Framework

- **React:** 18.3.1
- **Build Tool:** Vite
- **CSS:** Tailwind CSS v4

### Key Dependencies

| Package | Purpose |
|---|---|
| `lucide-react` | Icons |
| `react-hook-form` | Form handling (if needed) |
| `motion/react` | Animations (if needed) |

### File Structure

```
src/
├── app/
│   ├── App.tsx                    # Main component
│   └── components/
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── Services.tsx
│       ├── HowItWorks.tsx
│       ├── Coverage.tsx
│       ├── QuoteForm.tsx
│       └── Footer.tsx
├── imports/
│   └── Picture1.png               # Logo
└── styles/
    ├── theme.css
    └── fonts.css
```

### State Management

- Local component state with `useState`
- No global state management needed
- Form state in `QuoteForm` component
- Mobile menu state in `Header` component

---

## 12. Future Enhancements

### Phase 2 Features

- Backend integration for quote form
- Email notification system
- Project tracking dashboard
- Tractor owner portal
- Real-time availability checker
- Multi-language support (Yoruba, Igbo, Hausa)
- Blog/News section
- Case studies/testimonials
- Interactive coverage map

### Analytics & Tracking

- Google Analytics integration
- Form submission tracking
- CTA click tracking
- User journey analysis
