import React from 'react';

export interface ResQLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ResQLogo: React.FC<ResQLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl font-bold tracking-tight',
    md: 'text-2xl font-extrabold tracking-tight',
    lg: 'text-4xl font-extrabold tracking-tight'
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#E63946] text-white shadow-md font-black">
        <span className="text-lg">R</span>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </div>
      <span className={`${sizeClasses[size]} text-[#1D3557] font-sans`}>
        res<span className="text-[#E63946]">Q</span>
      </span>
    </div>
  );
};
