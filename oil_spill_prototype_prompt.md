# Prompt: Build a Working Oil Spill Intelligence Prototype

You are an expert full-stack engineer. Build a **fully working
prototype/demo** of the following system:

> **AI-Powered Oil Spill Detection, Source Estimation & Forecasting
> System**

The prototype is for a Smart India Hackathon-style demonstration. It
must look and behave like a real operational system, but **ALL satellite
data, AIS data, deep-learning predictions, environmental data,
hindcasting, forecasting, and historical vessel intelligence must be
MOCK/DUMMY data**.

Do **not** connect to real SAR APIs, real AIS feeds, real oceanographic
APIs, or real ML inference.

The goal is to make the prototype demonstrate the complete workflow
convincingly.

------------------------------------------------------------------------

# 1. PRIMARY REQUIREMENTS

Build a web application that demonstrates this complete flow:

``` text
New SAR Image
      ↓
Oil Spill Detection
      ↓
Spill Characterization
      ↓
Incident Created
      ↓
Environmental Data
      ↓
Hindcast / Backtracking
      ↓
Probable Source Region
      ↓
Historical AIS Data
      ↓
Vessel Correlation & Analysis
      ↓
Candidate Vessels
      ↓
Historical Vessel Intelligence
      ↓
Forward Spill Forecast
      ↓
Incident Evidence
      ↓
Interactive Investigation Dashboard
      ↓
Chatbot
```

The application must be **actually runnable**, not just a static UI
mockup.

All buttons, tabs, filters, map interactions, timeline controls,
incident selection, vessel selection, forecast views, and chatbot
interactions should work.

------------------------------------------------------------------------

# 2. IMPORTANT: NO REAL DATA

Do NOT implement real:

-   SAR satellite ingestion
-   Sentinel-1 API
-   AIS API
-   real vessel tracking
-   real environmental API
-   real ocean-current API
-   real weather API
-   real oil-spill ML inference
-   real hindcasting
-   real forecasting

Instead, create realistic mock data that behaves as though these systems
exist.

The UI should clearly indicate that this is a **Prototype /
Simulation**.

Use a small badge such as:

``` text
DEMO MODE
SIMULATED DATA
```

Do not make the prototype falsely claim that its outputs are real-world
measurements.

------------------------------------------------------------------------

# 3. TECH STACK

Use a MERN-style architecture:

## Frontend

-   React
-   JavaScript
-   Vite
-   React Router
-   Axios
-   Leaflet or React-Leaflet
-   CSS / modern responsive styling
-   Recharts or another lightweight charting library if useful

## Backend

-   Node.js
-   Express.js
-   JavaScript
-   REST APIs

## Database

**Do NOT use MongoDB if it is not necessary.**

For this prototype, use:

-   local JSON/mock data files
-   in-memory state where appropriate
-   service modules that behave like database repositories

Structure the code so MongoDB could be added later without rewriting the
frontend.

Do not require:

-   MongoDB Atlas
-   local MongoDB installation
-   Redis
-   Kafka
-   Docker

unless absolutely necessary.

The prototype should be easy to deploy.

------------------------------------------------------------------------

# 4. DEPLOYMENT PRIORITY

Deployment simplicity is important.

Prefer a single-repository application that can be deployed easily.

Ideal structure:

``` text
project/
│
├── client/
│   ├── React + Vite
│   └── ...
│
├── server/
│   ├── Express API
│   ├── mock data
│   └── chatbot service
│
├── .env.example
├── package.json
├── README.md
└── ...
```

The backend should be capable of serving the built React frontend in
production if practical.

The final application should be deployable as a single Node/Express
service if possible.

------------------------------------------------------------------------

# 5. ENVIRONMENT VARIABLES

Create a `.env.example`.

Use exactly these variables:

``` env
GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_MODEL=openai/gpt-oss-20b
PORT=5000
```

Do NOT hardcode the API key anywhere.

The frontend must NEVER receive `GROQ_API_KEY`.

Only the Express backend may call Groq.

If no Groq API key is configured, the chatbot should still work using a
small deterministic fallback response system so the prototype does not
crash.

------------------------------------------------------------------------

# 6. APPLICATION STRUCTURE

Create these main sections/pages:

