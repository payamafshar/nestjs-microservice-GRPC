import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackageOrder } from './order.pb';

//microservice port should not be qual each other

  async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      OrderModule,
      {
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5053',
          package: protobufPackageOrder,
          protoPath: "apps/proto/order.proto"
        },
      },
    );
    await app.listen();
  }

bootstrap();
