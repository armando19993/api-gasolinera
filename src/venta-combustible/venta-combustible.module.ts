import { Module } from '@nestjs/common';
import { VentaCombustibleService } from './venta-combustible.service';
import { VentaCombustibleController } from './venta-combustible.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VentaCombustibleController],
  providers: [VentaCombustibleService],
})
export class VentaCombustibleModule { }
