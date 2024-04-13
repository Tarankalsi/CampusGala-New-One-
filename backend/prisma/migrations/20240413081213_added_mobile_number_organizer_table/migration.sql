/*
  Warnings:

  - A unique constraint covering the columns `[organizerUsername]` on the table `Organizer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mobileNumber` to the `Organizer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organizer" ADD COLUMN     "mobileNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_organizerUsername_key" ON "Organizer"("organizerUsername");
