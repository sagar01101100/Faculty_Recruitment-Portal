/*
  Warnings:

  - You are about to drop the `EducationalDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmploymentDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EducationalDetails" DROP CONSTRAINT "EducationalDetails_entryId_fkey";

-- DropForeignKey
ALTER TABLE "EmploymentDetails" DROP CONSTRAINT "EmploymentDetails_entryId_fkey";

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "entryId" INTEGER;

-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "fieldId" INTEGER;

-- DropTable
DROP TABLE "EducationalDetails";

-- DropTable
DROP TABLE "EmploymentDetails";

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
