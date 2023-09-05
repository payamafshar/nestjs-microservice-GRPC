import { User } from "@prisma/client";
import { Observable } from 'rxjs';
import { RegisterDto } from "./dtos/register.dto";

export interface AuthServiceClient {
    register(registerDto:RegisterDto);
  }

export const AUTH_SERVICE_NAME = "AuthService"
export const AUTH_PACKAGE_NAME = 'auth'