import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Radio, X } from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const AlertBanner = () => {
  const { activeIncident } = useIncident();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  if (!activeIncident || dismissed) return null;

  return (
    <div className="w-full bg-red-50 border-b border-red-200 px-4 sm:px-6 py-2.5 transition-all text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="shrink-0 gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            CRITICAL SPILL ALERT
          </Badge>
          <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
            <span className="font-semibold text-foreground font-mono">
              {activeIncident.id}:
            </span>
            <span className="text-foreground font-medium">
              {activeIncident.title}
            </span>
            <span className="text-muted-foreground hidden md:inline">•</span>
            <span className="text-muted-foreground hidden md:inline text-xs font-mono">
              Area: <strong className="text-burgundy-400">{activeIncident.spillAreaKm2} km²</strong>
            </span>
            <span className="text-muted-foreground hidden md:inline">•</span>
            <span className="text-muted-foreground hidden md:inline text-xs font-mono">
              Confidence: <strong className="text-silver-400">{activeIncident.confidence}%</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <Button
            size="sm"
            variant="hazard"
            onClick={() => navigate('/incident')}
            className="h-7 text-xs gap-1.5"
          >
            <Radio size={12} />
            <span>Investigate Spill</span>
            <ArrowRight size={12} />
          </Button>
          <button
            onClick={() => setDismissed(true)}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
            title="Dismiss Alert"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
