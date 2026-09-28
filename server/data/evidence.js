// Mock Incident Evidence Dossier
const incidents = require('./incidents');
const environmentalData = require('./environmental');
const vesselsData = require('./vessels');
const forecastsData = require('./forecasts');

const getEvidenceByIncidentId = (incidentId) => {
  const incident = incidents.find(i => i.id === incidentId) || incidents[0];
  const env = environmentalData[incident.id] || environmentalData["INC-2026-001"];
  const vessels = vesselsData[incident.id] || vesselsData["INC-2026-001"];
  const forecast = forecastsData[incident.id] || forecastsData["INC-2026-001"];

  return {
    incidentId: incident.id,
    generatedAt: new Date().toISOString(),
    evidenceClassification: "OPERATIONAL INTELLIGENCE / SIMULATED MARITIME DOSSIER",
    summary: {
      headline: `Evidence package for ${incident.id} - ${incident.title}`,
      confidenceGrade: "High (Multi-Sensor Corroboration)",
      legalDisclaimer: "All data within this evidence dossier is simulated for prototype demonstration. Outputs represent probabilistic algorithmic correlation and do not constitute formal legal findings."
    },
    satelliteEvidence: {
      platform: incident.sarSatellite,
      sensorMode: incident.sensorMode,
      pixelResolution: `${incident.resolutionMeters}m ground range resolution`,
      polarization: "VV (Vertical-Vertical Co-polar)",
      orbitPass: incident.orbitPass,
      incidenceAngle: "36.4° nominal",
      detectionTimestamp: incident.detectedAt,
      coordinates: incident.coordinates,
      spillArea: `${incident.spillAreaKm2} km²`,
      slickDimensions: `${incident.spillLengthKm} km (L) × ${incident.spillWidthKm} km (W)`,
      surfaceContrastRatio: "-6.8 dB relative to surrounding rough sea backscatter",
      maskFormat: "GeoJSON Polygon (U-Net Binary Segmentation)"
    },
    modelEvidence: {
      modelName: incident.modelDetails.name,
      version: incident.modelDetails.version,
      detectionConfidence: `${incident.confidence}%`,
      inferenceLatency: `${incident.modelDetails.inferenceLatencyMs || 1420} ms`,
      benchmarkMetric: "Dice Coefficient: 0.914, IoU: 0.842 (Trained on simulated SAR imagery)"
    },
    environmentalEvidence: {
      simulationSource: env.sourceSimulation,
      windObservation: `${env.wind.speedKmh} km/h from ${env.wind.directionText} (${env.wind.directionDeg}°), Gusts to ${env.wind.gustKmh} km/h`,
      oceanCurrentObservation: `${env.oceanCurrent.speedMs} m/s (${env.oceanCurrent.speedKnots} kn) toward ${env.oceanCurrent.directionText}`,
      netSurfaceDriftVector: `${env.oceanCurrent.netDriftDeg || 138}° (Composite 3% wind + 100% surface current)`,
      seaCondition: `Waves ${env.waves.heightMeters}m (${env.waves.periodSeconds}s period) - ${env.waves.seaState}`,
      tidalState: `${env.tide.phase} (Height: ${env.tide.levelMeters}m)`
    },
    hindcastEvidence: {
      methodology: incident.probableSourceRegion.method,
      releaseWindow: incident.probableSourceRegion.displayWindow,
      sourceCentroid: incident.probableSourceRegion.center,
      sourceUncertaintyRadiusMeters: incident.probableSourceRegion.radiusMeters,
      confidenceScore: `${incident.probableSourceRegion.confidence}%`,
      driftDecelerationFactor: "0.034 (Empirical windage factor)"
    },
    aisEvidence: {
      vesselDensityInArea: vessels.length,
      primaryCandidate: vessels[0].name,
      primaryCandidateScore: `${vessels[0].correlationScore}%`,
      anomalyFlagsLogged: vessels[0].anomalies ? vessels[0].anomalies.length : 0,
      recordedAnomalies: vessels[0].anomalies || [],
      candidateComparison: vessels.map(v => ({
        name: v.name,
        mmsi: v.mmsi,
        type: v.shipType,
        score: `${v.correlationScore}%`,
        distanceKm: v.distanceFromSourceKm,
        timeOverlap: v.timeOverlap
      }))
    },
    forecastEvidence: {
      trajectorySteps: forecast.timeSteps.map(t => ({
        step: t.step,
        area: `${t.areaKm2} km²`,
        evaporated: `${t.evaporationPercent}%`,
        location: t.center
      })),
      corridorEnvelopeProvided: true,
      predictedShorelineThreat: forecast.shorelineImpactRisk,
      overallForecastConfidence: `${forecast.overallConfidencePercent}%`
    }
  };
};

module.exports = {
  getEvidenceByIncidentId
};
