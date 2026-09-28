import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

const layerItems = [
  { key: 'slick', label: 'Oil Slick Polygon', category: 'Primary Incident' },
  { key: 'vesselPositions', label: 'Vessel Positions (AIS)', category: 'Vessels' },
  { key: 'vesselTracks', label: 'Vessel Tracks', category: 'Vessels' },
  { key: 'probableSource', label: 'Probable Source Region', category: 'Source Estimation' },
  { key: 'backwardTrajectory', label: 'Backtracked Trajectory', category: 'Source Estimation' },
  { key: 'wind', label: 'Wind Vectors (ECMWF)', category: 'Metocean' },
  { key: 'oceanCurrents', label: 'Ocean Currents (HYCOM)', category: 'Metocean' },
  { key: 'waves', label: 'Waves & Sea State', category: 'Metocean' },
  { key: 'satelliteImage', label: 'SAR Satellite Swath', category: 'Remote Sensing' },
  { key: 'forecastTrajectory', label: 'Forecast Trajectory (+24h)', category: 'Prediction' },
];

const MapLayersControl = ({ layers, onToggleLayer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="map-layers-control-panel">
      {/* ── Toggle Header Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`layers-panel-toggle-btn ${isOpen ? 'active' : ''}`}
        title="Toggle Operational Map Layers"
      >
        <Layers size={15} />
        <span>MAP LAYERS</span>
        <span className="layers-active-count">
          {Object.values(layers).filter(Boolean).length}/{layerItems.length}
        </span>
        {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {/* ── Expanded Layers Checklist ── */}
      {isOpen && (
        <div className="layers-checklist-dropdown">
          <div className="layers-dropdown-header">
            <span className="dropdown-title">OPERATIONAL LAYERS</span>
            <span className="dropdown-subtitle">Toggle tactical overlays</span>
          </div>

          <div className="layers-checklist-body">
            {layerItems.map((item) => {
              const isChecked = !!layers[item.key];
              return (
                <label key={item.key} className="layer-checkbox-row">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleLayer(item.key)}
                    className="operational-checkbox"
                  />
                  <span className="layer-name">{item.label}</span>
                  <span className={`layer-status-pill ${isChecked ? 'active' : 'inactive'}`}>
                    {isChecked ? 'ON' : 'OFF'}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapLayersControl;
