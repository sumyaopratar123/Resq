import React from 'react';
import { ResponderProfile } from '@resq/types';

export interface ResponderCardProps {
  responder: ResponderProfile;
  distanceMeters?: number;
  onAssign?: (uid: string) => void;
  isAssigned?: boolean;
}

export const ResponderCard: React.FC<ResponderCardProps> = ({
  responder,
  distanceMeters,
  onAssign,
  isAssigned = false
}) => {
  return (
    <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
          🧑‍⚕️
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h5 className="font-semibold text-xs text-slate-900">
              UID: {responder.uid.slice(0, 8)}...
            </h5>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
              VERIFIED
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Skills: {responder.skills.slice(0, 3).join(', ')}
          </p>
        </div>
      </div>

      <div className="text-right">
        {distanceMeters && (
          <span className="text-xs font-bold text-slate-700 block">
            {Math.round(distanceMeters)}m away
          </span>
        )}
        {onAssign && (
          <button
            onClick={() => onAssign(responder.uid)}
            disabled={isAssigned}
            className={`mt-1 text-[11px] font-semibold px-2.5 py-1 rounded transition-colors ${
              isAssigned
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-[#1D3557] text-white hover:bg-[#15263F]'
            }`}
          >
            {isAssigned ? 'Assigned' : 'Assign'}
          </button>
        )}
      </div>
    </div>
  );
};
