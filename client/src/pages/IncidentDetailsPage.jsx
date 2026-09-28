import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radio,
  Layers,
  Cpu,
  Compass,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  RotateCcw,
  Play,
  ArrowRight,
  ShieldAlert,
  Info,
  Sliders,
  Droplet,
  Bot
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import WorkflowTracker from '../components/WorkflowTracker';
import SARViewer from '../components/SARViewer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import SelectIncidentPrompt from '../components/SelectIncidentPrompt';

const IncidentDetailsPage = () => {
  const {
    activeIncident,
    environmentalData,
    hindcastState,
    setHindcastState,
    triggerChatWithQuestion
  } = useIncident();

  const navigate = useNavigate();

  const [hindcastProgress, setHindcastProgress] = useState(100);
  const [hindcastStepText, setHindcastStepText] = useState('Hindcast Reconstruction Complete (500 Particles)');

  const handleRunHindcast = () => {
    setHindcastState('PROCESSING');
    setHindcastProgress(0);
    setHindcastStepText('Loading historical ocean currents & wind vectors (INCOIS-HYCOM)...');

    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      if (p === 40) {
        setHindcastStepText('Reconstructing backward Lagrangian trajectory (500 particles)...');
      } else if (p === 70) {
        setHindcastStepText('Computing dispersion covariance & estimating discharge window...');
      } else if (p >= 100) {
        clearInterval(interval);
        setHindcastProgress(100);
        setHindcastState('COMPLETED');
        setHindcastStepText('Hindcast Reconstruction Complete (500 Particles)');
      }
      setHindcastProgress(Math.min(100, p));
    }, 380);
  };

  if (!activeIncident) {
    return <SelectIncidentPrompt targetPageName="SAR Detection & Slick Analysis" targetRoute="/incident" />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <WorkflowTracker />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              SAR Detection & Spill Characterization
            </h1>
            <Badge variant="amber">{activeIncident.id}</Badge>
            <Badge variant="subtle">Stage 01 of 05</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Synthetic Aperture Radar (SAR) backscatter analysis, neural segmentation, and backward Lagrangian hindcasting.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="hazard"
            size="sm"
            onClick={() => triggerChatWithQuestion(`Explain the SAR detection parameters for ${activeIncident.id}`)}
            className="gap-1.5"
          >
            <Bot size={14} />
            <span>Ask Spill Bot</span>
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/map')}
            className="gap-1.5"
          >
            <span>Proceed to Tactical Map</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>

      {/* Section 1: Simulated SAR Detection Pipeline */}
      <SARViewer />

      {/* Section 2: Two Spacious Cards for Spill Characterization & Lagrangian Hindcasting */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spill Morphological Characterization */}
        <Card className="border-border bg-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-mono text-foreground flex items-center gap-2">
                <Radio size={16} className="text-burgundy-500" />
                SPILL MORPHOLOGICAL CHARACTERIZATION
              </CardTitle>
              <Badge variant="amber" className="text-[10px]">AI SEGMENTED</Badge>
            </div>
            <CardDescription className="text-xs">
              Extracted geometric attributes and radar contrast metrics
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-0 space-y-3 text-xs font-mono">
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Detection Coords:</span>
              <strong className="text-foreground">{activeIncident.coordinates?.lat}°N, {activeIncident.coordinates?.lng}°E</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Acquisition Timestamp:</span>
              <span className="text-foreground">{activeIncident.displayDate}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Surface Area:</span>
              <strong className="text-burgundy-400 font-bold">{activeIncident.spillAreaKm2} km² (Confidence: {activeIncident.confidence}%)</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Dimensions (L × W):</span>
              <span className="text-foreground">{activeIncident.spillLengthKm} km × {activeIncident.spillWidthKm} km</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Shape & Morphology:</span>
              <span className="text-foreground text-right">{activeIncident.shape}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Elongation Axis:</span>
              <span className="text-silver-400 font-bold">{activeIncident.orientation}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">SAR Sensor / Swath:</span>
              <span className="text-foreground">{activeIncident.sarSatellite} ({activeIncident.sensorMode})</span>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Estimated Volume:</span>
              <strong className="text-red-700 font-bold">{activeIncident.estimatedVolumeM3} m³ (~{activeIncident.estimatedBarrels} bbl)</strong>
            </div>
          </CardContent>
        </Card>

        {/* Lagrangian Hindcasting Simulation */}
        <Card className="border-border bg-card">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-mono text-foreground flex items-center gap-2">
                <RotateCcw size={16} className="text-burgundy-500" />
                LAGRANGIAN HINDCASTING SIMULATOR
              </CardTitle>
              <Button
                size="sm"
                variant="hazard"
                onClick={handleRunHindcast}
                disabled={hindcastState === 'PROCESSING'}
                className="h-7 text-xs gap-1.5 font-semibold"
              >
                <Play size={12} />
                <span>Run Hindcast</span>
              </Button>
            </div>
            <CardDescription className="text-xs">
              Hydrodynamic backward drift reconstruction to estimate discharge time and centroid
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 pt-0 space-y-4 text-xs font-mono">
            {/* Progress indicator */}
            <div className="p-3 rounded-lg bg-muted border border-border space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-burgundy-400 font-medium">{hindcastStepText}</span>
                <span className="text-muted-foreground">{hindcastProgress}%</span>
              </div>
              <Progress value={hindcastProgress} indicatorClassName="bg-burgundy-500" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-muted-foreground">Reconstructed Centroid:</span>
                <strong className="text-burgundy-400 font-bold">
                  {activeIncident.probableSourceRegion?.center?.join('°N, ')}°E
                </strong>
              </div>

              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-muted-foreground">Spatial Uncertainty Radius:</span>
                <span className="text-foreground">
                  {(activeIncident.probableSourceRegion?.radiusMeters / 1000).toFixed(1)} km (95% confidence)
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-muted-foreground">Estimated Release Window:</span>
                <strong className="text-foreground">
                  {activeIncident.probableSourceRegion?.displayWindow}
                </strong>
              </div>

              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-muted-foreground">Hydrodynamic Backtrack Vector:</span>
                <span className="text-silver-400 font-bold">
                  16.8 km bearing 318° (NW) against 1.4 kn current
                </span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Simulation Method:</span>
                <span className="text-secondary-foreground text-right">{activeIncident.probableSourceRegion?.method}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/map')}
              className="w-full gap-2 text-xs"
            >
              <Compass size={14} className="text-burgundy-500" />
              <span>Inspect Hindcast Vector on Tactical Map</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IncidentDetailsPage;
