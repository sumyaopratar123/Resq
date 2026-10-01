import { z } from 'zod';

export const citizenRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  emergencyContact: z.string().optional(),
  bloodGroup: z.string().optional()
});

export const responderRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  certificationId: z.string().min(3, 'Certification ID is required'),
  experienceYears: z.number().min(0, 'Experience must be 0 or more years'),
  emergencyContact: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});
