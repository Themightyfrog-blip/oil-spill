// Mock Historical Vessel Intelligence & Compliance Records
const historicalRecords = {
  "vessel-001": {
    vesselId: "vessel-001",
    mmsi: "419001234",
    name: "MV Ocean Star",
    imo: "9381201",
    shipType: "Crude Oil Tanker",
    flag: "Panama [PA]",
    operator: "Titan Maritime Shipping Ltd (Simulated)",
    registeredOwner: "Star Line Holdings SA",
    classificationSociety: "DNV (Simulated)",
    riskRating: "Elevated (Tier-2 Maritime Risk Profile)",
    disclaimer: "Historical records provide contextual information only and do not establish responsibility for the current incident.",
    complianceSummary: {
      totalPastIncidents: 2,
      pscInspectionsRecorded: 14,
      deficienciesCount: 6,
      detentionHistory: "None"
    },
    incidents: [
      {
        id: "HIST-2024-089",
        year: "2024",
        date: "2024-11-14",
        location: "Fujairah Offshore Anchorage (UAE)",
        incidentType: "Simulated Oily Bilge Discharge",
        severity: "Moderate",
        description: "Port State Control inspection recorded oily water separator (OWS) 15-ppm alarm calibration failure and unlogged bilge hold transfer valve operation.",
        investigationOutcome: "Administrative penalty levied by port authority; mandatory filter replacement & certification required before departure clearance.",
        status: "Closed"
      },
      {
        id: "HIST-2025-014",
        year: "2025",
        date: "2025-06-02",
        location: "Singapore Strait TSS - Eastern Sector",
        incidentType: "Simulated TSS Routing Deviation",
        severity: "Minor",
        description: "Vessel deviated 1.2 nautical miles north of designated deep water route without immediate VTS communication, causing navigational advisory.",
        investigationOutcome: "Official advisory issued to master and management company; internal navigation safety audit conducted.",
        status: "Closed"
      },
      {
        id: "HIST-2023-112",
        year: "2023",
        date: "2023-08-20",
        location: "Port of Rotterdam (Netherlands)",
        incidentType: "PSC MARPOL Annex I Technical Deficiency",
        severity: "Informational",
        description: "Minor seal leak observed around oil discharge monitoring and control system (ODMCS) sampling line during routine bunker discharge inspection.",
        investigationOutcome: "Rectified in port prior to departure. No sea pollution observed.",
        status: "Closed"
      }
    ]
  },
  "vessel-002": {
    vesselId: "vessel-002",
    mmsi: "352002345",
    name: "MV Meridian",
    imo: "9245671",
    shipType: "Bulk Carrier",
    flag: "Liberia [LR]",
    operator: "Apex Bulk Ocean Lines (Simulated)",
    riskRating: "Low (Tier-1 Standard Profile)",
    disclaimer: "Historical records provide contextual information only and do not establish responsibility for the current incident.",
    complianceSummary: {
      totalPastIncidents: 0,
      pscInspectionsRecorded: 19,
      deficienciesCount: 1,
      detentionHistory: "None"
    },
    incidents: [
      {
        id: "HIST-2023-044",
        year: "2023",
        date: "2023-04-12",
        location: "Port of Richards Bay (South Africa)",
        incidentType: "Simulated Ballast Water Management Record Discrepancy",
        severity: "Minor",
        description: "Log entry timing for ballast water exchange did not match GPS log book by 40 minutes.",
        investigationOutcome: "Rectified with updated chief mate counter-signature. Clean discharge inspection.",
        status: "Closed"
      }
    ]
  },
  "vessel-003": {
    vesselId: "vessel-003",
    mmsi: "636015678",
    name: "MT Amber Horizon",
    imo: "9456782",
    shipType: "Chemical / Products Tanker",
    flag: "Marshall Islands [MH]",
    operator: "Horizon ChemCarriers Pte (Simulated)",
    riskRating: "Low (Tier-1 Standard Profile)",
    disclaimer: "Historical records provide contextual information only and do not establish responsibility for the current incident.",
    complianceSummary: {
      totalPastIncidents: 0,
      pscInspectionsRecorded: 22,
      deficienciesCount: 2,
      detentionHistory: "None"
    },
    incidents: []
  },
  "vessel-004": {
    vesselId: "vessel-004",
    mmsi: "563009876",
    name: "MT Eastern Pearl",
    imo: "9123456",
    shipType: "LPG Tanker",
    flag: "Singapore [SG]",
    operator: "Pearl Gas Logistics (Simulated)",
    riskRating: "Low (Tier-1 Standard Profile)",
    disclaimer: "Historical records provide contextual information only and do not establish responsibility for the current incident.",
    complianceSummary: {
      totalPastIncidents: 0,
      pscInspectionsRecorded: 16,
      deficienciesCount: 0,
      detentionHistory: "None"
    },
    incidents: []
  },
  "vessel-005": {
    vesselId: "vessel-005",
    mmsi: "211567890",
    name: "MV Sea Falcon",
    imo: "9678910",
    shipType: "Container Ship",
    flag: "Germany [DE]",
    operator: "Hanseatic Box Carriers (Simulated)",
    riskRating: "Low",
    disclaimer: "Historical records provide contextual information only and do not establish responsibility for the current incident.",
    complianceSummary: {
      totalPastIncidents: 0,
      pscInspectionsRecorded: 25,
      deficienciesCount: 1,
      detentionHistory: "None"
    },
    incidents: []
  }
};

module.exports = historicalRecords;
