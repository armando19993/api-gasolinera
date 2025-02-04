import { Module } from '@nestjs/common';
import { TipoCarService } from './tipo-car.service';
import { TipoCarController } from './tipo-car.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TipoCarController],
  providers: [TipoCarService],
})
export class TipoCarModule { }
