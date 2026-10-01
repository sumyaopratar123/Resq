import React, { useState, useEffect } from 'react';

export interface EmergencyButtonProps {
  onTrigger: () => void;
  isPressed?: boolean;
  duration?: number; // hold duration in ms
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  onTrigger,
  isPressed = false,
  duration = 2000
}) => {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pressing && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (duration / 50));
          if (newProgress >= 100) {
            setActivated(true);
            onTrigger();
            return 100;
          }
          return newProgress;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [pressing, progress, duration, onTrigger]);

  const handleMouseDown = () => {
    if (!activated) {
      setPressing(true);
      setProgress(0);
    }
  };

  const handleMouseUp = () => {
    if (!activated) {
      setPressing(false);
      setProgress(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMouseDown();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMouseUp();
  };

  if (activated) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-32 h-32 rounded-full bg-red-600 border-4 border-red-400 flex items-center justify-center animate-pulse">
          <span className="text-4xl">🚨</span>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-red-400">SOS ACTIVATED</p>
          <p className="text-xs text-slate-400 font-mono">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Progress ring */}
        <svg className="absolute inset-0 w-40 h-40 -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="76"
            fill="none"
            stroke="#1f2937"
            strokeWidth="4"
          />
          <circle
            cx="80"
            cy="80"
            r="76"
            fill="none"
            stroke="#dc2626"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 76}`}
            strokeDashoffset={`${2 * Math.PI * 76 * (1 - progress / 100)}`}
            className="transition-all duration-50 ease-linear"
          />
        </svg>

        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-40 h-40 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white shadow-2xl transition-all active:scale-95 hover:from-red-500 hover:to-red-600 focus:outline-none ring-4 ring-red-900/50"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-2xl font-black tracking-widest">SOS</span>
            <span className="text-[10px] uppercase font-bold tracking-wider mt-1 text-red-100">
              {pressing ? `${Math.round(progress)}%` : 'HOLD TO SEND'}
            </span>
          </div>
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center">
        {pressing ? 'Keep holding...' : 'Press and hold 2 seconds'}
      </p>
    </div>
  );
};
