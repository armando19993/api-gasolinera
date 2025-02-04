import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.carService.findAll(query);
  }

  @Get(':placa')
  findOne(@Param('placa') placa: string) {
    return this.carService.findOne(placa);
  }

  @Patch(':placa')
  update(@Param('placa') placa: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(placa, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
