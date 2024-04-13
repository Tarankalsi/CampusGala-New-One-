/*
  Warnings:

  - Added the required column `status` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "otp" SET DATA TYPE TEXT;
