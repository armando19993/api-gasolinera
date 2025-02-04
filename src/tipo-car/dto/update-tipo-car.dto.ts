import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoCarDto } from './create-tipo-car.dto';

export class UpdateTipoCarDto extends PartialType(CreateTipoCarDto) {}
