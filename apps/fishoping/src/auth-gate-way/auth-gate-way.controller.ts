import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { AuthGateWayService } from './auth-gate-way.service';
import { RegisterDto } from './dtos/register.dto';
import { ClientGrpc} from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, AuthServiceClient } from './auth-gate-way.pb';
import { LoginDto } from './dtos/loginuser.dto';

@Controller('auth-gate-way')
export class AuthGateWayController implements OnModuleInit {
  service: AuthServiceClient;
  constructor(
    @Inject(AUTH_SERVICE_NAME) private client: ClientGrpc,
    private readonly authService: AuthGateWayService,
  ) {}

  onModuleInit() {
    this.service = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('/register')
  async register(
    @Body() registerDto: RegisterDto,
  ) {
    console.log(registerDto)
    return  this.service.register(registerDto)
  }

  @Post('login')
  async loginUser(
    @Body() loginDto: LoginDto,
  ) {
    return this.service.login(loginDto)
  }
}
