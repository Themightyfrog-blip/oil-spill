import React from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Clock, Activity } from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const TimelineBar = () => {
  const {
    timelineProgress,
    setTimelineProgress,
    isPlaying,
    setIsPlaying,
    playbackSpeed,
    setPlaybackSpeed,
    activeIncident
  } = useIncident();

  // Convert progress (0 to 100) to display simulated time (Zero Blue/Purple)
  const getDisplayTimeAndPhase = (val) => {
    if (val < 25) {
      return {
        time: '10:30 UTC',
        phase: 'Pre-Discharge AIS Vessel Ingress',
        color: '#a1a1aa'
      };
    } else if (val < 50) {
      return {
        time: '12:20 UTC',
        phase: 'Estimated Oil Release Window (Source Region)',
        color: '#5C0A28'
      };
    } else if (val < 75) {
      return {
        time: '14:32 UTC',
        phase: 'Sentinel-1 SAR Detection Point (T0)',
        color: '#ef4444'
      };
    } else {
      return {
        time: '+24h Horizon',
        phase: 'Hydrodynamic Forward Spill Drift Forecast',
        color: '#f97316'
      };
    }
  };

  const currentStatus = getDisplayTimeAndPhase(timelineProgress);

  return (
    <div className="w-full bg-card border border-border rounded-xl p-4 shadow-md backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* ── Playback Controls ── */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setTimelineProgress(0)}
            title="Reset to 10:00 UTC"
            className="h-8 w-8 p-0"
          >
            <RotateCcw size={14} />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setTimelineProgress(prev => Math.max(0, prev - 10))}
            title="Step Back"
            className="h-8 w-8 p-0"
          >
            <SkipBack size={14} />
          </Button>

          <Button
            size="sm"
            variant={isPlaying ? "destructive" : "hazard"}
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-8 px-3 gap-1.5 font-semibold text-xs"
          >
            {isPlaying ? (
              <>
                <Pause size={13} />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play size={13} />
                <span>PLAY</span>
              </>
            )}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setTimelineProgress(prev => Math.min(100, prev + 10))}
            title="Step Forward"
            className="h-8 w-8 p-0"
          >
            <SkipForward size={14} />
          </Button>

          {/* Speed Pills */}
          <div className="flex items-center gap-1 ml-2">
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  playbackSpeed === spd
                    ? 'bg-primary text-primary-foreground font-bold'
                    : 'bg-accent text-muted-foreground hover:text-foreground'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* ── Scrubber & Slider Track ── */}
        <div className="w-full flex-1 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-burgundy-500" />
              <span className="font-bold" style={{ color: currentStatus.color }}>
                {currentStatus.time}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-secondary-foreground font-medium">
                {currentStatus.phase}
              </span>
            </div>

            <div className="text-muted-foreground text-[11px]">
              PROGRESS: <strong className="text-burgundy-400">{Math.round(timelineProgress)}%</strong>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={timelineProgress}
            onChange={(e) => setTimelineProgress(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-accent rounded-lg appearance-none cursor-pointer accent-burgundy-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-muted-foreground pt-1">
            <span
              onClick={() => setTimelineProgress(0)}
              className="cursor-pointer hover:text-foreground transition-colors"
            >
              10:00 UTC (Transit)
            </span>
            <span
              onClick={() => setTimelineProgress(35)}
              className="cursor-pointer hover:text-burgundy-400 text-burgundy-500/80 transition-colors"
            >
              12:15 UTC (Release Window)
            </span>
            <span
              onClick={() => setTimelineProgress(70)}
              className="cursor-pointer hover:text-red-700 text-red-700/90 font-bold transition-colors"
            >
              14:32 UTC (SAR Detection)
            </span>
            <span
              onClick={() => setTimelineProgress(100)}
              className="cursor-pointer hover:text-orange-400 text-orange-400/90 transition-colors"
            >
              +24h (Shoreline Risk)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineBar;
