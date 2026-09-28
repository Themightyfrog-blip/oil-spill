import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radio,
  Map as MapIcon,
  Ship,
  Compass,
  Wind,
  Droplet,
  ArrowRight,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers,
  Calendar,
  Waves,
  Eye,
  FileCheck2
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import WorkflowTracker from '../components/WorkflowTracker';
import LeafletMap from '../components/LeafletMap';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import SelectIncidentPrompt from '../components/SelectIncidentPrompt';

const DashboardPage = () => {
  const {
    incidents,
    activeIncidentId,
    activeIncident,
    environmentalData,
    vessels,
    selectIncident,
    triggerChatWithQuestion
  } = useIncident();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tactical');

  if (!activeIncident) {
    return <SelectIncidentPrompt targetPageName="Intelligence Overview" targetRoute="/overview" />;
  }

  const primaryVessel = vessels?.[0];
  const env = environmentalData;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── 5-Stage Modern Pipeline Tracker ── */}
      <WorkflowTracker />

      {/* ── Header Title & Meta ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Maritime Intelligence Command Center
            </h1>
            <Badge variant="amber">AI Surveillance Active</Badge>
            <Badge variant="subtle" className="text-muted-foreground font-mono">
              {activeIncident.id}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time satellite SAR detection, Lagrangian hydrodynamic hindcasting, and AIS vessel correlation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="hazard"
            size="sm"
            onClick={() => triggerChatWithQuestion(`Give me an executive briefing for incident ${activeIncident.id}`)}
            className="gap-1.5"
          >
            <Bot size={14} />
            <span>AI Executive Briefing</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/report')}
            className="gap-1.5"
          >
            <FileCheck2 size={14} />
            <span>Evidence Dossier</span>
          </Button>
        </div>
      </div>

      {/* ── 4 Hero KPI Cards (Spacious, High Legibility, Zero Blue/Purple) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Spill Surface Area */}
        <Card className="border-border bg-card hover:border-burgundy-500/40 transition-colors">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Spill Surface Area
              </span>
              <div className="w-8 h-8 rounded-lg bg-burgundy-500/10 border border-burgundy-500/20 flex items-center justify-center text-burgundy-400">
                <Droplet size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold font-mono text-burgundy-400">
                {activeIncident.spillAreaKm2}
              </span>
              <span className="text-sm font-medium text-muted-foreground">km²</span>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-xs text-muted-foreground font-mono">
              Dimensions: {activeIncident.spillLengthKm} × {activeIncident.spillWidthKm} km ({activeIncident.orientation})
            </p>
          </CardContent>
        </Card>

        {/* Detection Confidence */}
        <Card className="border-border bg-card hover:border-silver-500/40 transition-colors">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                AI Detection Score
              </span>
              <div className="w-8 h-8 rounded-lg bg-silver-500/10 border border-silver-500/20 flex items-center justify-center text-silver-400">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold font-mono text-silver-400">
                {activeIncident.confidence}%
              </span>
              <span className="text-xs font-mono text-silver-500/80">High Conf.</span>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-xs text-muted-foreground font-mono">
              U-Net v2.4 · {activeIncident.sarSatellite?.split(' ')[0]} (VV Swath)
            </p>
          </CardContent>
        </Card>

        {/* Primary Suspect Vessel */}
        <Card className="border-border bg-card hover:border-red-500/40 transition-colors">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Primary Suspect Vessel
              </span>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-700">
                <Ship size={16} />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold font-mono text-red-700 truncate block">
                {primaryVessel?.name || 'Under Analysis'}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground">Correlation:</span>
              <strong className="text-red-700 font-bold">{primaryVessel?.correlationScore}%</strong>
            </div>
          </CardContent>
        </Card>

        {/* Estimated Volume */}
        <Card className="border-border bg-card hover:border-orange-500/40 transition-colors">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Estimated Discharge
              </span>
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Radio size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold font-mono text-orange-400">
                {activeIncident.estimatedVolumeM3}
              </span>
              <span className="text-sm font-medium text-muted-foreground">m³</span>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-xs text-muted-foreground font-mono">
              ≈ {activeIncident.estimatedBarrels?.toLocaleString()} barrels crude equivalent
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Spacious Interactive Tabs Organization ── */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border">
          <TabsList>
            <TabsTrigger value="tactical" className="gap-2">
              <MapIcon size={14} />
              <span>Tactical Map & MetOcean</span>
            </TabsTrigger>
            <TabsTrigger value="vessels" className="gap-2">
              <Ship size={14} />
              <span>Candidate Vessels ({vessels.length})</span>
            </TabsTrigger>
            <TabsTrigger value="archive" className="gap-2">
              <Compass size={14} />
              <span>Scenario Archive ({incidents.length})</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-silver-500" />
            <span>Telemetry Streams Live</span>
          </div>
        </div>

        {/* ── TAB 1: TACTICAL MAP & METOCEAN ── */}
        <TabsContent value="tactical">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Column (Spans 2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="border-border bg-card p-3">
                <div className="flex items-center justify-between pb-3 px-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-burgundy-400" />
                    <span className="text-xs font-mono font-bold text-foreground">
                      GEOSPATIAL OPERATIONAL PICTURE
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/map')}
                    className="h-7 text-xs gap-1.5"
                  >
                    <span>Timeline & Fullscreen</span>
                    <ArrowRight size={12} />
                  </Button>
                </div>
                <div className="mt-3">
                  <LeafletMap height="460px" />
                </div>
              </Card>
            </div>

            {/* Right Column: MetOcean & Incident Brief */}
            <div className="space-y-6">
              {/* Active Incident Summary Card */}
              <Card className="border-border bg-card">
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-mono text-foreground flex items-center gap-2">
                      <Radio size={16} className="text-burgundy-500" />
                      INCIDENT DOSSIER
                    </CardTitle>
                    <Badge variant="destructive">{activeIncident.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-border font-mono">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-foreground text-right">{activeIncident.locationName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border font-mono">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span className="text-foreground">{activeIncident.displayDate}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border font-mono">
                    <span className="text-muted-foreground">Discharge Point:</span>
                    <span className="text-burgundy-400 font-semibold">
                      {activeIncident.probableSourceRegion?.center?.join('°, ')}°
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border font-mono">
                    <span className="text-muted-foreground">Release Window:</span>
                    <span className="text-secondary-foreground">
                      {activeIncident.probableSourceRegion?.displayWindow}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button
                      variant="hazard"
                      size="sm"
                      onClick={() => navigate('/incident')}
                      className="text-xs"
                    >
                      SAR Analysis
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/vessels')}
                      className="text-xs"
                    >
                      Vessels Matrix
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* MetOcean Conditions Card */}
              {env && (
                <Card className="border-border bg-card">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-mono text-foreground flex items-center gap-2">
                        <Wind size={16} className="text-silver-500" />
                        METOCEAN HYDRODYNAMICS
                      </CardTitle>
                      <Badge variant="emerald" className="text-[10px]">INCOIS-HYCOM</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-2.5 rounded-lg bg-muted border border-border">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground block">Wind Vector</span>
                        <span className="text-xs font-mono font-bold text-burgundy-400">
                          {env.wind?.speedKmh} km/h {env.wind?.directionText}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-muted border border-border">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground block">Surface Current</span>
                        <span className="text-xs font-mono font-bold text-silver-400">
                          {env.oceanCurrent?.speedMs} m/s {env.oceanCurrent?.directionText}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-muted border border-border">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground block">Wave Swell</span>
                        <span className="text-xs font-mono font-bold text-foreground">
                          {env.waves?.heightMeters}m · {env.waves?.periodSeconds}s
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-muted border border-border">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground block">Tidal Phase</span>
                        <span className="text-xs font-mono font-bold text-foreground">
                          {env.tide?.phase?.split('(')[0]?.trim()}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-muted border border-border">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground block">Sea Temp (SST)</span>
                        <span className="text-xs font-mono font-bold text-burgundy-300">
                          {env.seaTemperatureCelsius}°C
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-muted border border-border">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground block">Evaporation (24h)</span>
                        <span className="text-xs font-mono font-bold text-orange-400">
                          {env.weatheringMetrics?.evaporationRate24hPercent}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* ── TAB 2: CANDIDATE VESSELS MATRIX ── */}
        <TabsContent value="vessels">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Screened Vessels in Source Release Window
                </h3>
                <p className="text-xs text-muted-foreground">
                  Spatiotemporal proximity and kinematic anomaly scoring across historical AIS tracks.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/vessels')}
                className="gap-1.5"
              >
                <span>Full Vessel Forensics</span>
                <ArrowRight size={13} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vessels.map((vessel) => {
                const isPrimary = vessel.candidateRank === 1;
                return (
                  <Card
                    key={vessel.id}
                    onClick={() => navigate('/vessels')}
                    className={`cursor-pointer transition-all hover:scale-[1.01] ${
                      isPrimary
                        ? 'border-red-200 bg-red-950/20 hover:border-red-600'
                        : 'border-border bg-card hover:border-border'
                    }`}
                  >
                    <CardHeader className="p-5 pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ background: isPrimary ? '#ef4444' : vessel.color || '#A9A9A9' }}
                          />
                          <div>
                            <CardTitle className="text-sm font-bold text-foreground">
                              {vessel.name}
                            </CardTitle>
                            <span className="text-[11px] font-mono text-muted-foreground">
                              {vessel.shipType} · MMSI: {vessel.mmsi}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`text-xl font-extrabold font-mono ${
                              isPrimary ? 'text-red-700' : vessel.correlationScore > 40 ? 'text-burgundy-400' : 'text-muted-foreground'
                            }`}
                          >
                            {vessel.correlationScore}%
                          </span>
                          <span className="text-[10px] text-muted-foreground block uppercase font-mono">
                            Match Score
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 space-y-2 text-xs font-mono">
                      <div className="flex justify-between py-1 border-t border-border text-secondary-foreground">
                        <span className="text-muted-foreground">Min Distance to Source:</span>
                        <strong className="text-burgundy-400">
                          {vessel.minSourceDistanceKm || vessel.distanceFromSourceKm} km
                        </strong>
                      </div>
                      <div className="flex justify-between text-secondary-foreground">
                        <span className="text-muted-foreground">Time Overlap:</span>
                        <span>{vessel.timeOverlap?.split('(')[0]?.trim()}</span>
                      </div>
                      {vessel.behavioralAnomaly && vessel.behavioralAnomaly !== 'None' && (
                        <div className="mt-2 p-2 rounded bg-red-50 border border-red-200 text-[11px] text-red-800">
                          <strong>Behavioral Anomaly:</strong> {vessel.behavioralAnomaly}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* ── TAB 3: SCENARIO ARCHIVE ── */}
        <TabsContent value="archive">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-foreground">
                SIH Demonstration Incident Scenarios
              </h3>
              <p className="text-xs text-muted-foreground">
                Switch between curated maritime spill scenarios across Indian maritime economic zones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incidents.map((inc) => {
                const isActive = inc.id === activeIncidentId;
                return (
                  <Card
                    key={inc.id}
                    onClick={() => selectIncident(inc.id)}
                    className={`cursor-pointer transition-all ${
                      isActive
                        ? 'border-burgundy-500/70 bg-burgundy-500/10 shadow-md shadow-burgundy-500/5'
                        : 'border-border bg-card hover:border-border'
                    }`}
                  >
                    <CardHeader className="p-5 pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-burgundy-400">
                            {inc.id}
                          </span>
                          <Badge variant={isActive ? "amber" : "subtle"} className="text-[10px]">
                            {inc.severity} Severity
                          </Badge>
                        </div>
                        {isActive && (
                          <Badge variant="emerald" className="gap-1 text-[10px]">
                            <CheckCircle2 size={11} />
                            Active Case
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-sm font-semibold text-foreground mt-1">
                        {inc.title}
                      </CardTitle>
                      <CardDescription className="font-mono text-xs">
                        {inc.locationName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 flex items-center justify-between text-xs font-mono text-secondary-foreground">
                      <div>
                        Spill Area: <strong className="text-burgundy-400">{inc.spillAreaKm2} km²</strong>
                      </div>
                      <div>
                        Confidence: <strong className="text-silver-400">{inc.confidence}%</strong>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
