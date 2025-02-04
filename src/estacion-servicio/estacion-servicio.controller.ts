import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EstacionServicioService } from './estacion-servicio.service';
import { CreateEstacionServicioDto } from './dto/create-estacion-servicio.dto';
import { UpdateEstacionServicioDto } from './dto/update-estacion-servicio.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('estacion-servicio')
@UseGuards(AuthGuard)
export class EstacionServicioController {
  constructor(private readonly estacionServicioService: EstacionServicioService) {}

  @Post()
  create(@Body() createEstacionServicioDto: CreateEstacionServicioDto) {
    return this.estacionServicioService.create(createEstacionServicioDto);
  }

  @Get()
  findAll() {
    return this.estacionServicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estacionServicioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstacionServicioDto: UpdateEstacionServicioDto) {
    return this.estacionServicioService.update(id, updateEstacionServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estacionServicioService.remove(id);
  }
}
