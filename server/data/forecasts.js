// Mock Forward Spill Drift & Weathering Forecast Engine
const forecastsData = {
  "INC-2026-001": {
    incidentId: "INC-2026-001",
    baseTimestamp: "2026-09-27T14:32:00Z",
    modelName: "Lagrangian Spill Drift & GNOME Weathering Model (Simulated)",
    overallConfidencePercent: 81,
    driftBearingDeg: 138,
    meanDriftSpeedKnots: 1.15,
    shorelineImpactRisk: "Moderate to High within 36 hours (Alibaug / Murud Coastal Sector)",
    estimatedCoastlineDistanceKm: 18.4,
    timeSteps: [
      {
        step: "+0h",
        hoursAhead: 0,
        timestamp: "2026-09-27T14:32:00Z",
        displayTime: "27 Sep, 14:32 UTC (Detection Point)",
        center: [18.824, 72.842],
        areaKm2: 18.7,
        evaporationPercent: 0,
        dispersionPercent: 0,
        emulsionWaterPercent: 12,
        remainingVolumeM3: 420,
        slickThicknessMicrons: 110,
        corridorRadiusMeters: 800,
        polygon: [
          [18.852, 72.810],
          [18.848, 72.825],
          [18.835, 72.840],
          [18.818, 72.862],
          [18.802, 72.875],
          [18.808, 72.855],
          [18.825, 72.830],
          [18.840, 72.815]
        ]
      },
      {
        step: "+6h",
        hoursAhead: 6,
        timestamp: "2026-09-27T20:32:00Z",
        displayTime: "27 Sep, 20:32 UTC (+6 Hours)",
        center: [18.775, 72.905],
        areaKm2: 24.5,
        evaporationPercent: 14.2,
        dispersionPercent: 3.5,
        emulsionWaterPercent: 32,
        remainingVolumeM3: 345,
        slickThicknessMicrons: 78,
        corridorRadiusMeters: 1600,
        polygon: [
          [18.805, 72.870],
          [18.795, 72.895],
          [18.775, 72.925],
          [18.750, 72.935],
          [18.745, 72.910],
          [18.765, 72.880],
          [18.790, 72.860]
        ]
      },
      {
        step: "+12h",
        hoursAhead: 12,
        timestamp: "2026-09-28T02:32:00Z",
        displayTime: "28 Sep, 02:32 UTC (+12 Hours)",
        center: [18.718, 72.962],
        areaKm2: 31.2,
        evaporationPercent: 21.5,
        dispersionPercent: 6.2,
        emulsionWaterPercent: 48,
        remainingVolumeM3: 303,
        slickThicknessMicrons: 52,
        corridorRadiusMeters: 2400,
        polygon: [
          [18.750, 72.925],
          [18.740, 72.955],
          [18.718, 72.985],
          [18.685, 72.990],
          [18.680, 72.960],
          [18.705, 72.930]
        ]
      },
      {
        step: "+24h",
        hoursAhead: 24,
        timestamp: "2026-09-28T14:32:00Z",
        displayTime: "28 Sep, 14:32 UTC (+24 Hours)",
        center: [18.630, 73.035],
        areaKm2: 42.8,
        evaporationPercent: 28.4,
        dispersionPercent: 8.8,
        emulsionWaterPercent: 65,
        remainingVolumeM3: 263,
        slickThicknessMicrons: 34,
        corridorRadiusMeters: 3600,
        polygon: [
          [18.670, 72.990],
          [18.660, 73.030],
          [18.630, 73.070],
          [18.590, 73.065],
          [18.595, 73.020],
          [18.625, 72.980]
        ]
      }
    ],
    // Trajectory center line
    forecastPath: [
      [18.824, 72.842],
      [18.775, 72.905],
      [18.718, 72.962],
      [18.630, 73.035]
    ],
    // Outer uncertainty corridor envelope
    uncertaintyCorridor: [
      [18.840, 72.825],
      [18.795, 72.885],
      [18.745, 72.945],
      [18.665, 73.020],
      [18.610, 73.090], // South-east apex
      [18.570, 73.040],
      [18.680, 72.960],
      [18.745, 72.890],
      [18.805, 72.835]
    ],
    recommendedMitigationActions: [
      "Deploy offshore containment booms at grid point 18.72°N, 72.96°E before +12h",
      "Alert Coast Guard Station Murud for secondary shoreline protection",
      "Prepare skimmer vessels for heavy emulsified mousse recovery",
      "Maintain active aerial surveillance drone passes every 4 hours"
    ]
  },
  "INC-2026-002": {
    incidentId: "INC-2026-002",
    baseTimestamp: "2026-09-25T08:15:00Z",
    modelName: "Lagrangian Spill Drift (Simulated)",
    overallConfidencePercent: 78,
    driftBearingDeg: 22,
    meanDriftSpeedKnots: 1.4,
    shorelineImpactRisk: "Low (Parallel to shore)",
    forecastPath: [
      [13.180, 80.420],
      [13.235, 80.445],
      [13.290, 80.470],
      [13.380, 80.510]
    ],
    timeSteps: [
      { step: "+0h", hoursAhead: 0, center: [13.180, 80.420], areaKm2: 12.3, remainingVolumeM3: 210 },
      { step: "+6h", hoursAhead: 6, center: [13.235, 80.445], areaKm2: 16.8, remainingVolumeM3: 175 },
      { step: "+12h", hoursAhead: 12, center: [13.290, 80.470], areaKm2: 22.0, remainingVolumeM3: 152 },
      { step: "+24h", hoursAhead: 24, center: [13.380, 80.510], areaKm2: 30.5, remainingVolumeM3: 130 }
    ],
    uncertaintyCorridor: [
      [13.190, 80.405],
      [13.250, 80.430],
      [13.310, 80.450],
      [13.410, 80.490],
      [13.370, 80.535],
      [13.270, 80.490],
      [13.210, 80.460]
    ]
  },
  "INC-2026-003": {
    incidentId: "INC-2026-003",
    baseTimestamp: "2026-09-22T19:40:00Z",
    overallConfidencePercent: 84,
    driftBearingDeg: 75,
    meanDriftSpeedKnots: 2.1,
    forecastPath: [
      [22.480, 69.750],
      [22.505, 69.830],
      [22.520, 69.900],
      [22.540, 70.020]
    ],
    timeSteps: [
      { step: "+0h", hoursAhead: 0, center: [22.480, 69.750], areaKm2: 7.9 },
      { step: "+6h", hoursAhead: 6, center: [22.505, 69.830], areaKm2: 11.2 },
      { step: "+12h", hoursAhead: 12, center: [22.520, 69.900], areaKm2: 15.6 },
      { step: "+24h", hoursAhead: 24, center: [22.540, 70.020], areaKm2: 21.0 }
    ],
    uncertaintyCorridor: [
      [22.490, 69.730],
      [22.525, 69.810],
      [22.545, 69.880],
      [22.570, 70.000],
      [22.520, 70.040],
      [22.495, 69.910],
      [22.470, 69.770]
    ]
  },
  "INC-2026-004": {
    incidentId: "INC-2026-004",
    baseTimestamp: "2026-09-19T03:22:00Z",
    overallConfidencePercent: 79,
    driftBearingDeg: 115,
    meanDriftSpeedKnots: 1.3,
    forecastPath: [
      [6.950, 93.850],
      [6.910, 93.940],
      [6.870, 94.020],
      [6.800, 94.150]
    ],
    timeSteps: [
      { step: "+0h", hoursAhead: 0, center: [6.950, 93.850], areaKm2: 24.1 },
      { step: "+6h", hoursAhead: 6, center: [6.910, 93.940], areaKm2: 32.0 },
      { step: "+12h", hoursAhead: 12, center: [6.870, 94.020], areaKm2: 41.5 },
      { step: "+24h", hoursAhead: 24, center: [6.800, 94.150], areaKm2: 56.0 }
    ],
    uncertaintyCorridor: [
      [6.970, 93.830],
      [6.935, 93.920],
      [6.900, 94.000],
      [6.830, 94.130],
      [6.770, 94.160],
      [6.840, 94.040],
      [6.920, 93.870]
    ]
  }
};

module.exports = forecastsData;
