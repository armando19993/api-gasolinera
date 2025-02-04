import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { VentaCombustibleService } from './venta-combustible.service';
import { CreateVentaCombustibleDto } from './dto/create-venta-combustible.dto';
import { UpdateVentaCombustibleDto } from './dto/update-venta-combustible.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('venta-combustible')
@UseGuards(AuthGuard)
export class VentaCombustibleController {
  constructor(private readonly ventaCombustibleService: VentaCombustibleService) {}

  @Post()
  create(@Body() createVentaCombustibleDto: CreateVentaCombustibleDto) {
    return this.ventaCombustibleService.create(createVentaCombustibleDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.ventaCombustibleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventaCombustibleService.findOne(+id);
  }
}
