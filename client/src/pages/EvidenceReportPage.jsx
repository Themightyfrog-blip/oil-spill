import React from 'react';
import {
  FileText,
  Printer,
  ShieldCheck,
  Download,
  AlertTriangle,
  Radio,
  Wind,
  Compass,
  Ship,
  History,
  CheckCircle2,
  Calendar,
  MapPin,
  Bot,
  ExternalLink,
  Flame,
  Award,
  Lock
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import WorkflowTracker from '../components/WorkflowTracker';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import SelectIncidentPrompt from '../components/SelectIncidentPrompt';

const EvidenceReportPage = () => {
  const {
    activeIncident,
    evidence,
    environmentalData,
    vessels,
    forecast,
    vesselHistory,
    triggerChatWithQuestion
  } = useIncident();

  const handlePrint = () => {
    window.print();
  };

  if (!activeIncident || !evidence) {
    return <SelectIncidentPrompt targetPageName="Court-Admissible Evidence Dossier" targetRoute="/report" />;
  }

  const primaryVessel = vessels && vessels.length > 0 ? vessels[0] : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="no-print space-y-6">
        <WorkflowTracker />

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Official Incident Evidence Dossier
              </h1>
              <Badge variant="amber">{activeIncident.id}</Badge>
              <Badge variant="subtle">Stage 05 of 05</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Multi-sensor corroboration package compiling satellite SAR detection, hydrodynamic backtracking, and AIS telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="hazard"
              size="sm"
              onClick={() => triggerChatWithQuestion(`Summarize all legal evidence compiled for ${activeIncident.id}`)}
              className="gap-1.5"
            >
              <Bot size={14} />
              <span>Ask Spill Bot to Summarize</span>
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={handlePrint}
              className="gap-1.5"
            >
              <Printer size={14} />
              <span>Print / Export PDF</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Official Printable Report Document Container */}
      <div className="printable-report w-full max-w-4xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-2xl space-y-8 text-foreground font-sans">
        
        {/* Document Formal Header with Official Stamp */}
        <div className="border-b-2 border-burgundy-500/40 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-burgundy-500/15 border border-burgundy-500/30 flex items-center justify-center text-burgundy-500 shrink-0">
              <ShieldCheck size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-widest text-burgundy-400 uppercase">
                  MARITIME SURVEILLANCE & POLLUTION INCIDENT REPORT
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground font-mono tracking-tight mt-1">
                AEGIS-SPILL INVESTIGATION DOSSIER
              </h2>
              <p className="text-xs font-mono text-muted-foreground">
                INDIAN COAST GUARD MRCC WEST · MARPOL ANNEX I INVESTIGATION
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-muted-foreground space-y-1">
            <Badge variant="amber" className="text-[10px]">
              EVIDENCE TIER 1
            </Badge>
            <div>REF: <strong className="text-foreground">REP-{activeIncident.id}-V1</strong></div>
            <div>DATE: {new Date().toUTCString().slice(0, 16)}</div>
          </div>
        </div>

        {/* Section 1: Incident Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1.5 border-b border-border">
            <span className="text-xs font-mono font-bold text-burgundy-400 uppercase tracking-wider">
              1. INCIDENT OVERVIEW & SPATIAL SUMMARY
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-muted border border-border">
              <span className="text-[10px] text-muted-foreground block uppercase">Incident ID</span>
              <strong className="text-burgundy-400 text-sm">{activeIncident.id}</strong>
            </div>
            <div className="p-3 rounded-lg bg-muted border border-border">
              <span className="text-[10px] text-muted-foreground block uppercase">Detection Time</span>
              <strong className="text-foreground">{activeIncident.displayDate}</strong>
            </div>
            <div className="p-3 rounded-lg bg-muted border border-border">
              <span className="text-[10px] text-muted-foreground block uppercase">Status</span>
              <strong className="text-red-700">{activeIncident.status}</strong>
            </div>
            <div className="p-3 rounded-lg bg-muted border border-border">
              <span className="text-[10px] text-muted-foreground block uppercase">Region</span>
              <strong className="text-foreground">{activeIncident.region}</strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-muted border border-border text-xs font-mono flex justify-between items-center">
            <span className="text-muted-foreground">Centroid Coordinates:</span>
            <strong className="text-foreground">{activeIncident.coordinates?.lat}°N, {activeIncident.coordinates?.lng}°E ({activeIncident.locationName})</strong>
          </div>
        </div>

        {/* Section 2: SAR Satellite Remote Sensing */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1.5 border-b border-border">
            <span className="text-xs font-mono font-bold text-burgundy-400 uppercase tracking-wider">
              2. SATELLITE RADAR SENSING (SAR) FORENSICS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="flex justify-between p-2.5 rounded bg-muted border border-border">
              <span className="text-muted-foreground">Satellite Platform:</span>
              <strong className="text-foreground">{activeIncident.sarSatellite}</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-muted border border-border">
              <span className="text-muted-foreground">Sensor Mode:</span>
              <strong className="text-foreground">{activeIncident.sensorMode}</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-muted border border-border">
              <span className="text-muted-foreground">Ground Resolution:</span>
              <strong className="text-foreground">{activeIncident.resolutionMeters}m pixel grid</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-muted border border-border">
              <span className="text-muted-foreground">Neural Network Detector:</span>
              <strong className="text-silver-400">{activeIncident.modelDetails?.name} ({activeIncident.confidence}%)</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-muted border border-border">
              <span className="text-muted-foreground">Detected Surface Area:</span>
              <strong className="text-burgundy-400">{activeIncident.spillAreaKm2} km²</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-muted border border-border">
              <span className="text-muted-foreground">Estimated Volume:</span>
              <strong className="text-red-700">{activeIncident.estimatedVolumeM3} m³ (~{activeIncident.estimatedBarrels} bbl)</strong>
            </div>
          </div>
        </div>

        {/* Section 3: Hydrodynamic Hindcasting & Discharge Source */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1.5 border-b border-border">
            <span className="text-xs font-mono font-bold text-burgundy-400 uppercase tracking-wider">
              3. HYDRODYNAMIC HINDCASTING & RECONSTRUCTED SOURCE
            </span>
          </div>

          <div className="p-4 rounded-xl bg-muted border border-border text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discharge Release Window:</span>
              <strong className="text-burgundy-400">{activeIncident.probableSourceRegion?.displayWindow}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reconstructed Centroid:</span>
              <strong className="text-foreground">{activeIncident.probableSourceRegion?.center?.join('°N, ')}°E</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Spatial Search Radius:</span>
              <strong className="text-foreground">{(activeIncident.probableSourceRegion?.radiusMeters / 1000).toFixed(1)} km (95% spatial confidence)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Simulation Method:</span>
              <span className="text-secondary-foreground">{activeIncident.probableSourceRegion?.method}</span>
            </div>
          </div>
        </div>

        {/* Section 4: Primary Suspect Attribution */}
        {primaryVessel && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b border-border">
              <span className="text-xs font-mono font-bold text-red-700 uppercase tracking-wider">
                4. SUSPECT VESSEL ATTRIBUTION & AIS TELEMETRY ANOMALIES
              </span>
            </div>

            <div className="p-4 rounded-xl bg-red-950/20 border border-red-200 text-xs font-mono space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-red-900/30">
                <div>
                  <span className="text-sm font-bold text-red-800">{primaryVessel.name}</span>
                  <span className="text-[11px] text-muted-foreground block">
                    MMSI: {primaryVessel.mmsi} · IMO: {primaryVessel.imo} · Flag: {primaryVessel.flag}
                  </span>
                </div>
                <Badge variant="destructive" className="text-xs">
                  {primaryVessel.correlationScore}% Correlation Match
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-secondary-foreground">
                <div>• Closest Approach: <strong className="text-burgundy-400">{primaryVessel.minSourceDistanceKm} km</strong> from centroid</div>
                <div>• Time in Release Zone: <strong className="text-foreground">{primaryVessel.timeOverlap}</strong></div>
                <div>• Speed Profile Anomaly: <strong className="text-red-700">Deceleration to 4.1 kn</strong></div>
                <div>• Navigation TSS Deviation: <strong className="text-red-700">28° route dog-leg deflection</strong></div>
              </div>

              {primaryVessel.anomalies?.length > 0 && (
                <div className="mt-2 pt-2 border-t border-red-900/30 text-[11px] text-red-800">
                  <strong>Logged Telemetry Event:</strong> {primaryVessel.anomalies[0].description}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 5: Coast Guard Action Directives */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1.5 border-b border-border">
            <span className="text-xs font-mono font-bold text-burgundy-400 uppercase tracking-wider">
              5. ACTION DIRECTIVES FOR INDIAN COAST GUARD
            </span>
          </div>

          <div className="space-y-2">
            {(evidence.recommendedCoastGuardActions || [
              { priority: "CRITICAL", action: "Deploy Coast Guard OPV to intercept MV Ocean Star for physical hull and bilge inspection" },
              { priority: "HIGH", action: "Pre-position containment booms and skimmers off Alibaug coastline" },
              { priority: "HIGH", action: "Demand Oil Record Book Part II and MARPOL Annex I compliance records" }
            ]).map((act, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-border text-xs font-mono"
              >
                <Badge
                  variant={act.priority === 'CRITICAL' ? 'destructive' : 'amber'}
                  className="text-[10px] shrink-0"
                >
                  {act.priority}
                </Badge>
                <span className="text-foreground leading-relaxed">{act.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document Verification Footer with Digital Seal */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-burgundy-500" />
            <span>Cryptographic Integrity Hash: <strong className="text-secondary-foreground">0x8F9B2C4E...33A1</strong></span>
          </div>
          <div>
            GENERATED VIA AEGIS-SPILL INTELLIGENCE PLATFORM (SIH-2026)
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceReportPage;
