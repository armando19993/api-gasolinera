import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateVentaCombustibleDto {
    @IsNumber()
    @IsNotEmpty()
    litrosDespachados: number

    @IsUUID()
    @IsNotEmpty()
    estacionServicioId: string

    @IsNotEmpty()
    @IsNumber()
    propietarioCedula: number

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.toUpperCase())
    carPlaca: string
}