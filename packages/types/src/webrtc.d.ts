export interface WebRTCSession {
    sessionId: string;
    callId: string;
    initiatorUid: string;
    receiverUid: string;
    status: 'connecting' | 'connected' | 'ended' | 'failed';
    createdAt: number;
}
export interface SignalingMessage {
    type: 'offer' | 'answer' | 'ice-candidate';
    senderUid: string;
    payload: unknown;
    timestamp: number;
}