1.  Dashboard
2.  Incident Details
3.  Interactive Investigation Map
4.  Vessel Analysis
5.  Historical Vessel Intelligence
6.  Forecast
7.  Evidence / Report
8.  Chatbot

Use a sidebar or top navigation.

The main experience should begin with the latest oil-spill notification.

------------------------------------------------------------------------

# 7. DASHBOARD

Create an operational-looking dashboard.

Show:

### Header

``` text
Oil Spill Intelligence System
DEMO MODE
```

### Notification Panel

Example:

``` text
NEW OIL SPILL DETECTED

Incident: INC-2026-001
Detected: 27 Sep 2026, 14:32 UTC
Location: Arabian Sea
Confidence: 94.2%
Status: Investigation Active
```

Clicking the notification should open the incident.

------------------------------------------------------------------------

# 8. INCIDENT LIST

Create several mock incidents:

``` text
INC-2026-001
INC-2026-002
INC-2026-003
INC-2026-004
```

Each incident should have:

-   ID
-   date/time
-   location
-   spill area
-   confidence
-   status
-   candidate vessel count

Use one incident as the primary active incident.

Allow the user to select another incident.

------------------------------------------------------------------------

# 9. INCIDENT DETAILS

When an incident is selected, display:

## Detection

-   SAR image
-   detection timestamp
-   coordinates
-   confidence
-   spill area
-   spill boundary
-   shape
-   orientation

Because the SAR data is dummy, generate realistic-looking simulated
SAR/ocean imagery using local placeholder assets, gradients, generated
SVGs, or CSS where appropriate.

Do not download real satellite images.

------------------------------------------------------------------------

# 10. SIMULATED SAR DETECTION

Create a mock detection pipeline.

When the user clicks:

``` text
Run Detection
```

simulate:

``` text
NEW
↓
PROCESSING
↓
COMPLETED
```

with a short progress animation.

Then display:

``` text
Oil Detected
Confidence: 94.2%
Spill Area: 18.7 km²
```

Also show a simulated segmentation mask / slick boundary.

Do NOT run an actual ML model.

The UI should make it clear:

``` text
Simulation: Deep Learning Detection
Model: U-Net Prototype
```

------------------------------------------------------------------------

# 11. SPILL CHARACTERIZATION

Display:

``` text
Location
Acquisition Timestamp
Area
Boundary
Shape
Orientation
Dimensions
Confidence
```

Create a compact visual card.

Use dummy but internally consistent values.

------------------------------------------------------------------------

# 12. INCIDENT ID

Every incident must have a unique ID.

Example:

``` text
INC-2026-001
```

Use this ID throughout the application.

All simulated evidence and results for that incident must be linked to
the same incident object.

------------------------------------------------------------------------

# 13. ENVIRONMENTAL DATA

Create a mock environmental data module.

Show:

### Wind

``` text
Speed: 18 km/h
Direction: NW
```

### Ocean Current

``` text
Speed: 0.72 m/s
Direction: NE
```

### Waves

``` text
Height: 1.8 m
Direction: NNE
Period: 7.2 s
```

### Tide

``` text
Phase: Falling
Level: 0.8 m
```

### Sea Temperature

``` text
27.4 °C
```

Include a small chart where appropriate.

Clearly label the values:

``` text
SIMULATED ENVIRONMENTAL DATA
```

------------------------------------------------------------------------

# 14. HINDCAST / BACKTRACKING

Create a simulation of backward oil trajectory analysis.

The user should be able to click:

``` text
Run Hindcast
```

Show progress:

``` text
Loading historical conditions...
Reconstructing trajectory...
Estimating source region...
Completed
```

Then show:

``` text
Estimated Release Window:
13:40 – 15:10 UTC

Probable Source Region:
Region around 18.91°N, 72.72°E

Source Confidence:
78%
```

Do NOT show one exact point as absolute truth.

Display a translucent circular/polygonal **probable source region** on
the map.

Also show a backward trajectory line from the detected slick toward the
source region.

------------------------------------------------------------------------

# 15. HISTORICAL AIS DATA

Create realistic dummy vessel tracks.

Use vessels such as:

``` text
MV Ocean Star
MV Meridian
MT Blue Horizon
MT Eastern Pearl
MV Sea Falcon
```

