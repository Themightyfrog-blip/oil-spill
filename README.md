# AEGIS-SPILL: AI-Powered Oil Spill Detection, Source Estimation & Forecasting System

> **Smart India Hackathon Prototype** • Autonomous Maritime Surveillance & Environmental Intelligence  
> *Note: This application operates in **DEMO MODE** with **SIMULATED DATA** for operational workflow demonstration.*

---

## 🌊 1. Project Overview

**AEGIS-SPILL** is a full-stack maritime intelligence system designed to detect, characterize, trace, and forecast offshore marine oil spills. 

The system demonstrates an end-to-end operational workflow:
1. **SAR Ingestion & Deep Learning Detection**: Ingestion of simulated Sentinel-1 Synthetic Aperture Radar (SAR) imagery, Lee-filtered speckle reduction, and U-Net deep segmentation of dark surface slicks.
2. **Spill Characterization**: Automatic extraction of slick polygon boundaries, surface area ($km^2$), length, width, orientation, and estimated decanted volume.
3. **MetOcean Hydrodynamic Forcing**: Assimilation of wind vectors (ECMWF), surface ocean currents (HYCOM), waves, and tidal ebb/flood cycles.
4. **Hindcast / Lagrangian Backtracking**: Stochastic reverse particle dispersion tracking (500 particles) to identify the **Probable Source Region** and discharge time window.
5. **Historical AIS Vessel Correlation**: Intersecting historical AIS vessel tracks with the source region to evaluate candidate vessels based on spatial proximity, temporal overlap, kinematic alignment, and behavioral anomalies (abrupt deceleration, TSS route deviation, transponder gaps).
6. **Historical Compliance Intelligence**: Archival Port State Control (PSC) inspections, past MARPOL Annex I deficiencies, and vessel risk tier ratings.
7. **Forward Drift & Weathering Forecast**: 24-hour forward trajectory modeling with uncertainty corridors, natural evaporation, emulsification ("chocolate mousse" state), and shoreline impact risk alerts.
8. **Evidence Dossier & Printable Report**: Compiling multi-sensor evidence into an official investigation dossier ready for print / PDF export.
9. **Maritime AI Assistant**: Integrated Groq LLM assistant (`openai/gpt-oss-20b`) with incident context awareness and an offline deterministic keyword fallback engine.

---

