/*
  Warnings:

  - You are about to drop the column `uploaderId` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_uploaderId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "uploaderId";
