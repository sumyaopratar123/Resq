import { ResponderSkill } from './responder.js';
export type IncidentStatus = 'RECEIVED' | 'ANALYZING' | 'LOCATION_PENDING' | 'LOCATION_CONFIRMED' | 'DISPATCHING' | 'RESPONDER_SEARCH' | 'RESPONDER_ASSIGNED' | 'RESPONDER_EN_ROUTE' | 'RESPONDER_ARRIVED' | 'FIRST_AID_ACTIVE' | 'AMBULANCE_ARRIVED' | 'TRANSFERRED' | 'COMPLETED' | 'CANCELLED';
export type EmergencyType = 'road_accident' | 'cardiac_emergency' | 'breathing_difficulty' | 'severe_bleeding' | 'choking' | 'burn_injury' | 'unconscious_person' | 'fire_disaster' | 'general_medical';
export type IncidentSeverity = 'critical' | 'high' | 'moderate' | 'low';
export interface IncidentEvent {
    eventId: string;
    incidentId: string;
    status: IncidentStatus;
    timestamp: number;
    triggeredBy: string;
    note?: string;
}
export interface IncidentRecord {
    incidentId: string;
    callId?: string;
    citizenUid?: string;
    status: IncidentStatus;
    emergencyType: EmergencyType;
    severity: IncidentSeverity;
    patientState?: string;
    bleeding?: boolean;
    locationText: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    locationConfidence: number;
    requiredSkills: ResponderSkill[];
    assignedResponders: string[];
    dispatchedAmbulance: boolean;
    ambulanceEtaMinutes?: number;
    searchRadiusMeters: number;
    createdAt: number;
    updatedAt: number;
}
