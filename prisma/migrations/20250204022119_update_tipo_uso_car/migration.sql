/*
  Warnings:

  - The primary key for the `TipoCar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_tip` on the `TipoCar` table. All the data in the column will be lost.
  - You are about to drop the column `name_tip` on the `TipoCar` table. All the data in the column will be lost.
  - The primary key for the `UsoCar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_uso` on the `UsoCar` table. All the data in the column will be lost.
  - You are about to drop the column `name_uso` on the `UsoCar` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_tipoCarId_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_usoCarId_fkey";

-- AlterTable
ALTER TABLE "TipoCar" DROP CONSTRAINT "TipoCar_pkey",
DROP COLUMN "id_tip",
DROP COLUMN "name_tip",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "nombre" TEXT,
ADD CONSTRAINT "TipoCar_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UsoCar" DROP CONSTRAINT "UsoCar_pkey",
DROP COLUMN "id_uso",
DROP COLUMN "name_uso",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "nombe" TEXT DEFAULT 'Particular',
ADD CONSTRAINT "UsoCar_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_usoCarId_fkey" FOREIGN KEY ("usoCarId") REFERENCES "UsoCar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_tipoCarId_fkey" FOREIGN KEY ("tipoCarId") REFERENCES "TipoCar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
