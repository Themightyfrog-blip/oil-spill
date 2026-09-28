import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Radio, Compass, Ship, Flame, ShieldAlert, Sparkles, MapPin } from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const SelectIncidentPrompt = ({ targetPageName = 'Intelligence Overview', targetRoute = '/overview' }) => {
  const { incidents, selectIncident } = useIncident();
  const navigate = useNavigate();

  const handleSelect = (id) => {
    selectIncident(id);
    navigate(targetRoute);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-300">
      {/* ── Callout Header ── */}
      <div className="rounded-2xl border border-burgundy-300/80 bg-gradient-to-b from-burgundy-500/10 via-card to-card p-6 sm:p-8 shadow-lg text-center relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-burgundy-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-500/15 border border-burgundy-500/30 text-burgundy-700 text-xs font-semibold mb-3">
          <AlertTriangle size={14} className="animate-pulse" />
          <span>INCIDENT SELECTION REQUIRED</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Select an Active Incident to Access {targetPageName}
        </h2>
        
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-2">
          Autonomous forensic workflows (SAR morphology, Lagrangian drift backtracking, AIS suspect correlation, and legal dossiers) operate on specific satellite discharge events.
        </p>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs font-mono text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1.5 text-red-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            4 Unresolved Slicks Flagged
          </span>
          <span>•</span>
          <span>Copernicus Sentinel SAR Feed</span>
          <span>•</span>
          <span>INCOIS MetOcean Hydrodynamics</span>
        </div>
      </div>

      {/* ── Incident Selection Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {incidents.map((inc) => {
          const isCritical = inc.severity === 'Critical' || inc.severity === 'High';
          return (
            <div
              key={inc.id}
              onClick={() => handleSelect(inc.id)}
              className="group relative rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-burgundy-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isCritical ? 'bg-red-500 animate-pulse' : 'bg-burgundy-500'}`} />
                    <span className="font-mono text-xs font-bold text-foreground tracking-wide">
                      {inc.id}
                    </span>
                  </div>
                  <Badge variant={isCritical ? 'destructive' : 'secondary'} className="text-[10px] uppercase font-bold tracking-wider">
                    {inc.severity || 'High'}
                  </Badge>
                </div>

                <h3 className="font-bold text-base text-foreground group-hover:text-burgundy-600 transition-colors leading-tight mb-1">
                  {inc.title}
                </h3>
                
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                  <MapPin size={13} className="shrink-0 text-burgundy-500" />
                  <span className="truncate">{inc.locationName}</span>
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded-lg bg-muted/40 font-mono text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Area</span>
                    <strong className="text-burgundy-600 font-bold">{inc.spillAreaKm2} km²</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">AI Conf</span>
                    <strong className="text-silver-600 font-bold">{inc.confidence}%</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Sensor</span>
                    <span className="truncate block font-medium">{inc.sarSatellite?.split(' ')[0] || 'Sentinel-1'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Top Suspect</span>
                    <span className="truncate block font-semibold text-red-600">{inc.primaryCandidate || 'Analyzing'}</span>
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs transition-colors flex items-center justify-center gap-2 group-hover:shadow"
              >
                <span>Launch Investigation ({inc.id})</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="text-xs text-muted-foreground hover:text-foreground font-mono transition-colors underline underline-offset-4"
        >
          ← Return to Live Maritime Traffic Map
        </button>
      </div>
    </div>
  );
};

export default SelectIncidentPrompt;
