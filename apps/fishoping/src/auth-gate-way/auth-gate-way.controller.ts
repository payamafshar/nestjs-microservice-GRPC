import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthGateWayService } from './auth-gate-way.service';
import { RegisterDto } from './dtos/register.dto';
import { Response } from 'express';
import { LoginUserDto } from './dtos/loginuser.dto';

@Controller('auth-gate-way')
export class AuthGateWayController {
  constructor(private readonly authService: AuthGateWayService) {}

  @Post('/register')
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(body);
    const token = await this.authService.registerUser(body);

    response.cookie('userToken', token, {
      httpOnly: true,
      secure: false,
      signed: true,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Register successfully',
    };
  }

  @Post('login')
  async loginUser(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(body);

    response.cookie('userToken', token, {
      httpOnly: true,
      secure: false,
      signed: true,
    });
  }
}
