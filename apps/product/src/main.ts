import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackageProduct } from './types';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5054',
        package: protobufPackageProduct,
        protoPath: "apps/proto/product.proto"
      },
    },
  );
  await app.listen();
}
bootstrap();
