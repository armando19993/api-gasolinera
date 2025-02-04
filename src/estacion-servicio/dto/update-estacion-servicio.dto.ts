import { PartialType } from '@nestjs/mapped-types';
import { CreateEstacionServicioDto } from './create-estacion-servicio.dto';

export class UpdateEstacionServicioDto extends PartialType(CreateEstacionServicioDto) {}
