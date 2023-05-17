import { Module } from '@nestjs/common';
import { AuthGateWayController } from './auth-gate-way.controller';
import { AuthGateWayService } from './auth-gate-way.service';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';
import { protobufPackage } from 'apps/auth/src/auth.pb';
import * as path from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: path.join(__dirname, '../../proto/auth.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthGateWayController],
  providers: [AuthGateWayService],
})
export class AuthGateWayModule {}
