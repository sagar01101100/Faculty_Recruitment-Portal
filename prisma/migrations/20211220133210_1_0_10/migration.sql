/*
  Warnings:

  - You are about to drop the column `completed` on the `FieldGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "completedFieldGroupId" INTEGER;

-- AlterTable
ALTER TABLE "FieldGroup" DROP COLUMN "completed";

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_completedFieldGroupId_fkey" FOREIGN KEY ("completedFieldGroupId") REFERENCES "FieldGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
