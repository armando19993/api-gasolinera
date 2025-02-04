import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma/prisma.servise';

@Injectable()
export class CarService {

  constructor(private prisma: PrismaService) { }

  async create(createCarDto: CreateCarDto) {
    const validate = await this.prisma.car.findFirst({
      where: {
        placa: createCarDto.placa
      }
    })

    if (validate) {
      throw new ConflictException('El carro ya existe')
    }

    const data = await this.prisma.car.create({
      data: createCarDto
    })

    return { data, message: 'Carro creado con exito!' }
  }

  async findAll(query) {
    const { registradorId, propietarioCedula, tipoCarId, usoCarId, placa } = query;

    // Construir el objeto `where` dinámicamente
    const whereClause: any = {};

    if (placa) {
      whereClause.placa = placa; // Filtra por placa exacta
    }
    if (propietarioCedula) {
      whereClause.propietarioCedula = parseInt(propietarioCedula); // Filtra por cédula del propietario
    }
    if (tipoCarId) {
      whereClause.tipoCarId = parseInt(tipoCarId); // Filtra por tipo de carro
    }
    if (usoCarId) {
      whereClause.usoCarId = parseInt(usoCarId); // Filtra por uso de carro
    }
    if (registradorId) {
      whereClause.registradorId = parseInt(registradorId); // Filtra por registrador (si existe en el modelo)
    }

    // Realizar la consulta a la base de datos
    const cars = await this.prisma.car.findMany({
      where: whereClause,
      include: {
        usoCar: true,
        tipoCar: true,
        propietario: true,
        ventas: true,
      },
    });

    return { data: cars, message: 'Coches obtenidos con éxito!' };
  }

  async findOne(placa) {
    const data = await this.prisma.car.findFirst({
      where: { placa: placa.toUpperCase() },
      include: {
        usoCar: true,
        tipoCar: true,
        propietario: true,
        ventas: {
          orderBy: {
            id: 'desc'
          },
          take: 1
        },
      },
    })

    if (!data) {
      throw new ConflictException('El carro no existe')
    }

    return { data, message: 'Carro obtenido con exito!' }
  }

  async update(placa: string, updateCarDto: UpdateCarDto) {
    const data = await this.prisma.car.update({
      where: { placa: placa },
      data: updateCarDto
    })

    return { data, message: 'Carro actualizado con exito!' }
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
