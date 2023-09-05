import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthGateWayModule } from '../src/auth-gate-way/auth-gate-way.module';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '@app/common/database/database.service';
@Module({
  imports: [
    AuthGateWayModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/fishoping/auth-gateway.env',
    }),
  ],
  controllers: [AppController],
  providers: [DatabaseService],
})
export class AppModule {}
