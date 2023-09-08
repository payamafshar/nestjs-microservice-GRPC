import { Module} from '@nestjs/common';
import { AuthGateWayController } from './auth-gate-way.controller';
import { AuthGateWayService } from './auth-gate-way.service';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';
import { DatabaseService } from '@app/common/database/database.service';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './auth-gate-way.pb';
import { DatabaseModule } from '@app/common';
import { AuthService } from 'apps/auth/src/auth.service';
import { AuthModule } from 'apps/auth/src/auth.module';

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
    AuthModule
  ],
  controllers: [AuthGateWayController],
  providers: [AuthGateWayService, DatabaseService , AuthService],
})
export class AuthGateWayModule {

}
