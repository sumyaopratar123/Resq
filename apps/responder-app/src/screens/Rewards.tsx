import React from 'react';

export const Rewards: React.FC = () => {
  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="bg-gradient-to-br from-amber-500 to-red-600 p-5 rounded-2xl text-white shadow-xl space-y-2">
        <span className="text-[10px] uppercase font-black tracking-widest text-amber-100">
          🏆 VERIFIED SAVER LEDGER
        </span>
        <div className="flex justify-between items-baseline">
          <h2 className="text-3xl font-black">480 PTS</h2>
          <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">Level 3 Saver</span>
        </div>
        <p className="text-xs text-amber-100">12 Verified Emergency Responses Completed</p>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          Earned Badges & Recognition
        </h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-1">
            <span className="text-xl">🛟</span>
            <div className="font-bold text-slate-200">First Responder</div>
            <div className="text-[10px] text-slate-400">Awarded for 5 scene arrivals</div>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-1">
            <span className="text-xl">❤️</span>
            <div className="font-bold text-slate-200">CPR Master</div>
            <div className="text-[10px] text-slate-400">Verified cardiac support</div>
          </div>
        </div>
      </div>
    </div>
  );
};
