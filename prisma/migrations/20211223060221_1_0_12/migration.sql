/*
  Warnings:

  - You are about to drop the column `FileId` on the `ReferralEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReferralEntry" DROP COLUMN "FileId",
ADD COLUMN     "isFile" BOOLEAN NOT NULL DEFAULT false;
