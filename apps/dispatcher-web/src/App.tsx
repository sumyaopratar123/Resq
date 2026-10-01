import React, { useState, useEffect } from 'react';
import { ResQLogo, Button } from '@resq/ui';
import { IncidentRecord, TranscriptSegment } from '@resq/types';
import { LiveMap } from './components/LiveMap';
import { CallPanel } from './components/CallPanel';

export default function App() {
  const [incidents, setIncidents] = useState<IncidentRecord[]>([
    {
      incidentId: 'inc-001',
      callId: 'call-991',
      status: 'DISPATCHING',
      emergencyType: 'road_accident',
      severity: 'critical',
      patientState: 'unresponsive',
      bleeding: true,
      locationText: 'College Main Gate, Station Road',
      coordinates: { lat: 18.5204, lng: 73.8567 },
      locationConfidence: 0.91,
      requiredSkills: ['trauma', 'first_aid', 'cpr'],
      assignedResponders: [],
      dispatchedAmbulance: true,
      searchRadiusMeters: 1000,
      createdAt: Date.now() - 120000,
      updatedAt: Date.now()
    },
    {
      incidentId: 'inc-002',
      callId: 'call-992',
      status: 'RESPONDER_EN_ROUTE',
      emergencyType: 'cardiac_emergency',
      severity: 'critical',
      patientState: 'chest pain',
      bleeding: false,
      locationText: 'Building B, Central Park Avenue',
      coordinates: { lat: 18.5240, lng: 73.8580 },
      locationConfidence: 0.98,
      requiredSkills: ['cpr', 'aed'],
      assignedResponders: ['res-881'],
      dispatchedAmbulance: true,
      searchRadiusMeters: 500,
      createdAt: Date.now() - 300000,
      updatedAt: Date.now()
    }
  ]);

  const [selectedId, setSelectedId] = useState<string>('inc-001');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedIncident = incidents.find((i) => i.incidentId === selectedId) || null;

  const handleSimulateCall = async () => {
    try {
      const resp = await fetch('http://localhost:8000/api/v1/calls/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callerPhone: '+18005550199',
          transcriptText: 'Emergency! Road trauma near college main gate. Patient bleeding!'
        })
      });
      const data = await resp.json();
      if (data.proposedIncident) {
        const newInc: IncidentRecord = {
          incidentId: `inc-${Date.now().toString().slice(-4)}`,
          status: data.proposedIncident.status,
          emergencyType: data.proposedIncident.emergencyType,
          severity: data.proposedIncident.severity,
          locationText: data.proposedIncident.locationText,
          coordinates: data.proposedIncident.coordinates,
          locationConfidence: data.proposedIncident.locationConfidence,
          requiredSkills: data.proposedIncident.requiredSkills,
          assignedResponders: [],
          dispatchedAmbulance: false,
          searchRadiusMeters: 500,
          createdAt: Date.now(),
          updatedAt: Date.now()
        };
        setIncidents((prev) => [newInc, ...prev]);
        setSelectedId(newInc.incidentId);
      }
    } catch (e) {
      console.warn('Backend service offline, adding client mock incident:', e);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0a0e17] text-white overflow-hidden font-sans">
      {/* Top Operations Navigation Bar */}
      <header className="h-16 border-b border-[#1f2937] bg-[#111827] px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <ResQLogo size="md" />
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white">LIVE OPERATIONS</span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">System Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Live Metrics */}
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Active Incidents:</span>
              <span className="font-bold text-white">{incidents.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Responders:</span>
              <span className="font-bold text-white">18</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Ambulances:</span>
              <span className="font-bold text-white">6</span>
            </div>
          </div>

          {/* Simulate Call Button */}
          <Button size="sm" variant="danger" onClick={handleSimulateCall}>
            + Simulate Incoming Call
          </Button>

          {/* Time */}
          <div className="text-xs font-mono text-slate-400 bg-[#1f2937] px-3 py-1.5 rounded">
            {formatTime(currentTime)}
          </div>
        </div>
      </header>

      {/* Main 3-Column Desktop Command Center */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Live Emergency Calls Queue */}
        <aside className="w-80 border-r border-[#1f2937] bg-[#111827]/50 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Incident Queue
            </h2>
            <span className="text-xs font-bold text-white bg-[#1f2937] px-2 py-1 rounded">
              {incidents.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {incidents.map((inc) => (
              <div
                key={inc.incidentId}
                onClick={() => setSelectedId(inc.incidentId)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  inc.incidentId === selectedId
                    ? 'border-red-500/50 bg-red-500/10'
                    : 'border-[#1f2937] bg-[#111827] hover:border-[#374151]'
                }`}
              >
                {/* Severity Indicator */}
                <div className="flex items-center gap-2 mb-2">
                  {inc.severity === 'critical' && (
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    inc.severity === 'critical' ? 'text-red-400' :
                    inc.severity === 'high' ? 'text-amber-400' :
                    'text-slate-400'
                  }`}>
                    {inc.severity}
                  </span>
                </div>

                {/* Incident Type */}
                <h4 className="text-sm font-bold text-white capitalize mb-1">
                  {inc.emergencyType.replace(/_/g, ' ')}
                </h4>

                {/* Location */}
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  📍 {inc.locationText}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-[#1f2937]">
                  <span className="text-[10px] text-slate-500">
                    {new Date(inc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                    inc.status === 'DISPATCHING' ? 'text-blue-400' :
                    inc.status === 'RESPONDER_EN_ROUTE' ? 'text-emerald-400' :
                    'text-slate-400'
                  }`}>
                    {inc.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Column: Live GIS Map View */}
        <main className="flex-1 p-4 bg-[#0a0e17] flex flex-col">
          <LiveMap activeIncident={selectedIncident} />
        </main>

        {/* Right Column: Call Intelligence & Dispatch Control Panel */}
        <aside className="w-96 border-l border-[#1f2937] bg-[#111827]/50 p-4 flex flex-col">
          <CallPanel
            activeIncident={selectedIncident}
            onDispatch={(id) => console.log('Dispatching incident', id)}
          />
        </aside>
      </div>

      {/* Bottom Response Timeline Panel */}
      <div className="h-32 border-t border-[#1f2937] bg-[#111827] px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Live Response Timeline
          </h3>
          <span className="text-[10px] text-slate-500">Real-time updates</span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {selectedIncident && [
            { time: formatTime(new Date(selectedIncident.createdAt)), event: 'Emergency call received' },
            { time: formatTime(new Date(selectedIncident.createdAt + 3000)), event: 'Speech converted to text' },
            { time: formatTime(new Date(selectedIncident.createdAt + 5000)), event: 'AI classified incident' },
            { time: formatTime(new Date(selectedIncident.createdAt + 7000)), event: 'Location verified' },
            { time: formatTime(new Date(selectedIncident.createdAt + 10000)), event: '3 responders notified' },
            { time: formatTime(new Date(selectedIncident.createdAt + 15000)), event: 'Responder accepted' },
            { time: formatTime(new Date(selectedIncident.createdAt + 20000)), event: 'Ambulance dispatched' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-[#1f2937] px-4 py-2 rounded-lg border border-[#374151] whitespace-nowrap">
              <span className="text-xs font-mono text-slate-400">{item.time}</span>
              <span className="text-xs text-slate-300">{item.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
