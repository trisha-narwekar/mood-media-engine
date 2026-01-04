import { z } from 'zod';

export const createContentItemSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['MUSIC', 'READING', 'GAME', 'OFFLINE_ACTIVITY']),
  energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  moods: z.array(z.string()).min(1),
  duration: z.number().min(1).max(120),
});

export const contentQuerySchema = z.object({
  mood: z.string().optional(),
  energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  duration: z.coerce.number().optional(),
});
