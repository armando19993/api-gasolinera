import { Module } from '@nestjs/common';
import { UsoCarService } from './uso-car.service';
import { UsoCarController } from './uso-car.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsoCarController],
  providers: [UsoCarService],
})
export class UsoCarModule { }
