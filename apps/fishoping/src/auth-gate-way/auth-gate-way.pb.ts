import { RegisterDto } from "./dtos/register.dto";
import { ValidateDto } from "./dtos/validate.dto";
import { LoginDto } from "./dtos/loginuser.dto";

export interface AuthServiceClient {
    register(registerDto:RegisterDto);
    login(loginDto:LoginDto)
    validate(validateDto:ValidateDto)
  }

export const AUTH_SERVICE_NAME = "AuthService"
export const AUTH_PACKAGE_NAME = 'auth'