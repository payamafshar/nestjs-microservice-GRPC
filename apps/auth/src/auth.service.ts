import { Injectable } from '@nestjs/common';
import {
  LoginRequestDto,
  RegisterRequestDto,
  ValidateRequestDto,
} from './auth.dto/auth.dto';
import { LoginResponse, RegisterResponse, ValidateResponse } from './auth.pb';

@Injectable()
export class AuthService {
  async register({
    email,
    password,
  }: RegisterRequestDto): Promise<RegisterResponse> {
    return {
      status: 200,
      error: null,
    };
  }

  login({ email, password }: LoginRequestDto): Promise<LoginResponse> {
    return null;
  }

  validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
    return null;
  }
}
