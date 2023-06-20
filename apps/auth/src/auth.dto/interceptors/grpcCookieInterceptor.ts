import { Metadata } from '@grpc/grpc-js';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { tap } from 'rxjs';

export class GrpcCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap((res) => {
        const call = context.switchToRpc().getContext();
        console.log(call);
        const metadata = new Metadata();
        console.log(metadata);
        const setCookieHeader = metadata.get('set-cookie');
        if (setCookieHeader && setCookieHeader.length > 0) {
          const cookie = setCookieHeader[0];
          const headers = {
            Cookie: cookie,
          };
          context.switchToHttp().getRequest().headers = headers;
        }
      }),
    );
  }
}
