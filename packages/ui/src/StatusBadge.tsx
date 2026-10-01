import React from 'react';
import { IncidentStatus } from '@resq/types';

export interface StatusBadgeProps {
  status: IncidentStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const statusStyles: Record<string, string> = {
    RECEIVED: 'bg-[#1f2937] text-slate-300 border-[#374151]',
    ANALYZING: 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse',
    LOCATION_PENDING: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    LOCATION_CONFIRMED: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    DISPATCHING: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    RESPONDER_SEARCH: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    RESPONDER_ASSIGNED: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    RESPONDER_EN_ROUTE: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    RESPONDER_ARRIVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    FIRST_AID_ACTIVE: 'bg-green-500/10 text-green-400 border-green-500/30',
    AMBULANCE_ARRIVED: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    TRANSFERRED: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    COMPLETED: 'bg-[#1f2937] text-slate-400 border-[#374151]',
    CANCELLED: 'bg-red-500/10 text-red-400 border-red-500/30'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs'
  };

  const style = statusStyles[status] || 'bg-[#1f2937] text-slate-300 border-[#374151]';

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wide rounded-md border ${sizeClasses[size]} ${style}`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
};
