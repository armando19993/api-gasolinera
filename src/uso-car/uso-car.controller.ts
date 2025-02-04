import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsoCarService } from './uso-car.service';
import { CreateUsoCarDto } from './dto/create-uso-car.dto';
import { UpdateUsoCarDto } from './dto/update-uso-car.dto';

@Controller('uso-car')
export class UsoCarController {
  constructor(private readonly usoCarService: UsoCarService) {}

  @Post()
  create(@Body() createUsoCarDto: CreateUsoCarDto) {
    return this.usoCarService.create(createUsoCarDto);
  }

  @Get()
  findAll() {
    return this.usoCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usoCarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateUsoCarDto: UpdateUsoCarDto) {
    return this.usoCarService.update(id, updateUsoCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usoCarService.remove(+id);
  }
}
