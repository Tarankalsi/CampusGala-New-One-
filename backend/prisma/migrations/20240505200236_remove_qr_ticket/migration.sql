/*
  Warnings:

  - You are about to drop the column `qrCode` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Ticket_qrCode_key";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "qrCode";
