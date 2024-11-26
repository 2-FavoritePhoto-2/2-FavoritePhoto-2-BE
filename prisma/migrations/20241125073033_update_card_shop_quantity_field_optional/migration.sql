/*
  Warnings:

  - Made the column `quantity` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remainingQuantity` on table `Shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalQuantity` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "quantity" SET NOT NULL;

-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "remainingQuantity" SET NOT NULL,
ALTER COLUMN "totalQuantity" SET NOT NULL;
