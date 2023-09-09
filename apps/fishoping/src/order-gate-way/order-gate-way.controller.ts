import { Body, Controller, Inject, OnModuleInit, Post, Req, UseGuards } from "@nestjs/common";
import { ORDER_SERVICE_NAME, OrderServiceClient } from "./order-gate-way.pb";
import { ClientGrpc } from "@nestjs/microservices";
import { AuthGuard } from "@app/common/guard/jwtAuthGuard";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { Request} from 'express'

@Controller('order')
export class OrderGateWayController implements OnModuleInit {
  service: OrderServiceClient;
  constructor(
    @Inject(ORDER_SERVICE_NAME) private client: ClientGrpc,
  ) {}

  onModuleInit() {
      this.service = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME)
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createOrder(@Body() createOrderDto:CreateOrderDto , @Req() request:Request) {
        const userId = request.user.id
        console.log(userId)
        createOrderDto.userId = Number(userId)
        return this.service.createOrder(createOrderDto)
  }
}