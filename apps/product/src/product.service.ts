import { DatabaseService } from '@app/common/database/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductPayload, FindOneProductPayload, ProductResponse } from './types';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) { }

  async createProduct(payload: CreateProductPayload) {
    const { name, price } = payload
    const product = await this.databaseService.product.create({
      data: { name, price }
    })
    return product
  }

  async findOne({ id }: FindOneProductPayload): Promise<ProductResponse> {
    const product = await this.databaseService.product.findUnique({ where: { id } })
    console.log(product)
    if (!product) throw new NotFoundException()
    return product
  }
}
