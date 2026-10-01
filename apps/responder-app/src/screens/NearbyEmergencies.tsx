import React from 'react';
import { IncidentRecord } from '@resq/types';

export interface NearbyEmergenciesProps {
  incidents: IncidentRecord[];
  onAccept: (incident: IncidentRecord) => void;
}

export const NearbyEmergencies: React.FC<NearbyEmergenciesProps> = ({ incidents, onAccept }) => {
  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Responder Status Card */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Verified First Responder</p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Available</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">2.0 km</p>
            <p className="text-[10px] text-slate-400">Search Radius</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 pt-2 border-t border-[#1f2937] text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>GPS Active</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⚡</span>
            <span>Real-time Sync</span>
          </div>
        </div>
      </div>

      {/* Incident Queue Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Nearby Emergency Calls
        </h3>
        <span className="text-xs font-bold text-slate-300 bg-[#1f2937] px-2 py-1 rounded">
          {incidents.length}
        </span>
      </div>

      {/* Incident Cards */}
      {incidents.length === 0 ? (
        <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-8 text-center space-y-2">
          <span className="text-4xl">🎯</span>
          <p className="text-sm font-semibold text-slate-300">No emergencies nearby</p>
          <p className="text-xs text-slate-500">Standing by for nearby dispatch alerts</p>
        </div>
      ) : (
        incidents.map((inc) => (
          <div
            key={inc.incidentId}
            className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 hover:border-red-500/50 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    inc.severity === 'critical' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {inc.severity}
                  </span>
                  <span className="text-[10px] text-slate-400">420m away</span>
                </div>
                <h4 className="text-base font-bold text-white capitalize">
                  {inc.emergencyType.replace(/_/g, ' ')}
                </h4>
              </div>
              <div className="bg-[#1f2937] px-3 py-2 rounded-lg text-center">
                <p className="text-lg font-bold text-white">3</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">min ETA</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 text-sm text-slate-300">
              <span className="mt-0.5">📍</span>
              <p>{inc.locationText}</p>
            </div>

            {/* Required Skills */}
            <div className="bg-[#1f2937] p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Skills Required</span>
                <span className="font-semibold text-white">
                  {inc.requiredSkills.join(', ') || 'CPR, First Aid'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Patient Status</span>
                <span className="font-semibold text-white">
                  {inc.patientState || 'Unresponsive'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => onAccept(inc)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>ACCEPT</span>
              </button>
              <button className="bg-[#1f2937] hover:bg-[#374151] text-slate-300 font-semibold py-3 rounded-lg transition-colors">
                DECLINE
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
