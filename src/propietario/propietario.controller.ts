import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { PropietarioService } from './propietario.service';
import { CreatePropietarioDto } from './dto/create-propietario.dto';
import { UpdatePropietarioDto } from './dto/update-propietario.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('propietario')
@UseGuards(AuthGuard)
export class PropietarioController {
  constructor(private readonly propietarioService: PropietarioService) {}

  @Post()
  create(@Body() createPropietarioDto: CreatePropietarioDto, @Request() req) {
    return this.propietarioService.create(createPropietarioDto, req.user);
  }

  @Get()
  findAll() {
    return this.propietarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propietarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropietarioDto: UpdatePropietarioDto) {
    return this.propietarioService.update(id, updatePropietarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propietarioService.remove(id);
  }
}
