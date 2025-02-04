import { Injectable } from '@nestjs/common';
import { CreatePropietarioDto } from './dto/create-propietario.dto';
import { UpdatePropietarioDto } from './dto/update-propietario.dto';
import { PrismaService } from 'src/prisma/prisma.servise';

@Injectable()
export class PropietarioService {

  constructor(private prisma: PrismaService) { }

  async create(createPropietarioDto: CreatePropietarioDto, user) {
    const validate = await this.prisma.propietario.findFirst({
      where: {
        cedula: createPropietarioDto.cedula
      }
    })

    if (validate) {
      throw new Error('El propietario ya existe')
    }

    const data = await this.prisma.propietario.create({
      data: {
        cedula: createPropietarioDto.cedula,
        nombre: createPropietarioDto.nombre,
        apellido: createPropietarioDto.apellido,
        direccion: createPropietarioDto.direccion,
        telefono: createPropietarioDto.telefono,
        correo: createPropietarioDto.correo ? createPropietarioDto.correo : null,
        usersId: user.id
      }
    })

    return { data, message: 'Propietario creado con exito!' }
  }

  async findAll() {
    const data = await this.prisma.propietario.findMany({ include: { registrador: true, cars: true } })

    return { data, message: 'Propietarios obtenidos con exito!' }
  }

  async findOne(cedula: number) {
    const data = await this.prisma.propietario.findUnique({
      where: {
        cedula
      },
      include: {
        ventas: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    return { data, message: 'Propietario obtenido con exito!' }
  }

  async update(cedula: string, updatePropietarioDto: UpdatePropietarioDto) {
    const data = await this.prisma.propietario.update({
      where: { cedula: Number(cedula) },
      data: updatePropietarioDto,
    })

    return { data, message: 'Propietario actualizado con exito!' }
  }

  remove(id: string) {
    return `This action removes a #${id} propietario`;
  }
}
