export type PatientCategory = 'adult' | 'child' | 'infant' | 'animal_species';

export interface FirstAidStep {
  stepNumber: number;
  title: string;
  instruction: string;
  voiceText: string;
  warningText?: string;
  imageUrl?: string;
  doNotDoThis?: string[];
}

export interface EmergencyGuidanceProtocol {
  id: string;
  emergencyType: string;
  title: string;
  category: PatientCategory;
  summary: string;
  lastReviewedDate: string;
  reviewedBy: string;
  steps: FirstAidStep[];
  criticalWarnings: string[];
}
