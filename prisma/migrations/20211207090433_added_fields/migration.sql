/*
  Warnings:

  - You are about to drop the column `file` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Entry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fieldId]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "file",
DROP COLUMN "title",
ADD COLUMN     "fieldId" INTEGER;

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entry_fieldId_key" ON "Entry"("fieldId");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE SET NULL ON UPDATE CASCADE;
