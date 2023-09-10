import { Module } from '@nestjs/common';
import { AuthGateWayModule } from '../src/auth-gate-way/auth-gate-way.module';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '@app/common/database/database.service';
import { OrderGateWayModule } from './order-gate-way/order-gate-way.module';
import { ProductGateWayModule } from './product-gate-way.ts/product-gate-way.module';

@Module({
  imports: [
    AuthGateWayModule,
    OrderGateWayModule,
    ProductGateWayModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/fishoping/auth-gateway.env',
    }),
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule { }
