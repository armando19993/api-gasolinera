import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase()) // Convierte a mayúsculas
    placa: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase()) // Convierte a mayúsculas
    marca: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase()) // Convierte a mayúsculas
    modelo: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase()) // Convierte a mayúsculas
    serial: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase()) // Convierte a mayúsculas
    color: string;

    @IsNumber()
    @IsNotEmpty()
    maxLitros: number;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toUpperCase()) // Convierte a mayúsculas
    codigo_car: string;

    @IsNumber()
    @IsNotEmpty()
    usoCarId: number;

    @IsNumber()
    @IsNotEmpty()
    tipoCarId: number;

    @IsNumber()
    @IsNotEmpty()
    propietarioCedula: number;
}