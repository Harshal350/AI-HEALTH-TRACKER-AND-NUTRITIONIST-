<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" width="900" height="220" viewBox="0 0 900 220">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#081a0f"/>
      <stop offset="50%"  stop-color="#0f2d1a"/>
      <stop offset="100%" stop-color="#081a0f"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"  stop-color="#2d7a4f" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#081a0f" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="orb1" cx="30%" cy="40%" r="50%">
      <stop offset="0%"  stop-color="#1a5c32" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#081a0f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb2" cx="75%" cy="60%" r="45%">
      <stop offset="0%"  stop-color="#0f3d22" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#081a0f" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur1">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>

  <!-- Base -->
  <rect width="900" height="220" fill="url(#bg)" rx="16"/>

  <!-- Soft orbs -->
  <ellipse cx="270" cy="88" rx="260" ry="140" fill="url(#orb1)" filter="url(#blur1)"/>
  <ellipse cx="675" cy="132" rx="220" ry="120" fill="url(#orb2)" filter="url(#blur1)"/>

  <!-- Top shimmer line -->
  <rect x="0" y="0" width="900" height="1" fill="#2d7a4f" opacity="0.6" rx="1"/>
  <!-- Bottom shimmer line -->
  <rect x="0" y="219" width="900" height="1" fill="#2d7a4f" opacity="0.3" rx="1"/>

  <!-- Hex grid pattern (subtle) -->
  <g opacity="0.06" stroke="#5ecb8a" stroke-width="0.5" fill="none">
    <polygon points="60,30 80,18 100,30 100,54 80,66 60,54"/>
    <polygon points="100,54 120,42 140,54 140,78 120,90 100,78"/>
    <polygon points="140,30 160,18 180,30 180,54 160,66 140,54"/>
    <polygon points="780,140 800,128 820,140 820,164 800,176 780,164"/>
    <polygon points="820,116 840,104 860,116 860,140 840,152 820,140"/>
    <polygon points="760,164 780,152 800,164 800,188 780,200 760,188"/>
  </g>

  <!-- Leaf / organic accent left -->
  <g opacity="0.18" fill="#3d9e5f">
    <ellipse cx="52" cy="110" rx="18" ry="32" transform="rotate(-25 52 110)"/>
    <line x1="52" y1="78" x2="52" y2="142" stroke="#3d9e5f" stroke-width="0.8"/>
  </g>
  <!-- Leaf accent right -->
  <g opacity="0.14" fill="#3d9e5f">
    <ellipse cx="848" cy="108" rx="14" ry="26" transform="rotate(20 848 108)"/>
    <line x1="848" y1="82" x2="848" y2="134" stroke="#3d9e5f" stroke-width="0.8"/>
  </g>

  <!-- Main title -->
  <text x="450" y="102" font-family="Georgia, serif" font-size="62" font-weight="bold"
        fill="#a8f0c0" text-anchor="middle" letter-spacing="8">BIO-DIGITAL</text>

  <!-- Thin separator line under title -->
  <line x1="310" y1="116" x2="590" y2="116" stroke="#3d9e5f" stroke-width="0.8" opacity="0.7"/>

  <!-- Subtitle -->
  <text x="450" y="143" font-family="Georgia, serif" font-size="15" font-style="italic"
        fill="#5ecb8a" text-anchor="middle" letter-spacing="2" opacity="0.9">
    Precision Health &amp; Nutrition Tracker
  </text>

  <!-- Tag line -->
  <text x="450" y="174" font-family="Arial, sans-serif" font-size="11"
        fill="#3d7a52" text-anchor="middle" letter-spacing="4">
    CELLULAR NUTRITION · BIOMARKERS · AI-POWERED
  </text>

  <!-- Small dot accents -->
  <circle cx="316" cy="174" r="2" fill="#2d7a4f" opacity="0.5"/>
  <circle cx="584" cy="174" r="2" fill="#2d7a4f" opacity="0.5"/>

  <!-- Bottom wave -->
  <path d="M0 200 Q225 185 450 200 Q675 215 900 200 L900 220 L0 220 Z"
        fill="#0a1f12" opacity="0.6"/>
</svg>

<br/>

