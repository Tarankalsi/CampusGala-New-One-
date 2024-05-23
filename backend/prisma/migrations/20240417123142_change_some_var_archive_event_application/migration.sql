/*
  Warnings:

  - You are about to drop the column `applicationId` on the `ArchivedEventApplication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArchivedEventApplication" DROP CONSTRAINT "ArchivedEventApplication_applicationId_fkey";

-- AlterTable
ALTER TABLE "ArchivedEventApplication" DROP COLUMN "applicationId";
