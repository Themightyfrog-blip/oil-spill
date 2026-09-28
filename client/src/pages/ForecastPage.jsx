import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  Wind,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Layers,
  ArrowRight,
  Bot,
  Activity,
  CheckCircle2,
  Droplet,
  Flame,
  FileCheck2
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import WorkflowTracker from '../components/WorkflowTracker';
import LeafletMap from '../components/LeafletMap';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import SelectIncidentPrompt from '../components/SelectIncidentPrompt';

const ForecastPage = () => {
  const {
    activeIncident,
    forecast,
    environmentalData,
    triggerChatWithQuestion
  } = useIncident();

  const navigate = useNavigate();
  const [activeStepTab, setActiveStepTab] = useState('+24h');

  if (!activeIncident || !forecast) {
    return <SelectIncidentPrompt targetPageName="Hydrodynamic Drift Forecast" targetRoute="/forecast" />;
  }

  const currentStep = forecast.timeSteps?.find(t => t.step === activeStepTab) || forecast.timeSteps?.[1];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <WorkflowTracker />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Forward Oil Spill Drift & Weathering Forecast
            </h1>
            <Badge variant="amber">{forecast.overallConfidencePercent}% Conf.</Badge>
            <Badge variant="subtle">Stage 04 of 05</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Lagrangian hydrodynamic particle dispersion and ADIOS/GNOME weathering physics simulation (+24 Hours).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="hazard"
            size="sm"
            onClick={() => triggerChatWithQuestion(`What is the 24 hour forecast and shoreline risk for ${activeIncident.id}?`)}
            className="gap-1.5"
          >
            <Bot size={14} />
            <span>Ask Shoreline Threat</span>
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/report')}
            className="gap-1.5"
          >
            <span>Generate Official Report</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>

      {/* Shoreline Threat Alert Banner */}
      <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start sm:items-center gap-3.5 text-foreground">
        <AlertTriangle size={24} className="text-red-700 shrink-0 mt-0.5 sm:mt-0 animate-pulse" />
        <div>
          <div className="font-bold text-red-800 text-sm font-mono flex items-center gap-2">
            <span>SHORELINE IMPACT ASSESSMENT:</span>
            <Badge variant="destructive" className="text-[10px]">
              {forecast.shorelineImpactRisk}
            </Badge>
          </div>
          <div className="text-xs text-secondary-foreground mt-1">
            Spill trajectory is bearing <strong>{forecast.driftBearingDeg}°</strong> at <strong>{forecast.meanDriftSpeedKnots} knots</strong> toward coastal aquaculture and sensitive tourism sectors within 24–36 hours.
          </div>
        </div>
      </div>

      {/* Map Preview Showing Forecast Trajectory & Uncertainty Corridor */}
      <Card className="border-border bg-card p-3 shadow-md">
        <div className="flex items-center justify-between pb-3 px-2 border-b border-border">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-burgundy-500" />
            <span className="text-xs font-mono font-bold text-foreground">
              DISPERSION TRAJECTORY & MONTE-CARLO UNCERTAINTY CORRIDOR (+24H)
            </span>
          </div>
          <Badge variant="amber" className="text-[10px]">Monte-Carlo Ensemble</Badge>
        </div>
        <div className="mt-3">
          <LeafletMap height="460px" />
        </div>
      </Card>

      {/* Forecast Horizons Selector */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-burgundy-500" />
          <h3 className="text-sm font-mono font-bold text-foreground uppercase tracking-wider">
            Select Forecast Time Horizon:
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {forecast.timeSteps?.map((step) => {
            const isSelected = activeStepTab === step.step;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStepTab(step.step)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-burgundy-500/15 border-burgundy-500/60 shadow-md'
                    : 'bg-card border-border hover:border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xl font-extrabold font-mono ${isSelected ? 'text-burgundy-400' : 'text-foreground'}`}>
                    {step.step.toUpperCase()}
                  </span>
                  <Badge variant={isSelected ? "amber" : "subtle"} className="text-[10px]">
                    {step.hoursAhead === 0 ? 'Detection' : `+${step.hoursAhead}h`}
                  </Badge>
                </div>

                <div className="text-xs text-muted-foreground mb-2 truncate">
                  {step.displayTime}
                </div>

                <div className="flex justify-between text-xs font-mono pt-2 border-t border-border">
                  <span className="text-muted-foreground">Projected Area:</span>
                  <strong className="text-burgundy-400 font-bold">{step.areaKm2} km²</strong>
                </div>

                {step.evaporationPercent !== undefined && (
                  <div className="flex justify-between text-xs font-mono mt-1 text-secondary-foreground">
                    <span className="text-muted-foreground">Evaporation:</span>
                    <strong className="text-orange-400">{step.evaporationPercent}%</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Time Horizon In-depth Breakdown */}
      {currentStep && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weathering Metrics Card */}
          <Card className="border-border bg-card">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-mono text-foreground flex items-center gap-2">
                  <Droplet size={16} className="text-burgundy-500" />
                  WEATHERING & PHYSICO-CHEMICAL STATE AT {currentStep.step}
                </CardTitle>
                <Badge variant="amber" className="text-[10px]">ADIOS Physics Engine</Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 pt-0">
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-lg bg-muted border border-border">
                  <span className="text-[10px] text-muted-foreground uppercase block">Projected Slick Area</span>
                  <span className="text-xl font-bold text-burgundy-400">
                    {currentStep.areaKm2} km²
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-1">Gravitational-viscous spread</span>
                </div>

                <div className="p-3 rounded-lg bg-muted border border-border">
                  <span className="text-[10px] text-muted-foreground uppercase block">Natural Evaporation</span>
                  <span className="text-xl font-bold text-orange-400">
                    {currentStep.evaporationPercent}%
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-1">Volatile light fractions lost</span>
                </div>

                <div className="p-3 rounded-lg bg-muted border border-border">
                  <span className="text-[10px] text-muted-foreground uppercase block">Water Emulsification</span>
                  <span className="text-xl font-bold text-burgundy-300">
                    {currentStep.emulsionWaterPercent || 35}%
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-1">Heavy "chocolate mousse" state</span>
                </div>

                <div className="p-3 rounded-lg bg-muted border border-border">
                  <span className="text-[10px] text-muted-foreground uppercase block">Remaining Volume</span>
                  <span className="text-xl font-bold text-red-700">
                    {currentStep.remainingVolumeM3 || 320} m³
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-1">Persistent surface slicks</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Containment & Mitigation Actions */}
          <Card className="border-border bg-card">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-mono text-foreground flex items-center gap-2">
                  <ShieldAlert size={16} className="text-burgundy-500" />
                  EMERGENCY MITIGATION & CONTAINMENT ACTIONS
                </CardTitle>
                <Badge variant="amber" className="text-[10px]">Action Plan</Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 pt-0 space-y-3">
              {(forecast.recommendedMitigationActions || [
                "Deploy offshore containment booms at grid point 18.72°N, 72.96°E before +12h",
                "Alert Coast Guard Station Murud for secondary shoreline barrier protection",
                "Prepare skimmer vessels for heavy emulsified mousse recovery",
                "Maintain active aerial surveillance drone passes every 4 hours"
              ]).map((action, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-border text-xs font-mono text-foreground"
                >
                  <CheckCircle2 size={16} className="text-burgundy-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{action}</span>
                </div>
              ))}

              <Button
                variant="default"
                size="sm"
                onClick={() => navigate('/report')}
                className="w-full mt-3 text-xs gap-2"
              >
                <span>Export Mitigation Plan into Investigation Report</span>
                <ArrowRight size={13} />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ForecastPage;
