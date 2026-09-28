// Mock Incidents Database
const incidents = [
  {
    id: "INC-2026-001",
    title: "Offshore Mumbai Basin Spill",
    detectedAt: "2026-09-27T14:32:00Z",
    displayDate: "27 Sep 2026, 14:32 UTC",
    locationName: "Arabian Sea (42 nm WSW of Mumbai Port)",
    region: "West Coast EEZ - India",
    coordinates: {
      lat: 18.824,
      lng: 72.842
    },
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
    coordinates: {
      lat: 13.180,
      lng: 80.420
    },
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
      [13.165, 80.418],
      [13.178, 80.405]
    ],
    probableSourceRegion: {
      center: [13.125, 80.380],
      radiusMeters: 2800,
      releaseWindowStart: "2026-09-25T04:30:00Z",
      releaseWindowEnd: "2026-09-25T06:00:00Z",
      displayWindow: "04:30 – 06:00 UTC (25 Sep 2026)",
      confidence: 74,
      method: "Lagrangian Particle Backtracking"
    },
    backwardTrajectory: [
      [13.180, 80.420],
      [13.155, 80.400],
      [13.125, 80.380]
    ],
    candidateCount: 3,
    primaryCandidate: "MT Silver Ray"
  },
  {
    id: "INC-2026-003",
    title: "Gulf of Kachchh Outer Fairway Slick",
    detectedAt: "2026-09-22T19:40:00Z",
    displayDate: "22 Sep 2026, 19:40 UTC",
    locationName: "Gulf of Kachchh (14 nm NW of Vadinar SPM)",
    region: "Gujarat Maritime Zone",
    coordinates: {
      lat: 22.480,
      lng: 69.750
    },
    confidence: 91.0,
    status: "Contained - Monitored",
    severity: "Medium",
    spillAreaKm2: 7.9,
    spillLengthKm: 3.9,
    spillWidthKm: 1.8,
    estimatedVolumeM3: 130,
    estimatedBarrels: 818,
    shape: "Sinuous streak aligned with tidal current",
    orientation: "075° (ENE tidal vector)",
    sarSatellite: "Sentinel-1B SAR (Simulated)",
    sensorMode: "IW Swath, VV Polarization",
    resolutionMeters: 10,
    orbitPass: "Descending",
    lookDirection: "Right-looking",
    modelDetails: {
      name: "U-Net Marine Slick Detector",
      version: "v2.4-Simulated",
      confidenceScore: 0.910
    },
    slickPolygon: [
      [22.490, 72.740],
      [22.485, 72.765],
      [22.472, 72.755],
      [22.478, 72.735]
    ],
    probableSourceRegion: {
      center: [22.460, 69.690],
      radiusMeters: 1900,
      releaseWindowStart: "2026-09-22T17:00:00Z",
      releaseWindowEnd: "2026-09-22T18:15:00Z",
      displayWindow: "17:00 – 18:15 UTC (22 Sep 2026)",
      confidence: 82,
      method: "Lagrangian Particle Backtracking"
    },
    backwardTrajectory: [
      [22.480, 69.750],
      [22.470, 69.720],
      [22.460, 69.690]
    ],
    candidateCount: 2,
    primaryCandidate: "MV Gujarat Pioneer"
  },
  {
    id: "INC-2026-004",
    title: "Great Nicobar Sea Lane Discharge",
    detectedAt: "2026-09-19T03:22:00Z",
    displayDate: "19 Sep 2026, 03:22 UTC",
    locationName: "Malacca Approach (35 nm SW of Indira Point)",
    region: "Andaman & Nicobar EEZ",
    coordinates: {
      lat: 6.950,
      lng: 93.850
    },
    confidence: 86.4,
    status: "Archived - Investigation Closed",
    severity: "High",
    spillAreaKm2: 24.1,
    spillLengthKm: 14.2,
    spillWidthKm: 1.9,
    estimatedVolumeM3: 580,
    estimatedBarrels: 3650,
    shape: "Extensive linear bilge wake discharge trail",
    orientation: "115° (ESE transit course)",
    sarSatellite: "Sentinel-1C SAR (Simulated)",
    sensorMode: "Extra Wide Swath (EW)",
    resolutionMeters: 20,
    orbitPass: "Ascending",
    lookDirection: "Left-looking",
    modelDetails: {
      name: "U-Net Marine Slick Detector",
      version: "v2.4-Simulated",
      confidenceScore: 0.864
    },
    slickPolygon: [
      [6.965, 93.820],
      [6.955, 93.890],
      [6.940, 93.880],
      [6.948, 93.810]
    ],
    probableSourceRegion: {
      center: [6.980, 93.740],
      radiusMeters: 3500,
      releaseWindowStart: "2026-09-18T23:30:00Z",
      releaseWindowEnd: "2026-09-19T01:30:00Z",
      displayWindow: "23:30 – 01:30 UTC (18-19 Sep 2026)",
      confidence: 76,
      method: "Lagrangian Particle Backtracking"
    },
    backwardTrajectory: [
      [6.950, 93.850],
      [6.965, 93.795],
      [6.980, 93.740]
    ],
    candidateCount: 5,
    primaryCandidate: "MT Southern Voyager"
  }
];

module.exports = incidents;
