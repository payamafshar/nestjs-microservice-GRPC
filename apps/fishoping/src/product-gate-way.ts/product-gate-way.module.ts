import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "apps/auth/src/auth.module";
import { Module } from "@nestjs/common";
import { AuthService } from "apps/auth/src/auth.service";
import { DatabaseService } from "@app/common/database/database.service";
import { DatabaseModule } from "@app/common";
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from "./product-gate-way.pb";
import { ProductGateWayController } from "./product-gate-way.controller";

@Module({
    imports: [
      ClientsModule.register([
        {
          name: PRODUCT_SERVICE_NAME,
          transport: Transport.GRPC,
          options: {
            url: '0.0.0.0:5054',
            package: PRODUCT_PACKAGE_NAME,
            protoPath: "apps/proto/product.proto"
          },
        },
      ]),
      AuthModule,
      DatabaseModule
    ],
    controllers: [ProductGateWayController],
    providers: [AuthService , DatabaseService ],
  })

  //url port must be qual to main microservice port i mean of main => orderMicroservice
  export class ProductGateWayModule {
  
  }