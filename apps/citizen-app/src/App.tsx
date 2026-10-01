import React, { useState } from 'react';
import { ResQLogo, SOSButton, StatusBadge } from '@resq/ui';

export default function App() {
  const [activeIncident, setActiveIncident] = useState<any>(null);

  const handleTriggerSOS = () => {
    setActiveIncident({
      incidentId: 'inc-sos-882',
      status: 'DISPATCHING',
      emergencyType: 'road_accident',
      locationText: 'Current GPS Location (Confirmed)',
      createdAt: Date.now()
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto font-sans">
      <header className="flex items-center justify-between py-2 border-b border-slate-800">
        <ResQLogo size="sm" />
        <span className="text-[10px] font-extrabold bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded">
          CITIZEN SOS CHANNEL
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center space-y-6">
        {!activeIncident ? (
          <>
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-black text-slate-100">Emergency Assistance</h1>
              <p className="text-xs text-slate-400">Tap below or dial emergency services directly</p>
            </div>

            <SOSButton onTrigger={handleTriggerSOS} />

            <div className="text-center text-xs text-slate-500 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              📞 Preferred: Phone call to 911 / 112 triggers immediate Whisper call intelligence.
            </div>
          </>
        ) : (
          <div className="w-full bg-slate-800 border-2 border-red-500 p-5 rounded-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mx-auto animate-bounce">
              🚨
            </div>
            <div>
              <StatusBadge status={activeIncident.status} size="md" />
              <h3 className="font-extrabold text-base text-slate-100 mt-2">Emergency Response Dispatched</h3>
              <p className="text-xs text-slate-300 mt-1">📍 {activeIncident.locationText}</p>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg text-xs text-slate-400 text-left space-y-1">
              <div>Responder Matching: <span className="text-emerald-400 font-bold">Scanning 500m radius</span></div>
              <div>Ambulance Dispatch: <span className="text-blue-400 font-bold">Connecting</span></div>
            </div>

            <button
              onClick={() => setActiveIncident(null)}
              className="w-full bg-slate-700 text-xs font-bold py-2 rounded-lg text-slate-300"
            >
              Cancel SOS
            </button>
          </div>
        )}
      </main>

      <footer className="text-center text-[11px] text-slate-500 py-2 border-t border-slate-800">
        resQ Security Protocol • End-to-End Realtime Encryption
      </footer>
    </div>
  );
}
