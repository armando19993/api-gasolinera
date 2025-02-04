import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoCarService } from './tipo-car.service';
import { CreateTipoCarDto } from './dto/create-tipo-car.dto';
import { UpdateTipoCarDto } from './dto/update-tipo-car.dto';

@Controller('tipo-car')
export class TipoCarController {
  constructor(private readonly tipoCarService: TipoCarService) {}

  @Post()
  create(@Body() createTipoCarDto: CreateTipoCarDto) {
    return this.tipoCarService.create(createTipoCarDto);
  }

  @Get()
  findAll() {
    return this.tipoCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoCarDto: UpdateTipoCarDto) {
    return this.tipoCarService.update(+id, updateTipoCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoCarService.remove(+id);
  }
}
