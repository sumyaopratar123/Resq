import React from 'react';
import { IncidentRecord } from '@resq/types';

export interface LiveMapProps {
  activeIncident: IncidentRecord | null;
}

export const LiveMap: React.FC<LiveMapProps> = ({ activeIncident }) => {
  return (
    <div className="relative w-full h-full bg-[#111827] rounded-xl overflow-hidden border border-[#1f2937] flex items-center justify-center">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#374155_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>

      {activeIncident ? (
        <div className="relative z-10">
          {/* Incident Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                <span className="text-lg">🚨</span>
              </div>
              <div className="absolute -inset-2 rounded-full bg-red-500/30 animate-ping"></div>
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-[#111827] border border-[#1f2937] px-3 py-1.5 rounded-lg whitespace-nowrap">
              <p className="text-[10px] font-bold text-white uppercase tracking-wider">Incident</p>
            </div>
          </div>

          {/* Responder Marker */}
          <div className="absolute top-1/3 left-1/3">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#111827] border border-[#1f2937] px-2 py-1 rounded whitespace-nowrap">
              <p className="text-[10px] font-bold text-white">Responder</p>
              <p className="text-[10px] text-slate-400">1.2 km</p>
            </div>
          </div>

          {/* Ambulance Marker */}
          <div className="absolute bottom-1/3 right-1/3">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-sm">🚑</span>
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#111827] border border-[#1f2937] px-2 py-1 rounded whitespace-nowrap">
              <p className="text-[10px] font-bold text-white">Ambulance</p>
              <p className="text-[10px] text-slate-400">4.8 km</p>
            </div>
          </div>

          {/* Hospital Marker */}
          <div className="absolute top-1/4 right-1/4">
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <span className="text-sm">🏥</span>
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#111827] border border-[#1f2937] px-2 py-1 rounded whitespace-nowrap">
              <p className="text-[10px] font-bold text-white">Hospital</p>
            </div>
          </div>

          {/* Route Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line
              x1="33%"
              y1="33%"
              x2="50%"
              y2="50%"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
            <line
              x1="66%"
              y1="66%"
              x2="50%"
              y2="50%"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
        </div>
      ) : (
        <div className="text-center text-slate-500 z-10 space-y-2">
          <span className="text-4xl">📍</span>
          <p className="text-sm font-semibold">GIS Incident Command Map</p>
          <p className="text-xs">Select an active emergency call to position operational markers</p>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-[#111827] border border-[#1f2937] rounded-lg flex items-center justify-center text-white hover:bg-[#1f2937] transition-colors">
          <span className="text-lg">+</span>
        </button>
        <button className="w-10 h-10 bg-[#111827] border border-[#1f2937] rounded-lg flex items-center justify-center text-white hover:bg-[#1f2937] transition-colors">
          <span className="text-lg">−</span>
        </button>
      </div>

      {/* Map Info */}
      <div className="absolute bottom-4 left-4 bg-[#111827]/80 backdrop-blur border border-[#1f2937] px-3 py-2 rounded-lg">
        <p className="text-[10px] text-slate-400">Live GIS Vector Engine • Zoom 15x</p>
      </div>
    </div>
  );
};
