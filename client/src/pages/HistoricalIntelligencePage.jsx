import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  ShieldAlert,
  AlertTriangle,
  Ship,
  FileText,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Bot,
  ArrowRight
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import WorkflowTracker from '../components/WorkflowTracker';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const HistoricalIntelligencePage = () => {
  const {
    activeIncident,
    vessels,
    vesselHistory,
    selectedVessel,
    setSelectedVessel,
    triggerChatWithQuestion
  } = useIncident();

  const navigate = useNavigate();

  const [activeTabVesselId, setActiveTabVesselId] = useState(
    selectedVessel?.id || 'vessel-001'
  );

  const currentRecord = vesselHistory?.find(h => h.vesselId === activeTabVesselId) || vesselHistory?.[0];
  const vesselMeta = vessels?.find(v => v.id === activeTabVesselId) || vessels?.[0];
  const incidentsList = currentRecord?.pastIncidents || currentRecord?.incidents || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <WorkflowTracker />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Historical Vessel Intelligence & Compliance Registry
            </h1>
            <Badge variant="amber">Port State Control Archive</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Historical MARPOL Annex I compliance records, past pollution advisories, and risk tier ratings.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="hazard"
            size="sm"
            onClick={() => triggerChatWithQuestion(`Show historical records for ${vesselMeta?.name}`)}
            className="gap-1.5"
          >
            <Bot size={14} />
            <span>Ask Spill Bot About {vesselMeta?.name}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/report')}
            className="gap-1.5"
          >
            <span>Evidence Dossier</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>

      {/* Regulatory Disclaimer */}
      <div className="p-4 rounded-xl bg-burgundy-500/10 border border-burgundy-500/25 flex items-start gap-3 text-xs text-burgundy-200">
        <AlertTriangle size={18} className="text-burgundy-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-burgundy-300">REGULATORY DISCLAIMER:</strong> Historical records provide contextual risk indicators only and do not establish direct legal liability for the current incident. All past citations and inspection logs are synthetic mock records curated for demonstration.
        </div>
      </div>

      {/* Vessel Switcher Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {vessels?.map((v) => {
          const isActive = activeTabVesselId === v.id;
          const isPrimary = v.candidateRank === 1;

          return (
            <button
              key={v.id}
              onClick={() => setActiveTabVesselId(v.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 border ${
                isActive
                  ? 'bg-primary text-primary-foreground font-bold border-burgundy-500 shadow-md shadow-burgundy-500/10'
                  : 'bg-card border-border text-secondary-foreground hover:border-border'
              }`}
            >
              <Ship size={14} />
              <span>{v.name}</span>
              {isPrimary && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${isActive ? 'bg-card text-red-700' : 'bg-red-950/80 text-red-800 border border-red-800'}`}>
                  Primary
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Vessel History Dossier */}
      {currentRecord && (
        <div className="space-y-6">
          {/* Profile & Risk Score Overview */}
          <Card className="border-border bg-card">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-mono text-foreground flex items-center gap-2">
                  <Ship size={16} className="text-burgundy-500" />
                  VESSEL BACKGROUND PROFILE: {currentRecord.name}
                </CardTitle>
                <Badge variant={currentRecord.riskRating?.includes('Elevated') ? "destructive" : "emerald"}>
                  {currentRecord.riskRating}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-muted border border-border">
                  <span className="text-[10px] text-muted-foreground uppercase block">Recorded Deficiencies</span>
                  <span className="text-xl font-bold text-burgundy-400">
                    {currentRecord.complianceSummary?.deficienciesCount ?? 0}
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-1">Across {currentRecord.complianceSummary?.pscInspectionsRecorded ?? 18} inspections</span>
                </div>

                <div className="p-3 rounded-lg bg-muted border border-border">
                  <span className="text-[10px] text-muted-foreground uppercase block">Past Simulated Spills</span>
                  <span className={`text-xl font-bold ${currentRecord.complianceSummary?.totalPastIncidents > 0 ? 'text-red-700' : 'text-silver-400'}`}>
                    {currentRecord.complianceSummary?.totalPastIncidents ?? 0}
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-1">Simulated registry log</span>
                </div>

                <div className="p-3 rounded-lg bg-muted border border-border">
                  <span className="text-[10px] text-muted-foreground uppercase block">Operator Entity</span>
                  <strong className="text-foreground block text-sm truncate mt-1">
                    {currentRecord.operator}
                  </strong>
                  <span className="text-[10px] text-muted-foreground block truncate">Owner: {currentRecord.registeredOwner || 'Private Holding'}</span>
                </div>

                <div className="p-3 rounded-lg bg-muted border border-border">
                  <span className="text-[10px] text-muted-foreground uppercase block">Flag State / Class</span>
                  <strong className="text-foreground block text-sm mt-1">
                    {currentRecord.flag}
                  </strong>
                  <span className="text-[10px] text-muted-foreground block truncate">Class: {currentRecord.classificationSociety || 'DNV'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historical Incidents / Inspection Log */}
          <Card className="border-border bg-card">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-mono text-foreground flex items-center gap-2">
                  <FileText size={16} className="text-burgundy-500" />
                  PORT STATE CONTROL INSPECTIONS & HISTORICAL RECORD
                </CardTitle>
                <Badge variant="subtle" className="text-[10px]">Registry Logs</Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 pt-0">
              {incidentsList.length > 0 ? (
                <div className="space-y-3 font-mono text-xs">
                  {incidentsList.map((hist, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-muted border border-border space-y-2"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-burgundy-400">
                            {hist.type || hist.incidentType || 'MARPOL Violation'}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-secondary-foreground">{hist.port || hist.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-[10px]">
                            {hist.severity || 'Moderate'}
                          </Badge>
                          <span className="text-muted-foreground text-[11px]">{hist.date}</span>
                        </div>
                      </div>

                      <p className="text-secondary-foreground text-xs font-sans leading-relaxed">
                        {hist.description}
                      </p>

                      {hist.penalty && (
                        <div className="p-2 rounded bg-burgundy-500/10 border-l-2 border-burgundy-500 text-burgundy-300 text-xs">
                          <strong>Regulatory Outcome:</strong> {hist.penalty}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground space-y-2">
                  <ShieldCheck size={40} className="text-silver-400 mx-auto" />
                  <div className="font-bold text-sm text-foreground">Clean Historical Compliance Record</div>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    No prior pollution discharge violations, detentions, or MARPOL Annex I sanctions recorded in the Port State Control register.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HistoricalIntelligencePage;
