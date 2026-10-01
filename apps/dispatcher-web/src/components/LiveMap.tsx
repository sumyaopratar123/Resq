import React from 'react';
import { IncidentRecord } from '@resq/types';

export interface LiveMapProps {
  activeIncident: IncidentRecord | null;
}

export const LiveMap: React.FC<LiveMapProps> = ({ activeIncident }) => {
  return (
    <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

      {activeIncident ? (
        <div className="relative z-10 text-center p-6 bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700 max-w-sm shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-3 border border-red-500/40">
            <span className="text-2xl animate-pulse">🚨</span>
          </div>
          <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wide">
            {activeIncident.emergencyType.replace(/_/g, ' ')}
          </h3>
          <p className="text-xs text-slate-400 mt-1">📍 {activeIncident.locationText}</p>
          <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between text-[11px] text-slate-400">
            <span>Lat: {activeIncident.coordinates?.lat || 18.5204}</span>
            <span>Lng: {activeIncident.coordinates?.lng || 73.8567}</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-500 z-10">
          <p className="text-sm font-semibold">📍 GIS Incident Command Map</p>
          <p className="text-xs mt-1">Select an active emergency call to position operational markers</p>
        </div>
      )}

      <div className="absolute bottom-3 right-3 bg-slate-950/80 text-[10px] text-slate-400 px-2.5 py-1 rounded-md border border-slate-800">
        Live GIS Vector Engine • Zoom 15x
      </div>
    </div>
  );
};
