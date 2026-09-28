// Embedded client mock datasets for seamless offline/standalone demo resilience

export const mockIncidents = [
  {
    id: "INC-2026-001",
    title: "Offshore Mumbai Basin Spill",
    detectedAt: "2026-09-27T14:32:00Z",
    displayDate: "27 Sep 2026, 14:32 UTC",
    locationName: "Arabian Sea (42 nm WSW of Mumbai Port)",
    region: "West Coast EEZ - India",
    coordinates: { lat: 18.824, lng: 72.842 },
    confidence: 94.2,
    status: "Investigation Active",
    severity: "High",
    spillAreaKm2: 18.7,
    spillLengthKm: 8.4,
    spillWidthKm: 2.6,
    estimatedVolumeM3: 420,
    estimatedBarrels: 2640,
    shape: "Elongated continuous slick with feathered margins",
    orientation: "138° (SE drift axis)",
    sarSatellite: "Sentinel-1C SAR (Simulated C-Band)",
    sensorMode: "Interferometric Wide Swath (IW), VV Polarization",
    resolutionMeters: 10,
    orbitPass: "Descending (Relative Orbit 042)",
    lookDirection: "Right-looking (Incidence angle 36.4°)",
    modelDetails: {
      name: "U-Net Marine Slick Detector",
      version: "v2.4-Simulated",
      inferenceLatencyMs: 1420,
      confidenceScore: 0.942,
      darkFormationContrastDb: -6.8
    },
    slickPolygon: [
      [18.852, 72.810],
      [18.848, 72.825],
      [18.835, 72.840],
      [18.818, 72.862],
      [18.802, 72.875],
      [18.808, 72.855],
      [18.825, 72.830],
      [18.840, 72.815]
    ],
    probableSourceRegion: {
      center: [18.915, 72.718],
      radiusMeters: 2400,
      releaseWindowStart: "2026-09-27T11:45:00Z",
      releaseWindowEnd: "2026-09-27T13:10:00Z",
      displayWindow: "11:45 – 13:10 UTC (27 Sep 2026)",
      confidence: 78,
      method: "Lagrangian Particle Backtracking (500 simulated particles)"
    },
    backwardTrajectory: [
      [18.824, 72.842],
      [18.849, 72.808],
      [18.878, 72.766],
      [18.915, 72.718]
    ],
    candidateCount: 4,
    primaryCandidate: "MV Ocean Star"
  },
  {
    id: "INC-2026-002",
    title: "Coromandel Coastal Approach Slick",
    detectedAt: "2026-09-25T08:15:00Z",
    displayDate: "25 Sep 2026, 08:15 UTC",
    locationName: "Bay of Bengal (18 nm E of Chennai Outer Anchorage)",
    region: "East Coast EEZ - India",
    coordinates: { lat: 13.180, lng: 80.420 },
    confidence: 89.6,
    status: "Source Identified - Pending Inspection",
    severity: "Medium",
    spillAreaKm2: 12.3,
    spillLengthKm: 5.8,
    spillWidthKm: 2.1,
    estimatedVolumeM3: 210,
    estimatedBarrels: 1320,
    shape: "Discontinuous patch formation with thin sheen",
    orientation: "022° (NNE drift axis)",
    sarSatellite: "Sentinel-1A SAR (Simulated C-Band)",
    sensorMode: "IW Swath, VV+VH Polarization",
    resolutionMeters: 10,
    orbitPass: "Ascending",
    lookDirection: "Right-looking",
    modelDetails: {
      name: "U-Net Marine Slick Detector",
      version: "v2.4-Simulated",
      inferenceLatencyMs: 1380,
      confidenceScore: 0.896,
      darkFormationContrastDb: -5.4
    },
    slickPolygon: [
      [13.195, 80.410],
      [13.190, 80.430],
      [13.175, 80.435],
      [13.165, 80.420],
      [13.172, 80.405]
    ],
    probableSourceRegion: {
      center: [13.120, 80.380],
      radiusMeters: 1800,
      releaseWindowStart: "2026-09-25T04:30:00Z",
      releaseWindowEnd: "2026-09-25T06:00:00Z",
      displayWindow: "04:30 – 06:00 UTC (25 Sep 2026)",
      confidence: 72,
      method: "Lagrangian Particle Backtracking"
    },
    backwardTrajectory: [
      [13.180, 80.420],
      [13.155, 80.400],
      [13.120, 80.380]
    ],
    candidateCount: 1,
    primaryCandidate: "MT Silver Ray"
  },
  {
    id: "INC-2026-003",
    title: "Gulf of Kutch Tanker Fairway Discharge",
    detectedAt: "2026-09-22T19:40:00Z",
    displayDate: "22 Sep 2026, 19:40 UTC",
    locationName: "Gulf of Kutch (Near Vadinar Deep Water Anchorage)",
    region: "Gujarat Maritime Zone",
    coordinates: { lat: 22.480, lng: 69.750 },
    confidence: 96.1,
    status: "Investigation Active",
    severity: "High",
    spillAreaKm2: 15.4,
    spillLengthKm: 7.2,
    spillWidthKm: 2.2,
    estimatedVolumeM3: 380,
    estimatedBarrels: 2390,
    shape: "Linear wake sheen with localized heavy emulsion core",
    orientation: "075° (ENE tidal vector)",
    sarSatellite: "Sentinel-1B SAR (Simulated C-Band)",
    sensorMode: "IW Swath, VV Polarization",
    resolutionMeters: 10,
    orbitPass: "Descending",
    lookDirection: "Left-looking",
    modelDetails: {
      name: "U-Net Marine Slick Detector",
      version: "v2.4-Simulated",
      inferenceLatencyMs: 1450,
      confidenceScore: 0.961,
      darkFormationContrastDb: -7.2
    },
    slickPolygon: [
      [22.490, 69.730],
      [22.485, 69.760],
      [22.470, 69.770],
      [22.465, 69.740]
    ],
    probableSourceRegion: {
      center: [22.450, 69.670],
      radiusMeters: 2100,
      releaseWindowStart: "2026-09-22T17:00:00Z",
      releaseWindowEnd: "2026-09-22T18:15:00Z",
      displayWindow: "17:00 – 18:15 UTC (22 Sep 2026)",
      confidence: 84,
      method: "Lagrangian Particle Backtracking"
    },
    backwardTrajectory: [
      [22.480, 69.750],
      [22.465, 69.710],
      [22.450, 69.670]
    ],
    candidateCount: 1,
    primaryCandidate: "MV Gujarat Pioneer"
  },
  {
    id: "INC-2026-004",
    title: "Great Nicobar International Shipping Lane Sighting",
    detectedAt: "2026-09-19T03:22:00Z",
    displayDate: "19 Sep 2026, 03:22 UTC",
    locationName: "Malacca Strait Gateway (30 nm S of Indira Point)",
    region: "Andaman & Nicobar Waters",
    coordinates: { lat: 6.880, lng: 93.920 },
    confidence: 91.8,
    status: "Investigation Active",
    severity: "Critical",
    spillAreaKm2: 24.6,
    spillLengthKm: 11.2,
    spillWidthKm: 2.8,
    estimatedVolumeM3: 650,
    estimatedBarrels: 4088,
    shape: "Extended segmented ribbon slick along traffic lane",
    orientation: "115° (ESE transit corridor)",
    sarSatellite: "Sentinel-1C SAR (Simulated C-Band)",
    sensorMode: "Extended Wide (EW) Swath",
    resolutionMeters: 20,
    orbitPass: "Ascending",
    lookDirection: "Right-looking",
    modelDetails: {
      name: "U-Net Marine Slick Detector",
      version: "v2.4-Simulated",
      inferenceLatencyMs: 1620,
      confidenceScore: 0.918,
      darkFormationContrastDb: -6.1
    },
    slickPolygon: [
      [6.895, 93.900],
      [6.885, 93.940],
      [6.865, 93.950],
      [6.860, 93.910]
    ],
    probableSourceRegion: {
      center: [6.950, 93.750],
      radiusMeters: 3200,
      releaseWindowStart: "2026-09-19T00:00:00Z",
      releaseWindowEnd: "2026-09-19T01:30:00Z",
      displayWindow: "00:00 – 01:30 UTC (19 Sep 2026)",
      confidence: 76,
      method: "Lagrangian Particle Backtracking"
    },
    backwardTrajectory: [
      [6.880, 93.920],
      [6.915, 93.835],
      [6.950, 93.750]
    ],
    candidateCount: 1,
    primaryCandidate: "MT Southern Voyager"
  }
];

