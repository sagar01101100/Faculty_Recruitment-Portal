/*
  Warnings:

  - You are about to drop the column `completedFieldGroupId` on the `Field` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_completedFieldGroupId_fkey";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "completedFieldGroupId";
