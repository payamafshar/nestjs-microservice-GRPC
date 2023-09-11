import { IsNumber } from "class-validator"
import { Type } from 'class-transformer'

export class CreateOrderDto {

    @IsNumber()
    productId: number

    userId: number
}