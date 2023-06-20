import { IsString } from 'class-validator';
import { LoginRequest, RegisterRequest, ValidateRequest } from './../auth.pb';

export class LoginRequestDto implements LoginRequest {
  public readonly email: string;

  public readonly password: string;
}

export class RegisterRequestDto implements RegisterRequest {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class ValidateRequestDto implements ValidateRequest {
  public readonly token: string;
}
