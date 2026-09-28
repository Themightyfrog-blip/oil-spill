// Mock Environmental Data Layer
const environmentalData = {
  "INC-2026-001": {
    incidentId: "INC-2026-001",
    timestamp: "2026-09-27T14:32:00Z",
    sourceSimulation: "INCOIS-HYCOM / ECMWF Wave & Drift Composite (Simulated)",
    wind: {
      speedKmh: 18,
      speedKnots: 9.7,
      directionText: "NW",
      directionDeg: 315,
      driftBearingDeg: 135,
      gustKmh: 27,
      beaufortScale: 3,
      description: "Gentle Breeze from North-West"
    },
    oceanCurrent: {
      speedMs: 0.72,
      speedKnots: 1.4,
      directionText: "NE (Tidal Deflection)",
      directionDeg: 45,
      netDriftDeg: 138,
      layerDepthMeters: 5.0,
      description: "Surface current influenced by ebb tide component"
    },
    waves: {
      heightMeters: 1.8,
      directionText: "NNE",
      directionDeg: 25,
      periodSeconds: 7.2,
      seaState: "State 4 (Moderate)",
      description: "Moderate sea with regular swells"
    },
    tide: {
      phase: "Falling (Ebb Tide)",
      levelMeters: 0.82,
      maxHighMeters: 3.4,
      minLowMeters: 0.45,
      nextLowTimestamp: "2026-09-27T16:15:00Z",
      description: "Mid-cycle ebb flowing southward"
    },
    seaTemperatureCelsius: 27.4,
    salinityPsu: 35.8,
    surfaceWaterDensityKgM3: 1022.4,
    atmosphericPressureHpa: 1011.2,
    weatheringMetrics: {
      evaporationRate24hPercent: 24.5,
      naturalDispersionPercent: 7.8,
      emulsificationWaterContentPercent: 38.0,
      viscosityCp: 280,
      slickThicknessMm: 0.12
    },
    hourlyTimeSeries: [
      { time: "08:00", windSpeed: 14, currentSpeed: 0.55, waveHeight: 1.5, driftVector: 130 },
      { time: "10:00", windSpeed: 16, currentSpeed: 0.62, waveHeight: 1.6, driftVector: 132 },
      { time: "12:00", windSpeed: 19, currentSpeed: 0.75, waveHeight: 1.8, driftVector: 136 },
      { time: "14:00", windSpeed: 18, currentSpeed: 0.72, waveHeight: 1.8, driftVector: 138 },
      { time: "16:00", windSpeed: 17, currentSpeed: 0.68, waveHeight: 1.7, driftVector: 140 },
      { time: "18:00", windSpeed: 15, currentSpeed: 0.58, waveHeight: 1.6, driftVector: 142 },
      { time: "20:00", windSpeed: 14, currentSpeed: 0.52, waveHeight: 1.5, driftVector: 140 },
      { time: "22:00", windSpeed: 12, currentSpeed: 0.48, waveHeight: 1.4, driftVector: 138 }
    ]
  },
  "INC-2026-002": {
    incidentId: "INC-2026-002",
    timestamp: "2026-09-25T08:15:00Z",
    sourceSimulation: "INCOIS-HYCOM / ECMWF Composite (Simulated)",
    wind: {
      speedKmh: 22,
      speedKnots: 11.9,
      directionText: "SSW",
      directionDeg: 200,
      driftBearingDeg: 20,
      gustKmh: 31,
      beaufortScale: 4,
      description: "Moderate Breeze from South-Southwest"
    },
    oceanCurrent: {
      speedMs: 0.85,
      speedKnots: 1.65,
      directionText: "NNE",
      directionDeg: 25,
      netDriftDeg: 22,
      layerDepthMeters: 4.5
    },
    waves: {
      heightMeters: 2.1,
      directionText: "SE",
      directionDeg: 135,
      periodSeconds: 8.0,
      seaState: "State 4 (Moderate)"
    },
    tide: {
      phase: "Rising (Flood Tide)",
      levelMeters: 1.25,
      description: "Flood current setting North"
    },
    seaTemperatureCelsius: 29.1,
    salinityPsu: 34.2,
    weatheringMetrics: {
      evaporationRate24hPercent: 28.0,
      naturalDispersionPercent: 9.5,
      emulsificationWaterContentPercent: 32.0,
      viscosityCp: 220,
      slickThicknessMm: 0.09
    },
    hourlyTimeSeries: [
      { time: "04:00", windSpeed: 18, currentSpeed: 0.70, waveHeight: 1.9, driftVector: 18 },
      { time: "06:00", windSpeed: 20, currentSpeed: 0.78, waveHeight: 2.0, driftVector: 20 },
      { time: "08:00", windSpeed: 22, currentSpeed: 0.85, waveHeight: 2.1, driftVector: 22 },
      { time: "10:00", windSpeed: 24, currentSpeed: 0.88, waveHeight: 2.2, driftVector: 25 }
    ]
  },
  "INC-2026-003": {
    incidentId: "INC-2026-003",
    timestamp: "2026-09-22T19:40:00Z",
    sourceSimulation: "INCOIS-Tidal Basin (Simulated)",
    wind: {
      speedKmh: 14,
      speedKnots: 7.6,
      directionText: "WSW",
      directionDeg: 250,
      driftBearingDeg: 70,
      gustKmh: 20,
      beaufortScale: 3
    },
    oceanCurrent: {
      speedMs: 1.20,
      speedKnots: 2.33,
      directionText: "ENE (Strong Tidal Funnel)",
      directionDeg: 75,
      netDriftDeg: 75,
      layerDepthMeters: 8.0
    },
    waves: {
      heightMeters: 1.2,
      directionText: "W",
      directionDeg: 270,
      periodSeconds: 5.5,
      seaState: "State 3 (Slight)"
    },
    tide: {
      phase: "Strong Flood (Spring Tide)",
      levelMeters: 4.80,
      description: "Strong tidal inflow into Gulf"
    },
    seaTemperatureCelsius: 28.5,
    salinityPsu: 36.5,
    weatheringMetrics: {
      evaporationRate24hPercent: 19.0,
      naturalDispersionPercent: 12.0,
      emulsificationWaterContentPercent: 44.0,
      viscosityCp: 350,
      slickThicknessMm: 0.15
    },
    hourlyTimeSeries: [
      { time: "16:00", windSpeed: 12, currentSpeed: 1.05, waveHeight: 1.1, driftVector: 72 },
      { time: "18:00", windSpeed: 13, currentSpeed: 1.18, waveHeight: 1.2, driftVector: 74 },
      { time: "20:00", windSpeed: 14, currentSpeed: 1.20, waveHeight: 1.2, driftVector: 75 },
      { time: "22:00", windSpeed: 13, currentSpeed: 1.12, waveHeight: 1.1, driftVector: 76 }
    ]
  },
  "INC-2026-004": {
    incidentId: "INC-2026-004",
    timestamp: "2026-09-19T03:22:00Z",
    sourceSimulation: "Equatorial Oceanic Current Model (Simulated)",
    wind: {
      speedKmh: 16,
      speedKnots: 8.6,
      directionText: "WNW",
      directionDeg: 295,
      driftBearingDeg: 115,
      gustKmh: 24,
      beaufortScale: 3
    },
    oceanCurrent: {
      speedMs: 0.65,
      speedKnots: 1.26,
      directionText: "ESE",
      directionDeg: 115,
      netDriftDeg: 115,
      layerDepthMeters: 6.0
    },
    waves: {
      heightMeters: 2.4,
      directionText: "SW",
      directionDeg: 225,
      periodSeconds: 9.1,
      seaState: "State 4 (Moderate swell)"
    },
    tide: {
      phase: "Slack Water",
      levelMeters: 1.10,
      description: "Minimal tidal stream in open oceanic lane"
    },
    seaTemperatureCelsius: 29.8,
    salinityPsu: 33.9,
    weatheringMetrics: {
      evaporationRate24hPercent: 31.0,
      naturalDispersionPercent: 6.0,
      emulsificationWaterContentPercent: 29.0,
      viscosityCp: 190,
      slickThicknessMm: 0.08
    },
    hourlyTimeSeries: [
      { time: "00:00", windSpeed: 15, currentSpeed: 0.62, waveHeight: 2.3, driftVector: 112 },
      { time: "02:00", windSpeed: 16, currentSpeed: 0.65, waveHeight: 2.4, driftVector: 115 },
      { time: "04:00", windSpeed: 17, currentSpeed: 0.66, waveHeight: 2.4, driftVector: 116 },
      { time: "06:00", windSpeed: 16, currentSpeed: 0.64, waveHeight: 2.3, driftVector: 115 }
    ]
  }
};

module.exports = environmentalData;
