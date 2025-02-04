import { Injectable } from '@nestjs/common';
import { CreateUsoCarDto } from './dto/create-uso-car.dto';
import { UpdateUsoCarDto } from './dto/update-uso-car.dto';
import { PrismaService } from 'src/prisma/prisma.servise';

@Injectable()
export class UsoCarService {

  constructor(private prisma: PrismaService) { }

  async create(createUsoCarDto: CreateUsoCarDto) {
    const data = await this.prisma.usoCar.create({
      data: createUsoCarDto
    })

    return { data, message: 'Uso de carro creado correctamente' }
  }

  async findAll() {
    const data = await this.prisma.usoCar.findMany()

    return { data, message: 'Lista de usos de carro' }
  }

  async findOne(id: number) {
    return `This action returns a #${id} usoCar`;
  }

  async update(id: number, updateUsoCarDto: UpdateUsoCarDto) {
    const data = await this.prisma.usoCar.update({
      where: { id: Number(id) },
      data: updateUsoCarDto
    })

    return { data, message: 'Uso de carro actualizado correctamente' }
  }

  async remove(id: number) {
    return `This action removes a #${id} usoCar`;
  }
}
