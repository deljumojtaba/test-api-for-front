-- AlterTable
ALTER TABLE "order" ADD COLUMN     "resturantId" TEXT;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_resturantId_fkey" FOREIGN KEY ("resturantId") REFERENCES "resturants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
