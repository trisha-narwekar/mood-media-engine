import { z } from 'zod';

export const recommendSchema = z.object({
  mood: z.string().optional(),
  energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  duration: z.coerce.number(),
});