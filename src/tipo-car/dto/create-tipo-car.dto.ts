import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoCarDto {
    @IsString()
    @IsNotEmpty()
    nombre: string
}