## 🏛️ 2. Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                         REACT + VITE FRONTEND                          │
│   • Operational Dashboard            • Leaflet Tactical Map            │
│   • SAR Speckle & Detection Canvas   • Interactive 4x Timeline         │
│   • Vessel Correlation Matrix        • Printable Investigation Dossier │
│   • Forward Drift Weathering (+24h)  • Floating AI Chatbot Modal       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ REST API (/api/*)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         EXPRESS.JS BACKEND                             │
│   • REST Endpoints (/api/incidents, /environment, /vessels, /forecast) │
│   • Static Production Server (serves client/dist)                      │
│   • Groq OpenAI-Compatible Chat Gateway & Prompt Context Synthesizer   │
│   • Deterministic Offline Rule-Based Fallback Engine                   │
└───────────────────┬───────────────────────────────────┬────────────────┘
                    │                                   │
                    ▼                                   ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│       CENTRAL MOCK DATA REPO         │  │       GROQ CLOUD API         │
│  • incidents.js    • environmental.js │  │  • openai/gpt-oss-20b        │
│  • vessels.js      • forecasts.js     │  │  • Zero API Key exposure     │
│  • history.js      • evidence.js      │  │    to frontend client        │
└──────────────────────────────────────┘  └──────────────────────────────┘
```

---

## ⚙️ 3. Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configured variables:
```env
GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_MODEL=openai/gpt-oss-20b
PORT=5000
```

> **Security & Offline Mode:**  
> The frontend **never** receives `GROQ_API_KEY`. If `GROQ_API_KEY` is omitted or empty, the built-in intelligent deterministic fallback engine automatically handles user queries without crashing.

---

## 🚀 4. Installation & Local Development

### Prerequisites
- Node.js `v18+` (Tested on Node `v24.20.0`)
- npm `v9+`

### Step 1: Install All Dependencies
From the project root:
```bash
npm run install:all
```
*(Or install individually: `npm install`, `cd server && npm install`, `cd ../client && npm install`)*

### Step 2: Start Concurrently (Backend + Vite HMR Frontend)
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

---

## 🚀 5. Production Build & Deployment

### Option A: Deploy to Vercel (Recommended for Live Demo)
The project is **pre-configured for Vercel Serverless deployment**:
- `vercel.json` routes `/api/*` to serverless function handlers in `api/index.js` and SPA requests to `client/dist`.
- `api/index.js` exports the Express app directly into Vercel's serverless runtime.

#### Method 1: Using Vercel CLI
```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Deploy
vercel

# 3. Deploy to production
vercel --prod
```

#### Method 2: Via GitHub / Vercel Web Dashboard
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: Choose **Vite** (or leave as **Other**).
5. Ensure settings match:
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`
6. Add Environment Variables (Optional):
   - `GROQ_API_KEY`: *(your key)*
   - `GROQ_BASE_URL`: `https://api.groq.com/openai/v1`
   - `GROQ_MODEL`: `openai/gpt-oss-20b`
7. Click **Deploy**!

---

### Option B: Local Production Server (Single Process)
You can also run both frontend and backend through a single Node/Express process:

```bash
# 1. Build client bundle
npm run build

# 2. Run the unified Express server
npm start
```

Now open:
👉 **`http://localhost:5000`**


---

## 📡 6. API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System status, mode, and Groq configuration check |
| `GET` | `/api/incidents` | List all simulated incidents (`INC-2026-001`, `002`, `003`, `004`) |
| `GET` | `/api/incidents/:id` | Full metadata and segmentation coordinates for an incident |
| `GET` | `/api/incidents/:id/environment` | Wind, current, wave, tide, and SST parameters |
| `GET` | `/api/incidents/:id/hindcast` | Reconstructed release window and probable source region |
| `GET` | `/api/incidents/:id/vessels` | Candidate vessels, AIS tracks, and anomaly telemetry |
| `GET` | `/api/incidents/:id/history` | Historical Port State Control inspection records |
| `GET` | `/api/incidents/:id/forecast` | +6h, +12h, and +24h forward drift & weathering physics |
| `GET` | `/api/incidents/:id/evidence` | Compiled structured evidence package |
| `POST` | `/api/chat` | AI surveillance assistant (`{ message, incidentId }`) |

---

## 🎯 7. Verified Prototype Workflow

1. **Dashboard Alert**: Review the alert banner for `INC-2026-001` (Offshore Mumbai Basin).
2. **SAR Detection Simulator**: Click "Run Detection" to trigger the multi-stage U-Net inference animation and inspect the synthetic radar speckle canvas.
3. **Tactical Map & Timeline**: Press "Play" on the timeline playback bar to watch vessel positions interpolate, slick drift backward to source, and forward to +24h.
4. **Vessel Correlation**: Inspect why `MV Ocean Star` received an 88% correlation score (0.65 km approach, 4.1-knot deceleration anomaly, 28° TSS deviation).
5. **Forward Forecast**: Examine the +24h shoreline threat to the Alibaug/Murud coastline and review containment boom deployment coordinates.
6. **Print Investigation Report**: Click "Print / Save as PDF" in Evidence & Report for a clean, publication-ready multi-page report.
7. **Ask AI Assistant**: Open the chat drawer and ask any operational question (Groq or deterministic fallback).

---

## 🛡️ 8. Hackathon & Prototype Disclaimer
All satellite observations, AIS vessel names, coordinates, and predictions in this system are **mock/simulated data**. The application is designed to demonstrate operational workflow and technical feasibility. No connection to live classified SAR satellite feeds or live vessel transponders is utilized.
