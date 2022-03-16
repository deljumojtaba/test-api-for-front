/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "inviteCode" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER';

-- CreateIndex
CREATE UNIQUE INDEX "users_mobile_key" ON "users"("mobile");
