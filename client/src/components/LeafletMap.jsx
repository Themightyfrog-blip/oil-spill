import React, { useState, useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Circle,
  Marker,
  Popup,
  Tooltip,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { Layers, Eye, EyeOff, Navigation, Wind, Compass, Ship, AlertCircle, Maximize2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useIncident } from '../context/IncidentContext';

// Helper to recenter map when active incident or manual focus changes
function MapRecenter({ center, focusTarget }) {
  const map = useMap();
  useEffect(() => {
    if (focusTarget?.coords && focusTarget.coords[0] && focusTarget.coords[1]) {
      map.flyTo(focusTarget.coords, focusTarget.zoom || 11, { duration: 1.2 });
    } else if (center && center[0] && center[1]) {
      map.flyTo(center, 10, { duration: 1.2 });
    }
  }, [center, focusTarget, map]);
  return null;
}

// Function to interpolate vessel position based on timelineProgress (0 to 100)
function getInterpolatedVesselPosition(track, progress) {
  if (!track || track.length === 0) return null;
  if (track.length === 1) return track[0];

  const totalSegments = track.length - 1;
  const progressRatio = Math.max(0, Math.min(1, progress / 100));
  const exactIndex = progressRatio * totalSegments;
  const lowerIndex = Math.floor(exactIndex);
  const upperIndex = Math.min(totalSegments, lowerIndex + 1);
  const segmentFraction = exactIndex - lowerIndex;

  const p1 = track[lowerIndex];
  const p2 = track[upperIndex];

  const lat = p1.lat + (p2.lat - p1.lat) * segmentFraction;
  const lng = p1.lng + (p2.lng - p1.lng) * segmentFraction;
  const sog = (p1.sog + (p2.sog - p1.sog) * segmentFraction).toFixed(1);
  const heading = Math.round(p1.heading + (p2.heading - p1.heading) * segmentFraction);

  return { lat, lng, sog, heading, time: p1.time };
}

// Custom DivIcons - Zero Blue/Purple (Uses Red, Amber, Emerald, Zinc)
const createVesselIcon = (vessel, isPrimary, heading) => {
  // Safe color guarantee: replace any blue with emerald or amber
  let color = vessel.color;
  if (!color || color === '#3b82f6' || color.includes('blue')) {
    color = isPrimary ? '#ef4444' : '#A9A9A9';
  }
  const size = isPrimary ? 34 : 26;

  return L.divIcon({
    className: 'custom-vessel-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(${heading || 0}deg);
        filter: drop-shadow(0 0 6px ${color});
        cursor: pointer;
      ">
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" stroke="#09090b" stroke-width="1.5">
          <polygon points="12,2 20,20 12,16 4,20" />
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

const createIncidentHazardIcon = (inc, isFocused, isSelected) => {
  const isCritical = inc.severity === 'Critical' || inc.severity === 'High';
  const color = isCritical ? '#ef4444' : '#5C0A28';
  const scale = isFocused || isSelected ? 'scale(1.2)' : 'scale(1)';

  return L.divIcon({
    className: 'custom-incident-beacon',
    html: `
      <div style="
        position: relative;
        width: 52px;
        height: 52px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: ${scale};
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        cursor: pointer;
      ">
        <div style="
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: ${color};
          opacity: 0.35;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>
        <div style="
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #ffffff;
          border: 2.5px solid ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px ${color}a0, 0 2px 6px rgba(0,0,0,0.18);
          z-index: 2;
        ">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div style="
          position: absolute;
          top: 34px;
          white-space: nowrap;
          background: #18181b;
          color: #ffffff;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: -0.02em;
          padding: 1px 6px;
          border-radius: 4px;
          border: 1px solid ${color};
          box-shadow: 0 3px 8px rgba(0,0,0,0.35);
          pointer-events: none;
          z-index: 3;
        ">
          ${inc.id}
        </div>
      </div>
    `,
    iconSize: [52, 56],
    iconAnchor: [26, 26]
  });
};

const createSourceIcon = () => {
  return L.divIcon({
    className: 'custom-source-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(92, 10, 40, 0.4);
        border: 2px solid #5C0A28;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 14px #5C0A28;
      ">
        <div style="width: 8px; height: 8px; border-radius: 50%; background: #ffffff;"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const LeafletMap = ({ height = '560px' }) => {
  const navigate = useNavigate();
  const {
    activeIncident,
    environmentalData,
    vessels,
    forecast,
    selectedVessel,
    setSelectedVessel,
    timelineProgress,
    incidents,
    selectIncident,
    mapCenterFocus,
    focusedIncidentId,
    setFocusedIncidentId
  } = useIncident();

  // Layer Visibility State
  const [layers, setLayers] = useState({
    slick: true,
    slickBoundary: true,
    allIncidents: true,
    backwardTrajectory: true,
    probableSource: true,
    vesselTracks: true,
    vesselPositions: true,
    forecastPath: true,
    uncertaintyCorridor: true,
  });

  const [showLayerPanel, setShowLayerPanel] = useState(false);

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const centerCoords = activeIncident?.coordinates
    ? [activeIncident.coordinates.lat, activeIncident.coordinates.lng]
    : [18.824, 72.842];

  // Slick polygon coordinates for active incident fallback
  const slickCoords = useMemo(() => {
    return activeIncident?.slickPolygon || [
      [18.852, 72.810],
      [18.848, 72.825],
      [18.835, 72.840],
      [18.818, 72.862],
      [18.802, 72.875],
      [18.808, 72.855],
      [18.825, 72.830],
      [18.840, 72.815]
    ];
  }, [activeIncident]);

  return (
    <div
      style={{ height }}
      className="relative w-full rounded-xl overflow-hidden border border-border bg-card shadow-md"
    >
      <MapContainer
        center={centerCoords}
        zoom={activeIncident ? 10 : 6}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <MapRecenter center={centerCoords} focusTarget={mapCenterFocus} />

        {/* Tactical Light Ocean Base Map (Mapbox if token exists, else CartoDB fallback) */}
        {import.meta.env.VITE_MAPBOX_TOKEN ? (
          <TileLayer
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`}
            maxZoom={18}
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={18}
          />
        )}

        {/* 1. Probable Source Region (Lagrangian Particle Hindcast) */}
        {layers.probableSource && activeIncident?.probableSourceRegion && (
          <>
            <Circle
              center={activeIncident.probableSourceRegion.center}
              radius={activeIncident.probableSourceRegion.radiusMeters || 2400}
              pathOptions={{
                color: '#5C0A28',
                fillColor: '#5C0A28',
                fillOpacity: 0.22,
                weight: 2,
                dashArray: '6, 6'
              }}
            >
              <Tooltip direction="top" permanent={false} opacity={0.9}>
                <div className="font-mono text-xs text-foreground p-1">
                  <strong className="text-burgundy-400 block mb-1">PROBABLE DISCHARGE SOURCE</strong>
                  <div>Release Window: {activeIncident.probableSourceRegion.displayWindow}</div>
                  <div>Source Confidence: {activeIncident.probableSourceRegion.confidence}%</div>
                  <div>Radius: {(activeIncident.probableSourceRegion.radiusMeters / 1000).toFixed(1)} km</div>
                </div>
              </Tooltip>
            </Circle>

            <Marker
              position={activeIncident.probableSourceRegion.center}
              icon={createSourceIcon()}
            >
              <Popup>
                <div className="font-mono text-xs p-1 text-foreground">
                  <h4 className="text-burgundy-400 font-bold mb-1">Reconstructed Discharge Centroid</h4>
                  <div>Coords: {activeIncident.probableSourceRegion.center.join(', ')}</div>
                  <div>Method: {activeIncident.probableSourceRegion.method}</div>
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* 2. Backward Trajectory Line (Hindcast drift vector) */}
        {layers.backwardTrajectory && activeIncident?.backwardTrajectory && (
          <Polyline
            positions={activeIncident.backwardTrajectory}
            pathOptions={{
              color: '#5C0A28',
              weight: 3,
              dashArray: '8, 8',
              opacity: 0.85
            }}
          >
            <Tooltip direction="center">
              <span className="font-mono text-xs text-burgundy-400 font-semibold">
                Backward Drift Trajectory (3.5h Hindcast)
              </span>
            </Tooltip>
          </Polyline>
        )}

        {/* 3. Detected Oil Slicks & Hazard Beacons */}
        {/* Active Incident Primary Slick */}
        {layers.slick && activeIncident && (
          <Polygon
            positions={activeIncident.slickPolygon || slickCoords}
            pathOptions={{
              color: layers.slickBoundary ? '#ef4444' : 'transparent',
              weight: layers.slickBoundary ? 3 : 0,
              fillColor: '#d97706',
              fillOpacity: 0.42
            }}
          >
            <Popup>
              <div className="font-sans text-xs p-1 text-foreground min-w-[240px]">
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-border">
                  <strong className="text-burgundy-600 font-bold text-sm block">
                    {activeIncident.id} - Active Investigation
                  </strong>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-burgundy-100 text-burgundy-800 font-semibold">
                    {activeIncident.severity || 'High'}
                  </span>
                </div>
                <div className="space-y-1 font-mono text-[11px] mt-1.5">
                  <div>Title: <strong>{activeIncident.title}</strong></div>
                  <div>Area: <strong>{activeIncident.spillAreaKm2} km²</strong></div>
                  <div>Confidence: <strong className="text-silver-600">{activeIncident.confidence}%</strong></div>
                  <div>Sensor: <span>{activeIncident.sarSatellite}</span></div>
                  <div>Detected: <span>{activeIncident.displayDate}</span></div>
                </div>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Global/Live Maritime Incident Beacons & Slicks */}
        {layers.allIncidents && incidents?.map((inc) => {
          const isSelected = activeIncident?.id === inc.id;
          const isFocused = focusedIncidentId === inc.id;

          return (
            <React.Fragment key={`incident-layer-${inc.id}`}>
              {/* Slick polygon if not already isolated as active incident */}
              {(!activeIncident || !isSelected) && inc.slickPolygon && (
                <Polygon
                  positions={inc.slickPolygon}
                  pathOptions={{
                    color: isFocused ? '#ef4444' : '#5C0A28',
                    weight: isFocused ? 3 : 2,
                    dashArray: '5, 5',
                    fillColor: isFocused ? '#ef4444' : '#d97706',
                    fillOpacity: isFocused ? 0.45 : 0.3
                  }}
                  eventHandlers={{
                    click: () => {
                      setFocusedIncidentId(inc.id);
                    }
                  }}
                >
                  <Tooltip direction="top" opacity={0.95}>
                    <div className="font-sans text-xs p-1">
                      <strong className="text-red-600 font-bold block">{inc.id}: {inc.title}</strong>
                      <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                        Area: {inc.spillAreaKm2} km² • Conf: {inc.confidence}%
                      </div>
                      <div className="text-burgundy-600 text-[10px] font-semibold mt-1">
                        Click hazard beacon to investigate →
                      </div>
                    </div>
                  </Tooltip>
                </Polygon>
              )}

              {/* Pulsing Hazard Beacon Marker */}
              {inc.coordinates && (
                <Marker
                  position={[inc.coordinates.lat, inc.coordinates.lng]}
                  icon={createIncidentHazardIcon(inc, isFocused, isSelected)}
                  eventHandlers={{
                    click: () => {
                      setFocusedIncidentId(inc.id);
                    }
                  }}
                >
                  <Popup>
                    <div className="font-sans text-xs p-1 text-foreground min-w-[260px]">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-border">
                        <span className="font-mono font-bold text-red-600 text-xs flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          {inc.id}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-700">
                          {inc.severity || 'High'} Severity
                        </span>
                      </div>
                      
                      <h4 className="font-bold text-sm text-foreground mb-1 leading-snug">{inc.title}</h4>
                      <p className="text-[11px] text-muted-foreground mb-2 flex items-center gap-1">
                        <span>📍</span> {inc.locationName}
                      </p>

                      <div className="grid grid-cols-2 gap-1.5 py-1.5 px-2 bg-muted/40 rounded-md font-mono text-[11px] mb-3">
                        <div>Area: <strong className="text-burgundy-600">{inc.spillAreaKm2} km²</strong></div>
                        <div>Confidence: <strong className="text-silver-600">{inc.confidence}%</strong></div>
                        <div>Est. Vol: <strong className="text-burgundy-600">{inc.estimatedVolumeM3 || 380} m³</strong></div>
                        <div>Suspect: <strong className="text-red-600">{inc.primaryCandidate || 'Analyzing'}</strong></div>
                      </div>

                      <button
                        onClick={() => {
                          selectIncident(inc.id);
                          navigate('/overview');
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow"
                      >
                        <span>Select & Launch Investigation</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )}
            </React.Fragment>
          );
        })}

        {/* 4. Forecast Uncertainty Corridor Envelope (Warm Amber-Orange, NO PURPLE) */}
        {layers.uncertaintyCorridor && forecast?.uncertaintyCorridor && (
          <Polygon
            positions={forecast.uncertaintyCorridor}
            pathOptions={{
              color: '#d97706',
              weight: 1.5,
              dashArray: '5, 5',
              fillColor: '#5C0A28',
              fillOpacity: 0.16
            }}
          >
            <Tooltip direction="bottom">
              <span className="font-mono text-xs text-burgundy-300 font-semibold">
                24h Forecast Uncertainty Corridor ({forecast.overallConfidencePercent}% Conf.)
              </span>
            </Tooltip>
          </Polygon>
        )}

        {/* 5. Forecast Center Trajectory Line (Safety Hazard Orange, NO MAGENTA/PURPLE) */}
        {layers.forecastPath && forecast?.forecastPath && (
          <>
            <Polyline
              positions={forecast.forecastPath}
              pathOptions={{
                color: '#f97316',
                weight: 3.5,
                opacity: 0.95
              }}
            />
            {forecast.timeSteps?.map((ts, idx) => (
              <Circle
                key={ts.step}
                center={ts.center}
                radius={ts.corridorRadiusMeters || 1200}
                pathOptions={{
                  color: idx === 0 ? '#5C0A28' : '#f97316',
                  fillColor: idx === 0 ? '#5C0A28' : '#f97316',
                  fillOpacity: 0.35,
                  weight: 1.5
                }}
              >
                <Tooltip direction="right" permanent={false}>
                  <div className="font-mono text-xs text-foreground">
                    <strong className="text-orange-400 block mb-1">FORECAST {ts.step}</strong>
                    <div>Time: {ts.displayTime || ts.step}</div>
                    <div>Predicted Area: {ts.areaKm2} km²</div>
                    {ts.remainingVolumeM3 && <div>Est. Volume: {ts.remainingVolumeM3} m³</div>}
                  </div>
                </Tooltip>
              </Circle>
            ))}
          </>
        )}

        {/* 6. Vessel Tracks (Polylines) */}
        {layers.vesselTracks && vessels?.map((vessel) => {
          if (!vessel.track || vessel.track.length < 2) return null;
          const coords = vessel.track.map(t => [t.lat, t.lng]);
          const isSelected = selectedVessel?.id === vessel.id;
          const isPrimary = vessel.candidateRank === 1;
          const safeColor = isPrimary ? '#ef4444' : (vessel.color && vessel.color !== '#3b82f6' ? vessel.color : '#A9A9A9');

          return (
            <Polyline
              key={`track-${vessel.id}`}
              positions={coords}
              pathOptions={{
                color: safeColor,
                weight: isSelected ? 4 : (isPrimary ? 3 : 2),
                opacity: isSelected ? 1 : 0.65,
                dashArray: isPrimary ? null : '4, 4'
              }}
            >
              <Tooltip direction="top">
                <span className="font-mono text-xs text-foreground">
                  {vessel.name} ({vessel.shipType}) • Track
                </span>
              </Tooltip>
            </Polyline>
          );
        })}

        {/* 7. Vessel Animated Positions (Interpolated by Timeline) */}
        {layers.vesselPositions && vessels?.map((vessel) => {
          const isPrimary = vessel.candidateRank === 1;
          const isSelected = selectedVessel?.id === vessel.id;
          const pos = getInterpolatedVesselPosition(vessel.track, timelineProgress);
          if (!pos) return null;

          return (
            <Marker
              key={`pos-${vessel.id}`}
              position={[pos.lat, pos.lng]}
              icon={createVesselIcon(vessel, isPrimary || isSelected, pos.heading)}
              eventHandlers={{
                click: () => setSelectedVessel(vessel)
              }}
            >
              <Popup>
                <div className="font-mono text-xs min-w-[220px] text-foreground p-1">
                  <div className="flex items-center justify-between mb-1 pb-1 border-b border-border">
                    <strong className={`font-bold ${isPrimary ? 'text-red-700' : 'text-burgundy-400'}`}>
                      {vessel.name}
                    </strong>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent text-secondary-foreground">
                      {vessel.correlationScore}% Score
                    </span>
                  </div>
                  <div>Type: <strong>{vessel.shipType}</strong></div>
                  <div>Speed: <strong>{pos.sog} kn</strong> | Heading: <strong>{pos.heading}°</strong></div>
                  <div>Dist. from Source: <strong>{vessel.distanceFromSourceKm} km</strong></div>
                  <div className="mt-1">
                    Status: <span className={isPrimary ? 'text-red-700 font-semibold' : 'text-muted-foreground'}>{vessel.candidateTag}</span>
                  </div>
                  {vessel.behavioralAnomaly && (
                    <div className="mt-1.5 p-1 rounded bg-red-50 border border-red-200 text-[11px] text-red-800">
                      Anomaly: {vessel.behavioralAnomaly}
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedVessel(vessel)}
                    className="w-full mt-2 py-1 px-2 text-center rounded bg-burgundy-500/15 border border-burgundy-500/30 text-burgundy-400 hover:bg-burgundy-500/25 transition-colors font-sans text-xs font-medium"
                  >
                    Select for Investigation
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Tactical Layer Control Button & Panel */}
      <div className="absolute top-3 right-3 z-[1000]">
        <button
          onClick={() => setShowLayerPanel(!showLayerPanel)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-secondary-foreground hover:text-burgundy-400 hover:border-burgundy-500/50 shadow-md backdrop-blur-md text-xs font-mono font-medium transition-all"
        >
          <Layers size={14} className="text-burgundy-500" />
          <span>LAYERS</span>
        </button>

        {showLayerPanel && (
          <div className="absolute top-10 right-0 w-60 rounded-xl bg-card border border-border p-3 shadow-xl backdrop-blur-lg animate-in fade-in-50 duration-150 text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border text-[11px] font-mono text-muted-foreground">
              <span className="font-semibold text-foreground">TACTICAL OVERLAYS</span>
              <button onClick={() => setShowLayerPanel(false)} className="hover:text-foreground">✕</button>
            </div>

            <div className="space-y-1.5 font-mono text-[11px]">
              <label className="flex items-center justify-between p-1 rounded hover:bg-muted cursor-pointer text-red-500 font-semibold">
                <span>Spill Alert Hotspots</span>
                <input type="checkbox" checked={layers.allIncidents} onChange={() => toggleLayer('allIncidents')} className="accent-red-500" />
              </label>
              <label className="flex items-center justify-between p-1 rounded hover:bg-muted cursor-pointer text-burgundy-400">
                <span>Detected Oil Slick</span>
                <input type="checkbox" checked={layers.slick} onChange={() => toggleLayer('slick')} className="accent-burgundy-500" />
              </label>
              <label className="flex items-center justify-between p-1 rounded hover:bg-muted cursor-pointer text-burgundy-500">
                <span>Probable Source Region</span>
                <input type="checkbox" checked={layers.probableSource} onChange={() => toggleLayer('probableSource')} className="accent-burgundy-500" />
              </label>
              <label className="flex items-center justify-between p-1 rounded hover:bg-muted cursor-pointer text-burgundy-300">
                <span>Backward Hindcast Path</span>
                <input type="checkbox" checked={layers.backwardTrajectory} onChange={() => toggleLayer('backwardTrajectory')} className="accent-burgundy-500" />
              </label>
              <label className="flex items-center justify-between p-1 rounded hover:bg-muted cursor-pointer text-red-700">
                <span>Candidate Vessels</span>
                <input type="checkbox" checked={layers.vesselPositions} onChange={() => toggleLayer('vesselPositions')} className="accent-red-500" />
              </label>
              <label className="flex items-center justify-between p-1 rounded hover:bg-muted cursor-pointer text-silver-400">
                <span>Vessel AIS Tracks</span>
                <input type="checkbox" checked={layers.vesselTracks} onChange={() => toggleLayer('vesselTracks')} className="accent-silver-500" />
              </label>
              <label className="flex items-center justify-between p-1 rounded hover:bg-muted cursor-pointer text-orange-400">
                <span>Forecast Path (+24h)</span>
                <input type="checkbox" checked={layers.forecastPath} onChange={() => toggleLayer('forecastPath')} className="accent-orange-500" />
              </label>
              <label className="flex items-center justify-between p-1 rounded hover:bg-muted cursor-pointer text-burgundy-400">
                <span>Uncertainty Corridor</span>
                <input type="checkbox" checked={layers.uncertaintyCorridor} onChange={() => toggleLayer('uncertaintyCorridor')} className="accent-burgundy-500" />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Floating Tactical MetOcean Telemetry HUD (Zero Blue/Purple) */}
      {environmentalData && (
        <div className="absolute bottom-3 left-3 z-[1000] hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-card border border-border backdrop-blur-md shadow-md text-xs font-mono">
          <div className="flex items-center gap-1.5 text-burgundy-400">
            <Wind size={13} />
            <span>WIND: {environmentalData.wind?.speedKmh} km/h {environmentalData.wind?.directionText}</span>
          </div>
          <div className="h-3 w-px bg-border/80" />
          <div className="flex items-center gap-1.5 text-silver-400">
            <Compass size={13} />
            <span>CURRENT: {environmentalData.oceanCurrent?.speedMs} m/s {environmentalData.oceanCurrent?.directionText}</span>
          </div>
          <div className="h-3 w-px bg-border/80" />
          <div className="text-secondary-foreground">
            <span>SST: <strong className="text-burgundy-300">{environmentalData.seaTemperatureCelsius}°C</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
