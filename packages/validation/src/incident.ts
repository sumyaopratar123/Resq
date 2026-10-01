import { z } from 'zod';

export const incidentCreationSchema = z.object({
  emergencyType: z.enum([
    'road_accident',
    'cardiac_emergency',
    'breathing_difficulty',
    'severe_bleeding',
    'choking',
    'burn_injury',
    'unconscious_person',
    'fire_disaster',
    'general_medical'
  ]),
  severity: z.enum(['critical', 'high', 'moderate', 'low']),
  locationText: z.string().min(3, 'Location description is required'),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number()
    })
    .optional(),
  requiredSkills: z.array(z.string()).default([]),
  patientState: z.string().optional(),
  bleeding: z.boolean().default(false)
});
