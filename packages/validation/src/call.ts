import { z } from 'zod';

export const callExtractionSchema = z.object({
  emergencyType: z.object({
    value: z.string(),
    confidence: z.number()
  }),
  severity: z.object({
    value: z.string(),
    confidence: z.number()
  }),
  patientState: z.object({
    value: z.string(),
    confidence: z.number()
  }),
  bleeding: z.object({
    value: z.boolean(),
    confidence: z.number()
  }),
  location: z.object({
    text: z.string(),
    confidence: z.number()
  }),
  requiredSkills: z.array(z.string())
});
