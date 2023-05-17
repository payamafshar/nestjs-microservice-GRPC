import { LoginRequest, RegisterRequest, ValidateRequest } from './../auth.pb';

export class LoginRequestDto implements LoginRequest {
  public readonly email: string;

  public readonly password: string;
}

export class RegisterRequestDto implements RegisterRequest {
  public readonly email: string;

  public readonly password: string;
}

export class ValidateRequestDto implements ValidateRequest {
  public readonly token: string;
}
