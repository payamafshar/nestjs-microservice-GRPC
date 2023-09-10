import { HttpStatus, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common'
import { DatabaseService } from '@app/common/database/database.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { LoginUserPayload, RegisterUserPayload, ValidateUserPayload, IJwtVerify } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService
  ) { }
  async regesterUser(payload: RegisterUserPayload) {
    const { email, password, username } = payload;

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
    return { token, status: HttpStatus.CREATED, error: null };

  }

  async loginUser(payload: LoginUserPayload) {
    const { email, password } = payload;
    if (!email) {
      throw new BadRequestException('you must enter email or username');
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
    return { token, status: HttpStatus.OK, error: null };
  }

  async validateUser({ token }: ValidateUserPayload) {

    const decoded = jwt.verify(token, this.configService.get('JWT_SECRET')) as IJwtVerify
    if (!decoded) return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], user: null };
    //@ts-ignore
    const user = await this.databaseService.user.findUnique({ where: { id: decoded.id } })
    console.log(user)
    if (!user) return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], user: null };

    return { status: HttpStatus.OK, error: null, user };
  }

}



