import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  username: string;
}
