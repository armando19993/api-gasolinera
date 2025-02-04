import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.servise';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const validate = await this.prisma.users.findFirst({
      where: {
        usuario: createUserDto.usuario
      }
    })

    if (validate) {
      throw new BadRequestException("Usuario ya existe")
    }

    const hashedPassword = await bcrypt.hash(createUserDto.clave, 10);

    const user = await this.prisma.users.create({
      data:
      {
        nombre: createUserDto.nombre,
        usuario: createUserDto.usuario,
        correo: createUserDto.correo,
        clave: hashedPassword,
        role: createUserDto.role,
        estacionServicioId: createUserDto.estacionServicioId,
      }
    })

    return { data: user, message: 'Usuario Creado con exito!' }
  }

  async findAll() {
    const data = await this.prisma.users.findMany({include: {
      estacionServicio: true
    }})

    return { data, message: 'Listado de usuarios obtenido con exito!' }
  }

  async findOne(id: string) {
    const data = await this.prisma.users.findUnique({ where: { id } })

    return { data, message: 'Usuario obtenido con exito!' }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
      include: {
        estacionServicio: true
      }
    })

    if (updateUserDto.clave) {
      const hashedPassword = await bcrypt.hash(updateUserDto.clave, 10);
      await this.prisma.users.update({
        where: { id },
        data: {
          clave: hashedPassword
        }
      })
    }

    return { data, message: 'Usuario actualizado con exito!' }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
