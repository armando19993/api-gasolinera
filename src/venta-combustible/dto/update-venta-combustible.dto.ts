import { PartialType } from '@nestjs/mapped-types';
import { CreateVentaCombustibleDto } from './create-venta-combustible.dto';

export class UpdateVentaCombustibleDto extends PartialType(CreateVentaCombustibleDto) {}
