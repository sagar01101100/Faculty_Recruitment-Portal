-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "allowFile" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "FieldGroup" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
