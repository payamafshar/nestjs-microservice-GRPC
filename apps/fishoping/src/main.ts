import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log(configService.get('COOKIE_SECRET'));
  app.use(cookieParser(configService.get('COOKIE_SECRET')));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
  );

  await app.listen(3001);
}
bootstrap();
