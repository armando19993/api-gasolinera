import { PartialType } from '@nestjs/mapped-types';
import { CreateUsoCarDto } from './create-uso-car.dto';

export class UpdateUsoCarDto extends PartialType(CreateUsoCarDto) {}
