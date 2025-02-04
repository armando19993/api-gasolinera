import { ROLE } from "@prisma/client";
import { IsNotEmpty, IsString, IsUUID, IsEnum, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    usuario: string;

    @IsString()
    @IsOptional()
    correo: string;

    @IsString()
    @IsNotEmpty()
    clave: string;

    @IsEnum(ROLE)
    @Transform(({ value }) => value.toUpperCase())
    role: ROLE;

    @IsUUID()
    @IsOptional()
    estacionServicioId?: string;
}