[![Live Demo](https://img.shields.io/badge/🌿%20LIVE%20DEMO-Open%20App-a8f0c0?style=for-the-badge&labelColor=0f2d1a&color=1a5c32)](https://harshal350.github.io/AI-HEALTH-TRACKER-AND-NUTRITIONIST-/)
&nbsp;
![Offline First](https://img.shields.io/badge/Offline--First-Client%20Side-1a5c32?style=for-the-badge&labelColor=0f2d1a)
&nbsp;
![No Server](https://img.shields.io/badge/No%20Server-Vanilla%20JS-1a5c32?style=for-the-badge&labelColor=0f2d1a)
&nbsp;
![TFjs](https://img.shields.io/badge/TensorFlow.js-MobileNet%20V1-1a5c32?style=for-the-badge&labelColor=0f2d1a)
&nbsp;
![Gemini](https://img.shields.io/badge/Gemini%20API-CHLOROPHYLL--v1-1a5c32?style=for-the-badge&labelColor=0f2d1a)

<br/>

> *Track cellular nutrition. Model dietary intake. Optimize human physiological biomarkers.*
> *Runs 100% in your browser — no server, no bundler, no compile steps.*

### 🌿 [→ Open Live App ←](https://harshal350.github.io/AI-HEALTH-TRACKER-AND-NUTRITIONIST-/)

</div>

---

## 🎬 Video Demonstration

> Full walkthrough — 3D scroll · biometric dashboard · meal builder · bio-scan · CHLOROPHYLL-v1 AI


https://github.com/user-attachments/assets/14b66faf-876e-40d9-b8d0-ca47ea82c11c

> ☝️ **Replace** the URL above with your actual video URL from GitHub's asset uploader.
> *(Drag your `.mp4` into any Issue comment box → copy the generated link → paste it here on its own line)*

---

## 🌱 Overview

**BIO-DIGITAL** is a premium, high-tech client-side web application designed to track cellular nutrition, model dietary intake, and optimize human physiological biomarkers. Built with a modular client-side architecture, the app runs entirely offline directly from the browser — no server, no bundler, no compile steps required.

```
Open index.html → Everything works. No setup.
```

---

## ✨ Key Features

| Module | Description | Tech |
|--------|-------------|------|
| 🎬 **3D Scroll Animation** | Hardware-accelerated canvas frame renderer with 240-frame 3D specimen, lerp-eased micro-damping | Canvas API |
| 📊 **Biometric Dashboard** | Bento-layout with Liquid Green SVG tube — tracks MEI, Electrolyte Balance, Bone Matrix Density | Chart.js |
| 🧬 **Active Meal Builder** | Recipe assimilator compiling macros with ML-style health grade A+ → F | Heuristic engine |
| 🔬 **Bio-Scan Classifier** | Drag-and-drop food image recognition via CNN inference in the browser | TensorFlow.js + MobileNet V1 |
| 🤖 **AI Consult — CHLOROPHYLL-v1** | Clinical nutrition chatbot with live Gemini API + offline rules-engine fallback | Gemini API |
| 🌿 **Organic Food Database** | 18-item standalone database with full micronutrient + vitamin profiles | Vanilla JS |

---

## 📡 Biometric Markers Tracked

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│   MEI  ───  Mitochondrial Energy Index                          │
│             ATP generation efficiency via B-vitamins + Magnesium │
│                                                                   │
│   EBI  ───  Electrolyte Balance Indicator                       │
│             K⁺ intracellular / Na⁺ extracellular needle dial     │
│                                                                   │
│   BMD  ───  Bone Matrix Density                                 │
│             Osteocalcin index via Vitamin K + Calcium load       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

```
Frontend     →  HTML5 · Tailwind CSS (CDN) · Vanilla CSS
Logic        →  Vanilla ES6 JavaScript (modular imports)
Effects      →  Glassmorphism · Radial gradients · Metallic panels · Chlorophyll glows
Data Viz     →  Chart.js (CDN) — real-time macronutrient doughnut charts
ML / AI      →  TensorFlow.js + MobileNet V1 (CDN) — client-side CNN inference
Gen AI       →  Google Gemini API (gemini-3.5-flash) — CHLOROPHYLL-v1 chat node
```

---

## 📁 Project Structure

```
HEALTH TRACKER/
├── index.html                 ← Main entry point (tab layout, navbar, core section grid)
├── README.md                  ← Project documentation
├── .gitignore                 ← Excludes secrets, OS & editor files from Git
│
├── css/
│   └── styles.css             ← Glow systems, glassmorphism, layout animations
│
├── js/
│   ├── config.js              ← [LOCAL ONLY] Gemini API Key (git-ignored)
│   ├── db.js                  ← Organic food database — 18 items + micronutrients
│   ├── chat.js                ← Chatbot manager & offline response fallbacks
│   ├── scan.js                ← Drag-and-drop listeners + TF.js classification
│   ├── compare.js             ← Metric comparison tables & horizontal gauges
│   ├── meal-builder.js        ← Recipe logging state & heuristic health grading
│   └── app.js                 ← Bootstrapper, dashboard charts, canvas preloader
│
└── FRAMES/
    ├── ezgif-frame-001.jpg
    └── ...                    ← 240 × JPEG — 3D rotating canvas animation sequence
```

---

## ⚙️ Running Locally

**Step 1 — Clone**
```bash
git clone https://github.com/harshal350/AI-HEALTH-TRACKER-AND-NUTRITIONIST-.git
cd AI-HEALTH-TRACKER-AND-NUTRITIONIST-
```

**Step 2 — Add Gemini API Key** *(optional — app works fully offline without it)*
```javascript
// Create this file: js/config.js  (already listed in .gitignore)
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
```

**Step 3 — Launch**
```bash
open index.html      # macOS
start index.html     # Windows
# or double-click index.html in your file explorer
```

> No Node.js · No npm · No localhost · Supports `file:///` protocol directly.

---

## 🔑 Gemini API Setup

1. Get a free key at [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create `js/config.js` locally:
   ```javascript
   const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. This file is pre-listed in `.gitignore` — it will **never** be committed.
4. If absent, the chatbot auto-falls back to the built-in offline rules engine — no errors thrown.

---

## 🌐 Live Demo

**[→ https://harshal350.github.io/AI-HEALTH-TRACKER-AND-NUTRITIONIST-/](https://harshal350.github.io/AI-HEALTH-TRACKER-AND-NUTRITIONIST-/)**

Hosted via GitHub Pages — no backend, no auth, loads instantly.

---

<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" width="900" height="80" viewBox="0 0 900 80">
  <defs>
    <linearGradient id="fbg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#081a0f"/>
      <stop offset="50%"  stop-color="#0f2d1a"/>
      <stop offset="100%" stop-color="#081a0f"/>
    </linearGradient>
  </defs>
  <rect width="900" height="80" fill="url(#fbg)" rx="12"/>
  <rect x="0" y="0" width="900" height="1" fill="#2d7a4f" opacity="0.5" rx="1"/>
  <text x="450" y="34" font-family="Georgia, serif" font-size="13" font-style="italic"
        fill="#5ecb8a" text-anchor="middle" letter-spacing="1" opacity="0.9">
    Built with 🌿 by Harshal Mahadik
  </text>
  <text x="450" y="58" font-family="Arial, sans-serif" font-size="10"
        fill="#2d5c3a" text-anchor="middle" letter-spacing="3">
    BIO-DIGITAL LABS · OPTIMIZING HUMAN POTENTIAL · © 2026
  </text>
</svg>

</div>
```
Open index.html → Everything works. No setup.
```

---

## ✨ Key Features

| Module | Description | Tech |
|--------|-------------|------|
| 🎬 **3D Scroll Animation** | Hardware-accelerated canvas frame renderer with 240-frame 3D specimen, lerp-eased micro-damping | Canvas API |
| 📊 **Biometric Dashboard** | Bento-layout with Liquid Green SVG tube — tracks MEI, Electrolyte Balance, Bone Matrix Density | Chart.js |
| 🧬 **Active Meal Builder** | Recipe assimilator compiling macros with ML-style health grade A+ → F | Heuristic engine |
| 🔬 **Bio-Scan Classifier** | Drag-and-drop food image recognition via CNN inference in the browser | TensorFlow.js + MobileNet V1 |
| 🤖 **AI Consult — CHLOROPHYLL-v1** | Clinical nutrition chatbot with live Gemini API + offline rules-engine fallback | Gemini API |
| 🌿 **Organic Food Database** | 18-item standalone database with full micronutrient + vitamin profiles | Vanilla JS |

---

## 📡 Biometric Markers Tracked

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│   MEI  ─── Mitochondrial Energy Index                           │
│            ATP generation efficiency via B-vitamins + Magnesium  │
│                                                                   │
│   EBI  ─── Electrolyte Balance Indicator                        │
│            K⁺ intracellular / Na⁺ extracellular needle dial      │
│                                                                   │
│   BMD  ─── Bone Matrix Density                                  │
│            Osteocalcin index via Vitamin K + Calcium load        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

```
Frontend     →  HTML5 · Tailwind CSS (CDN) · Vanilla CSS
Logic        →  Vanilla ES6 JavaScript (modular imports)
Effects      →  Glassmorphism · Radial gradients · Metallic panels · Chlorophyll glows
Data Viz     →  Chart.js (CDN) — real-time macronutrient doughnut charts
ML / AI      →  TensorFlow.js + MobileNet V1 (CDN) — client-side CNN inference
Gen AI       →  Google Gemini API (gemini-3.5-flash) — CHLOROPHYLL-v1 chat node
```

---

## 📁 Project Structure

```
HEALTH TRACKER/
├── index.html                 ← Main entry point (tab layout, navbar, core section grid)
├── README.md                  ← Project documentation
├── .gitignore                 ← Excludes secrets, OS & editor files from Git
│
├── css/
│   └── styles.css             ← Glow systems, glassmorphism, layout animations
│
├── js/
│   ├── config.js              ← [LOCAL ONLY] Gemini API Key (git-ignored)
│   ├── db.js                  ← Organic food database — 18 items + micronutrients
│   ├── chat.js                ← Chatbot manager & offline response fallbacks
│   ├── scan.js                ← Drag-and-drop listeners + TF.js classification
│   ├── compare.js             ← Metric comparison tables & horizontal gauges
│   ├── meal-builder.js        ← Recipe logging state & heuristic health grading
│   └── app.js                 ← Bootstrapper, dashboard charts, canvas preloader
│
└── FRAMES/
    ├── ezgif-frame-001.jpg
    └── ...                    ← 240 × JPEG — 3D rotating canvas animation sequence
```

---

## ⚙️ Running Locally

BIO-DIGITAL uses zero build tools. Just open and run.

**Step 1 — Clone**
```bash
git clone https://github.com/harshal350/AI-HEALTH-TRACKER-AND-NUTRITIONIST-.git
cd AI-HEALTH-TRACKER-AND-NUTRITIONIST-
```

**Step 2 — Add Gemini API Key** *(optional — app works offline without it)*
```javascript
// Create: js/config.js  (this file is pre-configured in .gitignore)
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
```

**Step 3 — Launch**
```bash
open index.html      # macOS
start index.html     # Windows
# or just double-click index.html in your file explorer
```

> No Node.js · No npm · No localhost · Supports `file:///` protocol directly.

---

## 🔑 Gemini API Setup

To activate the **CHLOROPHYLL-v1** live AI chat node:

1. Get a free key at [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create `js/config.js` locally:
   ```javascript
   const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. This file is pre-listed in `.gitignore` — it will **never** be committed.
4. If the file is absent (e.g. after a fresh clone), the chatbot automatically falls back to the built-in offline rules engine — no errors thrown.

---

## 🌐 Live Demo

**[→ https://harshal350.github.io/AI-HEALTH-TRACKER-AND-NUTRITIONIST-/](https://harshal350.github.io/AI-HEALTH-TRACKER-AND-NUTRITIONIST-/)**

Hosted via GitHub Pages — no backend, no auth, loads instantly.

---

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0d2e1a,50:1a4d2e,100:0d2e1a&height=120&section=footer&fontColor=5ecb8a&fontSize=14"/>

**Built with 🌿 by [Harshal Mahadik](https://github.com/harshal350)**

*BIO-DIGITAL LABS · Optimizing Human Potential · © 2026*

</div>
