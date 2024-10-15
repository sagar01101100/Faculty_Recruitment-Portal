/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Referral_userId_key";

-- AlterTable
ALTER TABLE "Referral" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Referral_email_key" ON "Referral"("email");
