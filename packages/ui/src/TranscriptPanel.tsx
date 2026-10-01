import React from 'react';
import { TranscriptSegment } from '@resq/types';

export interface TranscriptPanelProps {
  segments: TranscriptSegment[];
  isStreaming?: boolean;
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  segments,
  isStreaming = false
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-xl p-4 border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold text-xs uppercase tracking-wider">
            🎙️ Live Transcript
          </span>
          {isStreaming && (
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
          )}
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Whisper large-v3-turbo</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
        {segments.length === 0 ? (
          <p className="text-slate-500 italic text-center py-6">
            Awaiting incoming audio stream...
          </p>
        ) : (
          segments.map((seg, idx) => (
            <div
              key={seg.segmentId || idx}
              className={`p-2.5 rounded-lg ${
                seg.speaker === 'caller'
                  ? 'bg-slate-800 border-l-2 border-red-500 text-slate-200'
                  : 'bg-slate-800/50 border-l-2 border-blue-500 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span className="font-bold uppercase tracking-wider">{seg.speaker}</span>
                <span>{(seg.startMs / 1000).toFixed(1)}s</span>
              </div>
              <p className="font-sans leading-relaxed">{seg.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
