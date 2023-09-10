import { Body, Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { PRODUCT_SERVICE_NAME, ProductServiceClient } from "./product-gate-way.pb";
import { ClientGrpc } from "@nestjs/microservices";
import { AuthGuard } from "@app/common/guard/jwtAuthGuard";
import { CreateProductDto } from "./dto/createProduct.dto";

@Controller('product')
export class ProductGateWayController implements OnModuleInit {
  private service: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  private async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.service.createProduct(createProductDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne({ id });
  }
}