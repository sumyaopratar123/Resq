import React, { useState } from 'react';
import { IncidentRecord, IncidentStatus } from '@resq/types';
import { StatusBadge } from '@resq/ui';

export interface ActiveIncidentProps {
  incident: IncidentRecord;
  onUpdateStatus: (status: IncidentStatus) => void;
  onOpenGuidance: () => void;
}

type ResponseStep = {
  id: number;
  label: string;
  status: IncidentStatus;
  completed: boolean;
  active: boolean;
};

export const ActiveIncident: React.FC<ActiveIncidentProps> = ({
  incident,
  onUpdateStatus,
  onOpenGuidance
}) => {
  const [currentStep, setCurrentStep] = useState<IncidentStatus>(incident.status || 'RESPONDER_EN_ROUTE');

  const responseSteps: ResponseStep[] = [
    { id: 1, label: 'Incident received', status: 'RESPONDER_ASSIGNED', completed: true, active: false },
    { id: 2, label: 'Incident accepted', status: 'RESPONDER_ASSIGNED', completed: true, active: false },
    { id: 3, label: 'Responder en route', status: 'RESPONDER_EN_ROUTE', completed: currentStep !== 'RESPONDER_EN_ROUTE', active: currentStep === 'RESPONDER_EN_ROUTE' },
    { id: 4, label: 'Arrived on scene', status: 'RESPONDER_ARRIVED', completed: ['RESPONDER_ARRIVED', 'FIRST_AID_ACTIVE', 'AMBULANCE_ARRIVED', 'TRANSFERRED', 'COMPLETED'].includes(currentStep), active: currentStep === 'RESPONDER_ARRIVED' },
    { id: 5, label: 'First aid started', status: 'FIRST_AID_ACTIVE', completed: ['FIRST_AID_ACTIVE', 'AMBULANCE_ARRIVED', 'TRANSFERRED', 'COMPLETED'].includes(currentStep), active: currentStep === 'FIRST_AID_ACTIVE' },
    { id: 6, label: 'Ambulance arrived', status: 'AMBULANCE_ARRIVED', completed: ['AMBULANCE_ARRIVED', 'TRANSFERRED', 'COMPLETED'].includes(currentStep), active: currentStep === 'AMBULANCE_ARRIVED' }
  ];

  const handleStepTransition = (nextStatus: IncidentStatus) => {
    setCurrentStep(nextStatus);
    onUpdateStatus(nextStatus);
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Incident Header */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <StatusBadge status={currentStep} size="md" />
          <span className="text-xs font-mono text-slate-400">{incident.incidentId}</span>
        </div>
        
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white capitalize">
            {incident.emergencyType.replace(/_/g, ' ')}
          </h2>
          <div className="flex items-start gap-2 text-sm text-slate-300">
            <span className="mt-0.5">📍</span>
            <p>{incident.locationText}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1f2937]">
          <div className="bg-[#1f2937] p-3 rounded-lg">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Distance</p>
            <p className="text-lg font-bold text-white">1.2 km</p>
          </div>
          <div className="bg-[#1f2937] p-3 rounded-lg">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">ETA</p>
            <p className="text-lg font-bold text-white">4 min</p>
          </div>
        </div>
      </div>

      {/* Response Timeline */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Response Flow</h3>
        
        <div className="space-y-3">
          {responseSteps.map((step) => (
            <div key={step.id} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                step.completed ? 'bg-emerald-500 text-white' :
                step.active ? 'bg-blue-500 text-white animate-pulse' :
                'bg-[#1f2937] text-slate-500'
              }`}>
                {step.completed ? '✓' : step.id}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${
                  step.completed ? 'text-emerald-400' :
                  step.active ? 'text-blue-400' :
                  'text-slate-400'
                }`}>
                  {step.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident Details */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Incident Details</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-[#1f2937]">
            <span className="text-slate-400">Emergency Type</span>
            <span className="font-semibold text-white capitalize">
              {incident.emergencyType.replace(/_/g, ' ')}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#1f2937]">
            <span className="text-slate-400">Severity</span>
            <span className={`font-semibold ${
              incident.severity === 'critical' ? 'text-red-400' :
              incident.severity === 'high' ? 'text-amber-400' :
              'text-slate-300'
            } uppercase`}>
              {incident.severity}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#1f2937]">
            <span className="text-slate-400">Required Skills</span>
            <span className="font-semibold text-white">
              {incident.requiredSkills.join(', ') || 'Trauma, First Aid, CPR'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#1f2937]">
            <span className="text-slate-400">Patient Status</span>
            <span className="font-semibold text-white">
              {incident.patientState || 'Unresponsive'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-slate-400">Additional Info</span>
            <span className="font-semibold text-white">
              {incident.bleeding ? 'Bleeding reported' : 'No bleeding reported'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {currentStep === 'RESPONDER_EN_ROUTE' && (
          <button
            onClick={() => handleStepTransition('RESPONDER_ARRIVED')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition-colors"
          >
            I'M ON SCENE
          </button>
        )}

        {currentStep === 'RESPONDER_ARRIVED' && (
          <button
            onClick={() => handleStepTransition('FIRST_AID_ACTIVE')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors"
          >
            START FIRST AID
          </button>
        )}

        {currentStep === 'FIRST_AID_ACTIVE' && (
          <div className="space-y-3">
            <button
              onClick={onOpenGuidance}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>🎙️</span>
              <span>VOICE FIRST-AID GUIDANCE</span>
            </button>
            <button
              onClick={() => handleStepTransition('AMBULANCE_ARRIVED')}
              className="w-full bg-[#1f2937] hover:bg-[#374151] text-white font-semibold py-4 rounded-lg transition-colors"
            >
              AMBULANCE ARRIVED
            </button>
          </div>
        )}

        {(currentStep === 'AMBULANCE_ARRIVED' || currentStep === 'TRANSFERRED') && (
          <button
            onClick={() => handleStepTransition('COMPLETED')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition-colors"
          >
            COMPLETE INCIDENT
          </button>
        )}

        {currentStep === 'COMPLETED' && (
          <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-lg text-center space-y-2">
            <span className="text-3xl">🏆</span>
            <h4 className="font-bold text-emerald-400">Response Verified & Closed</h4>
            <p className="text-xs text-slate-400">+100 Reward Points Credited</p>
          </div>
        )}
      </div>
    </div>
  );
};
