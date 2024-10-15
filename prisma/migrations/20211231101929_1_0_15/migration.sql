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
