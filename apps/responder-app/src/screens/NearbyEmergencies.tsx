import React from 'react';
import { IncidentRecord } from '@resq/types';
import { Button } from '@resq/ui';

export interface NearbyEmergenciesProps {
  incidents: IncidentRecord[];
  onAccept: (incident: IncidentRecord) => void;
}

export const NearbyEmergencies: React.FC<NearbyEmergenciesProps> = ({ incidents, onAccept }) => {
  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
            ● Status: Available
          </span>
          <h2 className="font-extrabold text-sm text-slate-100">Verified First Responder</h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-300 block">Radius: 2.0 km</span>
          <span className="text-[10px] text-slate-400">GPS Active</span>
        </div>
      </div>

      <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
        🚨 Nearby Emergency Calls ({incidents.length})
      </h3>

      {incidents.length === 0 ? (
        <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-8 text-center text-slate-500">
          <p className="text-sm font-semibold">No emergencies nearby</p>
          <p className="text-xs mt-1">Standing by for nearby dispatch alerts</p>
        </div>
      ) : (
        incidents.map((inc) => (
          <div
            key={inc.incidentId}
            className="bg-slate-800 border-2 border-red-500/80 rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-red-500 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded tracking-wide">
                  CRITICAL • 420m away
                </span>
                <h4 className="font-extrabold text-base text-slate-100 mt-2 capitalize">
                  {inc.emergencyType.replace(/_/g, ' ')}
                </h4>
              </div>
              <span className="text-xs font-bold text-slate-300 bg-slate-900 px-2 py-1 rounded">
                ETA 3 min
              </span>
            </div>

            <p className="text-xs text-slate-300">📍 {inc.locationText}</p>

            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-400 space-y-1">
              <div>Skills Needed: <span className="text-slate-200 font-bold">{inc.requiredSkills.join(', ') || 'CPR, First Aid'}</span></div>
              <div>Patient State: <span className="text-slate-200 font-semibold">{inc.patientState || 'Unresponsive'}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => onAccept(inc)}
                className="w-full bg-[#E63946] text-white font-extrabold text-sm py-3 rounded-xl shadow-lg hover:bg-[#D62828] active:scale-95 transition-transform"
              >
                ACCEPT
              </button>
              <button className="w-full bg-slate-700 text-slate-300 font-bold text-sm py-3 rounded-xl hover:bg-slate-600 transition-colors">
                DECLINE
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
