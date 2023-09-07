import {
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, AuthServiceClient } from './auth-gate-way.pb';
import { ValidateDto } from './dtos/validate.dto';

@Injectable()
export class AuthGateWayService implements OnModuleInit  {
  service: AuthServiceClient;

  constructor(
    @Inject(AUTH_SERVICE_NAME) private client: ClientGrpc,
  ) {}
  
    onModuleInit() {
      this.service = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    validate({token}:ValidateDto){
      return this.service.validate({token})
    }
}
