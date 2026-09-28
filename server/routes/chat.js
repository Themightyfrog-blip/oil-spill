const express = require('express');
const router = express.Router();

const incidents = require('../data/incidents');
const environmentalData = require('../data/environmental');
const vesselsData = require('../data/vessels');
const forecastsData = require('../data/forecasts');

// Deterministic fallback response engine
function generateFallbackResponse(query, incidentId) {
  const normalizedQuery = (query || "").toLowerCase();
  const incident = incidents.find(i => i.id === incidentId) || incidents[0];
  const env = environmentalData[incident.id] || environmentalData["INC-2026-001"];
  const vessels = vesselsData[incident.id] || vesselsData["INC-2026-001"];
  const forecast = forecastsData[incident.id] || forecastsData["INC-2026-001"];
  const primaryVessel = vessels[0];

  if (normalizedQuery.includes("source") || normalizedQuery.includes("origin") || normalizedQuery.includes("where did it come from") || normalizedQuery.includes("hindcast") || normalizedQuery.includes("backtrack")) {
    return {
      reply: `### Probable Source Region & Hindcast Analysis
Based on backward trajectory modeling (Lagrangian particle simulation):
- **Estimated Release Window:** ${incident.probableSourceRegion.displayWindow}
- **Probable Source Centroid:** ${incident.probableSourceRegion.center[0]}°N, ${incident.probableSourceRegion.center[1]}°E (Radius: ${(incident.probableSourceRegion.radiusMeters / 1000).toFixed(1)} km)
- **Source Confidence:** ${incident.probableSourceRegion.confidence}%
- **Methodology:** ${incident.probableSourceRegion.method}
- **Backward Vector:** Drift was driven by NW wind (${env.wind.speedKmh} km/h) and ${env.oceanCurrent.directionText} tidal current, tracing backward from the detected slick coordinates (${incident.coordinates.lat}°N, ${incident.coordinates.lng}°E).`,
      suggestedQueries: [
        "Which vessels were near the source?",
        "Why was MV Ocean Star considered a candidate?",
        "What is the forecast for the next 24 hours?"
      ]
    };
  }

  if (normalizedQuery.includes("vessel") || normalizedQuery.includes("candidate") || normalizedQuery.includes("ocean star") || normalizedQuery.includes("who did it") || normalizedQuery.includes("culprit") || normalizedQuery.includes("ship")) {
    return {
      reply: `### Candidate Vessel Correlation Analysis
For incident **${incident.id}**, **${vessels.length} vessels** were correlated against the probable source region:

1. **${primaryVessel.name}** (${primaryVessel.shipType}) — **Score: ${primaryVessel.correlationScore}%**
   - **Status:** ${primaryVessel.candidateTag}
   - **Spatial Distance:** Passed within ${primaryVessel.minSourceDistanceKm} km of release centroid
   - **Temporal Overlap:** ${primaryVessel.timeOverlap}
   - **Behavioral Anomaly:** Deceleration from 14.2 to 4.1 knots, 28° TSS route deviation, and 18-min AIS gap
   
2. **${vessels[1] ? vessels[1].name : 'MV Meridian'}** (${vessels[1] ? vessels[1].shipType : 'Bulk Carrier'}) — **Score: ${vessels[1] ? vessels[1].correlationScore : 48}%**
   - Distance: ${vessels[1] ? vessels[1].distanceFromSourceKm : 11.8} km away, steady cruising without anomaly

*Note: Correlation scores are simulated probabilities and provide operational leads rather than legal determinations.*`,
      suggestedQueries: [
        "Why was MV Ocean Star considered a candidate?",
        "Show historical records for MV Ocean Star",
        "What environmental conditions affected the spill?"
      ]
    };
  }

  if (normalizedQuery.includes("why") && (normalizedQuery.includes("ocean star") || normalizedQuery.includes("candidate"))) {
    return {
      reply: `### Why ${primaryVessel.name} is the Primary Candidate:
1. **Spatial Proximity (✓ Matched):** Track crossed within 0.65 km of the reconstructed release centroid at 18.91°N, 72.72°E.
2. **Temporal Coincidence (✓ Matched):** Present between 12:05 and 12:48 UTC, squarely inside the calculated 11:45–13:10 UTC discharge window.
3. **Trajectory Alignment (✓ Matched):** Vessel course of 142° matches the backwards slick axis of 138°.
4. **Behavioral Anomaly (✓ Matched):** Abrupt deceleration from cruising speed (14.2 kn down to 4.1 kn) accompanied by a 28° unannounced dog-leg course deviation and intermittent AIS transponder pings.
5. **Historical Context:** Prior simulated oily bilge discharge deficiency recorded at Fujairah in 2024.`,
      suggestedQueries: [
        "Where was the spill detected?",
        "What is the forecast for the next 24 hours?",
        "Show me the evidence for this incident"
      ]
    };
  }

  if (normalizedQuery.includes("forecast") || normalizedQuery.includes("drift") || normalizedQuery.includes("future") || normalizedQuery.includes("24 hours") || normalizedQuery.includes("coast")) {
    return {
      reply: `### Forward Spill Forecast (+24 Hours)
Forward simulation using Lagrangian drift dynamics indicates:
- **Forecast Confidence:** ${forecast.overallConfidencePercent}%
- **Predicted Drift Direction:** ${forecast.driftBearingDeg}° (South-East toward coastal corridor)
- **Time Step Progression:**
  - **+6h:** Area expands to 24.5 km², Evaporated: 14.2%, Center at 18.77°N, 72.90°E
  - **+12h:** Area expands to 31.2 km², Evaporated: 21.5%, Center at 18.72°N, 72.96°E
  - **+24h:** Area reaches 42.8 km², Emulsification reaches 65%, Center at 18.63°N, 73.03°E
- **Shoreline Risk:** ${forecast.shorelineImpactRisk}
- **Recommended Action:** Pre-deploy containment booms at shoreline inlet 18.72°N, 72.96°E before +12h.`,
      suggestedQueries: [
        "What environmental conditions affected the spill?",
        "Show me the evidence for this incident",
        "Summarize this incident"
      ]
    };
  }

  if (normalizedQuery.includes("environment") || normalizedQuery.includes("wind") || normalizedQuery.includes("current") || normalizedQuery.includes("wave") || normalizedQuery.includes("tide") || normalizedQuery.includes("weather")) {
    return {
      reply: `### Environmental Conditions for ${incident.id}
- **Wind:** ${env.wind.speedKmh} km/h (${env.wind.speedKnots} kn) from **${env.wind.directionText} (${env.wind.directionDeg}°)** with gusts up to ${env.wind.gustKmh} km/h
- **Surface Current:** **${env.oceanCurrent.speedMs} m/s (${env.oceanCurrent.speedKnots} kn)** bearing **${env.oceanCurrent.directionText}**
- **Composite Drift:** Net surface displacement vector **${env.oceanCurrent.netDriftDeg || 138}°**
- **Waves:** Significant wave height **${env.waves.heightMeters} m**, period **${env.waves.periodSeconds} s** (${env.waves.seaState})
- **Tide:** **${env.tide.phase}**, current height **${env.tide.levelMeters} m**
- **Sea Surface Temperature:** **${env.seaTemperatureCelsius} °C** (supports moderate natural evaporation)`,
      suggestedQueries: [
        "What is the probable source region?",
        "What is the forecast for the next 24 hours?",
        "Which vessels were near the source?"
      ]
    };
  }

  if (normalizedQuery.includes("evidence") || normalizedQuery.includes("report") || normalizedQuery.includes("proof")) {
    return {
      reply: `### Incident Evidence Dossier Summary
- **Satellite (SAR):** ${incident.sarSatellite} VV-polarization detected low-backscatter slick of **${incident.spillAreaKm2} km²** at ${incident.coordinates.lat}°N, ${incident.coordinates.lng}°E (Confidence: ${incident.confidence}%, Model: U-Net v2.4).
- **Environmental:** Sustained 18 km/h NW wind + 0.72 m/s tidal stream consistent with backward drift vector.
- **Hindcast:** 500-particle backtracking pinpoints release window **${incident.probableSourceRegion.displayWindow}** at centroid ${incident.probableSourceRegion.center.join(', ')}.
- **AIS Correlation:** ${primaryVessel.name} logged 3 distinct behavioral anomalies directly inside release window.
- **Forecast:** Threat to Alibaug coastal region within 24–36h.`,
      suggestedQueries: [
        "Why was MV Ocean Star considered a candidate?",
        "What is the forecast for the next 24 hours?",
        "Summarize this incident"
      ]
    };
  }

  // Default summary response
  return {
    reply: `### Incident Briefing: ${incident.id} (${incident.title})
- **Detection:** Detected on **${incident.displayDate}** via simulated **${incident.sarSatellite}** (${incident.resolutionMeters}m resolution).
- **Location:** **${incident.locationName}** (${incident.coordinates.lat}°N, ${incident.coordinates.lng}°E).
- **Characteristics:** Spill area of **${incident.spillAreaKm2} km²** (length ${incident.spillLengthKm} km, width ${incident.spillWidthKm} km, est. volume ${incident.estimatedVolumeM3} m³).
- **Probable Source:** Centered near **${incident.probableSourceRegion.center[0]}°N, ${incident.probableSourceRegion.center[1]}°E** from release window **${incident.probableSourceRegion.displayWindow}**.
- **Primary Candidate:** **${primaryVessel.name}** (Correlation score: ${primaryVessel.correlationScore}%).
- **Forecast:** Drifting SE at 1.15 knots toward Alibaug coastal corridor (+24h area 42.8 km²).`,
    suggestedQueries: [
      "Where was the spill detected?",
      "Why was MV Ocean Star considered a candidate?",
      "What is the forecast for the next 24 hours?"
    ]
  };
}

