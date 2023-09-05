import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthGateWayController } from './auth-gate-way.controller';
import { AuthGateWayService } from './auth-gate-way.service';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';
import { protobufPackage } from 'apps/auth/src/auth.pb';
import * as path from 'path';
import { AuthWithCookie, DatabaseModule } from '@app/common';
import { DatabaseService } from '@app/common/database/database.service';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './auth-gate-way.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5052',
          package: AUTH_PACKAGE_NAME,
          protoPath: "apps/proto/auth.proto"
        },
      },
    ]),
    DatabaseModule,
  ],
  controllers: [AuthGateWayController],
  providers: [AuthGateWayService, DatabaseService],
})
export class AuthGateWayModule {

}
