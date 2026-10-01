import React, { useState } from 'react';
import { EmergencyGuidanceProtocol } from '@resq/types';

export const SAMPLE_CARDIA_PROTOCOL: EmergencyGuidanceProtocol = {
  id: 'prot-cardiac-adult',
  emergencyType: 'cardiac_emergency',
  title: 'Adult Cardiac Arrest & CPR',
  category: 'adult',
  summary: 'Immediate CPR and AED protocol for unresponsive adult patients',
  lastReviewedDate: '2026-09-15',
  reviewedBy: 'resQ Clinical Medical Advisory',
  criticalWarnings: [
    'Do NOT stop chest compressions until medical help or AED takes over.',
    'Do NOT move patient if spinal trauma is suspected unless in immediate danger.'
  ],
  steps: [
    {
      stepNumber: 1,
      title: 'Assess Responsiveness & Airway',
      instruction: 'Tap shoulders firmly and shout loudly: "Are you okay?". Check if chest is rising.',
      voiceText: 'Tap shoulders firmly and ask if they are okay. Check for chest movement.'
    },
    {
      stepNumber: 2,
      title: 'Position Hands Center of Chest',
      instruction: 'Place heel of one hand in center of chest between nipples. Interlock fingers of second hand.',
      voiceText: 'Place heel of hand in center of chest and interlock fingers.'
    },
    {
      stepNumber: 3,
      title: 'Deliver Continuous Compressions',
      instruction: 'Push hard and fast (100–120 compressions per minute). Allow complete chest recoil between pushes.',
      voiceText: 'Push hard and fast at 100 to 120 compressions per minute.'
    }
  ]
};

export interface FirstAidGuidanceProps {
  onBack: () => void;
}

export const FirstAidGuidance: React.FC<FirstAidGuidanceProps> = ({ onBack }) => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlayingTTS, setIsPlayingTTS] = useState<boolean>(false);

  const currentStep = SAMPLE_CARDIA_PROTOCOL.steps[stepIndex];

  const handleSpeakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingTTS(false);
      setIsPlayingTTS(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
        >
          ← Back to Incident
        </button>
        <span className="text-[10px] font-bold bg-[#E63946] text-white px-2 py-0.5 rounded uppercase">
          VERIFIED CLINICAL GUIDANCE
        </span>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-1">
        <h3 className="font-extrabold text-base text-slate-100">{SAMPLE_CARDIA_PROTOCOL.title}</h3>
        <p className="text-xs text-slate-400">{SAMPLE_CARDIA_PROTOCOL.summary}</p>
      </div>

      {/* Critical Warnings */}
      <div className="bg-red-950/60 border border-red-500/50 p-3 rounded-xl space-y-1">
        <span className="text-[10px] font-bold uppercase text-red-400 tracking-wider">
          ⚠️ Critical Safety Warning
        </span>
        <ul className="text-xs text-red-200 list-disc list-inside space-y-0.5">
          {SAMPLE_CARDIA_PROTOCOL.criticalWarnings.map((w, idx) => (
            <li key={idx}>{w}</li>
          ))}
        </ul>
      </div>

      {/* Active Step Card */}
      <div className="bg-slate-800 border-2 border-blue-500/60 p-5 rounded-2xl space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-slate-700 pb-3">
          <span className="text-xs font-black uppercase text-blue-400 tracking-wider">
            STEP {currentStep.stepNumber} OF {SAMPLE_CARDIA_PROTOCOL.steps.length}
          </span>
          <button
            onClick={() => handleSpeakText(currentStep.voiceText)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5"
          >
            <span>🔊</span> {isPlayingTTS ? 'Speaking...' : 'Play Voice TTS'}
          </button>
        </div>

        <h4 className="font-extrabold text-base text-slate-100">{currentStep.title}</h4>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">{currentStep.instruction}</p>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700">
          <button
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
            className="bg-slate-700 disabled:opacity-40 text-slate-200 font-bold text-xs py-2.5 rounded-lg"
          >
            Previous
          </button>
          <button
            disabled={stepIndex === SAMPLE_CARDIA_PROTOCOL.steps.length - 1}
            onClick={() => setStepIndex((prev) => Math.min(SAMPLE_CARDIA_PROTOCOL.steps.length - 1, prev + 1))}
            className="bg-[#E63946] disabled:opacity-40 text-white font-bold text-xs py-2.5 rounded-lg"
          >
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
};