// POST /api/chat - AI Assistant endpoint
router.post('/', async (req, res) => {
  const { message, incidentId = "INC-2026-001" } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Hot-reload .env to pick up new API keys without requiring a server restart
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '../../.env'), override: true });


  const apiKey = process.env.GROQ_API_KEY;
  const baseUrl = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

  // If no Groq API Key or placeholder key, use deterministic fallback
  const isKeyConfigured = apiKey && apiKey.trim() && apiKey !== 'YOUR_GROQ_API_KEY_HERE';

  if (!isKeyConfigured) {
    const fallback = generateFallbackResponse(message, incidentId);
    return res.json({
      reply: fallback.reply,
      isFallback: true,
      modelUsed: "Rule-Based Deterministic Engine (Demo Mode)",
      suggestedQueries: fallback.suggestedQueries
    });
  }

  // If Groq key is configured, construct rich context prompt and call Groq
  try {
    const incident = incidents.find(i => i.id === incidentId) || incidents[0];
    const env = environmentalData[incident.id] || environmentalData["INC-2026-001"];
    const vessels = vesselsData[incident.id] || vesselsData["INC-2026-001"];
    const forecast = forecastsData[incident.id] || forecastsData["INC-2026-001"];

    const systemPrompt = `You are the AI Maritime Surveillance Assistant for the "AI-Powered Oil Spill Detection, Source Estimation & Forecasting System" (SIH Prototype).
You are operating in DEMO MODE with simulated maritime data.
All data is mock/simulated. Never invent facts outside this simulated incident context.

CURRENT ACTIVE INCIDENT CONTEXT:
- Incident ID: ${incident.id} (${incident.title})
- Detection Time: ${incident.displayDate}
- Location: ${incident.locationName} (Coordinates: ${incident.coordinates.lat}°N, ${incident.coordinates.lng}°E)
- Spill Characteristics: Area ${incident.spillAreaKm2} km², Length ${incident.spillLengthKm} km, Width ${incident.spillWidthKm} km, Est Volume ${incident.estimatedVolumeM3} m³ (${incident.estimatedBarrels} bbls)
- SAR Platform: ${incident.sarSatellite}, Resolution ${incident.resolutionMeters}m, Polarization VV, U-Net confidence ${incident.confidence}%
- Environmental Data: Wind ${env.wind.speedKmh} km/h from ${env.wind.directionText}, Ocean Current ${env.oceanCurrent.speedMs} m/s towards ${env.oceanCurrent.directionText}, Waves ${env.waves.heightMeters}m (${env.waves.seaState}), Tide ${env.tide.phase} (${env.tide.levelMeters}m), SST ${env.seaTemperatureCelsius}°C
- Hindcast / Source Estimation: Probable Source Centroid ${incident.probableSourceRegion.center.join(', ')} (Radius ${incident.probableSourceRegion.radiusMeters}m), Release Window ${incident.probableSourceRegion.displayWindow}, Source Confidence ${incident.probableSourceRegion.confidence}%
- Candidate Vessels:
${vessels.map(v => `  * ${v.name} (${v.shipType}): Correlation Score ${v.correlationScore}%, Min Source Distance ${v.minSourceDistanceKm} km, Time Overlap "${v.timeOverlap}", Anomalies: ${v.behavioralAnomaly}`).join('\n')}
- Forecast (+24h): Drift direction ${forecast.driftBearingDeg}°, Confidence ${forecast.overallConfidencePercent}%, Area expanding to ${forecast.timeSteps[forecast.timeSteps.length - 1].areaKm2} km², Shoreline Risk: ${forecast.shorelineImpactRisk}

GUIDELINES:
1. Always base answers strictly on the simulated incident context provided above.
2. Be precise, professional, and formatted in clean markdown (using bolding, bullet points, and headers where helpful).
3. Always maintain that correlation scores represent operational likelihoods, not legal guilt.
4. Keep answers concise, factual, and informative.`;

    const groqResponse = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.2,
        max_tokens: 650
      })
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.warn(`Groq API returned error status ${groqResponse.status}: ${errText}. Falling back to deterministic engine.`);
      const fallback = generateFallbackResponse(message, incidentId);
      return res.json({
        reply: fallback.reply,
        isFallback: true,
        modelUsed: "Rule-Based Deterministic Engine (Groq fallback)",
        suggestedQueries: fallback.suggestedQueries
      });
    }

    const data = await groqResponse.json();
    const replyText = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : generateFallbackResponse(message, incidentId).reply;

    return res.json({
      reply: replyText,
      isFallback: false,
      modelUsed: model,
      suggestedQueries: [
        "Why was MV Ocean Star considered a candidate?",
        "What is the forecast for the next 24 hours?",
        "Show me the evidence for this incident"
      ]
    });
  } catch (error) {
    console.error("Error communicating with Groq API:", error);
    const fallback = generateFallbackResponse(message, incidentId);
    return res.json({
      reply: fallback.reply,
      isFallback: true,
      modelUsed: "Rule-Based Deterministic Engine (Network Fallback)",
      suggestedQueries: fallback.suggestedQueries
    });
  }
});

module.exports = router;
