import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchIncidents,
  fetchIncidentDetails,
  fetchEnvironmentalData,
  fetchVesselsData,
  fetchVesselHistory,
  fetchForecastData,
  fetchEvidenceData
} from '../services/api';
import {
  mockIncidents,
  mockEnvironmental,
  mockVessels,
  mockForecasts,
  mockEvidence,
  mockHistory
} from '../data/mockData';

const IncidentContext = createContext(null);

export const IncidentProvider = ({ children }) => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [activeIncidentId, setActiveIncidentId] = useState('');
  const [activeIncident, setActiveIncident] = useState(null);
  const [environmentalData, setEnvironmentalData] = useState(null);
  const [vessels, setVessels] = useState(mockVessels['ALL_SHIPS'] || []); // Fallback to empty if not mapped, but we can set it to all known vessels
  const [vesselHistory, setVesselHistory] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [selectedVessel, setSelectedVessel] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulation states
  const [detectionState, setDetectionState] = useState('COMPLETED'); // IDLE | PROCESSING | COMPLETED
  const [hindcastState, setHindcastState] = useState('COMPLETED'); // IDLE | PROCESSING | COMPLETED

  // Timeline playback state (0 to 100 representing 10:00 UTC to 16:00 UTC + forecast horizon)
  const [timelineProgress, setTimelineProgress] = useState(70); // 70 is detection time ~14:32 UTC
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Chat drawer state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [pendingChatQuery, setPendingChatQuery] = useState(null);

  // Focus and map recentering states
  const [mapCenterFocus, setMapCenterFocus] = useState(null);
  const [focusedIncidentId, setFocusedIncidentId] = useState(null);

  // Load initial incidents list from backend if running
  useEffect(() => {
    const loadAll = async () => {
      try {
        const list = await fetchIncidents();
        if (list && list.length > 0) {
          setIncidents(list);
        }
      } catch (err) {
        console.warn('Backend server offline, using embedded intelligence data.');
      }
    };
    loadAll();
  }, []);

  // Load incident-specific data when activeIncidentId changes
  useEffect(() => {
    if (!activeIncidentId) {
      const allVessels = [];
      Object.values(mockVessels).forEach(vList => {
        vList.forEach(v => {
          if (!allVessels.find(existing => existing.id === v.id)) {
            allVessels.push(v);
          }
        });
      });
      setVessels(allVessels);
      return;
    }

    const loadIncidentData = async () => {
      try {
        setError(null);
        
        const [inc, env, vList, hist, fc, ev] = await Promise.all([
          fetchIncidentDetails(activeIncidentId),
          fetchEnvironmentalData(activeIncidentId),
          fetchVesselsData(activeIncidentId),
          fetchVesselHistory(activeIncidentId),
          fetchForecastData(activeIncidentId),
          fetchEvidenceData(activeIncidentId)
        ]);

        if (inc) setActiveIncident(inc);
        setEnvironmentalData(env || mockEnvironmental[activeIncidentId] || mockEnvironmental["INC-2026-001"]);
        const list = (vList && vList.length > 0) ? vList : (mockVessels[activeIncidentId] || mockVessels["INC-2026-001"] || []);
        setVessels(list);
        if (list.length > 0) setSelectedVessel(list[0]);
        if (hist) setVesselHistory(hist);
        setForecast(fc || mockForecasts[activeIncidentId] || mockForecasts["INC-2026-001"]);
        setEvidence(ev || mockEvidence[activeIncidentId] || mockEvidence["INC-2026-001"]);
      } catch (err) {
        console.warn(`Error updating incident data for ${activeIncidentId}, using cached telemetry.`);
      }
    };

    loadIncidentData();
  }, [activeIncidentId]);

  // Timeline playback interval loop
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimelineProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return Math.min(100, prev + 0.5 * playbackSpeed);
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed]);

  const selectIncident = (id) => {
    setActiveIncidentId(id);
    if (!id) {
      setActiveIncident(null);
      setEnvironmentalData(null);
      // Create a unified list of vessels for the live traffic view
      const allVessels = [];
      Object.values(mockVessels).forEach(vList => {
        vList.forEach(v => {
          if (!allVessels.find(existing => existing.id === v.id)) {
            allVessels.push(v);
          }
        });
      });
      setVessels(allVessels);
      setSelectedVessel(null);
      setForecast(null);
      setEvidence(null);
      setTimelineProgress(70);
      setIsPlaying(false);
      return;
    }

    const inc = incidents.find(i => i.id === id) || mockIncidents.find(i => i.id === id);
    if (inc) {
      setActiveIncident(inc);
      setFocusedIncidentId(inc.id);
    }
    setEnvironmentalData(mockEnvironmental[id] || mockEnvironmental["INC-2026-001"]);
    const vList = mockVessels[id] || mockVessels["INC-2026-001"] || [];
    setVessels(vList);
    if (vList.length > 0) {
      setSelectedVessel(vList[0]);
    }
    setForecast(mockForecasts[id] || mockForecasts["INC-2026-001"]);
    setEvidence(mockEvidence[id] || mockEvidence["INC-2026-001"]);

    setTimelineProgress(70);
    setIsPlaying(false);
    setDetectionState('COMPLETED');
    setHindcastState('COMPLETED');
  };

  const focusMapLocation = (coords, zoom = 10) => {
    if (coords && coords[0] && coords[1]) {
      setMapCenterFocus({ coords, zoom, timestamp: Date.now() });
    }
  };

  const triggerChatWithQuestion = (question) => {
    setPendingChatQuery(question);
    setIsChatOpen(true);
  };

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        activeIncidentId,
        selectIncident,
        activeIncident,
        environmentalData,
        vessels,
        vesselHistory,
        forecast,
        evidence,
        selectedVessel,
        setSelectedVessel,
        loading,
        error,
        detectionState,
        setDetectionState,
        hindcastState,
        setHindcastState,
        timelineProgress,
        setTimelineProgress,
        isPlaying,
        setIsPlaying,
        playbackSpeed,
        setPlaybackSpeed,
        isChatOpen,
        setIsChatOpen,
        pendingChatQuery,
        setPendingChatQuery,
        triggerChatWithQuestion,
        mapCenterFocus,
        setMapCenterFocus,
        focusMapLocation,
        focusedIncidentId,
        setFocusedIncidentId
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncident = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncident must be used within an IncidentProvider');
  }
  return context;
};
