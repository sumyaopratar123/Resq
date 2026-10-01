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
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'border-red-500/50 bg-red-500/10'
          : 'border-[#1f2937] bg-[#111827] hover:border-[#374151]'
      }`}
    >
      {/* Severity Indicator */}
      <div className="flex items-center gap-2 mb-2">
        {isCritical && (
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
        )}
        <span className={`text-[10px] font-bold uppercase tracking-wider ${
          incident.severity === 'critical' ? 'text-red-400' :
          incident.severity === 'high' ? 'text-amber-400' :
          'text-slate-400'
        }`}>
          {incident.severity}
        </span>
      </div>

      {/* Incident Type */}
      <h4 className="text-sm font-bold text-white capitalize mb-1">
        {incident.emergencyType.replace(/_/g, ' ')}
      </h4>

      {/* Location */}
      <p className="text-xs text-slate-400 line-clamp-2 mb-3">
        📍 {incident.locationText}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#1f2937]">
        <span className="text-[10px] text-slate-500">
          {new Date(incident.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <StatusBadge status={incident.status} size="sm" />
      </div>
    </div>
  );
};
