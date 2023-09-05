import { HttpStatus, Injectable } from '@nestjs/common';
import {BadRequestException} from '@nestjs/common'
import { DatabaseService } from '@app/common/database/database.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { RegisterUserPayload } from './types';

@Injectable()
export class AuthService {
  constructor( 
      private readonly databaseService: DatabaseService,
      private readonly configService:ConfigService
    ) {}
  async regesterUser(payload:RegisterUserPayload) {
    const { email, password, username } = payload;

    const existUser = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (existUser) throw new BadRequestException('user already exist');

    const user = await this.databaseService.user.create({
      data: { email, password, username },
    });
    console.log(user)
    const token = jwt.sign(
      { id: user.id },
      this.configService.get<string>('JWT_SECRET'),
      { expiresIn: this.configService.get<string>('JWT_EXPIRATION') },
    );

    return { status: HttpStatus.CREATED, error: null };
  
  }
}
