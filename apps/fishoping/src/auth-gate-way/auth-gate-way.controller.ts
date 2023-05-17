import { Body, Controller, Post } from '@nestjs/common';
import { AuthGateWayService } from './auth-gate-way.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth-gate-way')
export class AuthGateWayController {
  constructor(private readonly authService: AuthGateWayService) {}

  @Post('/register')
  register(@Body() body: RegisterDto) {
    console.log(body);
    return this.authService.registerUser(body);
  }
}
