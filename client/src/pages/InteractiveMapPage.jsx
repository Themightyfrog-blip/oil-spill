import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Map as MapIcon,
  Layers,
  Ship,
  Wind,
  Compass,
  ArrowRight,
  Bot,
  Info,
  Calendar,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import WorkflowTracker from '../components/WorkflowTracker';
import LeafletMap from '../components/LeafletMap';
import TimelineBar from '../components/TimelineBar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import SelectIncidentPrompt from '../components/SelectIncidentPrompt';

const InteractiveMapPage = () => {
  const {
    activeIncident,
    selectedVessel,
    setSelectedVessel,
    vessels,
    triggerChatWithQuestion
  } = useIncident();

  const navigate = useNavigate();

  if (!activeIncident) {
    return <SelectIncidentPrompt targetPageName="Tactical Map & Playback" targetRoute="/map" />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <WorkflowTracker />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Tactical Maritime Map & Spatiotemporal Playback
            </h1>
            <Badge variant="amber">{activeIncident?.id}</Badge>
            <Badge variant="subtle">Stage 02 of 05</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Interactive GIS surveillance: examine vessel AIS kinematic trajectories, backward slick dispersion, and future forecast envelopes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="hazard"
            size="sm"
            onClick={() => triggerChatWithQuestion(`Explain the trajectory and source region for ${activeIncident?.id}`)}
            className="gap-1.5"
          >
            <Bot size={14} />
            <span>Ask Spill Bot About Map</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/vessels')}
            className="gap-1.5"
          >
            <span>Proceed to Vessel Attribution</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="space-y-3">
        <LeafletMap height="560px" />
        {/* Interactive Timeline Playback Scrubber */}
        <TimelineBar />
      </div>

      {/* Selected Vessel Telemetry Quick Bar below map (Zero Blue/Purple) */}
      {selectedVessel && (
        <Card className="border-border bg-card shadow-md">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: 'rgba(92, 10, 40, 0.1)',
                    borderColor: 'rgba(92, 10, 40, 0.3)',
                    color: selectedVessel.candidateRank === 1 ? '#ef4444' : '#5C0A28'
                  }}
                >
                  <Ship size={24} />
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-foreground font-mono">
                      {selectedVessel.name}
                    </h3>
                    <Badge variant={selectedVessel.candidateRank === 1 ? "destructive" : "amber"}>
                      {selectedVessel.candidateTag}
                    </Badge>
                    <Badge variant="subtle" className="font-mono text-secondary-foreground">
                      Score: <strong className={selectedVessel.candidateRank === 1 ? "text-red-700" : "text-burgundy-400"}>{selectedVessel.correlationScore}%</strong>
                    </Badge>
                  </div>

                  <div className="text-xs font-mono text-muted-foreground mt-1 flex items-center gap-3 flex-wrap">
                    <span>Type: <strong className="text-foreground">{selectedVessel.shipType}</strong></span>
                    <span>•</span>
                    <span>MMSI: <strong className="text-foreground">{selectedVessel.mmsi}</strong></span>
                    <span>•</span>
                    <span>Flag: <strong className="text-foreground">{selectedVessel.flag}</strong></span>
                    <span>•</span>
                    <span>Min Distance to Source: <strong className="text-burgundy-400">{selectedVessel.minSourceDistanceKm || selectedVessel.distanceFromSourceKm} km</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-auto">
                <Button
                  variant="hazard"
                  size="sm"
                  onClick={() => navigate('/vessels')}
                  className="text-xs"
                >
                  Inspect Vessel Forensics
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/history')}
                  className="text-xs"
                >
                  Port State History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveMapPage;
