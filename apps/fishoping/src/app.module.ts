import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthGateWayModule } from '../src/auth-gate-way/auth-gate-way.module';
@Module({
  imports: [AuthGateWayModule],
  controllers: [AppController],
})
export class AppModule {}
