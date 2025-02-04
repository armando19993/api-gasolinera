import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EstacionServicioModule } from './estacion-servicio/estacion-servicio.module';
import { PropietarioModule } from './propietario/propietario.module';
import { CarModule } from './car/car.module';
import { TipoCarModule } from './tipo-car/tipo-car.module';
import { UsoCarModule } from './uso-car/uso-car.module';
import { VentaCombustibleModule } from './venta-combustible/venta-combustible.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    EstacionServicioModule,
    PropietarioModule,
    CarModule,
    TipoCarModule,
    UsoCarModule,
    VentaCombustibleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
