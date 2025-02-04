import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstacionServicioDto } from './dto/create-estacion-servicio.dto';
import { UpdateEstacionServicioDto } from './dto/update-estacion-servicio.dto';
import { PrismaService } from 'src/prisma/prisma.servise';

@Injectable()
export class EstacionServicioService {

  constructor(private prisma: PrismaService) { }

  async create(createEstacionServicioDto: CreateEstacionServicioDto) {
    const validate = await this.prisma.estacionServicio.findFirst({
      where: {
        nombre: createEstacionServicioDto.nombre
      }
    })

    if (validate) {
      throw new BadRequestException("Esta estacion de servicio ya existe!")
    }

    const data = await this.prisma.estacionServicio.create({ data: createEstacionServicioDto })
    return { data, message: 'Estacion de servicio creada con exito!' }
  }

  async findAll() {
    const data = await this.prisma.estacionServicio.findMany()

    return { data, message: 'Estaciones de servicio obtenidas con exito!' }
  }

  async findOne(id: string) {
    const data = await this.prisma.estacionServicio.findFirst({
      where: {
        id
      }
    })

    if (!data) {
      throw new NotFoundException("Registro no Encontrado!")
    }

    return { data, message: 'Estacion de Servicio Obtenido con exito!' }
  }

  async update(id: string, updateEstacionServicioDto: UpdateEstacionServicioDto) {
    const data = await this.prisma.estacionServicio.update({
      where: { id },
      data: updateEstacionServicioDto
    })

    return { data, message: 'Estacion de servicio actualizada con exito!' }
  }

  async remove(id: string) {
    return `This action removes a #${id} estacionServicio`;
  }
}
