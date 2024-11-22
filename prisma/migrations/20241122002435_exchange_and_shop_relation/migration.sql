-- AlterTable
ALTER TABLE "Exchange" ADD COLUMN     "shopId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "point" SET DEFAULT 50;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