export const mockEnvironmental = {
  "INC-2026-001": {
    incidentId: "INC-2026-001",
    timestamp: "2026-09-27T14:32:00Z",
    sourceSimulation: "INCOIS-HYCOM / ECMWF Wave & Drift Composite",
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
  }
};

export const mockVessels = {
  "INC-2026-001": [
    {
      id: "vessel-001",
      mmsi: "419001234",
      imo: "9381201",
      name: "MV Ocean Star",
      callsign: "VTSA9",
      flag: "Panama [PA]",
      flagCode: "PA",
      shipType: "Crude Oil Tanker",
      length: 249,
      beam: 44,
      draught: 14.8,
      dwt: 115000,
      yearBuilt: 2012,
      destination: "Vadinar SPM",
      eta: "2026-09-28 10:00 UTC",
      navStatus: "Underway Using Engine",
      currentPosition: {
        lat: 18.790,
        lng: 72.880,
        sog: 11.4,
        cog: 142,
        heading: 140,
        rot: 0.1,
        timestamp: "2026-09-27T14:32:00Z"
      },
      correlationScore: 88,
      candidateRank: 1,
      candidateTag: "Primary Candidate Vessel",
      color: "#ef4444",
      distanceFromSourceKm: 4.2,
      minSourceDistanceKm: 0.65,
      timeOverlap: "Direct Overlap (12:05 – 12:48 UTC)",
      trajectoryCompatibility: "High",
      behavioralAnomaly: "Slowdown & Course Deviation",
      evidenceBreakdown: {
        spatialProximity: {
          matched: true,
          detail: "Transited within 0.65 km of estimated discharge centroid at 12:22 UTC"
        },
        temporalOverlap: {
          matched: true,
          detail: "Present during 11:45–13:10 UTC release window for 43 minutes"
        },
        trajectoryConsistency: {
          matched: true,
          detail: "Vessel track heading 142° matches backwards slick elongation axis (138°)"
        },
        behaviorAnomaly: {
          matched: true,
          detail: "Unexplained deceleration from 14.2 kn to 4.1 kn + 28° heading deflection"
        }
      },
      anomalies: [
        { time: "12:12 UTC", type: "Abrupt Deceleration", description: "Speed dropped from cruising 14.2 knots to 4.1 knots in 18 minutes" },
        { time: "12:25 UTC", type: "TSS Lane Deviation", description: "28° unannounced dog-leg maneuver off designated westbound traffic separation scheme" },
        { time: "12:18 - 12:36 UTC", type: "AIS Intermittent Beacon", description: "18-minute transmission gap coinciding with slowest speed segment" }
      ],
      track: [
        { time: "10:00", timestamp: "2026-09-27T10:00:00Z", lat: 19.080, lng: 72.520, sog: 14.5, cog: 142, heading: 142 },
        { time: "11:00", timestamp: "2026-09-27T11:00:00Z", lat: 19.005, lng: 72.610, sog: 14.2, cog: 142, heading: 142 },
        { time: "11:45", timestamp: "2026-09-27T11:45:00Z", lat: 18.950, lng: 72.675, sog: 13.8, cog: 142, heading: 141 },
        { time: "12:12", timestamp: "2026-09-27T12:12:00Z", lat: 18.922, lng: 72.710, sog: 8.4, cog: 148, heading: 146 },
        { time: "12:22", timestamp: "2026-09-27T12:22:00Z", lat: 18.916, lng: 72.720, sog: 4.1, cog: 170, heading: 168 },
        { time: "12:36", timestamp: "2026-09-27T12:36:00Z", lat: 18.905, lng: 72.735, sog: 5.6, cog: 142, heading: 140 },
        { time: "13:10", timestamp: "2026-09-27T13:10:00Z", lat: 18.875, lng: 72.775, sog: 11.2, cog: 142, heading: 141 },
        { time: "14:32", timestamp: "2026-09-27T14:32:00Z", lat: 18.790, lng: 72.880, sog: 11.4, cog: 142, heading: 140 },
        { time: "15:30", timestamp: "2026-09-27T15:30:00Z", lat: 18.730, lng: 72.950, sog: 12.0, cog: 142, heading: 141 },
        { time: "16:00", timestamp: "2026-09-27T16:00:00Z", lat: 18.700, lng: 72.985, sog: 12.1, cog: 142, heading: 142 }
      ]
    },
    {
      id: "vessel-002",
      mmsi: "354002345",
      imo: "9234567",
      name: "MV Coastal Trader",
      callsign: "HP8234",
      flag: "Panama [PA]",
      flagCode: "PA",
      shipType: "Bulk Carrier",
      length: 190,
      beam: 32,
      draught: 11.2,
      dwt: 56000,
      yearBuilt: 2017,
      destination: "Jawaharlal Nehru Port (JNPT)",
      eta: "2026-09-27 18:00 UTC",
      navStatus: "Underway Using Engine",
      currentPosition: {
        lat: 18.980,
        lng: 72.820,
        sog: 12.8,
        cog: 105,
        heading: 106,
        rot: 0.0,
        timestamp: "2026-09-27T14:32:00Z"
      },
      correlationScore: 48,
      candidateRank: 2,
      candidateTag: "Secondary Candidate",
      color: "#5C0A28",
      distanceFromSourceKm: 11.8,
      minSourceDistanceKm: 8.4,
      timeOverlap: "Partial (12:40 UTC in adjacent fairway)",
      trajectoryCompatibility: "Medium",
      behavioralAnomaly: "None",
      evidenceBreakdown: {
        spatialProximity: { matched: false, detail: "Transited 8.4 km north of source boundary in designated entry lane" },
        temporalOverlap: { matched: true, detail: "Near region during trailing 30 mins of release window" },
        trajectoryConsistency: { matched: false, detail: "Course 105° perpendicular to oil dispersion axis" },
        behaviorAnomaly: { matched: false, detail: "Normal steady transit at constant 12.8 knots with continuous AIS reporting" }
      },
      anomalies: [],
      track: [
        { time: "10:00", timestamp: "2026-09-27T10:00:00Z", lat: 18.910, lng: 72.250, sog: 13.0, cog: 105, heading: 105 },
        { time: "12:10", timestamp: "2026-09-27T12:10:00Z", lat: 18.955, lng: 72.580, sog: 12.8, cog: 105, heading: 105 },
        { time: "14:32", timestamp: "2026-09-27T14:32:00Z", lat: 18.980, lng: 72.820, sog: 12.8, cog: 105, heading: 106 }
      ]
    },
    {
      id: "vessel-003",
      mmsi: "636015678",
      imo: "9456782",
      name: "MT Amber Horizon",
      callsign: "A8KL7",
      flag: "Marshall Islands [MH]",
      flagCode: "MH",
      shipType: "Chemical / Products Tanker",
      length: 182,
      beam: 27,
      draught: 9.8,
      dwt: 45000,
      yearBuilt: 2015,
      destination: "Kandla Port",
      eta: "2026-09-29 04:00 UTC",
      navStatus: "Underway Using Engine",
      currentPosition: {
        lat: 19.140,
        lng: 72.620,
        sog: 13.5,
        cog: 345,
        heading: 344,
        rot: 0.0,
        timestamp: "2026-09-27T14:32:00Z"
      },
      correlationScore: 19,
      candidateRank: 3,
      candidateTag: "Low Priority Candidate",
      color: "#A9A9A9",
      distanceFromSourceKm: 23.4,
      minSourceDistanceKm: 21.0,
      timeOverlap: "No (Passed prior to release window at 10:15 UTC)",
      trajectoryCompatibility: "Low",
      behavioralAnomaly: "None",
      evidenceBreakdown: {
        spatialProximity: { matched: false, detail: "Separation exceeding 21 km from release boundary at all points" },
        temporalOverlap: { matched: false, detail: "Transited western sector 1.5 hours prior to earliest estimated release" },
        trajectoryConsistency: { matched: false, detail: "Northbound track 345° opposite to slick displacement" },
        behaviorAnomaly: { matched: false, detail: "Uninterrupted transit at 13.5 knots" }
      },
      anomalies: [],
      track: [
        { time: "10:00", timestamp: "2026-09-27T10:00:00Z", lat: 18.700, lng: 72.740, sog: 13.5, cog: 345, heading: 345 },
        { time: "14:32", timestamp: "2026-09-27T14:32:00Z", lat: 19.140, lng: 72.620, sog: 13.5, cog: 345, heading: 344 }
      ]
    },
    {
      id: "vessel-004",
      mmsi: "563009876",
      imo: "9123456",
      name: "MT Eastern Pearl",
      callsign: "9V8831",
      flag: "Singapore [SG]",
      flagCode: "SG",
      shipType: "LPG Tanker",
      length: 160,
      beam: 25,
      draught: 8.5,
      dwt: 22000,
      yearBuilt: 2019,
      destination: "Mormugao",
      eta: "2026-09-28 02:00 UTC",
      navStatus: "Underway Using Engine",
      currentPosition: {
        lat: 18.720,
        lng: 72.720,
        sog: 14.8,
        cog: 175,
        heading: 174,
        rot: 0.0,
        timestamp: "2026-09-27T14:32:00Z"
      },
      correlationScore: 12,
      candidateRank: 4,
      candidateTag: "Low Priority Candidate",
      color: "#f97316",
      distanceFromSourceKm: 16.5,
      minSourceDistanceKm: 14.2,
      timeOverlap: "No (Post-incident transit at 14:05 UTC)",
      trajectoryCompatibility: "Low",
      behavioralAnomaly: "None",
      evidenceBreakdown: {
        spatialProximity: { matched: false, detail: "Transited 14.2 km west of probable source boundary" },
        temporalOverlap: { matched: false, detail: "Passed closest point at 14:05 UTC, after detection and release window" },
        trajectoryConsistency: { matched: false, detail: "Southward course 175°" },
        behaviorAnomaly: { matched: false, detail: "Nominal passage at 14.8 knots" }
      },
      anomalies: [],
      track: [
        { time: "11:00", timestamp: "2026-09-27T11:00:00Z", lat: 19.180, lng: 72.680, sog: 14.8, cog: 175, heading: 175 },
        { time: "14:32", timestamp: "2026-09-27T14:32:00Z", lat: 18.720, lng: 72.720, sog: 14.8, cog: 175, heading: 174 }
      ]
    }
  ]
};

