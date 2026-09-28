import React from 'react';
import { useIncident } from '../context/IncidentContext';
import { allMapShips } from '../data/allMapShips';
import {
  AlertTriangle,
  Radio,
  Ship,
  Compass,
  Clock,
  CheckCircle2,
  ChevronDown,
  Activity,
  Layers
} from 'lucide-react';

const OperationalStatusBar = () => {
  const {
    incidents,
    activeIncidentId,
    activeIncident,
    selectIncident,
    forecast
  } = useIncident();

  const totalVessels = (allMapShips?.length || 0) + (activeIncident?.candidateCount || 0);
  const activeCount = incidents.filter(i => i.status?.toLowerCase().includes('active') || i.severity === 'High').length || 1;
  const newAlertsCount = incidents.length;

  return (
    <header className="operational-status-bar">
      {/* ── Left System Tag ── */}
      <div className="status-bar-brand">
        <div className="system-live-indicator">
          <span className="live-dot" />
          <span className="brand-title">AEGIS-SPILL COMMAND</span>
        </div>
        <span className="station-code">SEC-4 / WEST EEZ</span>
      </div>

      {/* ── Center Telemetry Items (Situational Awareness) ── */}
      <div className="status-bar-metrics">
        <div className="status-metric-item">
          <span className="metric-label">ACTIVE INCIDENTS</span>
          <span className="metric-value text-danger">0{activeCount}</span>
        </div>

        <div className="status-divider" />

        <div className="status-metric-item">
          <span className="metric-label">NEW ALERTS</span>
          <span className="metric-value text-warning">0{newAlertsCount}</span>
        </div>

        <div className="status-divider" />

        <div className="status-metric-item">
          <span className="metric-label">VESSELS IN AREA</span>
          <span className="metric-value">{totalVessels}</span>
        </div>

        <div className="status-divider" />

        <div className="status-metric-item">
          <span className="metric-label">UNDER INVESTIGATION</span>
          <span className="metric-value text-primary font-mono">{activeIncident?.id || 'INC-2026-001'}</span>
        </div>

        <div className="status-divider" />

        <div className="status-metric-item">
          <span className="metric-label">FORECAST STATUS</span>
          <span className="metric-value text-success" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A9A9A9' }} />
            READY
          </span>
        </div>

        <div className="status-divider" />

        <div className="status-metric-item">
          <span className="metric-label">LAST UPDATE</span>
          <span className="metric-value font-mono">
            {activeIncident?.displayDate?.split(',')[1]?.trim() || '14:32 UTC'}
          </span>
        </div>
      </div>

      {/* ── Right Quick Incident Selector ── */}
      <div className="status-bar-actions">
        <div className="incident-selector-wrapper">
          <span className="selector-label">ACTIVE CASE:</span>
          <select
            value={activeIncidentId}
            onChange={(e) => selectIncident(e.target.value)}
            className="incident-quick-select"
          >
            {incidents.map((inc) => (
              <option key={inc.id} value={inc.id}>
                {inc.id} - {inc.locationName?.split('(')[0]?.trim()}
              </option>
            ))}
          </select>
          <ChevronDown size={12} className="select-chevron" />
        </div>
      </div>
    </header>
  );
};

export default OperationalStatusBar;
