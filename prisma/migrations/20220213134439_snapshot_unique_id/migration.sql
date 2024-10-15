/*
  Warnings:

  - The primary key for the `Snapshot` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_snapshotId_fkey";

-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "snapshotId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Snapshot" DROP CONSTRAINT "Snapshot_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Snapshot_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Snapshot_id_seq";

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
