import { Injectable } from '@nestjs/common';
import {
  LoginRequestDto,
  RegisterRequestDto,
  ValidateRequestDto,
} from './auth.dto/auth.dto';
import { LoginResponse, RegisterResponse, ValidateResponse } from './auth.pb';
import { DatabaseService } from '@app/common/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}
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
    return undefined;
  }
}
