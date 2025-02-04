import { Injectable } from '@nestjs/common';
import { CreateTipoCarDto } from './dto/create-tipo-car.dto';
import { UpdateTipoCarDto } from './dto/update-tipo-car.dto';
import { PrismaService } from 'src/prisma/prisma.servise';

@Injectable()
export class TipoCarService {

  constructor(private prisma: PrismaService) { }

  async create(createTipoCarDto: CreateTipoCarDto) {
    const data = await this.prisma.tipoCar.create({
      data: createTipoCarDto
    })

    return { data, message: 'Tipo de vehiculo creado' }
  }

  async findAll() {
    const data = await this.prisma.tipoCar.findMany()

    return { data, message: 'Tipos de vehiculos' }
  }

  async findOne(id: number) {
    return `This action returns a #${id} tipoCar`;
  }

  update(id: number, updateTipoCarDto: UpdateTipoCarDto) {
    return `This action updates a #${id} tipoCar`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoCar`;
  }
}
