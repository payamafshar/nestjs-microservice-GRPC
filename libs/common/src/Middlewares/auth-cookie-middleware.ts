import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { parseCookies } from 'utils/functions';
import { AuthService } from 'apps/auth/src/auth.service';
import { AuthGateWayService } from 'apps/fishoping/src/auth-gate-way/auth-gate-way.service';
import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}

export interface IJwtVerify {
  id: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthWithCookie implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthGateWayService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const parsedCookie = parseCookies(req);

    if (!parsedCookie.userToken) {
      throw new BadRequestException('1لطفا وارد حساب کاربری خود شوید');
    }
    const token = cookieParser.signedCookie(
      parsedCookie.userToken,
      this.configService.get('COOKIE_SECRET'),
    );

    if (!token)
      throw new UnauthorizedException('لطفا وارد حساب کاربری خود شوید ');

    const { id } = jwt.verify(
      token,
      this.configService.get('JWT_SECRET'),
    ) as IJwtVerify;

    const user = await this.authService.findUserById(parseInt(id));

    if (!user) throw new UnauthorizedException('Login to user account');
    req.currentUser = user;
    return next();
  }
}
