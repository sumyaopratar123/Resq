import { z } from 'zod';

export const responderVerificationSchema = z.object({
  responderUid: z.string(),
  status: z.enum(['verified', 'rejected', 'suspended']),
  reason: z.string().optional()
});

export const locationUpdateSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  heading: z.number().optional(),
  speed: z.number().optional()
});
