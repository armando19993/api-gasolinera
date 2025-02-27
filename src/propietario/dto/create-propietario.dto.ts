import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class CreatePropietarioDto {
    @IsNotEmpty()
    @Transform((value) => Number(value.value))
    cedula: number

    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsString()
    @IsNotEmpty()
    apellido: string

    @IsString()
    @IsNotEmpty()
    direccion: string

    @IsString()
    @IsNotEmpty()
    telefono: string

    @IsOptional()
    @IsEmail()
    correo: string
}
