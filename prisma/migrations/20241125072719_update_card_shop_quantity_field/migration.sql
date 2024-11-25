/*
  Warnings:

  - You are about to drop the column `remainingQuantity` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `totalQuantity` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "remainingQuantity",
DROP COLUMN "totalQuantity",
ADD COLUMN     "quantity" INTEGER;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "quantity",
ADD COLUMN     "remainingQuantity" INTEGER,
ADD COLUMN     "totalQuantity" INTEGER;
