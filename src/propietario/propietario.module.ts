import { Module } from '@nestjs/common';
import { PropietarioService } from './propietario.service';
import { PropietarioController } from './propietario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PropietarioController],
  providers: [PropietarioService],
})
export class PropietarioModule { }