export const mockForecasts = {
  "INC-2026-001": {
    incidentId: "INC-2026-001",
    baseTimestamp: "2026-09-27T14:32:00Z",
    modelName: "Lagrangian Spill Drift & GNOME Weathering Model",
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
        center: [18.725, 72.970],
        areaKm2: 31.8,
        evaporationPercent: 21.0,
        dispersionPercent: 6.2,
        emulsionWaterPercent: 48,
        remainingVolumeM3: 305,
        slickThicknessMicrons: 52,
        corridorRadiusMeters: 2400,
        polygon: [
          [18.760, 72.930],
          [18.750, 72.965],
          [18.725, 73.000],
          [18.695, 73.010],
          [18.690, 72.980],
          [18.710, 72.945],
          [18.740, 72.920]
        ]
      },
      {
        step: "+24h",
        hoursAhead: 24,
        timestamp: "2026-09-28T14:32:00Z",
        displayTime: "28 Sep, 14:32 UTC (+24 Hours - Critical Horizon)",
        center: [18.630, 73.080],
        areaKm2: 44.2,
        evaporationPercent: 28.5,
        dispersionPercent: 9.8,
        emulsionWaterPercent: 64,
        remainingVolumeM3: 260,
        slickThicknessMicrons: 34,
        corridorRadiusMeters: 4100,
        polygon: [
          [18.675, 73.030],
          [18.665, 73.075],
          [18.635, 73.125],
          [18.595, 73.135],
          [18.585, 73.090],
          [18.610, 73.045],
          [18.650, 73.015]
        ]
      }
    ],
    forecastPath: [
      [18.824, 72.842],
      [18.775, 72.905],
      [18.725, 72.970],
      [18.630, 73.080]
    ],
    uncertaintyCorridor: [
      [18.850, 72.825],
      [18.810, 72.935],
      [18.760, 73.015],
      [18.670, 73.145],
      [18.590, 73.115],
      [18.690, 72.925],
      [18.740, 72.860],
      [18.798, 72.810]
    ]
  }
};

