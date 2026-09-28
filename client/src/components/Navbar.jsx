import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Radio,
  Map as MapIcon,
  Ship,
  Compass,
  FileCheck2,
  History,
  Bot,
  AlertTriangle,
  ChevronDown,
  Activity,
  Flame,
  ShieldAlert,
  Bell,
  ArrowRight
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const analysisItems = [
  { to: '/incident', label: 'SAR Detection', icon: Radio },
  { to: '/vessels', label: 'Vessel Attribution', icon: Ship },
  { to: '/forecast', label: 'Drift Forecast', icon: Compass },
  { to: '/history', label: 'Historical Intel', icon: History },
];

const reportItems = [
  { to: '/report', label: 'Evidence Dossier', icon: FileCheck2 },
];

const DropdownMenu = ({ label, items, activeIcon: ActiveIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 px-2 sm:px-4 py-1 sm:py-2.5 rounded-lg text-[10px] sm:text-sm font-medium transition-all text-secondary-foreground hover:bg-secondary shrink-0">
        <div className="flex items-center">
          {ActiveIcon && <ActiveIcon size={14} className="sm:w-4 sm:h-4" />}
          <ChevronDown size={10} className="opacity-70 ml-0.5 sm:ml-1 sm:w-3.5 sm:h-3.5" />
        </div>
        <span className="leading-tight">{label}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-card border border-border shadow-lg overflow-hidden py-1 z-50">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-burgundy-50 text-burgundy-700 font-semibold'
                      : 'text-foreground hover:bg-muted'
                  }`
                }
              >
                <Icon size={16} className="opacity-70" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { incidents, activeIncidentId, selectIncident, activeIncident, setIsChatOpen, isChatOpen } = useIncident();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-xl transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          
          <div className="flex items-center justify-between w-full lg:w-auto">
            {/* ── Brand Logo ── */}
            <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => navigate('/')}>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-burgundy-100 border border-burgundy-200 flex items-center justify-center text-burgundy-600 shadow-sm">
                <Flame size={20} className="animate-pulse sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-bold text-base sm:text-lg tracking-tight text-foreground font-mono">
                    CODEMONS
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs font-mono text-muted-foreground tracking-wider uppercase font-medium mt-0 sm:mt-0.5 whitespace-nowrap">
                  Autonomous Surveillance
                </p>
              </div>
            </div>

            {/* ── Right Quick Actions (Mobile Top, Desktop Right) ── */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0 lg:hidden">
              <div className="flex items-center">
                <div className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 py-1.5 transition-all shadow-sm border ${
                  !activeIncident
                    ? 'bg-burgundy-50 border-burgundy-400 text-burgundy-900 shadow-burgundy-500/10'
                    : 'bg-card border-border hover:border-burgundy-300 text-foreground'
                }`}>
                  <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0 ${!activeIncident ? 'bg-burgundy-500 animate-ping' : 'bg-red-500 animate-pulse'}`} />
                  <select
                    value={activeIncidentId || ""}
                    onChange={(e) => {
                      selectIncident(e.target.value);
                      if (e.target.value) navigate('/overview');
                    }}
                    className="bg-transparent text-[10px] sm:text-sm font-semibold text-foreground cursor-pointer outline-none max-w-[90px] sm:max-w-[210px] truncate pr-1 appearance-none font-mono"
                  >
                    <option value="" disabled>Select Incident...</option>
                    {incidents.map((inc) => (
                      <option key={inc.id} value={inc.id} className="text-foreground bg-card py-1">
                        {inc.id}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="text-muted-foreground shrink-0 pointer-events-none" />
                </div>
              </div>
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-secondary-foreground hover:bg-secondary transition-colors"
                >
                  <Bell size={18} />
                  {activeIncident && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />}
                  {activeIncident && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />}
                </button>
              </div>
            </div>
          </div>

          {/* ── Main Navigation Links (Responsive Flex Wrap) ── */}
          <nav className="flex items-center justify-between gap-1 w-full lg:w-auto lg:flex-1 lg:justify-center px-1">
            <NavLink
              to="/"
              onClick={() => selectIncident("")}
              className={({ isActive }) =>
                `flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-1 sm:px-3.5 py-1 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium transition-all shrink-0 ${
                  isActive && !activeIncident
                    ? 'bg-silver-50 text-silver-700 font-semibold shadow-sm border border-silver-200'
                    : 'text-secondary-foreground hover:bg-secondary'
                }`
              }
            >
              <MapIcon size={14} className="sm:w-4 sm:h-4" />
              <span className="leading-tight">Live Traffic</span>
            </NavLink>

            <NavLink
              to="/overview"
              className={({ isActive }) =>
                `flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-1 sm:px-3.5 py-1 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm border border-primary/20'
                    : 'text-secondary-foreground hover:bg-secondary'
                }`
              }
            >
              <LayoutDashboard size={14} className="sm:w-4 sm:h-4" />
              <span className="leading-tight">Overview</span>
            </NavLink>

            <NavLink
              to="/map"
              className={({ isActive }) =>
                `flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-1 sm:px-3.5 py-1 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm border border-primary/20'
                    : 'text-secondary-foreground hover:bg-secondary'
                }`
              }
            >
              <MapIcon size={14} className="sm:w-4 sm:h-4" />
              <span className="leading-tight text-center">Tactical Map</span>
            </NavLink>

            <div className="shrink-0"><DropdownMenu label="Analysis" items={analysisItems} activeIcon={Activity} /></div>
            <div className="shrink-0"><DropdownMenu label="Reports" items={reportItems} activeIcon={FileCheck2} /></div>
          </nav>

          {/* ── Right Quick Actions (Desktop only, duplicated logic) ── */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {/* Active Incident Dropdown Selector */}
            <div className="flex items-center">
              <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all shadow-sm border ${
                !activeIncident
                  ? 'bg-burgundy-50 border-burgundy-400 text-burgundy-900 shadow-burgundy-500/10'
                  : 'bg-card border-border hover:border-burgundy-300 text-foreground'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${!activeIncident ? 'bg-burgundy-500 animate-ping' : 'bg-red-500 animate-pulse'}`} />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground hidden sm:inline">
                  Incident:
                </span>
                <select
                  value={activeIncidentId || ""}
                  onChange={(e) => {
                    selectIncident(e.target.value);
                    if (e.target.value) navigate('/overview');
                  }}
                  className="bg-transparent text-sm font-semibold text-foreground cursor-pointer outline-none max-w-[210px] truncate pr-2 appearance-none font-mono"
                >
                  <option value="" disabled>
                    ⚠️ Select Incident ({incidents.length} Alerts)...
                  </option>
                  {incidents.map((inc) => (
                    <option key={inc.id} value={inc.id} className="text-foreground bg-card py-1">
                      {inc.id} — {inc.title.split(' ')[0]} ({inc.spillAreaKm2} km²)
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-muted-foreground shrink-0 pointer-events-none" />
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-lg text-secondary-foreground hover:bg-secondary transition-colors"
              >
                <Bell size={20} />
                {activeIncident && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />}
                {activeIncident && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />}
              </button>
              
              {showNotifications && (
                <div className="absolute top-full right-0 mt-3 w-80 rounded-xl bg-card border border-border shadow-xl overflow-hidden z-50">
                  <div className="p-4 border-b border-border bg-muted/30">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto p-2">
                    {activeIncident ? (
                      <div className="p-3 mb-2 rounded-lg bg-red-50 border border-red-100 flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <AlertTriangle size={18} className="text-red-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-semibold text-red-900 leading-tight">Critical Spill Alert</h4>
                            <p className="text-xs text-red-700 mt-1 font-medium">{activeIncident.title}</p>
                            <div className="mt-2 text-xs text-red-800 flex flex-col gap-1">
                              <span>Area: {activeIncident.spillAreaKm2} km²</span>
                              <span>Confidence: {activeIncident.confidence}%</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full text-xs font-semibold bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => {
                            setShowNotifications(false);
                            navigate('/incident');
                          }}
                        >
                          Investigate <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-sm text-muted-foreground">
                        No new notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
