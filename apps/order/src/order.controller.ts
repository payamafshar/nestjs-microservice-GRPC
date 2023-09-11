import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { ORDER_SERVICE_NAME } from './order.pb';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateOrderPayload, CreateOrderResponse } from './types';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
  async create(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
    return this.orderService.create(payload);
  }
}