export const mockEvidence = {
  "INC-2026-001": {
    incidentId: "INC-2026-001",
    reportNumber: "SIH-2026-MARPOL-001A",
    generatedAt: "2026-09-27T16:00:00Z",
    leadInvestigatingAgency: "Indian Coast Guard (MRCC West) / MoEFCC",
    confidenceTier: "Tier 1 - High Priority Corroboration",
    suspectVessel: {
      name: "MV Ocean Star",
      mmsi: "419001234",
      imo: "9381201",
      flag: "Panama [PA]",
      shipType: "Crude Oil Tanker",
      deadweightTonnage: 115000,
      registeredOwner: "Star Maritime Corp SA (Panama)",
      technicalManager: "Vanguard Marine Services LLC",
      classificationSociety: "DNV (Det Norske Veritas)",
      pAndIClub: "The London P&I Club"
    },
    executiveSummary: "Multi-sensor corroboration strongly indicates MV Ocean Star as the probable source of the oil slick detected on 27 Sep 2026 in the Arabian Sea.",
    satelliteDetection: {
      sensor: "Sentinel-1C Synthetic Aperture Radar (SAR)",
      mode: "Interferometric Wide Swath (IW)",
      acquisitionTime: "2026-09-27T14:32:00Z",
      slickCentroid: "18.824°N, 72.842°E",
      slickArea: "18.7 km²",
      slickLength: "8.4 km",
      slickOrientation: "138° (SE)",
      contrastDb: "-6.8 dB relative to surrounding oceanic background",
      detectionAlgorithm: "Deep Convolutional U-Net v2.4 (Simulated)",
      classificationConfidence: "94.2%"
    },
    hydrodynamicHindcast: {
      simulationEngine: "Lagrangian Particle Drift Model (500 Particles)",
      metoceanDataSource: "INCOIS-HYCOM surface currents + ECMWF ERA5 wind reanalysis",
      estimatedDischargeCentroid: "18.915°N, 72.718°E",
      estimatedDischargeRadius: "2.4 km (95% spatial confidence circle)",
      estimatedDischargeWindow: "27 Sep 2026, 11:45 to 13:10 UTC (Duration: 85 mins)",
      backwardDriftDisplacement: "16.8 km in direction 318° (NW hindcast vector)"
    },
    aisCorrelationFindings: {
      totalVesselsScreened: 14,
      candidateVesselsWithinWindow: 4,
      primaryCandidate: "MV Ocean Star",
      correlationScore: "88%",
      closestPointOfApproach: "0.65 km from reconstructed discharge centroid at 12:22 UTC",
      timeInReleaseZone: "43 minutes (12:05 to 12:48 UTC)",
      speedAnomaly: "Deceleration from 14.2 kn to 4.1 kn (71% drop) during transit",
      courseDeflection: "28° heading change off designated traffic separation scheme (TSS)",
      aisIntegrityAlert: "18-minute AIS transmission gap between 12:18 and 12:36 UTC"
    },
    driftForecastSummary: {
      modelConfidence: "81%",
      forecastHorizon: "24 Hours (through 28 Sep 14:32 UTC)",
      projectedDisplacement: "23.4 km bearing 138° (SE)",
      shorelineImpactThreat: "Alibaug & Murud coastal aquaculture sectors within 36 hours",
      projected24hArea: "44.2 km²",
      estimatedRemainingVolume: "260 m³ (28.5% evaporation, 9.8% natural dispersion)"
    },
    recommendedCoastGuardActions: [
      { priority: "CRITICAL", action: "Deploy Coast Guard Offshore Patrol Vessel (OPV) to intercept MV Ocean Star for physical hull and bilge inspection" },
      { priority: "HIGH", action: "Pre-position containment booms and skimmers off Alibaug coastline in coordination with Maharashtra Maritime Board" },
      { priority: "HIGH", action: "Request Oil Record Book (Part II - Cargo/Ballast Operations) and MARPOL Annex I compliance logs via Port State Control (PSC)" },
      { priority: "MEDIUM", action: "Sample coastal baseline water quality at Murud sensitive aquaculture zones ahead of forecast slick impact" },
      { priority: "MEDIUM", action: "Issue Notice to Mariners (NOTMAR) for Arabian Sea TSS Sector 4 regarding surface slick navigation hazard" }
    ]
  }
};

