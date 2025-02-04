import { IsNotEmpty, IsString } from "class-validator";

export class CreateUsoCarDto {
    @IsString()
    @IsNotEmpty()
    nombre: string
}
