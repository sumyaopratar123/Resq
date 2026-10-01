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
      <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
              Incoming Audio Stream
            </span>
          </div>
          <h3 className="font-bold text-sm text-white">Caller: +1 (800) 555-0199</h3>
        </div>
        <Button size="sm" variant="danger">
          End Call
        </Button>
      </div>

      {/* Transcript View */}
      <div className="flex-1 min-h-[220px]">
        <TranscriptPanel segments={segments} isStreaming={true} />
      </div>

      {/* AI Emergency Analysis */}
      <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          AI Emergency Analysis
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1f2937] p-3 rounded-lg">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Emergency</p>
            <p className="text-sm font-bold text-white capitalize">
              {activeIncident.emergencyType.replace(/_/g, ' ')}
            </p>
          </div>
          <div className="bg-[#1f2937] p-3 rounded-lg">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Severity</p>
            <p className={`text-sm font-bold uppercase ${
              activeIncident.severity === 'critical' ? 'text-red-400' :
              activeIncident.severity === 'high' ? 'text-amber-400' :
              'text-slate-300'
            }`}>
              {activeIncident.severity}
            </p>
          </div>
          <div className="bg-[#1f2937] p-3 rounded-lg">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Patient</p>
            <p className="text-sm font-bold text-white capitalize">
              {activeIncident.patientState || 'Unknown'}
            </p>
          </div>
          <div className="bg-[#1f2937] p-3 rounded-lg">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Confidence</p>
            <p className="text-sm font-bold text-emerald-400">91%</p>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-[#1f2937] p-3 rounded-lg">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Risk Factors</p>
          <div className="flex flex-wrap gap-2">
            {activeIncident.bleeding && (
              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase rounded border border-red-500/30">
                Heavy Bleeding
              </span>
            )}
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase rounded border border-amber-500/30">
              Head Injury
            </span>
          </div>
        </div>
      </div>

      {/* Extracted Location */}
      <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Extracted Location
        </h3>
        
        <div className="flex items-start gap-3">
          <span className="text-2xl">📍</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">{activeIncident.locationText}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <span>Lat: {activeIncident.coordinates?.lat || 18.5204}</span>
              <span>Lng: {activeIncident.coordinates?.lng || 73.8567}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#1f2937]">
          <span className="text-xs text-slate-400">Location confidence</span>
          <span className="text-sm font-bold text-emerald-400">
            {Math.round(activeIncident.locationConfidence * 100)}%
          </span>
        </div>
      </div>

      {/* Required Response */}
      <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Required Response
            </h3>
            <p className="text-sm font-bold text-white">
              {activeIncident.requiredSkills.join(', ') || 'Trauma, First Aid, CPR'}
            </p>
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
