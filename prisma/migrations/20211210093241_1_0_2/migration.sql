/*
  Warnings:

  - You are about to drop the column `options` on the `Field` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Field" DROP COLUMN "options",
ADD COLUMN     "choices" TEXT[];
