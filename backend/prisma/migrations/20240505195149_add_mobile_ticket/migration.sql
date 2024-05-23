/*
  Warnings:

  - Added the required column `mobileNumber` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "mobileNumber" INTEGER NOT NULL,
ALTER COLUMN "ticketType" SET DEFAULT 'general',
ALTER COLUMN "checkInStatus" SET DEFAULT '';
