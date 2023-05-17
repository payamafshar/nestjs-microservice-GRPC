import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from './auth.pb';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: protobufPackage,
        protoPath: path.join(__dirname, '../../proto/auth.proto'),
      },
    },
  );

  await app.listen();
}

bootstrap();

// /   protoPath: path.join(__dirname, '../../proto/auth.proto'),

// (
//   {
//     transport: Transport.GRPC,
//     options: {
//       url: URL,
//       package: protobufPackage,
//       protoPath: path.join(__dirname, '../../proto/auth.proto'),
//     },
//   },
//   { inheritAppConfig: true },
// );
