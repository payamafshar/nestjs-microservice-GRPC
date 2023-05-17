import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { protobufPackage } from 'apps/auth/src/auth.pb';
import { RegisterDto } from './dtos/register.dto';
import { AuthController } from 'apps/auth/src/auth.controller';

@Injectable()
export class AuthGateWayService implements OnModuleInit {
  authService: AuthController;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthController>('AuthService');
  }
  async registerUser(body: RegisterDto) {
    console.log(body);
    return this.authService.register(body);
  }
}
