import React, { useState } from 'react';
import { IncidentRecord, IncidentStatus } from '@resq/types';
import { StatusBadge } from '@resq/ui';

export interface ActiveIncidentProps {
  incident: IncidentRecord;
  onUpdateStatus: (status: IncidentStatus) => void;
  onOpenGuidance: () => void;
}

export const ActiveIncident: React.FC<ActiveIncidentProps> = ({
  incident,
  onUpdateStatus,
  onOpenGuidance
}) => {
  const [currentStep, setCurrentStep] = useState<IncidentStatus>(incident.status || 'RESPONDER_EN_ROUTE');

  const handleStepTransition = (nextStatus: IncidentStatus) => {
    setCurrentStep(nextStatus);
    onUpdateStatus(nextStatus);
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Incident Status Banner */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
        <div className="flex items-center justify-between">
          <StatusBadge status={currentStep} size="md" />
          <span className="text-xs text-slate-400">ID: {incident.incidentId}</span>
        </div>
        <h2 className="font-extrabold text-lg text-slate-100 capitalize">
          {incident.emergencyType.replace(/_/g, ' ')}
        </h2>
        <p className="text-xs text-slate-300">📍 {incident.locationText}</p>
      </div>

      {/* Action Progress Flow */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          On-Scene Response Flow
        </h4>

        <div className="space-y-2">
          {currentStep === 'RESPONDER_EN_ROUTE' && (
            <button
              onClick={() => handleStepTransition('RESPONDER_ARRIVED')}
              className="w-full bg-emerald-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:bg-emerald-700"
            >
              MARK ARRIVED ON SCENE
            </button>
          )}

          {currentStep === 'RESPONDER_ARRIVED' && (
            <button
              onClick={() => handleStepTransition('FIRST_AID_ACTIVE')}
              className="w-full bg-blue-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:bg-blue-700"
            >
              START FIRST AID PROTOCOL
            </button>
          )}

          {currentStep === 'FIRST_AID_ACTIVE' && (
            <div className="space-y-2">
              <button
                onClick={onOpenGuidance}
                className="w-full bg-[#E63946] text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:bg-[#D62828] flex items-center justify-center gap-2"
              >
                <span>🎙️ OPEN VOICE FIRST-AID GUIDANCE</span>
              </button>
              <button
                onClick={() => handleStepTransition('AMBULANCE_ARRIVED')}
                className="w-full bg-indigo-600 text-white font-extrabold py-3 rounded-xl hover:bg-indigo-700"
              >
                HANDOFF TO AMBULANCE / MEDICAL TEAM
              </button>
            </div>
          )}

          {(currentStep === 'AMBULANCE_ARRIVED' || currentStep === 'TRANSFERRED') && (
            <button
              onClick={() => handleStepTransition('COMPLETED')}
              className="w-full bg-slate-100 text-slate-900 font-extrabold py-3.5 rounded-xl shadow-lg hover:bg-white"
            >
              COMPLETE INCIDENT & CLAIM REWARD
            </button>
          )}

          {currentStep === 'COMPLETED' && (
            <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-xl text-center space-y-1">
              <span className="text-2xl">🏆</span>
              <h5 className="font-extrabold text-sm text-emerald-300">Response Verified & Closed</h5>
              <p className="text-xs text-emerald-400">+100 Reward Points Credited Server-side</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
