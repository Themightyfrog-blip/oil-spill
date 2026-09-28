const express = require('express');
const router = express.Router();

const incidents = require('../data/incidents');
const environmentalData = require('../data/environmental');
const vesselsData = require('../data/vessels');
const historicalRecords = require('../data/history');
const forecastsData = require('../data/forecasts');
const { getEvidenceByIncidentId } = require('../data/evidence');

// GET /api/incidents - List all incidents
router.get('/', (req, res) => {
  try {
    const list = incidents.map(inc => ({
      id: inc.id,
      title: inc.title,
      detectedAt: inc.detectedAt,
      displayDate: inc.displayDate,
      locationName: inc.locationName,
      region: inc.region,
      coordinates: inc.coordinates,
      spillAreaKm2: inc.spillAreaKm2,
      confidence: inc.confidence,
      status: inc.status,
      severity: inc.severity,
      candidateCount: inc.candidateCount,
      primaryCandidate: inc.primaryCandidate
    }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve incidents list", message: err.message });
  }
});

// GET /api/incidents/:id - Get full details of a specific incident
router.get('/:id', (req, res) => {
  try {
    const incident = incidents.find(i => i.id === req.params.id);
    if (!incident) {
      return res.status(404).json({ error: "Incident not found", id: req.params.id });
    }
    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve incident", message: err.message });
  }
});

// GET /api/incidents/:id/environment - Get environmental conditions
router.get('/:id/environment', (req, res) => {
  try {
    const data = environmentalData[req.params.id] || environmentalData["INC-2026-001"];
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve environmental data", message: err.message });
  }
});

// GET /api/incidents/:id/hindcast - Get hindcast / backtracking data
router.get('/:id/hindcast', (req, res) => {
  try {
    const incident = incidents.find(i => i.id === req.params.id) || incidents[0];
    res.json({
      incidentId: incident.id,
      probableSourceRegion: incident.probableSourceRegion,
      backwardTrajectory: incident.backwardTrajectory,
      simulationStatus: "COMPLETED",
      particlesSimulated: 500,
      backwardRunDurationHours: 3.5,
      calculatedReleaseWindow: incident.probableSourceRegion.displayWindow,
      sourceConfidence: `${incident.probableSourceRegion.confidence}%`
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve hindcast data", message: err.message });
  }
});

// GET /api/incidents/:id/vessels - Get candidate vessels and AIS tracks
router.get('/:id/vessels', (req, res) => {
  try {
    const vessels = vesselsData[req.params.id] || vesselsData["INC-2026-001"];
    res.json(vessels);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve vessel data", message: err.message });
  }
});

// GET /api/incidents/:id/history - Get historical compliance & intelligence records
router.get('/:id/history', (req, res) => {
  try {
    const vessels = vesselsData[req.params.id] || vesselsData["INC-2026-001"];
    const historyList = vessels.map(v => {
      const hist = historicalRecords[v.id] || {
        vesselId: v.id,
        mmsi: v.mmsi,
        name: v.name,
        imo: v.imo,
        shipType: v.shipType,
        riskRating: "Low",
        complianceSummary: { totalPastIncidents: 0, pscInspectionsRecorded: 10, deficienciesCount: 0, detentionHistory: "None" },
        incidents: [],
        disclaimer: "Historical records provide contextual information only and do not establish responsibility for the current incident."
      };
      return hist;
    });
    res.json(historyList);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve vessel history", message: err.message });
  }
});

// GET /api/incidents/:id/forecast - Get forward drift forecast
router.get('/:id/forecast', (req, res) => {
  try {
    const forecast = forecastsData[req.params.id] || forecastsData["INC-2026-001"];
    res.json(forecast);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve forecast data", message: err.message });
  }
});

// GET /api/incidents/:id/evidence - Get structured evidence package
router.get('/:id/evidence', (req, res) => {
  try {
    const evidence = getEvidenceByIncidentId(req.params.id);
    res.json(evidence);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve evidence data", message: err.message });
  }
});

module.exports = router;
