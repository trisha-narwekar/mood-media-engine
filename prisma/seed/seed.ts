import { PrismaClient } from '../../src/generate/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.contentItem.createMany({
    data: [
      { title: 'Lo-fi Evening', type: 'MUSIC', energy: 'LOW', moods: ['ANXIOUS','SAD'], duration: 15 },
      { title: '5-Minute Journal Reset', type: 'OFFLINE_ACTIVITY', energy: 'LOW', moods: ['ANXIOUS','BORED'], duration: 5 },
      { title: 'Short Sci-Fi Essay', type: 'READING', energy: 'MEDIUM', moods: ['FOCUSED','NOSTALGIC'], duration: 10 },
      { title: 'Cozy Puzzle Game', type: 'GAME', energy: 'MEDIUM', moods: ['BORED'], duration: 15 },
    ],
  });
  console.log('Seeded 🌱');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
