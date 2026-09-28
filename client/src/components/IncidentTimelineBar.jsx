import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  Activity
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';

// Milestone reference definitions (0 to 100 progress scale)
const milestones = [
  { progress: 0,   label: 'T-12h', time: '02:30 UTC' },
  { progress: 25,  label: 'T-6h',  time: '08:30 UTC' },
  { progress: 48,  label: 'RELEASE WINDOW', time: '12:15 UTC', isKey: true, color: '#5C0A28' },
  { progress: 70,  label: 'DETECTION (T0)', time: '14:32 UTC', isKey: true, color: '#dc2626' },
  { progress: 85,  label: 'T+6h',  time: '20:30 UTC' },
  { progress: 100, label: 'T+24h', time: '14:32 +1d' },
];

const IncidentTimelineBar = () => {
  const {
    timelineProgress,
    setTimelineProgress,
    isPlaying,
    setIsPlaying,
    playbackSpeed,
    setPlaybackSpeed,
    activeIncident
  } = useIncident();

  const handleStepBack = () => {
    setTimelineProgress((prev) => Math.max(0, prev - 5));
  };

  const handleStepForward = () => {
    setTimelineProgress((prev) => Math.min(100, prev + 5));
  };

  // Compute current simulated time string
  const getCurrentPhase = () => {
    if (timelineProgress < 40) return { text: 'PRE-INCIDENT TRANSIT', color: '#64748b' };
    if (timelineProgress >= 40 && timelineProgress < 58) return { text: 'RECONSTRUCTED RELEASE WINDOW', color: '#5C0A28' };
    if (timelineProgress >= 58 && timelineProgress < 75) return { text: 'SAR SATELLITE DETECTION PASS', color: '#dc2626' };
    return { text: 'HYDRODYNAMIC FORWARD DRIFT', color: '#2563eb' };
  };

  const phase = getCurrentPhase();

  return (
    <div className="incident-timeline-bar">
      {/* ── Left Playback Controls ── */}
      <div className="timeline-playback-group">
        <button
          onClick={handleStepBack}
          className="timeline-control-btn"
          title="Step Backward (5 min)"
        >
          <ChevronLeft size={15} />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`timeline-play-btn ${isPlaying ? 'playing' : ''}`}
          title={isPlaying ? 'Pause Simulation' : 'Play Incident Timeline'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 2 }} />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>

        <button
          onClick={handleStepForward}
          className="timeline-control-btn"
          title="Step Forward (5 min)"
        >
          <ChevronRight size={15} />
        </button>

        {/* Speed Toggles */}
        <div className="timeline-speed-toggles">
          {[1, 2, 4].map((speed) => (
            <button
              key={speed}
              onClick={() => setPlaybackSpeed(speed)}
              className={`speed-pill ${playbackSpeed === speed ? 'active' : ''}`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* ── Center Interactive Scrubber Track with Milestones ── */}
      <div className="timeline-scrubber-center">
        {/* Track milestones text labels */}
        <div className="timeline-milestones-row">
          {milestones.map((m) => (
            <div
              key={m.progress}
              className={`milestone-marker ${m.isKey ? 'key-milestone' : ''}`}
              style={{ left: `${m.progress}%` }}
              onClick={() => setTimelineProgress(m.progress)}
            >
              <span className="milestone-dot" style={m.color ? { background: m.color, borderColor: m.color } : {}} />
              <span className="milestone-text" style={m.color ? { color: m.color } : {}}>
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Range Input Slider */}
        <div className="timeline-slider-wrapper">
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={timelineProgress}
            onChange={(e) => setTimelineProgress(parseFloat(e.target.value))}
            className="operational-range-slider"
          />
          <div
            className="slider-progress-fill"
            style={{ width: `${timelineProgress}%` }}
          />
        </div>
      </div>

      {/* ── Right Status & Telemetry ── */}
      <div className="timeline-telemetry-right">
        <div className="phase-badge" style={{ borderColor: phase.color, color: phase.color }}>
          <Activity size={11} />
          <span>{phase.text}</span>
        </div>
        <div className="timeline-clock font-mono">
          <Clock size={12} style={{ color: 'var(--primary)' }} />
          <span>{timelineProgress < 50 ? '12:20 UTC' : timelineProgress < 75 ? '14:32 UTC' : '20:30 UTC'}</span>
        </div>
      </div>
    </div>
  );
};

export default IncidentTimelineBar;