export const mockHistory = [
  {
    vesselId: "vessel-001",
    mmsi: "419001234",
    name: "MV Ocean Star",
    imo: "9381201",
    shipType: "Crude Oil Tanker",
    flag: "Panama [PA]",
    operator: "Star Maritime Corp SA (Simulated)",
    registeredOwner: "Star Shipping Holdings LLC",
    classificationSociety: "DNV",
    riskRating: "Elevated (Tier-3 Inspection Watchlist)",
    complianceSummary: {
      totalPastIncidents: 2,
      pscInspectionsRecorded: 18,
      deficienciesCount: 7,
      detentionsRecorded: 1,
      lastInspectionDate: "2026-03-14",
      lastInspectionPort: "Singapore"
    },
    pastIncidents: [
      {
        date: "2024-11-08",
        port: "Fujairah Anchorage (UAE)",
        type: "Oily Bilge Water Discharge (MARPOL Annex I)",
        severity: "Moderate Sheen",
        description: "15 ppm oily-water separator bypass valve malfunction leading to unauthorized overboard discharge during deballasting",
        penalty: "$45,000 USD Fine + 48h detention for equipment rectification"
      },
      {
        date: "2023-06-22",
        port: "Suez Canal Transit",
        type: "AIS Transmitter Failure / Non-reporting",
        severity: "Regulatory Violation",
        description: "Failure to transmit Class-A AIS signals for 4.2 consecutive hours in high-density convoy lane",
        penalty: "Suez Canal Authority formal warning & pilotage surcharge"
      }
    ]
  },
  {
    vesselId: "vessel-002",
    mmsi: "354002345",
    name: "MV Coastal Trader",
    imo: "9234567",
    shipType: "Bulk Carrier",
    flag: "Panama [PA]",
    operator: "Eastern Seas Bulk Carriers (Simulated)",
    riskRating: "Moderate (Tier-2 Standard Surveillance)",
    complianceSummary: {
      totalPastIncidents: 0,
      pscInspectionsRecorded: 14,
      deficienciesCount: 3,
      detentionsRecorded: 0
    },
    pastIncidents: []
  },
  {
    vesselId: "vessel-003",
    mmsi: "636015678",
    name: "MT Amber Horizon",
    imo: "9456782",
    shipType: "Chemical / Products Tanker",
    flag: "Marshall Islands [MH]",
    operator: "Horizon ChemCarriers Pte (Simulated)",
    riskRating: "Low (Tier-1 Standard Profile)",
    complianceSummary: {
      totalPastIncidents: 0,
      pscInspectionsRecorded: 22,
      deficienciesCount: 2,
      detentionsRecorded: 0
    },
    pastIncidents: []
  },
  {
    vesselId: "vessel-004",
    mmsi: "563009876",
    name: "MT Eastern Pearl",
    imo: "9123456",
    shipType: "LPG Tanker",
    flag: "Singapore [SG]",
    operator: "Pearl Gas Transport Ltd (Simulated)",
    riskRating: "Low (Tier-1 Standard Profile)",
    complianceSummary: {
      totalPastIncidents: 0,
      pscInspectionsRecorded: 16,
      deficienciesCount: 1,
      detentionsRecorded: 0
    },
    pastIncidents: []
  }
];
