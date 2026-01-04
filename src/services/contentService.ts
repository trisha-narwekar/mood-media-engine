import { ContentType, Energy, Mood } from "../generate/client.js";
import { prisma } from '../db/prisma.js';
import 'dotenv/config';

type ContentQuery = {
  type?: ContentType;
  energy?: Energy;
  mood?: Mood;
  maxDuration?: number;
};

type RecommendInput = {
  mood?: Mood;
  energy?: Energy;
  duration?: number;
};

export const getFilteredContent = async (query: ContentQuery) => {
  return prisma.contentItem.findMany({
    where: {
      type: query.type,
      energy: query.energy,
      moods: query.mood
        ? { has: query.mood }
        : undefined,
      duration: query.maxDuration
        ? { lte: query.maxDuration }
        : undefined,
    },
  });
};

export const createContentItem = async (data: {
  title: string;
  type: ContentType;
  energy: Energy;
  moods: Mood[];
  duration: number;
}) => {
  return prisma.contentItem.create({ data });
};

export async function recommendContent(input: RecommendInput) {
  const items = await prisma.contentItem.findMany();

  return items
    .map(item => {
      let score = 0;

      if (input.mood && item.moods.includes(input.mood)) {
        score += 5;
      }

      if (input.energy && item.energy === input.energy) {
        score += 3;
      }

      if (input.duration) {
        score += item.duration <= input.duration ? 2 : -2;
      }

      return {
        ...item,
        recommendationScore: score,
      };
    })
    .filter(item => item.recommendationScore > 0)
    .sort((a, b) => b.recommendationScore - a.recommendationScore);
}