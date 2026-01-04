import { Request, Response } from 'express';
import { recommendContent } from '../services/contentService.js';
import { contentQuerySchema } from '../validators/contentQuery.js';

export const getContentItems = async (req: Request, res: Response) => {
  const parsed = contentQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const results = await recommendContent({
      mood: parsed.data.mood,
      energy: parsed.data.energy,
      duration: parsed.data.maxDuration,
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to recommend content' });
  }
};
