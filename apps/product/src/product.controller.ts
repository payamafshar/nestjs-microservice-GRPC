import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductPayload, FindOneProductPayload, PRODUCT_SERVICE_NAME } from './types';

@Controller()
export class ProductController {
  @Inject(ProductService)
  private readonly productService: ProductService;

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  private createProduct(payload: CreateProductPayload) {
    console.log(payload)
    return this.productService.createProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneProductPayload) {
    return this.productService.findOne(payload);
  }

}
