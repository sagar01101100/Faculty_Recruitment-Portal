-- AlterTable
ALTER TABLE "Referral" ADD COLUMN     "submitted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ReferralEntry" ADD COLUMN     "FileId" TEXT;

-- AlterTable
ALTER TABLE "ReferralField" ADD COLUMN     "allowFile" BOOLEAN NOT NULL DEFAULT false;
