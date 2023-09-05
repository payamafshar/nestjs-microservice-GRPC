import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, RegisterResponse } from './auth.pb';
import { AuthService } from './auth.service';
import { RegisterUserPayload } from './types';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  async register(payload: RegisterUserPayload): Promise<RegisterResponse> {
    console.log(payload)
    return  this.service.regesterUser(payload)

  }
}
