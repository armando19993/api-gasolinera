/*
  Warnings:

  - You are about to drop the column `nombe` on the `UsoCar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsoCar" DROP COLUMN "nombe",
ADD COLUMN     "nombre" TEXT DEFAULT 'Particular';
