---
name: Chlorophyll Tech
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#9ddf2e'
  on-secondary: '#213600'
  secondary-container: '#83c300'
  on-secondary-container: '#304b00'
  tertiary: '#95d3ba'
  on-tertiary: '#003829'
  tertiary-container: '#71af97'
  on-tertiary-container: '#004231'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#b2f746'
  secondary-fixed-dim: '#98da27'
  on-secondary-fixed: '#121f00'
  on-secondary-fixed-variant: '#334f00'
  tertiary-fixed: '#b0f0d6'
  tertiary-fixed-dim: '#95d3ba'
  on-tertiary-fixed: '#002117'
  on-tertiary-fixed-variant: '#0b513d'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  max-width: 1280px
---

## Brand & Style

The visual identity of the design system centers on a "Bio-Digital" philosophy. It merges the clinical precision of a high-tech health laboratory with the vibrant, life-affirming energy of organic nature. The target audience consists of health-conscious high-performers who value both scientific data and natural wellness.

The style is **High-Tech Organic**, characterized by:
- **Metallic Textures:** Subtle brushed metal overlays on deep green surfaces to evoke premium medical-grade equipment.
- **Luminous Accents:** Sharp, lime-green highlights that simulate digital displays and biological vitality.
- **Imagery:** High-definition photography of fresh produce with macro details (water droplets, skin textures) to ground the tech aesthetic in nature.

## Colors

The palette is anchored in a dark-mode environment to make the green metallic effects and lime accents pop with high contrast.

- **Primary (Emerald):** Used for key brand moments and active states.
- **Secondary (Lime):** Reserved for "energy" moments—call-to-actions, success states, and progress indicators.
- **Tertiary (Deep Moss):** Used for background surfaces and containers to provide depth.
- **Neutral (Carbon Slate):** A deep, near-black slate used for the primary background to maintain a sophisticated, technical feel.
- **Metallic Gradient:** Surfaces should utilize a linear gradient (135deg) from `#1E293B` to `#0F172A` with a 2% noise overlay to simulate brushed metal.

## Typography

The typography strategy balances geometric "tech" fonts with approachable, readable sans-serifs.

- **Headlines:** Sora provides a futuristic, geometric structure that feels clean and engineered.
- **Body:** Be Vietnam Pro offers a friendly, contemporary rhythm that ensures long-form health data remains accessible and warm.
- **Data Labels:** JetBrains Mono is used for numerical data, timestamps, and technical metrics to reinforce the "tracking" and precision aspect of the design system.

## Layout & Spacing

The design system utilizes a **12-column fluid grid** for desktop and a **single-column fluid layout** for mobile. 

- **Rhythm:** An 8px base unit governs all padding and margin decisions.
- **Precision:** Use generous white space (or "dark space") to prevent the metallic textures from feeling cluttered.
- **Breakpoints:**
  - Mobile: 0px - 767px (20px margins)
  - Tablet: 768px - 1023px (32px margins)
  - Desktop: 1024px+ (64px margins, 1280px max-width)

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Sleek Outlines** rather than heavy shadows.

- **Surfaces:** Use deep emerald and slate backgrounds. Higher elevation levels are indicated by lighter, more "brushed" metallic gradients.
- **Borders:** Instead of shadows, use 1px "inner-glow" borders. Use a semi-transparent lime (e.g., `rgba(163, 230, 53, 0.2)`) on the top and left edges of cards to simulate a light source hitting a metallic edge.
- **Glassmorphism:** Use subtle backdrop blurs (12px) for navigation bars and floating overlays to maintain the high-tech, layered feel.

## Shapes

The shape language is "Squircle-inspired"—clean and modern.

- **Standard Radius:** 0.5rem (8px) for cards and inputs.
- **Large Radius:** 1.5rem (24px) for major layout containers or featured image masks.
- **Interactive Elements:** Buttons utilize the standard radius but never go full pill-shape, maintaining a more structured, technical silhouette.

## Components

### Buttons
- **Primary:** Linear gradient from Emerald to Lime. Text is dark slate for maximum legibility. 
- **Secondary:** Transparent background with a 1px metallic silver border. Text in white or lime.

### Cards
- Surfaces use the "Brushed Metal" gradient (Slate to Charcoal).
- 1px stroke using a low-opacity Emerald.
- Top-right corner often features a small Lime "status" light or data-label.

### Input Fields
- Dark, recessed background.
- Focus state: The border transitions to a vibrant Lime glow with a subtle outer neon blur.

### Chips & Tags
- Used for nutrient tracking (e.g., "High Protein," "Organic").
- Small, uppercase JetBrains Mono text.
- Backgrounds are semi-transparent versions of the primary green.

### Progress Gauges
- Circular or bar charts should use "Liquid Green" aesthetics—gradients that look like glowing tubes of chlorophyll.