import React, { useState, useEffect } from 'react';
import { ResQLogo, EmergencyButton, StatusBadge } from '@resq/ui';
import { IncidentRecord, IncidentStatus } from '@resq/types';

type TimelineStep = {
  id: number;
  label: string;
  status: 'pending' | 'active' | 'completed';
  timestamp?: string;
};

export default function App() {
  const [activeIncident, setActiveIncident] = useState<IncidentRecord | null>(null);
  const [timeline, setTimeline] = useState<TimelineStep[]>([
    { id: 1, label: 'SOS received', status: 'pending' },
    { id: 2, label: 'Location verified', status: 'pending' },
    { id: 3, label: 'Emergency analyzed', status: 'pending' },
    { id: 4, label: 'Nearby responders contacted', status: 'pending' },
    { id: 5, label: 'Ambulance dispatch', status: 'pending' },
    { id: 6, label: 'Hospital coordination', status: 'pending' }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);

  const handleTriggerSOS = () => {
    const newIncident: IncidentRecord = {
      incidentId: `inc-${Date.now().toString().slice(-4)}`,
      status: 'DISPATCHING',
      emergencyType: 'road_accident',
      severity: 'critical',
      patientState: 'unknown',
      bleeding: false,
      locationText: 'College Main Gate, Station Road',
      coordinates: { lat: 18.5204, lng: 73.8567 },
      locationConfidence: 0.91,
      requiredSkills: ['trauma', 'first_aid', 'cpr'],
      assignedResponders: [],
      dispatchedAmbulance: true,
      ambulanceEtaMinutes: 8,
      searchRadiusMeters: 500,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setActiveIncident(newIncident);

    // Animate timeline
    const steps = [...timeline];
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < steps.length) {
        steps[currentIndex].status = 'completed';
        steps[currentIndex].timestamp = new Date().toLocaleTimeString();
        setTimeline([...steps]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    // Simulate recording for 5 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsRecording(false);
      setTranscript('A motorcycle accident has occurred near the college main gate. The rider is unconscious and bleeding.');
    }, 5000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-[#1f2937] bg-[#111827] px-4 flex items-center justify-between">
        <ResQLogo size="sm" />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-400">Emergency Network Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-md mx-auto w-full">
        {!activeIncident ? (
          <div className="w-full space-y-8">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight">Emergency Assistance</h1>
              <p className="text-sm text-slate-400">Press and hold to activate emergency response</p>
            </div>

            {/* Emergency Button */}
            <EmergencyButton onTrigger={handleTriggerSOS} />

            {/* Audio Input Section */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Describe the emergency</p>
              
              {!isRecording && !transcript ? (
                <button
                  onClick={handleStartRecording}
                  className="w-full bg-[#1f2937] hover:bg-[#374151] text-white font-semibold py-3 rounded-lg border border-[#374151] transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-lg">🎙</span>
                  <span>Start Recording</span>
                </button>
              ) : isRecording ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                      Live Audio
                    </span>
                    <span className="text-xs font-mono text-slate-400">{formatTime(recordingTime)}</span>
                  </div>
                  {/* Animated waveform */}
                  <div className="flex items-center justify-center gap-1 h-12">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-500 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 100}%`,
                          animationDelay: `${i * 50}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Live Transcript</span>
                    <button
                      onClick={() => setTranscript('')}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed bg-[#1f2937] p-3 rounded-lg border border-[#374151]">
                    {transcript}
                  </p>
                </div>
              )}
            </div>

            {/* Location Panel */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <span className="text-sm font-semibold">Current Location</span>
                </div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Location Verified
                </span>
              </div>
              <p className="text-sm text-slate-300">College Main Gate, Station Road</p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>GPS: 18.5204, 73.8567</span>
                <span>Accuracy: ±12m</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-6">
            {/* Active Incident Header */}
            <div className="bg-[#111827] border-2 border-red-500/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    SOS ACTIVATED
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-lg font-extrabold">Emergency Response Dispatched</h2>
                <p className="text-sm text-slate-300">📍 {activeIncident.locationText}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1f2937]">
                <div className="bg-[#1f2937] p-3 rounded-lg">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Incident ID</p>
                  <p className="text-sm font-bold font-mono">{activeIncident.incidentId}</p>
                </div>
                <div className="bg-[#1f2937] p-3 rounded-lg">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Type</p>
                  <p className="text-sm font-bold capitalize">
                    {activeIncident.emergencyType.replace(/_/g, ' ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Status Timeline</h3>
              <div className="space-y-2">
                {timeline.map((step) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.status === 'completed' ? 'bg-emerald-500 text-white' :
                      step.status === 'active' ? 'bg-blue-500 text-white animate-pulse' :
                      'bg-[#1f2937] text-slate-500'
                    }`}>
                      {step.status === 'completed' ? '✓' : step.id}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${
                        step.status === 'completed' ? 'text-emerald-400' :
                        step.status === 'active' ? 'text-blue-400' :
                        'text-slate-400'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                    {step.timestamp && (
                      <span className="text-xs font-mono text-slate-500">{step.timestamp}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Status Panel */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Severity</p>
                  <p className="text-sm font-bold text-red-400">CRITICAL</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Responders</p>
                  <p className="text-sm font-bold">3 notified</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Responder</p>
                  <p className="text-sm font-bold text-emerald-400">1 accepted</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Ambulance</p>
                  <p className="text-sm font-bold text-blue-400">Dispatched</p>
                </div>
              </div>
              
              <div className="bg-[#1f2937] p-4 rounded-lg text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">ETA</p>
                <p className="text-3xl font-extrabold text-white">{activeIncident.ambulanceEtaMinutes || 8}</p>
                <p className="text-xs text-slate-400">minutes</p>
              </div>
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => {
                setActiveIncident(null);
                setTimeline([
                  { id: 1, label: 'SOS received', status: 'pending' },
                  { id: 2, label: 'Location verified', status: 'pending' },
                  { id: 3, label: 'Emergency analyzed', status: 'pending' },
                  { id: 4, label: 'Nearby responders contacted', status: 'pending' },
                  { id: 5, label: 'Ambulance dispatch', status: 'pending' },
                  { id: 6, label: 'Hospital coordination', status: 'pending' }
                ]);
              }}
              className="w-full bg-[#1f2937] hover:bg-[#374151] text-slate-300 font-semibold py-3 rounded-lg border border-[#374151] transition-colors"
            >
              Cancel Emergency
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="h-12 border-t border-[#1f2937] bg-[#111827] px-4 flex items-center justify-center">
        <p className="text-[10px] text-slate-500">resQ Security Protocol • End-to-End Realtime Encryption</p>
      </footer>
    </div>
  );
}
