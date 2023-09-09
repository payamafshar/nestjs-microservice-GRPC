import { ClientsModule, Transport } from "@nestjs/microservices";
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from "./order-gate-way.pb";
import { AuthModule } from "apps/auth/src/auth.module";
import { Module } from "@nestjs/common";
import { OrderGateWayController } from "./order-gate-way.controller";
import { AuthService } from "apps/auth/src/auth.service";
import { DatabaseService } from "@app/common/database/database.service";
import { DatabaseModule } from "@app/common";

@Module({
    imports: [
      ClientsModule.register([
        {
          name: ORDER_SERVICE_NAME,
          transport: Transport.GRPC,
          options: {
            url: '0.0.0.0:5053',
            package: ORDER_PACKAGE_NAME,
            protoPath: "apps/proto/order.proto"
          },
        },
      ]),
      AuthModule,
      DatabaseModule
    ],
    controllers: [OrderGateWayController],
    providers: [AuthService , DatabaseService ],
  })

  //url port must be qual to main microservice port i mean of main => orderMicroservice
  export class OrderGateWayModule {
  
  }