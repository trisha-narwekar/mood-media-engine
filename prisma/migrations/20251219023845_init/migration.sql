-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('MUSIC', 'READING', 'GAME', 'OFFLINE_ACTIVITY');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('ANXIOUS', 'BORED', 'FOCUSED', 'SAD', 'NOSTALGIC');

-- CreateEnum
CREATE TYPE "Feedback" AS ENUM ('UP', 'DOWN');

-- CreateTable
CREATE TABLE "ContentItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "energy" "Energy" NOT NULL,
    "moods" "Mood"[],
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "mood" "Mood" NOT NULL,
    "energy" "Energy" NOT NULL,
    "timeAvailable" INTEGER NOT NULL,
    "chosenItemId" TEXT NOT NULL,
    "feedback" "Feedback",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
