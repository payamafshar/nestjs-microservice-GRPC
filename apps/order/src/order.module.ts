import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseService } from '@app/common/database/database.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, DatabaseService],
})
export class OrderModule {}
