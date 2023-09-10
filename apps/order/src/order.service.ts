import { Injectable } from '@nestjs/common';
import { CreateOrderPayload } from './types';
import { DatabaseService } from '@app/common/database/database.service';

@Injectable()
export class OrderService {
  constructor( private readonly databaseService: DatabaseService){}
  async  create(payload:CreateOrderPayload){
    const {productId , quantity , userId} = payload
    const user = await this.databaseService.user.findUnique({where:{id:userId}})
    return {user}
  }
}
