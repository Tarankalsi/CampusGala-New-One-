/*
  Warnings:

  - The primary key for the `ArchivedEventApplication` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ArchivedEventApplication" DROP CONSTRAINT "ArchivedEventApplication_pkey",
ADD COLUMN     "archiveApplicationId" SERIAL NOT NULL,
ALTER COLUMN "applicationId" DROP DEFAULT,
ADD CONSTRAINT "ArchivedEventApplication_pkey" PRIMARY KEY ("archiveApplicationId");
DROP SEQUENCE "ArchivedEventApplication_applicationId_seq";

-- AddForeignKey
ALTER TABLE "ArchivedEventApplication" ADD CONSTRAINT "ArchivedEventApplication_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "EventApplication"("applicationId") ON DELETE RESTRICT ON UPDATE CASCADE;
