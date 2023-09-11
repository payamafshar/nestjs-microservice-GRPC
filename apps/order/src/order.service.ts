import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderPayload } from './types';
import { DatabaseService } from '@app/common/database/database.service';
import { Product } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService) { }
  async create(payload: CreateOrderPayload) {
    const { productId, userId } = payload
    console.log(payload)
    const user = await this.databaseService.user.findUnique({ where: { id: userId } })
    const product = await this.databaseService.product.findUnique({ where: { id: productId } })
    console.log(product)
    if (!product) throw new RpcException("product not found")
    const findedOrder = await this.databaseService.order.findUnique({ where: { productId } })
    if (findedOrder) {
      await this.databaseService.order.update({ where: { productId }, data: { quantity: findedOrder.quantity + 1 } })
      return
    }
    return await this.databaseService.order.create({ data: { productId, userId, quantity: 1 } })
  }
}