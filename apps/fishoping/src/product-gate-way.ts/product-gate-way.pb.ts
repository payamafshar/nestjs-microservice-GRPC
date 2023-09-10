import { CreateProductDto } from "./dto/createProduct.dto";



export const protobufPackage = 'product';




export type ProductServiceClient = {
    createProduct(createProductDto:CreateProductDto)  
    findOne({id}:{id:number})
}


export const PRODUCT_PACKAGE_NAME = 'product';


export const PRODUCT_SERVICE_NAME = 'ProductService';


