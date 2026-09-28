// Mock AIS Vessel Tracking & Correlation Database
const vesselsData = {
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
        {
          time: "12:12 UTC",
          type: "Abrupt Deceleration",
          description: "Speed dropped from cruising 14.2 knots to 4.1 knots in 18 minutes"
        },
        {
          time: "12:25 UTC",
          type: "TSS Lane Deviation",
          description: "28° unannounced dog-leg maneuver off designated westbound traffic separation scheme"
        },
        {
          time: "12:18 - 12:36 UTC",
          type: "AIS Intermittent Beacon",
          description: "Transponder interval degraded from standard 10s to 6-minute burst gaps"
        }
      ],
      // Track points between 10:00 and 16:00 UTC
      track: [
        { time: "10:00", timestamp: "2026-09-27T10:00:00Z", lat: 19.120, lng: 72.480, sog: 14.2, cog: 140, heading: 140 },
        { time: "11:00", timestamp: "2026-09-27T11:00:00Z", lat: 19.030, lng: 72.585, sog: 14.1, cog: 141, heading: 141 },
        { time: "11:45", timestamp: "2026-09-27T11:45:00Z", lat: 18.960, lng: 72.665, sog: 13.8, cog: 142, heading: 142 },
        { time: "12:10", timestamp: "2026-09-27T12:10:00Z", lat: 18.925, lng: 72.705, sog: 8.5, cog: 148, heading: 145 },
        { time: "12:25", timestamp: "2026-09-27T12:25:00Z", lat: 18.912, lng: 72.722, sog: 4.1, cog: 168, heading: 166 }, // In source region
        { time: "12:45", timestamp: "2026-09-27T12:45:00Z", lat: 18.895, lng: 72.748, sog: 6.8, cog: 144, heading: 143 },
        { time: "13:30", timestamp: "2026-09-27T13:30:00Z", lat: 18.850, lng: 72.805, sog: 11.2, cog: 141, heading: 140 },
        { time: "14:32", timestamp: "2026-09-27T14:32:00Z", lat: 18.790, lng: 72.880, sog: 11.4, cog: 142, heading: 140 }, // Detection time
        { time: "15:30", timestamp: "2026-09-27T15:30:00Z", lat: 18.730, lng: 72.950, sog: 11.5, cog: 142, heading: 141 },
        { time: "16:00", timestamp: "2026-09-27T16:00:00Z", lat: 18.700, lng: 72.990, sog: 11.5, cog: 142, heading: 142 }
      ]
    },
    {
      id: "vessel-002",
      mmsi: "352002345",
      imo: "9245671",
      name: "MV Meridian",
      callsign: "3FGL4",
      flag: "Liberia [LR]",
      flagCode: "LR",
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
      color: "#f59e0b",
      distanceFromSourceKm: 11.8,
      minSourceDistanceKm: 8.4,
      timeOverlap: "Partial (12:40 UTC in adjacent fairway)",
      trajectoryCompatibility: "Medium",
      behavioralAnomaly: "None",
      evidenceBreakdown: {
        spatialProximity: {
          matched: false,
          detail: "Transited 8.4 km north of source boundary in designated entry lane"
        },
        temporalOverlap: {
          matched: true,
          detail: "Near region during trailing 30 mins of release window"
        },
        trajectoryConsistency: {
          matched: false,
          detail: "Course 105° perpendicular to oil dispersion axis"
        },
        behaviorAnomaly: {
          matched: false,
          detail: "Normal steady transit at constant 12.8 knots with continuous AIS reporting"
        }
      },
      anomalies: [],
      track: [
        { time: "10:00", timestamp: "2026-09-27T10:00:00Z", lat: 18.910, lng: 72.250, sog: 13.0, cog: 105, heading: 105 },
        { time: "11:00", timestamp: "2026-09-27T11:00:00Z", lat: 18.930, lng: 72.400, sog: 12.9, cog: 105, heading: 105 },
        { time: "11:45", timestamp: "2026-09-27T11:45:00Z", lat: 18.945, lng: 72.510, sog: 12.8, cog: 105, heading: 105 },
        { time: "12:10", timestamp: "2026-09-27T12:10:00Z", lat: 18.955, lng: 72.580, sog: 12.8, cog: 105, heading: 105 },
        { time: "12:25", timestamp: "2026-09-27T12:25:00Z", lat: 18.960, lng: 72.630, sog: 12.8, cog: 105, heading: 105 },
        { time: "12:45", timestamp: "2026-09-27T12:45:00Z", lat: 18.968, lng: 72.695, sog: 12.8, cog: 105, heading: 105 },
        { time: "13:30", timestamp: "2026-09-27T13:30:00Z", lat: 18.975, lng: 72.760, sog: 12.8, cog: 105, heading: 106 },
        { time: "14:32", timestamp: "2026-09-27T14:32:00Z", lat: 18.980, lng: 72.820, sog: 12.8, cog: 105, heading: 106 },
        { time: "15:30", timestamp: "2026-09-27T15:30:00Z", lat: 18.985, lng: 72.875, sog: 10.0, cog: 105, heading: 105 },
        { time: "16:00", timestamp: "2026-09-27T16:00:00Z", lat: 18.990, lng: 72.905, sog: 6.0, cog: 105, heading: 105 }
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
      color: "#10b981",
      distanceFromSourceKm: 23.4,
      minSourceDistanceKm: 21.0,
      timeOverlap: "No (Passed prior to release window at 10:15 UTC)",
      trajectoryCompatibility: "Low",
      behavioralAnomaly: "None",
      evidenceBreakdown: {
        spatialProximity: {
          matched: false,
          detail: "Separation exceeding 21 km from release boundary at all points"
        },
        temporalOverlap: {
          matched: false,
          detail: "Transited western sector 1.5 hours prior to earliest estimated release"
        },
        trajectoryConsistency: {
          matched: false,
          detail: "Northbound track 345° opposite to slick displacement"
        },
        behaviorAnomaly: {
          matched: false,
          detail: "Uninterrupted transit at 13.5 knots"
        }
      },
      anomalies: [],
      track: [
        { time: "10:00", timestamp: "2026-09-27T10:00:00Z", lat: 18.700, lng: 72.740, sog: 13.5, cog: 345, heading: 345 },
        { time: "11:00", timestamp: "2026-09-27T11:00:00Z", lat: 18.820, lng: 72.710, sog: 13.5, cog: 345, heading: 345 },
        { time: "12:00", timestamp: "2026-09-27T12:00:00Z", lat: 18.940, lng: 72.675, sog: 13.5, cog: 345, heading: 345 },
        { time: "13:00", timestamp: "2026-09-27T13:00:00Z", lat: 19.040, lng: 72.645, sog: 13.5, cog: 345, heading: 345 },
        { time: "14:32", timestamp: "2026-09-27T14:32:00Z", lat: 19.140, lng: 72.620, sog: 13.5, cog: 345, heading: 344 },
        { time: "16:00", timestamp: "2026-09-27T16:00:00Z", lat: 19.250, lng: 72.590, sog: 13.5, cog: 345, heading: 345 }
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
      color: "#10b981",
      distanceFromSourceKm: 16.5,
      minSourceDistanceKm: 14.2,
      timeOverlap: "No (Post-incident transit at 14:05 UTC)",
      trajectoryCompatibility: "Low",
      behavioralAnomaly: "None",
      evidenceBreakdown: {
        spatialProximity: {
          matched: false,
          detail: "Transited 14.2 km west of probable source boundary"
        },
        temporalOverlap: {
          matched: false,
          detail: "Passed closest point at 14:05 UTC, after detection and release window"
        },
        trajectoryConsistency: {
          matched: false,
          detail: "Southward course 175°"
        },
        behaviorAnomaly: {
          matched: false,
          detail: "Nominal passage at 14.8 knots"
        }
      },
      anomalies: [],
      track: [
        { time: "11:00", timestamp: "2026-09-27T11:00:00Z", lat: 19.180, lng: 72.680, sog: 14.8, cog: 175, heading: 175 },
        { time: "12:00", timestamp: "2026-09-27T12:00:00Z", lat: 19.040, lng: 72.695, sog: 14.8, cog: 175, heading: 175 },
        { time: "13:00", timestamp: "2026-09-27T13:00:00Z", lat: 18.900, lng: 72.705, sog: 14.8, cog: 175, heading: 175 },
        { time: "14:00", timestamp: "2026-09-27T14:00:00Z", lat: 18.760, lng: 72.715, sog: 14.8, cog: 175, heading: 175 },
        { time: "14:32", timestamp: "2026-09-27T14:32:00Z", lat: 18.720, lng: 72.720, sog: 14.8, cog: 175, heading: 174 },
        { time: "16:00", timestamp: "2026-09-27T16:00:00Z", lat: 18.580, lng: 72.730, sog: 14.8, cog: 175, heading: 175 }
      ]
    },
    {
      id: "vessel-005",
      mmsi: "211567890",
      imo: "9678910",
      name: "MV Sea Falcon",
      callsign: "DF882",
      flag: "Germany [DE]",
      flagCode: "DE",
      shipType: "Container Ship",
      length: 294,
      beam: 32,
      draught: 12.0,
      dwt: 65000,
      yearBuilt: 2018,
      destination: "Colombo",
      eta: "2026-09-29 18:00 UTC",
      navStatus: "Underway Using Engine",
      currentPosition: {
        lat: 18.600,
        lng: 72.550,
        sog: 18.5,
        cog: 160,
        heading: 160,
        rot: 0.0,
        timestamp: "2026-09-27T14:32:00Z"
      },
      correlationScore: 6,
      candidateRank: 5,
      candidateTag: "Excluded Vessel",
      color: "#6b7280",
      distanceFromSourceKm: 32.1,
      minSourceDistanceKm: 28.5,
      timeOverlap: "No",
      trajectoryCompatibility: "None",
      behavioralAnomaly: "None",
      evidenceBreakdown: {
        spatialProximity: { matched: false, detail: "Distant offshore transit (>28 km)" },
        temporalOverlap: { matched: false, detail: "Out of time frame" },
        trajectoryConsistency: { matched: false, detail: "Deep water corridor" },
        behaviorAnomaly: { matched: false, detail: "None" }
      },
      anomalies: [],
      track: [
        { time: "12:00", timestamp: "2026-09-27T12:00:00Z", lat: 18.950, lng: 72.420, sog: 18.5, cog: 160, heading: 160 },
        { time: "13:00", timestamp: "2026-09-27T13:00:00Z", lat: 18.780, lng: 72.480, sog: 18.5, cog: 160, heading: 160 },
        { time: "14:32", timestamp: "2026-09-27T14:32:00Z", lat: 18.600, lng: 72.550, sog: 18.5, cog: 160, heading: 160 },
        { time: "16:00", timestamp: "2026-09-27T16:00:00Z", lat: 18.420, lng: 72.620, sog: 18.5, cog: 160, heading: 160 }
      ]
    }
  ],
  "INC-2026-002": [
    {
      id: "vessel-201",
      mmsi: "419005678",
      imo: "9312890",
      name: "MT Silver Ray",
      shipType: "Chemical Tanker",
      length: 175,
      beam: 28,
      draught: 10.4,
      correlationScore: 82,
      candidateRank: 1,
      candidateTag: "Primary Candidate Vessel",
      color: "#ef4444",
      distanceFromSourceKm: 5.1,
      minSourceDistanceKm: 0.9,
      timeOverlap: "Direct Overlap",
      trajectoryCompatibility: "High",
      behavioralAnomaly: "Anchorage Drift & Slowdown",
      evidenceBreakdown: {
        spatialProximity: { matched: true, detail: "Inside 1 km radius" },
        temporalOverlap: { matched: true, detail: "Present 04:45-05:30 UTC" },
        trajectoryConsistency: { matched: true, detail: "Heading matches NNE vector" },
        behaviorAnomaly: { matched: true, detail: "Stopped outside anchorage line" }
      },
      currentPosition: { lat: 13.220, lng: 80.440, sog: 6.2, cog: 22, heading: 20, timestamp: "2026-09-25T08:15:00Z" },
      track: [
        { time: "04:00", timestamp: "2026-09-25T04:00:00Z", lat: 13.080, lng: 80.360, sog: 12.0, cog: 22, heading: 22 },
        { time: "05:00", timestamp: "2026-09-25T05:00:00Z", lat: 13.125, lng: 80.380, sog: 3.5, cog: 25, heading: 24 },
        { time: "06:30", timestamp: "2026-09-25T06:30:00Z", lat: 13.165, lng: 80.410, sog: 8.0, cog: 22, heading: 21 },
        { time: "08:15", timestamp: "2026-09-25T08:15:00Z", lat: 13.220, lng: 80.440, sog: 6.2, cog: 22, heading: 20 }
      ]
    }
  ],
  "INC-2026-003": [
    {
      id: "vessel-301",
      mmsi: "419009988",
      imo: "9512345",
      name: "MV Gujarat Pioneer",
      shipType: "Oil/Chemical Products Tanker",
      length: 180,
      beam: 30,
      draught: 11.0,
      correlationScore: 84,
      candidateRank: 1,
      candidateTag: "Primary Candidate Vessel",
      color: "#ef4444",
      distanceFromSourceKm: 3.8,
      minSourceDistanceKm: 0.5,
      timeOverlap: "Direct Overlap",
      trajectoryCompatibility: "High",
      behavioralAnomaly: "Speed drop to 1.8 knots during SPM approach",
      evidenceBreakdown: {
        spatialProximity: { matched: true, detail: "0.5 km approach" },
        temporalOverlap: { matched: true, detail: "17:15-17:50 UTC" },
        trajectoryConsistency: { matched: true, detail: "Tidal channel track" },
        behaviorAnomaly: { matched: true, detail: "Erratic speed profile" }
      },
      currentPosition: { lat: 22.495, lng: 69.780, sog: 7.5, cog: 75, heading: 75, timestamp: "2026-09-22T19:40:00Z" },
      track: [
        { time: "16:00", timestamp: "2026-09-22T16:00:00Z", lat: 22.420, lng: 69.610, sog: 11.2, cog: 75, heading: 75 },
        { time: "17:30", timestamp: "2026-09-22T17:30:00Z", lat: 22.460, lng: 69.690, sog: 2.1, cog: 78, heading: 77 },
        { time: "19:40", timestamp: "2026-09-22T19:40:00Z", lat: 22.495, lng: 69.780, sog: 7.5, cog: 75, heading: 75 }
      ]
    }
  ],
  "INC-2026-004": [
    {
      id: "vessel-401",
      mmsi: "477002345",
      imo: "9211234",
      name: "MT Southern Voyager",
      shipType: "VLCC Crude Carrier",
      length: 333,
      beam: 60,
      draught: 21.0,
      correlationScore: 86,
      candidateRank: 1,
      candidateTag: "Primary Candidate Vessel",
      color: "#ef4444",
      distanceFromSourceKm: 12.0,
      minSourceDistanceKm: 0.8,
      timeOverlap: "Direct Overlap",
      trajectoryCompatibility: "High",
      behavioralAnomaly: "Late night wake bilge trail signature",
      evidenceBreakdown: {
        spatialProximity: { matched: true, detail: "Direct lane center" },
        temporalOverlap: { matched: true, detail: "00:15-01:10 UTC" },
        trajectoryConsistency: { matched: true, detail: "Aligned with Malacca inbound lane" },
        behaviorAnomaly: { matched: true, detail: "AIS power fluctuations" }
      },
      currentPosition: { lat: 6.910, lng: 93.990, sog: 15.0, cog: 115, heading: 115, timestamp: "2026-09-19T03:22:00Z" },
      track: [
        { time: "22:00", timestamp: "2026-09-18T22:00:00Z", lat: 7.050, lng: 93.550, sog: 15.0, cog: 115, heading: 115 },
        { time: "00:30", timestamp: "2026-09-19T00:30:00Z", lat: 6.980, lng: 93.740, sog: 15.1, cog: 115, heading: 115 },
        { time: "03:22", timestamp: "2026-09-19T03:22:00Z", lat: 6.910, lng: 93.990, sog: 15.0, cog: 115, heading: 115 }
      ]
    }
  ]
};

module.exports = vesselsData;
