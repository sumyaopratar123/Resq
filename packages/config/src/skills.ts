import { ResponderSkill } from '@resq/types';

export interface SkillMeta {
  key: ResponderSkill;
  name: string;
  description: string;
  category: 'medical' | 'rescue' | 'trauma';
}

export const SKILL_REGISTRY: Record<ResponderSkill, SkillMeta> = {
  cpr: {
    key: 'cpr',
    name: 'CPR (Cardiopulmonary Resuscitation)',
    description: 'Certified in chest compressions and rescue breath delivery',
    category: 'medical'
  },
  first_aid: {
    key: 'first_aid',
    name: 'Basic First Aid',
    description: 'Basic wound dressing, bandaging, and vital stabilization',
    category: 'medical'
  },
  trauma: {
    key: 'trauma',
    name: 'Trauma & Bleeding Control',
    description: 'Tourniquet application, pressure dressing, spinal immobilization',
    category: 'trauma'
  },
  aed: {
    key: 'aed',
    name: 'AED Operation',
    description: 'Automated External Defibrillator setup and discharge',
    category: 'medical'
  },
  choking: {
    key: 'choking',
    name: 'Choking & Airway Relief',
    description: 'Heimlich maneuver and abdominal thrusts across age groups',
    category: 'medical'
  },
  burn_response: {
    key: 'burn_response',
    name: 'Burn Treatment & Cooling',
    description: 'Thermal, chemical, and electrical burn care',
    category: 'trauma'
  },
  search_rescue: {
    key: 'search_rescue',
    name: 'Search & Community Rescue',
    description: 'Debris clearance, victim extraction, and structural search',
    category: 'rescue'
  },
  disaster_response: {
    key: 'disaster_response',
    name: 'Disaster Relief Coordination',
    description: 'Flood, earthquake, and mass casualty response triage',
    category: 'rescue'
  }
};
