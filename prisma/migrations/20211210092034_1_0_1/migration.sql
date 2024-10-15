-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "options" TEXT[];

-- CreateTable
CREATE TABLE "EducationalDetails" (
    "id" SERIAL NOT NULL,
    "institute" TEXT NOT NULL,
    "doe" TIMESTAMP(3) NOT NULL,
    "dol" TIMESTAMP(3) NOT NULL,
    "board" TEXT NOT NULL,
    "examdegdip" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "subjects" TEXT[],
    "marks" DOUBLE PRECISION NOT NULL,
    "yop" INTEGER NOT NULL,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "EducationalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentDetails" (
    "id" SERIAL NOT NULL,
    "orginst" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "work" TEXT NOT NULL,
    "doj" TIMESTAMP(3) NOT NULL,
    "dol" TIMESTAMP(3) NOT NULL,
    "payscale" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT NOT NULL,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "EmploymentDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EducationalDetails" ADD CONSTRAINT "EducationalDetails_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentDetails" ADD CONSTRAINT "EmploymentDetails_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
