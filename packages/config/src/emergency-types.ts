import { EmergencyType, IncidentSeverity } from '@resq/types';

export interface EmergencyTypeMeta {
  type: EmergencyType;
  label: string;
  defaultSeverity: IncidentSeverity;
  icon: string;
  color: string;
  requiredSkills: string[];
}

export const EMERGENCY_TYPES: Record<EmergencyType, EmergencyTypeMeta> = {
  cardiac_emergency: {
    type: 'cardiac_emergency',
    label: 'Cardiac Emergency',
    defaultSeverity: 'critical',
    icon: 'heart-pulse',
    color: '#E63946',
    requiredSkills: ['cpr', 'aed', 'first_aid']
  },
  road_accident: {
    type: 'road_accident',
    label: 'Road Trauma / Accident',
    defaultSeverity: 'critical',
    icon: 'car-crash',
    color: '#D62828',
    requiredSkills: ['trauma', 'first_aid', 'cpr']
  },
  breathing_difficulty: {
    type: 'breathing_difficulty',
    label: 'Breathing Difficulty / Asthma',
    defaultSeverity: 'high',
    icon: 'lungs',
    color: '#F4A261',
    requiredSkills: ['first_aid', 'cpr']
  },
  severe_bleeding: {
    type: 'severe_bleeding',
    label: 'Severe Bleeding / Hemorrhage',
    defaultSeverity: 'high',
    icon: 'droplet',
    color: '#9B111E',
    requiredSkills: ['first_aid', 'trauma']
  },
  choking: {
    type: 'choking',
    label: 'Choking Hazard',
    defaultSeverity: 'high',
    icon: 'user-x',
    color: '#E76F51',
    requiredSkills: ['choking', 'first_aid']
  },
  burn_injury: {
    type: 'burn_injury',
    label: 'Burn Injury',
    defaultSeverity: 'moderate',
    icon: 'flame',
    color: '#F3722C',
    requiredSkills: ['burn_response', 'first_aid']
  },
  unconscious_person: {
    type: 'unconscious_person',
    label: 'Unconscious Person',
    defaultSeverity: 'critical',
    icon: 'user-minus',
    color: '#457B9D',
    requiredSkills: ['cpr', 'first_aid']
  },
  fire_disaster: {
    type: 'fire_disaster',
    label: 'Fire / Disaster Scene',
    defaultSeverity: 'high',
    icon: 'shield-alert',
    color: '#B7094C',
    requiredSkills: ['disaster_response', 'search_rescue', 'burn_response']
  },
  general_medical: {
    type: 'general_medical',
    label: 'General Medical Assistance',
    defaultSeverity: 'moderate',
    icon: 'activity',
    color: '#2A9D8F',
    requiredSkills: ['first_aid']
  }
};
