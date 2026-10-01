export interface TranscriptSegment {
    segmentId: string;
    speaker: 'caller' | 'agent' | 'system';
    text: string;
    startMs: number;
    endMs: number;
    confidence: number;
    language?: string;
}
export interface CallRecord {
    callId: string;
    callerPhone: string;
    startTime: number;
    endTime?: number;
    status: 'active' | 'completed' | 'failed' | 'processing';
    audioURL?: string;
    languageDetected?: string;
    transcriptSegments: TranscriptSegment[];
    incidentId?: string;
}
export interface CallExtractionResult {
    emergencyType: {
        value: string;
        confidence: number;
    };
    severity: {
        value: string;
        confidence: number;
    };
    patientState: {
        value: string;
        confidence: number;
    };
    bleeding: {
        value: boolean;
        confidence: number;
    };
    location: {
        text: string;
        confidence: number;
    };
    requiredSkills: string[];
}
