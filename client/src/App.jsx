import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { IncidentProvider } from './context/IncidentContext';
import Navbar from './components/Navbar';
import AlertBanner from './components/AlertBanner';
import ChatbotModal from './components/ChatbotModal';

// Pages
import DashboardPage from './pages/DashboardPage';
import LiveTrafficPage from './pages/LiveTrafficPage';
import IncidentDetailsPage from './pages/IncidentDetailsPage';
import InteractiveMapPage from './pages/InteractiveMapPage';
import VesselAnalysisPage from './pages/VesselAnalysisPage';
import HistoricalIntelligencePage from './pages/HistoricalIntelligencePage';
import ForecastPage from './pages/ForecastPage';
import EvidenceReportPage from './pages/EvidenceReportPage';

import { useIncident } from './context/IncidentContext';

function AppLayout() {
  const { isChatOpen } = useIncident();
  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-burgundy-500/30 selection:text-burgundy-200 transition-all duration-300 ${isChatOpen ? 'lg:pr-[400px]' : ''}`}>
      {/* Spacious Top Command Navbar */}
      <Navbar />

      {/* Main Application Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 transition-all">
        <Routes>
          <Route path="/" element={<LiveTrafficPage />} />
          <Route path="/overview" element={<DashboardPage />} />
          <Route path="/incident" element={<IncidentDetailsPage />} />
          <Route path="/map" element={<InteractiveMapPage />} />
          <Route path="/vessels" element={<VesselAnalysisPage />} />
          <Route path="/history" element={<HistoricalIntelligencePage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/report" element={<EvidenceReportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Floating AI Intelligence Assistant */}
      <ChatbotModal />
    </div>
  );
}

function App() {
  return (
    <IncidentProvider>
      <Router>
        <AppLayout />
      </Router>
    </IncidentProvider>
  );
}

export default App;
