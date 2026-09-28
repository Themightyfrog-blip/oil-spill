import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Radio, Map as MapIcon, Ship, Compass, FileCheck2, CheckCircle2 } from 'lucide-react';
import { useIncident } from '../context/IncidentContext';

const pipelineStages = [
  { id: 'detection', step: '01', title: 'SAR Detection', path: '/incident', icon: Radio },
  { id: 'tactical', step: '02', title: 'Tactical Map', path: '/map', icon: MapIcon },
  { id: 'vessels', step: '03', title: 'Vessel Attribution', path: '/vessels', icon: Ship },
  { id: 'forecast', step: '04', title: 'Drift Forecast', path: '/forecast', icon: Compass },
  { id: 'dossier', step: '05', title: 'Evidence Dossier', path: '/report', icon: FileCheck2 },
];

const WorkflowTracker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeIncident } = useIncident();

  const getActiveStageIndex = () => {
    switch (location.pathname) {
      case '/': return -1;
      case '/incident': return 0;
      case '/map': return 1;
      case '/vessels': return 2;
      case '/forecast': return 3;
      case '/report': return 4;
      case '/history': return 2;
      default: return -1;
    }
  };

  const activeIndex = getActiveStageIndex();

  return (
    <div className="w-full bg-muted border border-border rounded-xl p-3 sm:p-4 mb-6 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            Pipeline Workflow:
          </span>
          <span className="text-xs font-mono font-semibold text-foreground">
            {activeIncident?.id} · {activeIncident?.locationName?.split('(')[0]?.trim()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>STATUS:</span>
          <span className="text-red-700 font-semibold">{activeIncident?.status || 'Active'}</span>
          <span>·</span>
          <span>CONFIDENCE:</span>
          <span className="text-silver-400 font-semibold">{activeIncident?.confidence}%</span>
        </div>
      </div>

      {/* ── 5 Spacious Operational Steps ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
        {pipelineStages.map((stage, idx) => {
          const Icon = stage.icon;
          const isCurrent = idx === activeIndex;
          const isCompleted = activeIndex !== -1 && idx < activeIndex;

          return (
            <button
              key={stage.id}
              onClick={() => navigate(stage.path)}
              className={`flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-all border ${
                isCurrent
                  ? 'bg-burgundy-500/15 border-burgundy-500/40 text-burgundy-400 shadow-sm'
                  : isCompleted
                  ? 'bg-muted border-border text-secondary-foreground hover:border-border'
                  : 'bg-card border-border text-muted-foreground hover:text-secondary-foreground hover:border-border'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                    ? 'bg-silver-500/20 text-silver-400 border border-silver-500/30'
                    : 'bg-accent text-muted-foreground'
                }`}
              >
                {isCompleted ? <CheckCircle2 size={14} /> : stage.step}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase leading-none mb-1">
                  Stage {stage.step}
                </div>
                <div className={`text-xs font-semibold truncate ${isCurrent ? 'text-burgundy-300' : 'text-foreground'}`}>
                  {stage.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowTracker;
