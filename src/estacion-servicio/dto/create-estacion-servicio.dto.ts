import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEstacionServicioDto {
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsOptional()
    telefono: string

    @IsString()
    @IsOptional()
    parroquia: string
}
