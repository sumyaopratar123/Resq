import React, { useState } from 'react';
import { TranscriptPanel, LocationConfidence, Button } from '@resq/ui';
import { IncidentRecord, TranscriptSegment } from '@resq/types';

export interface CallPanelProps {
  activeIncident: IncidentRecord | null;
  onDispatch: (incidentId: string) => void;
}

export const CallPanel: React.FC<CallPanelProps> = ({ activeIncident, onDispatch }) => {
  const [segments, setSegments] = useState<TranscriptSegment[]>([
    {
      segmentId: '1',
      speaker: 'caller',
      text: 'Help! There has been a bad motorcycle crash outside the college main gate!',
      startMs: 0,
      endMs: 3200,
      confidence: 0.94
    },
    {
      segmentId: '2',
      speaker: 'caller',
      text: 'The rider is unresponsive and bleeding heavily from his head.',
      startMs: 3500,
      endMs: 6500,
      confidence: 0.91
    }
  ]);

  if (!activeIncident) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 text-xs italic p-6">
        No call active. Select or simulate an incoming emergency call.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Call Header */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
            📞 Incoming Audio Stream
          </span>
          <h3 className="font-extrabold text-sm text-slate-100">Caller: +1 (800) 555-0199</h3>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="danger">
            End Call
          </Button>
        </div>
      </div>

      {/* Transcript View */}
      <div className="flex-1 min-h-[220px]">
        <TranscriptPanel segments={segments} isStreaming={true} />
      </div>

      {/* Extracted Intelligence & Confidence */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-3">
        <LocationConfidence
          confidence={activeIncident.locationConfidence}
          locationText={activeIncident.locationText}
          onConfirm={() => console.log('Location confirmed')}
        />

        <div className="flex justify-between items-center pt-2 border-t border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Required Skills</span>
            <span className="text-xs font-bold text-slate-200">
              {activeIncident.requiredSkills.join(', ') || 'CPR, Trauma'}
            </span>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => onDispatch(activeIncident.incidentId)}
          >
            Dispatch Responders
          </Button>
        </div>
      </div>
    </div>
  );
};
