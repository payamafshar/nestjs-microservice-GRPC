import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseService } from '@app/common/database/database.service';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule,ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: 'apps/order/order.env',
  })],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
