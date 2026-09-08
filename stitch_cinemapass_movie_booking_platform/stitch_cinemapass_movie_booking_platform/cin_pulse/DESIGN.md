---
name: CinéPulse
colors:
  surface: '#11131b'
  surface-dim: '#11131b'
  surface-bright: '#373942'
  surface-container-lowest: '#0c0e16'
  surface-container-low: '#191b23'
  surface-container: '#1d1f28'
  surface-container-high: '#282a32'
  surface-container-highest: '#33343d'
  on-surface: '#e1e1ed'
  on-surface-variant: '#d1c5b2'
  inverse-surface: '#e1e1ed'
  inverse-on-surface: '#2e3039'
  outline: '#9a8f7e'
  outline-variant: '#4e4637'
  surface-tint: '#edc062'
  primary: '#ffe5b7'
  on-primary: '#402d00'
  primary-container: '#f3c667'
  on-primary-container: '#6f5100'
  inverse-primary: '#795900'
  secondary: '#ffb4aa'
  on-secondary: '#690003'
  secondary-container: '#e10111'
  on-secondary-container: '#fff1ef'
  tertiary: '#e1e8fa'
  on-tertiary: '#2a313e'
  tertiary-container: '#c5ccdd'
  on-tertiary-container: '#4f5665'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea0'
  primary-fixed-dim: '#edc062'
  on-primary-fixed: '#261a00'
  on-primary-fixed-variant: '#5c4300'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4aa'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#930007'
  tertiary-fixed: '#dce2f4'
  tertiary-fixed-dim: '#c0c6d7'
  on-tertiary-fixed: '#151c28'
  on-tertiary-fixed-variant: '#404755'
  background: '#11131b'
  on-background: '#e1e1ed'
  surface-variant: '#33343d'
typography:
  display-hero:
    fontFamily: Syne
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Syne
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-meta:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  grid-margin-desktop: 4rem
  grid-margin-mobile: 1.25rem
  gutter-desktop: 1.5rem
  gutter-mobile: 0.75rem
  seat-gap: 0.375rem
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
---

## Brand & Style

The design system channels an uncompromising, sensory-driven cinematic world where the digital box office feels like stepping into a private, high-end screening room. It synthesizes the editorial restraint of A24, the structural precision of an IMAX auditorium, and the hospitality warmth of Alamo Drafthouse. 

The aesthetic is built upon **Dark Glassmorphism infused with Ambient Luminance**. Surfaces mimic ultra-pure optical glass tinted with obsidian, suspended in front of deep, atmospheric theater blacks. Accent lights bleed gently into darkness, establishing an immediate visceral connection to the silver screen. The interface prioritizes high contrast, crisp legibility, and architectural spatial layouts that make movie discovery and seat selection intuitive, tactile, and visually stunning.

## Colors

The palette embraces the drama of the auditorium: an endless depth of field anchored by rich blacks, punctured by warm theatrical gold and electric crimson.

- **Primary (`#F3C667` / `#E5A93C`):** Cinematic Gold. Reserved for primary calls-to-action, active seat selections, VIP status tiers, and premier badge accents. Emits warmth against the void.
- **Secondary (`#E50914` / `#FF3B30`):** Electric Ruby. Conveys urgency, live showtime alerts, sold-out statuses, and high-energy highlights.
- **Neutral Surface System:**
  - Base Void: `#0B0C10` (Root viewport background)
  - Surface Tier 1: `#12141C` (Primary card containers and modals)
  - Surface Tier 2: `#181A24` (Hover states, seat matrix trays, floating toolbars)
  - Glass Overlay: `rgba(24, 26, 36, 0.72)` paired with `backdrop-filter: blur(16px)`
  - Border Hairline: `rgba(243, 198, 103, 0.12)` on primary elements; `rgba(255, 255, 255, 0.08)` on generic dividers
- **Neutral Content System:**
  - High Contrast Text: `#FFFFFF`
  - Subtle & Metadata Text (`#8E95A5`): Crisp silver-slate calibrated for screen ratio labels, audio formats (Dolby Atmos, IMAX 70mm), and runtimes.

## Typography

Typography establishes an editorial rhythm: bold, sculptural display typography via **Syne** balances the structural, highly engineered legibility of **Plus Jakarta Sans** for metadata and tabular seating matrices.

- Use uppercase tracking for `label-caps` on auditorium specs (e.g., `IMAX DUAL 4K LASER`, `DOLBY CINEMA 3D`).
- Film titles in listings and hero sections rely on `Syne` with tightened tracking (`-0.02em`) to project architectural presence.
- Movie ratings, duration timestamps, and seat coordinates must utilize fixed-width numeric rendering (`font-variant-numeric: tabular-nums`) within `Plus Jakarta Sans`.

## Layout & Spacing

The layout model adopts a 12-column responsive fluid grid with high horizontal breathing room to mirror the scale of wide-aspect cinema screens (2.39:1).

- **Desktop (1200px+):** 12 columns, 64px margins, 24px gutters. Seat maps expand inside a dedicated bounded container up to 1440px max width.
- **Tablet (768px - 1199px):** 8 columns, 32px margins, 16px gutters. Showtimes wrap into horizontally scrollable pill rails.
- **Mobile (Under 768px):** 4 columns, 20px margins, 12px gutters. The seating layout transforms into a pan-and-pinch canvas with a persistent, floating glass bottom sheet for booking summary and checkout.

## Elevation & Depth

Visual hierarchy uses directional light and dark glass rather than muddy drop shadows:

1. **The Floor (`#0B0C10`):** Pitch black canvas.
2. **Glass Panels (`rgba(24, 26, 36, 0.65)`):** Backdropped by `blur(20px)` with a 1px border stroke of `rgba(255, 255, 255, 0.08)`.
3. **Screen Glow & Backdrop Radiance:** Visualized through radial ambient light cones (`radial-gradient(ellipse at top, rgba(243, 198, 103, 0.15), transparent 70%)`) emitting directly downward from the auditorium screen representation or key film artwork.
4. **Active Selection Elevation:** Selected seats, active booking cards, and trigger buttons cast a luminous halo: `box-shadow: 0 0 24px -4px rgba(243, 198, 103, 0.45)`.

## Shapes

The interface balances sharp technological precision with ergonomic tactility:

- **Seating Elements:** 6px rounded squares with an arched upper rim, abstracting an overhead theater lounger.
- **Surface Cards:** 16px corner radius (`rounded-lg`), producing soft organic edges that offset sharp typographic contrast.
- **Filter Tags & Showtime Chips:** Fully rounded pills (`rounded-full`) delivering a tactile, pebble-like quality when tapped.
- **The Auditorium Curved Screen:** An SVG arc with a 4% subtle upward parabolic curve, featuring a gradient stroke tapering from bright center to translucent edges.

## Components

### Buttons
- **Primary CTA:** Background `linear-gradient(135deg, #F3C667 0%, #E5A93C 100%)`, solid rich obsidian text (`#0B0C10`), font-weight 700. On hover: subtle scale `1.02` with an intensified golden ambient glow.
- **Secondary / Glass Button:** Translucent `#181A24` at 60% opacity with a 1px border in `rgba(243, 198, 103, 0.3)`. Text is pure white.
- **Destructive / Cancellation:** Electric Crimson border (`#E50914`) with a 10% red tint fill.

### Seat Selection Matrix
- **Available:** Crisp border in `rgba(255, 255, 255, 0.25)`, translucent slate-tint fill (`rgba(142, 149, 165, 0.1)`). Transitions to warm gold border on hover.
- **Reserved / Occupied:** Dimmed solid `#1A1D26`, stroke non-existent, cursor `not-allowed`, opacity 0.35.
- **Selected:** Solid `#F3C667`, dynamic glow `0 0 14px rgba(243, 198, 103, 0.6)`. Icon or seat letter in `#0B0C10`.
- **VIP / Recliner:** Two-tier wide pill footprint; gold border highlight with a subtle interior jewel-gradient.

### Showtime Pills
- Horizontal interactive chips containing time (14px, semi-bold) stacked over audio/projection format tag (10px, uppercase slate). 
- Active state fills with gold-to-charcoal transition; Sold-Out state features diagonal strike line with muted text.

### Movie Poster Glass Card
- Aspect ratio 2:3. Uses a 1px hairline top edge highlight simulating real physical glass (`border-top: 1px solid rgba(255,255,255,0.2)`). 
- Hover triggers a smooth vertical pan of key visual artwork, revealing format badges (IMAX, 4DX) and a rapid "Quick Book" slide-up drawer.

### Input Fields & Search
- Solid `#12141C` fill with a recessed inner stroke (`rgba(255, 255, 255, 0.06)`). 
- On focus: outline shifts to `#F3C667` with zero blur, accompanied by an ultra-subtle gold glow ring. Placeholder text styled in muted slate `#8E95A5`.