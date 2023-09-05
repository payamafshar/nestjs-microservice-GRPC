import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '@app/common/database/database.service';

@Module({
  imports: [ 
    DatabaseModule,
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: 'apps/auth/auth.env',
  }),],
  controllers: [AuthController],
  providers: [AuthService , DatabaseService],
})
export class AuthModule {}
