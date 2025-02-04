/*
  Warnings:

  - Added the required column `updatedAt` to the `TipoCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UsoCar` table without a default value. This is not possible if the table is not empty.
  - Made the column `nombre` on table `UsoCar` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TipoCar" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UsoCar" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "nombre" DROP DEFAULT;
