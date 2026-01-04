import { Mood } from 'src/generate/enums.js';
import { prisma } from '../db/prisma.js';

type RecommendInput = {
    mood: Mood;
    energy: 'LOW' | 'MEDIUM' | 'HIGH' | undefined;
    duration: number;
}

export async function recommendContent(input: RecommendInput) {
    const items = await prisma.contentItem.findMany();

    return items
    .map(item => {
        let score = 0;

        if (item.moods.includes(input.mood)) score += 5;
        if (item.energy === input.energy) score += 3;
        if (item.duration <= input.duration) score += 2;
        else score -= 2;

        return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
    }