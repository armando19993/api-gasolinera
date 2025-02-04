import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.servise";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async login(data) {
    let { usuario, clave } = data;
    const val = await this.prisma.users.findFirst({
      where: { usuario },
      include: {
        estacionServicio: true
      }
    });

    if (!val)
      throw new BadRequestException(
        "Usuario no existe en nuestra base de datos"
      );

    const isPasswordValid = await bcrypt.compare(clave, val.clave);
    if (!isPasswordValid)
      throw new BadRequestException("Contraseña incorrecta");

    const token = await this.jwtService.signAsync(val);

    return {
      data: val,
      token,
      message: "Usuario a iniciado sesion correctamente!",
    };
  }
}
