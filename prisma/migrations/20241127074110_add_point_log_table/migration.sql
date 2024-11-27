-- CreateEnum
CREATE TYPE "PointAction" AS ENUM ('INITIAL_POINT', 'PURCHASE', 'SALE', 'RANDOM_REWARD');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastDrawTime" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "PointLog" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "action" "PointAction" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PointLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PointLog" ADD CONSTRAINT "PointLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
