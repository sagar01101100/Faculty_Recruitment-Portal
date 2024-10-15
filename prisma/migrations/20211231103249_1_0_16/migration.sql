/*
  Warnings:

  - You are about to drop the `TemplateEntries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TemplateEntries" DROP CONSTRAINT "TemplateEntries_fieldId_fkey";

-- DropTable
DROP TABLE "TemplateEntries";
