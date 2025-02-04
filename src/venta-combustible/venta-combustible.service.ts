import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVentaCombustibleDto } from './dto/create-venta-combustible.dto';
import { UpdateVentaCombustibleDto } from './dto/update-venta-combustible.dto';
import { PrismaService } from 'src/prisma/prisma.servise';

@Injectable()
export class VentaCombustibleService {

  constructor(private prisma: PrismaService) { }

  async create(createVentaCombustibleDto: CreateVentaCombustibleDto) {
    const { carPlaca } = createVentaCombustibleDto;

    const lastVenta = await this.prisma.ventaCombustible.findFirst({
      where: {
        carPlaca: carPlaca,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    const vehiculo = await this.prisma.car.findFirst({
      where: {
        placa: carPlaca,
      },
    });

    if (lastVenta) {
      const lastVentaDate = lastVenta.createdAt;
      const currentDate = new Date();

      const timeDifferenceInHours = Math.abs(currentDate.getTime() - lastVentaDate.getTime()) / (1000 * 60 * 60);

      const hoursLimit = parseInt(process.env.HORAS);

      if (timeDifferenceInHours < hoursLimit) {
        throw new BadRequestException(`No se puede registrar la venta. La última venta fue hace ${timeDifferenceInHours.toFixed(2)} horas.`);
      }
    }

    if (Number(createVentaCombustibleDto.litrosDespachados) > Number(vehiculo.maxLitros)) {
      throw new BadRequestException(`No se puede registrar la venta. La cantidad de litros excede el máximo permitido.`);
    }

    const data = await this.prisma.ventaCombustible.create({
      data: {
        litrosDespachados: createVentaCombustibleDto.litrosDespachados,
        estacionServicioId: createVentaCombustibleDto.estacionServicioId,
        propietarioCedula: createVentaCombustibleDto.propietarioCedula,
        carPlaca: createVentaCombustibleDto.carPlaca,
      },
    });

    return { data, message: 'Venta de combustible registrada correctamente' };
  }

  async findAll(query, user) {
    const { propietarioCedula, carPlaca, estacionServicioId, fechaInicio, fechaFin, usoCarId, tipoCarId } = query;
    console.log(query)

    let whereClause: any = {};
    if (user.role === 'DESPACHADOR' || user.role === 'ADMINISTRADOR') {
      whereClause.estacionServicioId = user.estacionServicioId
    }

    if (propietarioCedula) {
      whereClause.propietarioCedula = parseInt(propietarioCedula);
    }
    if (carPlaca) {
      whereClause.carPlaca = carPlaca;
    }
    if (estacionServicioId) {
      whereClause.estacionServicioId = estacionServicioId;
    }

    if (fechaInicio) {
      const startDate = new Date(`${fechaInicio}T00:00:00.000Z`); // Asegura UTC
      let endDate;

      if (fechaFin) {
        endDate = new Date(`${fechaFin}T23:59:59.999Z`); // Asegura UTC
      } else {
        endDate = new Date(`${fechaInicio}T23:59:59.999Z`); // Mismo día hasta final
      }

      whereClause.fechaDespacho = {
        gte: startDate,
        lte: endDate,
      };
    }


    if (usoCarId || tipoCarId) {
      whereClause.car = {};
      if (usoCarId) {
        whereClause.car.usoCarId = parseInt(usoCarId);
      }
      if (tipoCarId) {
        whereClause.car.tipoCarId = parseInt(tipoCarId);
      }
    }

    console.log('Where clause:', JSON.stringify(whereClause, null, 2));

    const data = await this.prisma.ventaCombustible.findMany({
      where: whereClause,
      include: {
        propietario: true,
        estacionServicio: true,
        car: {
          include: {
            tipoCar: true,
            usoCar: true
          }
        },
      },
    });

    const totalRegistros = data.length;
    const totalLitrosDespachados = data.reduce((total, venta) => total + (venta.litrosDespachados || 0), 0);

    return {
      data,
      totalRegistros,
      totalLitrosDespachados,
      message: 'Listado de ventas de combustible',
    };
  }

  async findOne(id: number) {
    return `This action returns a #${id} ventaCombustible`;
  }
}
