import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Radio,
  Map as MapIcon,
  Ship,
  Compass,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  Minimize2,
  Maximize2,
  ExternalLink,
  Flame,
  Clock,
  MapPin,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';

const ActiveIncidentOverlay = () => {
  const { activeIncident, vessels } = useIncident();
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!activeIncident) return null;

  const primaryCandidate = vessels?.find(v => v.candidateRank === 1) || {
    name: activeIncident.primaryCandidate || 'MV Ocean Star',
    correlationScore: 88
  };

  return (
    <div className={`active-incident-overlay ${isMinimized ? 'minimized' : ''}`}>
      {/* ── Panel Header ── */}
      <div className="incident-overlay-header">
        <div className="overlay-header-title">
          <span className="live-pulse-badge">
            <span className="pulse-circle" />
            ACTIVE INCIDENT
          </span>
          <span className="incident-id-tag">{activeIncident.id}</span>
        </div>

        <div className="overlay-header-controls">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="control-icon-btn"
            title={isMinimized ? 'Expand Incident Panel' : 'Minimize Panel'}
          >
            {isMinimized ? <ChevronDown size={14} /> : <Minimize2 size={13} />}
          </button>
        </div>
      </div>

      {/* ── Panel Body (Collapsible) ── */}
      {!isMinimized ? (
        <div className="incident-overlay-body">
          {/* Main Title & Detection Timestamp */}
          <div className="incident-title-block">
            <h3 className="incident-main-title">{activeIncident.title}</h3>
            <div className="incident-timestamp font-mono">
              <Clock size={12} />
              <span>{activeIncident.displayDate || '27 Sep 2026 • 14:32 UTC'}</span>
            </div>
          </div>

          <div className="incident-divider" />

          {/* Key Parameters Table */}
          <div className="incident-metrics-grid">
            <div className="metric-row">
              <span className="metric-key">Location:</span>
              <span className="metric-val font-mono">
                {activeIncident.coordinates?.lat?.toFixed(2)}° N, {activeIncident.coordinates?.lng?.toFixed(2)}° E
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-key">Spill Area:</span>
              <span className="metric-val text-primary font-mono">
                {activeIncident.spillAreaKm2} km² <span className="text-muted">({activeIncident.spillLengthKm} × {activeIncident.spillWidthKm} km)</span>
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-key">Detection Conf:</span>
              <span className="metric-val text-success font-mono font-bold">
                {activeIncident.confidence}% <span className="text-muted">({activeIncident.sarSatellite?.split(' ')[0]})</span>
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-key">Est. Volume:</span>
              <span className="metric-val text-warning font-mono">
                {activeIncident.estimatedVolumeM3} m³ <span className="text-muted">(≈ {activeIncident.estimatedBarrels?.toLocaleString()} bbls)</span>
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-key">Candidate Ship:</span>
              <span className="metric-val text-danger font-mono font-bold">
                {primaryCandidate.name} <span className="badge-tag">Score: {primaryCandidate.correlationScore}%</span>
              </span>
            </div>

            <div className="metric-row">
              <span className="metric-key">Status:</span>
              <span className="metric-val status-badge-inline">
                {activeIncident.status || 'Investigation Active'}
              </span>
            </div>
          </div>

          <div className="incident-divider" />

          {/* ── Direct Investigation Workflow Actions ── */}
          <div className="incident-actions-section">
            <div className="actions-label">INCIDENT INVESTIGATION ACTIONS</div>
            <div className="actions-button-grid">
              <button
                onClick={() => navigate('/incident')}
                className="btn-operational btn-primary-op"
                title="Open SAR Detection & Morphological Characterization"
              >
                <Radio size={13} />
                <span>INVESTIGATE</span>
              </button>

              <button
                onClick={() => navigate('/map')}
                className="btn-operational btn-secondary-op"
                title="Open Tactical Map & Lagrangian Hindcast Simulation"
              >
                <MapIcon size={13} />
                <span>VISUALIZE INCIDENT</span>
              </button>

              <button
                onClick={() => navigate('/vessels')}
                className="btn-operational btn-secondary-op"
                title="Open AIS Spatio-Temporal Candidate Correlation"
              >
                <Ship size={13} />
                <span>VESSEL ANALYSIS</span>
              </button>

              <button
                onClick={() => navigate('/forecast')}
                className="btn-operational btn-secondary-op"
                title="Open Hydrodynamic Forward Drift Forecast"
              >
                <Compass size={13} />
                <span>FORECAST</span>
              </button>

              <button
                onClick={() => navigate('/report')}
                className="btn-operational btn-secondary-op"
                title="Generate Court-Admissible Legal Evidence Dossier"
              >
                <FileCheck2 size={13} />
                <span>DOSSIER</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Minimized Capsule Bar */
        <div
          className="incident-overlay-collapsed"
          onClick={() => setIsMinimized(false)}
        >
          <span className="collapsed-title">{activeIncident.title}</span>
          <span className="collapsed-stat font-mono text-primary">{activeIncident.spillAreaKm2} km²</span>
          <span className="collapsed-stat font-mono text-success">{activeIncident.confidence}% Conf</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/incident');
            }}
            className="collapsed-btn"
          >
            INVESTIGATE →
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveIncidentOverlay;
