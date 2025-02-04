-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('DESPACHADOR', 'ADMINISTRADOR', 'CENSADOR', 'REPORTER', 'SUPERADMIN');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "publicId" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'REPORTER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estacionServicioId" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoCar" (
    "id_tip" SERIAL NOT NULL,
    "name_tip" TEXT,

    CONSTRAINT "TipoCar_pkey" PRIMARY KEY ("id_tip")
);

-- CreateTable
CREATE TABLE "UsoCar" (
    "id_uso" SERIAL NOT NULL,
    "name_uso" TEXT DEFAULT 'Particular',

    CONSTRAINT "UsoCar_pkey" PRIMARY KEY ("id_uso")
);

-- CreateTable
CREATE TABLE "EstacionServicio" (
    "id" TEXT NOT NULL,
    "publicId" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstacionServicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propietario" (
    "cedula" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "placa" TEXT DEFAULT '0',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Propietario_pkey" PRIMARY KEY ("cedula")
);

-- CreateTable
CREATE TABLE "Car" (
    "placa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "maxLitros" DECIMAL(10,2) NOT NULL,
    "codigo_car" TEXT DEFAULT '0',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "usoCarId" INTEGER NOT NULL,
    "tipoCarId" INTEGER NOT NULL,
    "propietarioCedula" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("placa")
);

-- CreateTable
CREATE TABLE "VentaCombustible" (
    "id" SERIAL NOT NULL,
    "litrosdespachados" INTEGER,
    "fechadespacho" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "estacionServicioId" TEXT NOT NULL,
    "propietarioCedula" INTEGER NOT NULL,
    "carPlaca" TEXT NOT NULL,

    CONSTRAINT "VentaCombustible_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_publicId_key" ON "Users"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "EstacionServicio_publicId_key" ON "EstacionServicio"("publicId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_estacionServicioId_fkey" FOREIGN KEY ("estacionServicioId") REFERENCES "EstacionServicio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_usoCarId_fkey" FOREIGN KEY ("usoCarId") REFERENCES "UsoCar"("id_uso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_tipoCarId_fkey" FOREIGN KEY ("tipoCarId") REFERENCES "TipoCar"("id_tip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_propietarioCedula_fkey" FOREIGN KEY ("propietarioCedula") REFERENCES "Propietario"("cedula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaCombustible" ADD CONSTRAINT "VentaCombustible_estacionServicioId_fkey" FOREIGN KEY ("estacionServicioId") REFERENCES "EstacionServicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaCombustible" ADD CONSTRAINT "VentaCombustible_propietarioCedula_fkey" FOREIGN KEY ("propietarioCedula") REFERENCES "Propietario"("cedula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentaCombustible" ADD CONSTRAINT "VentaCombustible_carPlaca_fkey" FOREIGN KEY ("carPlaca") REFERENCES "Car"("placa") ON DELETE RESTRICT ON UPDATE CASCADE;
