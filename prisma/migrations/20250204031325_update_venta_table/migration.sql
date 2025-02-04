/*
  Warnings:

  - You are about to drop the column `fechadespacho` on the `VentaCombustible` table. All the data in the column will be lost.
  - You are about to drop the column `litrosdespachados` on the `VentaCombustible` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VentaCombustible" DROP COLUMN "fechadespacho",
DROP COLUMN "litrosdespachados",
ADD COLUMN     "fechaDespacho" DATE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "litrosDespachados" INTEGER;
