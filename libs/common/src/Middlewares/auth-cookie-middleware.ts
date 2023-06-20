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

declare global {
  namespace Express {
    interface Request {
      currentUser: '';
    }
  }
}

interface IJwtVerify {
  id: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthWithCookie implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const parsedCookie = parseCookies(req);

    if (!parsedCookie.userToken) {
      throw new BadRequestException('لطفا وارد حساب کاربری خود شوید');
    }
    const token = cookieParser.signedCookie(
      parsedCookie.userToken,
      this.configService.get('COOKIE_KEY'),
    );

    if (!token)
      throw new UnauthorizedException('لطفا وارد حساب کاربری خود شوید ');

    const { id } = jwt.verify(
      token,
      this.configService.get('JWT_SECRET'),
    ) as IJwtVerify;

    // const user = await this.authService.findUser(parseInt(id));
    // if (!user) throw new UnauthorizedException('لطفا وارد حساب خود شوید');
    req.currentUser = 'user';
    return next();
  }
}
