/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Admin_mobileNumber_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";
