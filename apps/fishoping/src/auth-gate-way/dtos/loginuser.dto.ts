import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  username?: string;

  @IsString()
  email?: string;

  @IsString()
  password: string;
}