Each vessel should have:

-   MMSI
-   IMO
-   vessel name
-   ship type
-   timestamp
-   latitude
-   longitude
-   SOG
-   COG
-   heading
-   navigation status
-   ROT
-   length
-   beam
-   draught

Do NOT use real vessel identities/data.

Clearly label:

``` text
SIMULATED AIS DATA
```

------------------------------------------------------------------------

# 16. VESSEL CORRELATION

For the selected incident, show several vessels around the probable
source region.

Example:

``` text
Vessel A — MV Ocean Star
Distance: 4.2 km
Time overlap: Yes
Trajectory compatibility: High
Behavioral anomaly: Slowdown detected

Vessel B — MV Meridian
Distance: 11.8 km
Time overlap: Partial
Trajectory compatibility: Medium
Behavioral anomaly: None

Vessel C — MT Blue Horizon
Distance: 23.4 km
Time overlap: No
Trajectory compatibility: Low
Behavioral anomaly: None
```

Do NOT simply call one vessel the culprit.

Use:

``` text
Candidate Vessel
```

or:

``` text
Vessel of Interest
```

------------------------------------------------------------------------

# 17. CANDIDATE VESSEL ANALYSIS

Create an analysis panel with:

### Spatial Relationship

Distance from probable source region.

### Temporal Relationship

Whether the vessel was present during the estimated release window.

### Trajectory Relationship

Whether its historical trajectory is compatible with the source
scenario.

### Behavioral Analysis

Simulated anomalies:

-   slowdown
-   stop/loitering
-   sudden course change
-   route deviation
-   source-region entry/exit

Show a transparent evidence breakdown.

Example:

``` text
Spatial proximity       ✓
Temporal overlap        ✓
Trajectory consistency  ✓
Behavior anomaly        ✓
```

Use a confidence indicator, but clearly label it:

``` text
SIMULATED CORRELATION SCORE
```

Do not present the score as legal proof.

------------------------------------------------------------------------

# 18. HISTORICAL VESSEL INTELLIGENCE

Create a separate section.

For each mock vessel, show:

-   Vessel profile
-   Previous simulated incidents
-   dates
-   locations
-   incident types
-   investigation outcomes

Example:

``` text
Historical Record

2024 — Simulated discharge incident
Location: Port Region A
Outcome: Investigation completed

2025 — Simulated navigation incident
Location: Region B
Outcome: No confirmed pollution link
```

Clearly label all records as simulated.

Include a disclaimer:

``` text
Historical records provide contextual information only and do not establish responsibility for the current incident.
```

------------------------------------------------------------------------

# 19. INTERACTIVE MAP

This is one of the most important parts of the prototype.

Use:

**Leaflet / React-Leaflet**

Use OpenStreetMap tiles if appropriate.

Do not require a paid map API.

Map layers should include toggles for:

-   Detected oil slick
-   Oil slick boundary
-   Backward trajectory
-   Probable source region
-   Vessel tracks
-   Vessel positions
-   Wind vectors
-   Ocean currents
-   Forecast trajectory
-   Forecast uncertainty corridor

Use different visual styles for different layers.

------------------------------------------------------------------------

# 20. TIMELINE PLAYBACK

Implement a working timeline.

Controls:

``` text
◀
PLAY / PAUSE
▶
1x
2x
4x
```

A timeline slider should move through the simulated incident.

As time changes:

-   vessel markers move
-   vessel tracks appear progressively
-   slick position changes
-   environmental indicators update
-   forecast appears after the detection point

The user should be able to visually understand:

``` text
Vessel Movement
        ↓
Possible Release
        ↓
Oil Drift
        ↓
Satellite Detection
        ↓
Future Forecast
```

This should be a real frontend interaction, not a static image.

------------------------------------------------------------------------

# 21. FORECAST

Create a forward forecast simulation.

Use dummy environmental forecast values.

Display:

``` text
+6 HOURS
+12 HOURS
+24 HOURS
```

Show the predicted slick path on the map.

Use an uncertainty corridor around the forecast.

Show:

``` text
Forecast confidence: 81%
```

Clearly label it:

``` text
SIMULATED FORECAST
```

