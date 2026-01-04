import { z } from 'zod';
import { ContentType, Energy, Mood } from '../generate/client.js';

export const contentQuerySchema = z.object({
  type: z.nativeEnum(ContentType).optional(),
  energy: z.nativeEnum(Energy).optional(),
  mood: z.nativeEnum(Mood).optional(),
  maxDuration: z.coerce.number().optional(),
});
