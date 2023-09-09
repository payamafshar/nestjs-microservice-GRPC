import { Module } from '@nestjs/common';
import { AuthGateWayModule } from '../src/auth-gate-way/auth-gate-way.module';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '@app/common/database/database.service';
import { User } from '@prisma/client';
import { OrderModule } from 'apps/order/src/order.module';
import { OrderGateWayModule } from './order-gate-way/order-gate-way.module';

@Module({
  imports: [
    AuthGateWayModule,
    OrderGateWayModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/fishoping/auth-gateway.env',
    }),
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