------------------------------------------------------------------------

# 22. INCIDENT EVIDENCE

Create an evidence section containing:

### Satellite Evidence

-   simulated SAR image
-   detection mask
-   timestamp
-   coordinates

### Environmental Evidence

-   wind
-   currents
-   waves
-   tides

### Hindcast Evidence

-   probable source region
-   release window
-   backward trajectory

### AIS Evidence

-   vessel tracks
-   positions
-   vessel metadata

### Forecast Evidence

-   forecast trajectory
-   uncertainty corridor

### Model Evidence

-   model name
-   model version
-   confidence
-   processing timestamp

------------------------------------------------------------------------

# 23. REPORT GENERATION

Add:

``` text
Generate Investigation Report
```

It does not need to create a legally valid report.

It should generate a clean simulated report containing:

``` text
Incident Summary
Detection
Spill Characteristics
Environmental Conditions
Hindcast Results
Probable Source Region
AIS Vessel Analysis
Candidate Vessels
Historical Vessel Context
Forward Forecast
Evidence Summary
Uncertainty / Limitations
```

If generating a PDF is unnecessarily complex, provide a printable report
page with:

``` text
Print / Save as PDF
```

using the browser print functionality.

------------------------------------------------------------------------

# 24. CHATBOT

Add a chatbot accessible from the dashboard.

It should allow questions such as:

``` text
Where was the spill detected?

What is the probable source region?

Which vessels were near the source?

Why was Vessel A considered a candidate?

What environmental conditions affected the spill?

What is the forecast for the next 24 hours?

Show me the evidence for this incident.

Summarize this incident.
```

------------------------------------------------------------------------

# 25. GROQ CHATBOT IMPLEMENTATION

Create:

``` text
POST /api/chat
```

The frontend sends:

``` json
{
  "message": "Why was MV Ocean Star considered a candidate?"
}
```

The backend constructs a system prompt containing the current simulated
incident context.

The Groq API should be called from the Express backend.

Use:

``` env
GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_MODEL=openai/gpt-oss-20b
```

Use the OpenAI-compatible API format supported by Groq.

Do not expose the API key to React.

The chatbot should answer based primarily on the **mock incident data
available in the application**.

It should not invent real-world claims.

------------------------------------------------------------------------

# 26. CHATBOT FALLBACK

If:

``` text
GROQ_API_KEY
```

is missing, the chatbot must not crash.

Instead use a simple fallback response engine based on keywords.

For example:

``` text
"source" → return probable source region
"vessel" → return candidate vessels
"forecast" → return forecast summary
"evidence" → return evidence summary
"spill" → return incident summary
```

Display:

``` text
AI Assistant — Demo Mode
```

when the Groq API is unavailable.

------------------------------------------------------------------------

# 27. MOCK DATA DESIGN

Create one central mock-data layer.

For example:

``` text
server/data/
    incidents.js
    vessels.js
    environmental.js
    forecasts.js
    evidence.js
```

The frontend must NOT contain dozens of unrelated hardcoded values.

Use APIs to retrieve the mock data.

Example endpoints:

``` text
GET /api/incidents
GET /api/incidents/:id
GET /api/incidents/:id/environment
GET /api/incidents/:id/hindcast
GET /api/incidents/:id/vessels
GET /api/incidents/:id/history
GET /api/incidents/:id/forecast
GET /api/incidents/:id/evidence
POST /api/chat
```

------------------------------------------------------------------------

# 28. IMPORTANT DATA CONSISTENCY

The mock data must be internally consistent.

For example:

If the probable source region is:

``` text
18.91°N, 72.72°E
```

then the candidate vessels should actually have coordinates reasonably
close to that region during the simulated release window.

The vessel tracks, source region, spill trajectory, and forecast should
all visually correspond.

Do not randomly generate unrelated coordinates.

Create a coherent simulated incident story.

------------------------------------------------------------------------

# 29. UI/UX

The application should look like a professional maritime intelligence
dashboard.

Use:

-   dark/light professional interface
-   cards
-   status badges
-   map
-   charts
-   tables
-   timeline
-   side panels
-   modal/detail views

Avoid excessive animations.

Prioritize information density and clarity.

Use responsive design.

------------------------------------------------------------------------

# 30. MAIN DASHBOARD LAYOUT

Recommended structure:

``` text
┌────────────────────────────────────────────────────┐
│ Oil Spill Intelligence       DEMO MODE             │
├──────────┬─────────────────────────────────────────┤
│          │                                         │
│ Dashboard│   Latest Incident                      │
│ Incidents│                                         │
│ Map      │   Detection   Source   Vessel  Forecast│
│ Vessels  │                                         │
│ History  │   Interactive Map                       │
│ Reports  │                                         │
│          │   Timeline                              │
│          │                                         │
│          │                         AI Assistant     │
└──────────┴─────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 31. ERROR HANDLING

Implement proper error handling.

The app should not crash if:

-   Groq API is unavailable
-   API request fails
-   incident ID does not exist
-   mock data is missing
-   map fails to load

Show useful user-friendly messages.

------------------------------------------------------------------------

# 32. README

Create a detailed but concise `README.md` containing:

## Project Overview

What the system demonstrates.

## Architecture

Frontend → Backend → Mock Data → Groq Chatbot.

## Installation

Example:

``` bash
npm install
cd client
npm install
cd ../server
npm install
```

Adjust this according to the actual project structure.

## Environment Setup

Explain:

``` env
GROQ_API_KEY=
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_MODEL=openai/gpt-oss-20b
```

## Run Locally

Provide exact commands.

## Build

Provide production build commands.

## Deployment

Explain how to deploy the application as simply as possible.

------------------------------------------------------------------------

# 33. IMPORTANT: DO NOT OVERENGINEER

This is a demonstration prototype.

Do NOT implement:

-   real ML training
-   real satellite ingestion
-   real AIS ingestion
-   real ocean modelling
-   Kafka cluster
-   Kubernetes
-   MongoDB unless absolutely necessary
-   authentication
-   user accounts
-   payment
-   complex cloud infrastructure

The purpose is to **demonstrate the complete system workflow
convincingly**.

------------------------------------------------------------------------

# 34. WHAT MUST ACTUALLY WORK

The following interactions must work:

-   Select incident
-   Open incident details
-   Run simulated detection
-   View simulated SAR image
-   View spill boundary
-   Run hindcast animation
-   View probable source region
-   View vessel tracks
-   Select vessel
-   View vessel details
-   View historical vessel records
-   Toggle map layers
-   Play/pause timeline
-   Change timeline position
-   Change playback speed
-   View forecast
-   View evidence
-   Generate/print report
-   Ask chatbot questions
-   Chatbot receives incident context
-   Groq chatbot works when API key exists
-   Fallback chatbot works when API key does not exist

------------------------------------------------------------------------

# 35. FINAL QUALITY CHECK

Before considering the project complete, verify:

1.  `npm install` works.
2.  The application starts without errors.
3.  Frontend communicates with backend.
4.  No MongoDB is required.
5.  No real external data APIs are required.
6.  No API keys are required except optional Groq.
7.  Groq API key is never exposed to frontend.
8.  `.env.example` exists.
9.  All major buttons work.
10. Map works.
11. Timeline works.
12. Mock vessel movement is coherent.
13. Hindcast visualization works.
14. Forecast visualization works.
15. Incident data remains internally consistent.
16. Chatbot works with Groq.
17. Chatbot fallback works without Groq.
18. Application is deployable.
19. README explains setup.
20. The interface clearly identifies simulated/demo data.

------------------------------------------------------------------------

# 36. FINAL PRODUCT GOAL

When the application is opened, a user should immediately understand
this story:

``` text
A new satellite image arrives.
        ↓
The system detects an oil spill.
        ↓
The spill is characterized.
        ↓
Environmental conditions are retrieved.
        ↓
The system traces the spill backward.
        ↓
A probable source region is identified.
        ↓
Historical AIS data reveals nearby vessels.
        ↓
Their movements are analyzed.
        ↓
Candidate vessels are identified.
        ↓
Historical vessel information provides context.
        ↓
Future spill movement is forecast.
        ↓
All evidence is displayed on an interactive map
and timeline.
        ↓
The user can ask the AI assistant questions
about the incident.
```

Build the application around this story.

**Do not replace the workflow with a generic analytics dashboard.**
