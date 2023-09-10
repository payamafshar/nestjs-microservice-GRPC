export type CreateProductPayload = {
    name: string,
    price: number
}

export type FindOneProductPayload = {
    id: number
}

export type ProductResponse = {
    name: string
    price: number
    id: number
}
export const protobufPackageProduct = 'product';
export const PRODUCT_SERVICE_NAME = "ProductService"