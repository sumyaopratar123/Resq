import React from 'react';

export interface SOSButtonProps {
  onTrigger: () => void;
  isLoading?: boolean;
  label?: string;
  subtext?: string;
}

export const SOSButton: React.FC<SOSButtonProps> = ({
  onTrigger,
  isLoading = false,
  label = 'SOS',
  subtext = 'PULL FOR IMMEDIATE HELP'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <button
        onClick={onTrigger}
        disabled={isLoading}
        className="relative group flex flex-col items-center justify-center w-48 h-48 rounded-full bg-[#E63946] text-white shadow-2xl transition-transform active:scale-95 hover:bg-[#D62828] focus:outline-none ring-8 ring-red-100"
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-30 group-hover:opacity-50"></span>
        <span className="text-4xl font-black tracking-widest">{label}</span>
        <span className="text-[10px] uppercase font-bold tracking-wider mt-1 text-red-100">
          {isLoading ? 'DISPATCHING...' : subtext}
        </span>
      </button>
    </div>
  );
};
