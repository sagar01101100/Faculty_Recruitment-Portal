/*
  Warnings:

  - You are about to drop the column `Required` on the `Field` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "Required";

-- CreateTable
CREATE TABLE "TemplateEntries" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fieldId" INTEGER,
    "isFile" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TemplateEntries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TemplateEntries" ADD CONSTRAINT "TemplateEntries_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE SET NULL ON UPDATE CASCADE;
