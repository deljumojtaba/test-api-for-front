/*
  Warnings:

  - You are about to drop the column `orderId` on the `items` table. All the data in the column will be lost.
  - You are about to drop the `item_order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item_resturant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "item_order" DROP CONSTRAINT "item_order_itemId_fkey";

-- DropForeignKey
ALTER TABLE "item_order" DROP CONSTRAINT "item_order_orderId_fkey";

-- DropForeignKey
ALTER TABLE "item_resturant" DROP CONSTRAINT "item_resturant_itemId_fkey";

-- DropForeignKey
ALTER TABLE "item_resturant" DROP CONSTRAINT "item_resturant_resturantId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_resturantId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_userId_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "orderId";

-- DropTable
DROP TABLE "item_order";

-- DropTable
DROP TABLE "item_resturant";

-- DropTable
DROP TABLE "order";

-- CreateTable
CREATE TABLE "orders" (
    "number" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "resturantId" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_number_key" ON "orders"("number");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToOrder_AB_unique" ON "_ItemToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToOrder_B_index" ON "_ItemToOrder"("B");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_resturantId_fkey" FOREIGN KEY ("resturantId") REFERENCES "resturants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
