import { Module } from '@nestjs/common';
import { EstacionServicioService } from './estacion-servicio.service';
import { EstacionServicioController } from './estacion-servicio.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EstacionServicioController],
  providers: [EstacionServicioService],
})
export class EstacionServicioModule {}
