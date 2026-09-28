import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Ship,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Clock,
  Compass,
  Activity,
  Bot,
  ArrowRight,
  ShieldCheck,
  History,
  TrendingDown,
  Navigation
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import WorkflowTracker from '../components/WorkflowTracker';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import SelectIncidentPrompt from '../components/SelectIncidentPrompt';

const VesselAnalysisPage = () => {
  const {
    activeIncident,
    vessels,
    selectedVessel,
    setSelectedVessel,
    triggerChatWithQuestion
  } = useIncident();

  const navigate = useNavigate();

  if (!activeIncident || !vessels || vessels.length === 0) {
    return <SelectIncidentPrompt targetPageName="AIS Vessel Attribution" targetRoute="/vessels" />;
  }

  const currentVessel = selectedVessel || vessels[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <WorkflowTracker />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              AIS Vessel Correlation & Kinematic Forensics
            </h1>
            <Badge variant="amber">{activeIncident.id}</Badge>
            <Badge variant="subtle">Stage 03 of 05</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Spatiotemporal intersection between Lagrangian back-tracked discharge source and historical vessel AIS telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="hazard"
            size="sm"
            onClick={() => triggerChatWithQuestion(`Why was ${currentVessel.name} identified as a candidate?`)}
            className="gap-1.5"
          >
            <Bot size={14} />
            <span>Why {currentVessel.name}?</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/forecast')}
            className="gap-1.5"
          >
            <span>Proceed to Drift Forecast</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>

      {/* Legal & Prototype Advisory */}
      <div className="p-4 rounded-xl bg-burgundy-500/10 border border-burgundy-500/25 flex items-start gap-3 text-xs text-burgundy-200">
        <AlertTriangle size={18} className="text-burgundy-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-burgundy-300">PROTOTYPE ADVISORY:</strong> Correlation scores represent simulated statistical congruence (spatial proximity, temporal overlap, kinematic alignment, and telemetry anomalies). These provide operational prioritization for maritime coast guard boarding and do not constitute formal legal liability findings.
        </div>
      </div>

      {/* Main Grid: Left Candidates List, Right Selected Vessel Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Candidate Vessels in Search Window */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold text-secondary-foreground uppercase">
              Vessels in Search Window ({vessels.length})
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">SELECT TO INSPECT</span>
          </div>

          <div className="space-y-3">
            {vessels.map((vessel) => {
              const isSelected = currentVessel.id === vessel.id;
              const isPrimary = vessel.candidateRank === 1;
              const safeColor = isPrimary ? '#ef4444' : (vessel.color && vessel.color !== '#3b82f6' ? vessel.color : '#A9A9A9');

              return (
                <div
                  key={vessel.id}
                  onClick={() => setSelectedVessel(vessel)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-burgundy-500/10 border-burgundy-500/50 shadow-md'
                      : 'bg-card border-border hover:border-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: safeColor }}
                      />
                      <div>
                        <h4 className={`text-sm font-bold font-mono ${isPrimary ? 'text-red-700' : 'text-foreground'}`}>
                          {vessel.name}
                        </h4>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {vessel.shipType} · MMSI: {vessel.mmsi}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-lg font-bold font-mono ${
                          isPrimary ? 'text-red-700' : vessel.correlationScore > 40 ? 'text-burgundy-400' : 'text-muted-foreground'
                        }`}
                      >
                        {vessel.correlationScore}%
                      </span>
                      <span className="text-[10px] text-muted-foreground block font-mono uppercase">
                        Score
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-secondary-foreground pt-2 border-t border-border">
                    <div>
                      <span className="text-muted-foreground block text-[10px]">MIN DISTANCE</span>
                      <strong className="text-burgundy-400">{vessel.minSourceDistanceKm || vessel.distanceFromSourceKm} km</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">TIME OVERLAP</span>
                      <span>{vessel.timeOverlap?.split('(')[0]?.trim()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">TRAJECTORY</span>
                      <span className={vessel.trajectoryCompatibility === 'High' ? 'text-silver-400 font-semibold' : 'text-secondary-foreground'}>
                        {vessel.trajectoryCompatibility}
                      </span>
                    </div>
                  </div>

                  {vessel.behavioralAnomaly && vessel.behavioralAnomaly !== 'None' && (
                    <div className="mt-2.5 p-2 rounded bg-red-50 border border-red-200 text-[11px] text-red-800 flex items-center gap-1.5 font-mono">
                      <AlertTriangle size={13} className="shrink-0 text-red-700" />
                      <span>{vessel.behavioralAnomaly}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 Cols: Selected Vessel Dossier & Evidence Forensics */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-border bg-card">
            <CardHeader className="p-6 pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center border"
                    style={{
                      backgroundColor: 'rgba(92, 10, 40, 0.1)',
                      borderColor: 'rgba(92, 10, 40, 0.3)',
                      color: currentVessel.candidateRank === 1 ? '#ef4444' : '#5C0A28'
                    }}
                  >
                    <Ship size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-foreground font-mono">
                      {currentVessel.name}
                    </CardTitle>
                    <CardDescription className="text-xs font-mono">
                      MMSI: {currentVessel.mmsi} · IMO: {currentVessel.imo} · Flag: {currentVessel.flag}
                    </CardDescription>
                  </div>
                </div>

                <div className="text-right">
                  <Badge variant={currentVessel.candidateRank === 1 ? "destructive" : "amber"}>
                    {currentVessel.correlationScore}% Correlation Match
                  </Badge>
                  <span className="text-[11px] text-muted-foreground block font-mono mt-1">
                    Rank #{currentVessel.candidateRank} Candidate
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6 text-xs">
              {/* Vessel Dimensions & Engineering Specs */}
              <div>
                <h4 className="text-xs font-mono font-bold text-secondary-foreground uppercase tracking-wider mb-3">
                  Vessel Particulars & Telemetry
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  <div className="p-2.5 rounded-lg bg-muted border border-border">
                    <span className="text-muted-foreground block text-[10px]">SHIP TYPE</span>
                    <strong className="text-foreground">{currentVessel.shipType}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-muted border border-border">
                    <span className="text-muted-foreground block text-[10px]">LENGTH / BEAM</span>
                    <strong className="text-foreground">{currentVessel.length}m × {currentVessel.beam}m</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-muted border border-border">
                    <span className="text-muted-foreground block text-[10px]">DRAUGHT</span>
                    <strong className="text-foreground">{currentVessel.draught}m</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-muted border border-border">
                    <span className="text-muted-foreground block text-[10px]">DEADWEIGHT (DWT)</span>
                    <strong className="text-foreground">{currentVessel.dwt?.toLocaleString()} t</strong>
                  </div>
                </div>
              </div>

              {/* Four Pillars of Evidence Corroboration */}
              <div>
                <h4 className="text-xs font-mono font-bold text-secondary-foreground uppercase tracking-wider mb-3">
                  Four Pillars of Evidence Corroboration
                </h4>

                <div className="space-y-2.5 font-mono">
                  {/* Spatial */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-border">
                    {currentVessel.evidenceBreakdown?.spatialProximity?.matched ? (
                      <CheckCircle2 size={16} className="text-silver-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={16} className="text-zinc-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-foreground">
                        1. Spatial Proximity: {currentVessel.evidenceBreakdown?.spatialProximity?.matched ? 'MATCHED' : 'UNMATCHED'}
                      </div>
                      <div className="text-muted-foreground text-[11px] mt-0.5">
                        {currentVessel.evidenceBreakdown?.spatialProximity?.detail}
                      </div>
                    </div>
                  </div>

                  {/* Temporal */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-border">
                    {currentVessel.evidenceBreakdown?.temporalOverlap?.matched ? (
                      <CheckCircle2 size={16} className="text-silver-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={16} className="text-zinc-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-foreground">
                        2. Temporal Release Window: {currentVessel.evidenceBreakdown?.temporalOverlap?.matched ? 'MATCHED' : 'UNMATCHED'}
                      </div>
                      <div className="text-muted-foreground text-[11px] mt-0.5">
                        {currentVessel.evidenceBreakdown?.temporalOverlap?.detail}
                      </div>
                    </div>
                  </div>

                  {/* Trajectory */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-border">
                    {currentVessel.evidenceBreakdown?.trajectoryConsistency?.matched ? (
                      <CheckCircle2 size={16} className="text-silver-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={16} className="text-zinc-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-foreground">
                        3. Kinematic Alignment: {currentVessel.evidenceBreakdown?.trajectoryConsistency?.matched ? 'MATCHED' : 'UNMATCHED'}
                      </div>
                      <div className="text-muted-foreground text-[11px] mt-0.5">
                        {currentVessel.evidenceBreakdown?.trajectoryConsistency?.detail}
                      </div>
                    </div>
                  </div>

                  {/* Anomaly */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-border">
                    {currentVessel.evidenceBreakdown?.behaviorAnomaly?.matched ? (
                      <AlertTriangle size={16} className="text-red-700 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 size={16} className="text-silver-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className={currentVessel.evidenceBreakdown?.behaviorAnomaly?.matched ? 'font-bold text-red-800' : 'font-bold text-secondary-foreground'}>
                        4. Telemetry Behavioral Anomaly: {currentVessel.evidenceBreakdown?.behaviorAnomaly?.matched ? 'ANOMALY DETECTED' : 'NOMINAL'}
                      </div>
                      <div className="text-muted-foreground text-[11px] mt-0.5">
                        {currentVessel.evidenceBreakdown?.behaviorAnomaly?.detail}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logged Kinematic Anomalies */}
              {currentVessel.anomalies && currentVessel.anomalies.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-red-700 uppercase tracking-wider mb-2">
                    Logged Sensor Anomalies ({currentVessel.anomalies.length})
                  </h4>
                  <div className="space-y-2">
                    {currentVessel.anomalies.map((anom, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-red-950/20 border border-red-200 text-xs font-mono"
                      >
                        <div className="flex justify-between text-red-800 font-bold mb-1">
                          <span>{anom.type}</span>
                          <span>{anom.time}</span>
                        </div>
                        <div className="text-secondary-foreground text-[11px] leading-relaxed">
                          {anom.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="default"
                  onClick={() => navigate('/history')}
                  className="gap-2 text-xs"
                >
                  <History size={14} />
                  <span>Inspect Port State History</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate('/map')}
                  className="gap-2 text-xs"
                >
                  <Navigation size={14} className="text-burgundy-500" />
                  <span>Track Vessel on Tactical Map</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VesselAnalysisPage;
