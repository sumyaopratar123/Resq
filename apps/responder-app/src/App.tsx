import React, { useState } from 'react';
import { ResQLogo } from '@resq/ui';
import { IncidentRecord, IncidentStatus } from '@resq/types';
import { NearbyEmergencies } from './screens/NearbyEmergencies';
import { ActiveIncident } from './screens/ActiveIncident';
import { FirstAidGuidance } from './screens/FirstAidGuidance';
import { Rewards } from './screens/Rewards';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'nearby' | 'active' | 'guidance' | 'rewards'>('nearby');
  const [activeIncident, setActiveIncident] = useState<IncidentRecord | null>(null);

  const [sampleEmergencies] = useState<IncidentRecord[]>([
    {
      incidentId: 'inc-001',
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
      searchRadiusMeters: 500,
      createdAt: Date.now() - 60000,
      updatedAt: Date.now()
    }
  ]);

  const handleAcceptIncident = (inc: IncidentRecord) => {
    const acceptedInc: IncidentRecord = {
      ...inc,
      status: 'RESPONDER_ASSIGNED',
      assignedResponders: ['res-self']
    };
    setActiveIncident(acceptedInc);
    setCurrentTab('active');
  };

  const handleUpdateStatus = (newStatus: IncidentStatus) => {
    if (activeIncident) {
      setActiveIncident({ ...activeIncident, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between font-sans max-w-md mx-auto border-x border-slate-800">
      {/* Top Mobile Bar */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between sticky top-0 z-50">
        <ResQLogo size="sm" />
        <span className="text-[10px] font-extrabold bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded">
          RESPONDER MOBILE
        </span>
      </header>

      {/* Screen Views */}
      <main className="flex-1 pb-20 pt-2">
        {currentTab === 'nearby' && (
          <NearbyEmergencies
            incidents={sampleEmergencies}
            onAccept={handleAcceptIncident}
          />
        )}

        {currentTab === 'active' && activeIncident && (
          <ActiveIncident
            incident={activeIncident}
            onUpdateStatus={handleUpdateStatus}
            onOpenGuidance={() => setCurrentTab('guidance')}
          />
        )}

        {currentTab === 'guidance' && (
          <FirstAidGuidance onBack={() => setCurrentTab('active')} />
        )}

        {currentTab === 'rewards' && <Rewards />}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-16 bg-slate-950 border-t border-slate-800 grid grid-cols-3 fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 text-xs">
        <button
          onClick={() => setCurrentTab('nearby')}
          className={`flex flex-col items-center justify-center font-bold ${
            currentTab === 'nearby' ? 'text-[#E63946]' : 'text-slate-400'
          }`}
        >
          <span>🚨</span>
          <span className="text-[10px]">Nearby</span>
        </button>

        <button
          onClick={() => setCurrentTab('active')}
          disabled={!activeIncident}
          className={`flex flex-col items-center justify-center font-bold ${
            currentTab === 'active' || currentTab === 'guidance'
              ? 'text-[#E63946]'
              : 'text-slate-400 opacity-50'
          }`}
        >
          <span>📍</span>
          <span className="text-[10px]">Active</span>
        </button>

        <button
          onClick={() => setCurrentTab('rewards')}
          className={`flex flex-col items-center justify-center font-bold ${
            currentTab === 'rewards' ? 'text-[#E63946]' : 'text-slate-400'
          }`}
        >
          <span>🏆</span>
          <span className="text-[10px]">Rewards</span>
        </button>
      </nav>
    </div>
  );
}
