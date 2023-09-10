import  {Injectable ,ExecutionContext,CanActivate , UnauthorizedException,Inject , HttpStatus } from '@nestjs/common'
import { User } from '@prisma/client';
import { AuthService } from 'apps/auth/src/auth.service';
import { Request} from 'express'

declare global {
    namespace Express {
      interface Request {
        user: User;
      }
    }
  }

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly service: AuthService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];

    const { status, user } = await this.service.validateUser({token});

    req.user = user;
    console.log(req.user)
    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}