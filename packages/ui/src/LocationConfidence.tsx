import React from 'react';

export interface LocationConfidenceProps {
  confidence: number;
  locationText: string;
  onConfirm?: () => void;
}

export const LocationConfidence: React.FC<LocationConfidenceProps> = ({
  confidence,
  locationText,
  onConfirm
}) => {
  const percentage = Math.round(confidence * 100);
  const isHigh = confidence >= 0.85;

  return (
    <div
      className={`p-3 rounded-lg border text-xs ${
        isHigh ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-slate-800">📍 Extracted Location</span>
        <span
          className={`font-black px-1.5 py-0.5 rounded text-[10px] ${
            isHigh ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
          }`}
        >
          {percentage}% Confidence
        </span>
      </div>
      <p className="text-slate-700 font-medium mb-2">"{locationText}"</p>
      {!isHigh && onConfirm && (
        <button
          onClick={onConfirm}
          className="w-full bg-amber-600 text-white font-bold py-1 px-2 rounded text-[11px] hover:bg-amber-700 transition-colors"
        >
          Confirm Location Manually
        </button>
      )}
    </div>
  );
};
