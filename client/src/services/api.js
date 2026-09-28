import axios from 'axios';
import {
  mockIncidents,
  mockEnvironmental,
  mockVessels,
  mockForecasts,
  mockEvidence,
  mockHistory
} from '../data/mockData';

const api = axios.create({
  baseURL: '/api',
  timeout: 1200,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchIncidents = async () => {
  try {
    const res = await api.get('/incidents');
    return res.data;
  } catch (err) {
    return mockIncidents;
  }
};

export const fetchIncidentDetails = async (id) => {
  try {
    const res = await api.get(`/incidents/${id}`);
    return res.data;
  } catch (err) {
    const inc = mockIncidents.find(i => i.id === id) || mockIncidents[0];
    return inc;
  }
};

export const fetchEnvironmentalData = async (id) => {
  try {
    const res = await api.get(`/incidents/${id}/environment`);
    return res.data;
  } catch (err) {
    return mockEnvironmental[id] || mockEnvironmental["INC-2026-001"];
  }
};

export const fetchHindcastData = async (id) => {
  try {
    const res = await api.get(`/incidents/${id}/hindcast`);
    return res.data;
  } catch (err) {
    const inc = mockIncidents.find(i => i.id === id) || mockIncidents[0];
    return {
      incidentId: id,
      probableSourceRegion: inc.probableSourceRegion,
      backwardTrajectory: inc.backwardTrajectory
    };
  }
};

export const fetchVesselsData = async (id) => {
  try {
    const res = await api.get(`/incidents/${id}/vessels`);
    return res.data;
  } catch (err) {
    return mockVessels[id] || mockVessels["INC-2026-001"] || [];
  }
};

export const fetchVesselHistory = async (id) => {
  try {
    const res = await api.get(`/incidents/${id}/history`);
    return res.data;
  } catch (err) {
    return mockHistory;
  }
};

export const fetchForecastData = async (id) => {
  try {
    const res = await api.get(`/incidents/${id}/forecast`);
    return res.data;
  } catch (err) {
    return mockForecasts[id] || mockForecasts["INC-2026-001"];
  }
};

export const fetchEvidenceData = async (id) => {
  try {
    const res = await api.get(`/incidents/${id}/evidence`);
    return res.data;
  } catch (err) {
    return mockEvidence[id] || mockEvidence["INC-2026-001"];
  }
};

export const sendChatMessage = async (message, incidentId) => {
  try {
    const res = await api.post('/chat', { message, incidentId });
    return res.data;
  } catch (err) {
    const lower = message.toLowerCase();
    let reply = `Based on maritime surveillance records for **${incidentId || 'INC-2026-001'}**: The spill detected in the Arabian Sea spans **18.7 km²**. Multi-sensor hydrodynamic back-tracking identifies **MV Ocean Star** as the primary candidate (correlation score: 88%) due to an abrupt speed reduction to 4.1 knots and a 28° route deflection inside the release window.`;

    if (lower.includes('forecast') || lower.includes('shoreline') || lower.includes('drift')) {
      reply = `**24-Hour Forward Drift Forecast Summary:**
The slick is being driven southeast at 1.15 knots by prevailing NW winds (18 km/h) and tidal currents. 
- **Landfall Threat:** The leading edge is projected to approach the Alibaug / Murud coastal sector within 24–36 hours.
- **Weathering:** Estimated 28.5% evaporation and 9.8% natural dispersion within 24h. Pre-positioning of skimmers and coastal containment booms is strongly recommended.`;
    } else if (lower.includes('vessel') || lower.includes('candidate') || lower.includes('ocean star')) {
      reply = `**Vessel Attribution Analysis for MV Ocean Star:**
- **MMSI:** 419001234 | **IMO:** 9381201 | **Type:** Crude Oil Tanker
- **Proximity:** Passed within 0.65 km of the reconstructed discharge centroid at 12:22 UTC.
- **Kinematic Anomaly:** Decelerated from 14.2 knots to 4.1 knots for 43 minutes and altered course by 28° outside designated traffic lanes.
- **AIS Integrity:** Recorded an 18-minute transmission gap between 12:18 and 12:36 UTC during the incident window.`;
    } else if (lower.includes('evidence') || lower.includes('report') || lower.includes('summarize')) {
      reply = `**Executive Corroboration Summary (Dossier Ref: SIH-2026-MARPOL-001A):**
1. **SAR Satellite:** Sentinel-1C C-Band radar confirmed dark slick formation with -6.8 dB backscatter contrast (94.2% AI confidence).
2. **Hindcast:** Lagrangian particle backward modeling established discharge window between 11:45 and 13:10 UTC.
3. **AIS Correlation:** Out of 14 vessels screened, MV Ocean Star shows direct spatiotemporal intersection with high behavioral anomalies.`;
    }

    return {
      reply,
      isFallback: true,
      modelUsed: 'Spill Bot',
      suggestedQueries: [
        "What is the forecast shoreline impact?",
        "Why was MV Ocean Star identified as primary candidate?",
        "Summarize the legal evidence package"
      ]
    };
  }
};

export default api;
