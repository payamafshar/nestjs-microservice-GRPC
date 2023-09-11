import { Product, User } from "@prisma/client"

export type CreateOrderPayload = {
    productId: number
    userId: number
}
export type CreateOrderResponse = {
    quantity: number,
    userId: number,
    productId: number,
}