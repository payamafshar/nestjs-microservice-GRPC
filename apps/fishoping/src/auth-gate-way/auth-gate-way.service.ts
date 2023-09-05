import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { protobufPackage } from 'apps/auth/src/auth.pb';
import { RegisterDto } from './dtos/register.dto';
import { AuthController } from 'apps/auth/src/auth.controller';
import { DatabaseService } from '@app/common/database/database.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from './dtos/loginuser.dto';

@Injectable()
export class AuthGateWayService  {
  proto: AuthController;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}
  

  async registerUser(body: RegisterDto) {
    const { email, password, username } = body;

    const existUser = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (existUser) throw new BadRequestException('user already exist');

    const user = await this.databaseService.user.create({
      data: { email, password, username },
    });

    const token = jwt.sign(
      { id: user.id },
      this.configService.get<string>('JWT_SECRET'),
      { expiresIn: this.configService.get<string>('JWT_EXPIRATION') },
    );

    return token;
  }

  async findUserById(id: number) {
    if (!id) return null;
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async login(body: LoginUserDto) {
    const { email, username, password } = body;

    if (!email && !username) {
      throw new BadRequestException('you must enter email or password');
    }

    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.password != password) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id },
      this.configService.get('JWT_SECRET'),
      { expiresIn: this.configService.get('JWT_EXPIRATION') },
    );

    return token;
  }
}
