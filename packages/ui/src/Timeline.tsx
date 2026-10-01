import React from 'react';
import { IncidentEvent } from '@resq/types';

export interface TimelineProps {
  events: IncidentEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 text-xs">
      {events.length === 0 ? (
        <p className="text-slate-400 italic">No events logged yet.</p>
      ) : (
        events.map((evt, idx) => (
          <div key={evt.eventId || idx} className="relative group">
            <span className="absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full bg-[#E63946] ring-4 ring-white"></span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">{evt.status.replace(/_/g, ' ')}</span>
              <span className="text-[10px] text-slate-400">
                {new Date(evt.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            </div>
            {evt.note && <p className="text-slate-600 mt-0.5">{evt.note}</p>}
          </div>
        ))
      )}
    </div>
  );
};
