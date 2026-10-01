import React from 'react';
import { IncidentRecord } from '@resq/types';
import { StatusBadge } from './StatusBadge.js';

export interface IncidentCardProps {
  incident: IncidentRecord;
  onSelect?: (incidentId: string) => void;
  isSelected?: boolean;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({
  incident,
  onSelect,
  isSelected = false
}) => {
  const isCritical = incident.severity === 'critical';

  return (
    <div
      onClick={() => onSelect?.(incident.incidentId)}
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected
          ? 'border-[#E63946] bg-red-50/30 shadow-md ring-1 ring-[#E63946]'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {isCritical && (
            <span className="flex h-2.5 w-2.5 rounded-full bg-red-600 animate-ping"></span>
          )}
          <h4 className="font-bold text-slate-900 capitalize text-sm">
            {incident.emergencyType.replace(/_/g, ' ')}
          </h4>
        </div>
        <StatusBadge status={incident.status} size="sm" />
      </div>

      <p className="text-xs text-slate-600 line-clamp-2 mb-3">📍 {incident.locationText}</p>

      <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
        <span>Required Skills: {incident.requiredSkills.join(', ') || 'General'}</span>
        <span>{new Date(incident.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};
