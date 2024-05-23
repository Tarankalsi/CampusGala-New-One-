/*
  Warnings:

  - Made the column `eventName` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `collegeName` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventType` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventDescription` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventDate` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ticketPrice` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `venue` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber1` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "coverImage" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "eventName" SET NOT NULL,
ALTER COLUMN "collegeName" SET NOT NULL,
ALTER COLUMN "eventType" SET NOT NULL,
ALTER COLUMN "eventDescription" SET NOT NULL,
ALTER COLUMN "eventDate" SET NOT NULL,
ALTER COLUMN "ticketPrice" SET NOT NULL,
ALTER COLUMN "venue" SET NOT NULL,
ALTER COLUMN "phoneNumber1" SET NOT NULL;
