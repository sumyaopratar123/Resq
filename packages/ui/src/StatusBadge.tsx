import React from 'react';
import { IncidentStatus } from '@resq/types';

export interface StatusBadgeProps {
  status: IncidentStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const statusStyles: Record<string, string> = {
    RECEIVED: 'bg-slate-100 text-slate-800 border-slate-300',
    ANALYZING: 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse',
    LOCATION_PENDING: 'bg-orange-50 text-orange-800 border-orange-300',
    LOCATION_CONFIRMED: 'bg-blue-50 text-blue-800 border-blue-300',
    DISPATCHING: 'bg-indigo-50 text-indigo-800 border-indigo-300',
    RESPONDER_SEARCH: 'bg-purple-50 text-purple-800 border-purple-300',
    RESPONDER_ASSIGNED: 'bg-cyan-50 text-cyan-800 border-cyan-300',
    RESPONDER_EN_ROUTE: 'bg-teal-50 text-teal-800 border-teal-300',
    RESPONDER_ARRIVED: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    FIRST_AID_ACTIVE: 'bg-green-50 text-green-800 border-green-300',
    AMBULANCE_ARRIVED: 'bg-emerald-100 text-emerald-900 border-emerald-400',
    TRANSFERRED: 'bg-sky-50 text-sky-800 border-sky-300',
    COMPLETED: 'bg-slate-200 text-slate-700 border-slate-400',
    CANCELLED: 'bg-red-50 text-red-800 border-red-300'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs'
  };

  const style = statusStyles[status] || 'bg-slate-100 text-slate-800 border-slate-200';

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wide rounded-md border ${sizeClasses[size]} ${style}`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
};
