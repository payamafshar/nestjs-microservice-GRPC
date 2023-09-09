import { CreateOrderDto } from "./dto/createOrder.dto"

export const ORDER_SERVICE_NAME = "OrderService"
export const ORDER_PACKAGE_NAME = 'order'

export type OrderServiceClient = {
    createOrder(createOrderDto:CreateOrderDto)  
}