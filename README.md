<div align="center">

<!-- LIQUID GLASS HERO BANNER -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0d2e1a,50:1a4d2e,100:0d2e1a&height=200&section=header&text=BIO-DIGITAL&fontSize=72&fontColor=a8f0c0&fontAlignY=38&desc=Precision%20Health%20%26%20Nutrition%20Tracker&descAlignY=60&descSize=18&descColor=5ecb8a&animation=fadeIn"/>

<br/>

<!-- LIVE DEMO BADGE -->
<a href="https://harshal350.github.io/AI-HEALTH-TRACKER-AND-NUTRITIONIST-/">
  <img src="https://img.shields.io/badge/🌿%20LIVE%20DEMO-Open%20App-1a4d2e?style=for-the-badge&labelColor=0d2e1a&color=2d7a4f&logoColor=a8f0c0" alt="Live Demo"/>
</a>
&nbsp;
<img src="https://img.shields.io/badge/Offline--First-Client%20Side-2d7a4f?style=for-the-badge&labelColor=0d2e1a" alt="Offline First"/>
&nbsp;
<img src="https://img.shields.io/badge/No%20Server-Vanilla%20JS-2d7a4f?style=for-the-badge&labelColor=0d2e1a" alt="No Server"/>
&nbsp;
<img src="https://img.shields.io/badge/TensorFlow.js-MobileNet%20V1-2d7a4f?style=for-the-badge&labelColor=0d2e1a" alt="TF.js"/>
&nbsp;
<img src="https://img.shields.io/badge/Gemini%20API-CHLOROPHYLL--v1-2d7a4f?style=for-the-badge&labelColor=0d2e1a" alt="Gemini"/>

<br/><br/>

> *Track cellular nutrition. Model dietary intake. Optimize human physiological biomarkers.*  
> *Runs 100% in your browser — no server, no bundler, no compile steps.*

<br/>

<!-- LIVE DEMO BUTTON (large) -->
### 🌿 [→ Open Live App](https://harshal350.github.io/AI-HEALTH-TRACKER-AND-NUTRITIONIST-/) ←

<br/>

</div>

---

## 🎬 Video Demonstration

> **Watch BIO-DIGITAL in action — full walkthrough of all modules**

<div align="center">

<!-- VIDEO PLACEHOLDER — replace src with your actual video path/URL -->

https://github.com/user-attachments/assets/YOUR-VIDEO-ID-HERE

<!-- If using a local file or YouTube, use one of these instead: -->
<!-- [![BIO-DIGITAL Demo](https://img.shields.io/badge/▶%20Watch%20Demo-YouTube-red?style=for-the-badge)](YOUR_YOUTUBE_URL) -->
<!-- <video src="./demo/bio-digital-demo.mp4" controls width="100%"></video> -->

*Full demonstration of: 3D scroll animation · biometric dashboard · meal builder · bio-scan classifier · CHLOROPHYLL-v1 AI chat*

</div>

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
