import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Radio,
  Compass,
  Ship,
  Flame,
  ShieldAlert,
  Sparkles,
  MapPin,
  Layers,
  ChevronRight,
  Crosshair,
  Search,
  Filter,
  Maximize2,
  Minimize2,
  Info,
  CheckCircle2,
  Clock,
  Activity
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import LeafletMap from '../components/LeafletMap';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const LiveTrafficPage = () => {
  const {
    incidents,
    selectIncident,
    activeIncident,
    focusMapLocation,
    focusedIncidentId,
    setFocusedIncidentId
  } = useIncident();

  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'map'
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLaunchIncident = (id) => {
    selectIncident(id);
    navigate('/overview');
  };

  const handleLocateOnMap = (e, inc) => {
    e.stopPropagation();
    setFocusedIncidentId(inc.id);
    if (inc.coordinates) {
      focusMapLocation([inc.coordinates.lat, inc.coordinates.lng], 10);
    }
  };

  const filteredIncidents = incidents.filter((inc) => {
    const matchesSeverity =
      filterSeverity === 'ALL' ||
      inc.severity?.toUpperCase() === filterSeverity;
    const matchesSearch =
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full pb-8">
      {/* ── 1. Page Header & Live Telemetry HUD ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-silver-100 text-silver-800 border border-silver-200">
              <span className="w-2 h-2 rounded-full bg-silver-500 animate-pulse" />
              LIVE AIS TELEMETRY FEED
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              {incidents.length} SPILL ALERTS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Maritime Traffic & Oil Spill Surveillance
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Autonomous multi-sensor monitoring integrating commercial vessel AIS tracks with Copernicus Sentinel-1 SAR anomaly detection.
          </p>
        </div>


      </div>

      {/* ── 2. Guided Workflow Pipeline (Mental Model Clarity) ── */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Investigation Workflow:
            </span>
            <span className="text-xs font-semibold text-burgundy-600 bg-burgundy-50 px-2 py-0.5 rounded border border-burgundy-200">
              Step 2 of 3 Active
            </span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Select an incident below to unlock deep forensics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Step 1 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-100 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              ✓
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-900">Step 1: Live Traffic</span>
                <span className="text-[10px] text-slate-500 font-mono">(Active)</span>
              </div>
              <p className="text-[11px] text-slate-700 mt-0.5 leading-snug">
                Global maritime feed monitoring commercial vessels & fairway corridors in real-time.
              </p>
            </div>
          </div>

          {/* Step 2 (ACTION REQUIRED) */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border-2 border-primary/40 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-12 h-12 bg-primary/20 rounded-full blur-md" />
            <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 animate-bounce">
              2
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs text-burgundy-900">Step 2: Select Incident</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-burgundy-200 text-burgundy-900 font-bold uppercase tracking-wider">
                  Action Needed
                </span>
              </div>
              <p className="text-[11px] text-burgundy-800 mt-0.5 leading-snug font-medium">
                Choose one of 4 satellite-flagged oil slicks to launch attribution & forecasting.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border">
            <div className="w-7 h-7 rounded-full bg-muted-foreground/30 text-muted-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-muted-foreground">Step 3: Forensics & Dossier</span>
                <span className="text-[10px] text-muted-foreground font-mono">(Locked)</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                AIS backtrack, suspect ship identification, drift simulation & court-admissible report.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* View Layout Controls */}
      <div className="flex items-center gap-2 shrink-0 justify-end w-full">
        <button
          onClick={() => setViewMode('split')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
            viewMode === 'split'
              ? 'bg-burgundy-50 border-burgundy-300 text-burgundy-800 font-semibold shadow-sm'
              : 'bg-card border-border text-muted-foreground hover:bg-muted'
          }`}
        >
          <Activity size={14} />
          <span>Split Console</span>
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
            viewMode === 'map'
              ? 'bg-burgundy-50 border-burgundy-300 text-burgundy-800 font-semibold shadow-sm'
              : 'bg-card border-border text-muted-foreground hover:bg-muted'
          }`}
        >
          <Maximize2 size={14} />
          <span>Full Map View</span>
        </button>
      </div>

      {/* ── 4. Main Interactive Workspace (Split Console / Full Map) ── */}
      {viewMode === 'split' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ── Left Column: Active Incidents Selection Radar (5 cols) ── */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    Active Spill Detections
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Click any incident to select & launch forensic attribution
                  </p>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  {filteredIncidents.length} of {incidents.length}
                </Badge>
              </div>

              {/* Filter and Search Bar */}
              <div className="mt-3 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-2.5 top-2.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by title, location or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:border-burgundy-400 font-sans"
                  />
                </div>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-burgundy-400 font-medium"
                >
                  <option value="ALL">All Severity</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                </select>
              </div>

              {/* Incidents Card List */}
              <div className="mt-4 space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
                {filteredIncidents.map((inc) => {
                  const isCritical = inc.severity === 'Critical' || inc.severity === 'High';
                  const isFocused = focusedIncidentId === inc.id;

                  return (
                    <div
                      key={inc.id}
                      onMouseEnter={() => setFocusedIncidentId(inc.id)}
                      className={`group relative rounded-xl border transition-all p-3.5 flex flex-col justify-between ${
                        isFocused
                          ? 'border-burgundy-400 bg-burgundy-50/40 shadow-md ring-1 ring-burgundy-400/50'
                          : 'border-border bg-card hover:border-burgundy-300 hover:shadow-sm'
                      }`}
                    >
                      <div>
                        {/* Top ID & Severity */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-red-500 animate-pulse' : 'bg-burgundy-500'}`} />
                            <span className="font-mono text-xs font-bold text-foreground">
                              {inc.id}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              • {inc.sarSatellite?.split(' ')[0] || 'Sentinel-1'}
                            </span>
                          </div>
                          <Badge variant={isCritical ? 'destructive' : 'secondary'} className="text-[10px] py-0 h-4 uppercase font-bold tracking-wider">
                            {inc.severity || 'High'}
                          </Badge>
                        </div>

                        {/* Title & Location */}
                        <h3 className="font-bold text-sm text-foreground group-hover:text-burgundy-600 transition-colors leading-tight">
                          {inc.title}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 mb-2.5">
                          <MapPin size={12} className="shrink-0 text-burgundy-500" />
                          <span className="truncate">{inc.locationName}</span>
                        </p>

                        {/* Telemetry Matrix */}
                        <div className="grid grid-cols-2 gap-1.5 p-2 rounded-lg bg-muted/40 font-mono text-[11px] mb-3">
                          <div>
                            <span className="text-[10px] text-muted-foreground block">Spill Area:</span>
                            <strong className="text-burgundy-600 font-bold">{inc.spillAreaKm2} km²</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground block">AI Confidence:</span>
                            <strong className="text-silver-600 font-bold">{inc.confidence}%</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground block">Est. Volume:</span>
                            <strong className="text-burgundy-600 font-bold">{inc.estimatedVolumeM3 || 380} m³</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground block">Suspect Ship:</span>
                            <strong className="text-red-600 truncate block">{inc.primaryCandidate || 'Analyzing'}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={(e) => handleLocateOnMap(e, inc)}
                          className="px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-semibold text-secondary-foreground flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Crosshair size={13} className="text-burgundy-600" />
                          <span>Locate on Map</span>
                        </button>
                        <Button
                          size="sm"
                          onClick={() => handleLaunchIncident(inc.id)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span>Investigate →</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}

                {filteredIncidents.length === 0 && (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    No incidents match your filter criteria.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right Column: Interactive Map (7 cols) ── */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Info size={13} className="text-burgundy-500" />
                Click any pulsating hazard beacon or spill boundary on the map to inspect & launch
              </span>
              <span className="font-mono hidden sm:inline">Layers: AIS + Slicks + Beacons</span>
            </div>

            <div className="rounded-xl overflow-hidden shadow-md border border-border">
              <LeafletMap height="calc(100vh - 250px)" />
            </div>
          </div>
        </div>
      ) : (
        /* ── Fullscreen Map View with Floating Incident Bar ── */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Info size={13} className="text-burgundy-500" />
              Fullscreen Live Traffic Mode. Click any hazard beacon to select and investigate that incident.
            </span>
          </div>

          <div className="rounded-xl overflow-hidden shadow-md border border-border relative">
            <LeafletMap height="calc(100vh - 220px)" />

            {/* Floating Bottom Quick Selection Capsule */}
            <div className="absolute bottom-6 inset-x-4 max-w-4xl mx-auto z-[1000] p-3 rounded-2xl bg-card/95 border border-border shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">
                    Active Detections:
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto flex-1 justify-end">
                  {incidents.map((inc) => (
                    <button
                      key={inc.id}
                      onClick={() => handleLaunchIncident(inc.id)}
                      className="px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-burgundy-50 hover:border-burgundy-400 border border-border text-foreground text-xs font-mono font-medium transition-all flex items-center gap-2 shrink-0"
                    >
                      <strong className="text-burgundy-600">{inc.id}</strong>
                      <span className="text-muted-foreground">{inc.spillAreaKm2} km²</span>
                      <ArrowRight size={12} className="opacity-70" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTrafficPage;
