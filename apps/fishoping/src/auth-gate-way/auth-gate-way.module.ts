import { Module } from '@nestjs/common';
import { AuthGateWayController } from './auth-gate-way.controller';
import { AuthGateWayService } from './auth-gate-way.service';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';
import { protobufPackage } from 'apps/auth/src/auth.pb';
import * as path from 'path';
import { DatabaseModule } from '@app/common';
import { DatabaseService } from '@app/common/database/database.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5052',
          package: protobufPackage,
          protoPath: path.join(__dirname, '../../proto/auth.proto'),
        },
      },
    ]),
    DatabaseModule,
  ],
  controllers: [AuthGateWayController],
  providers: [AuthGateWayService, DatabaseService],
})
export class AuthGateWayModule {}
