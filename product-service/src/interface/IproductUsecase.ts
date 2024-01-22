import { ProdEntity } from "../entities/ProEntity";
export interface IproductUsecase {
    addProduct(productData: ProdEntity):Promise<void>
    deleteProduct(productData: ProdEntity):Promise<void>
    getProduct(productData: ProdEntity):Promise<ProdEntity>;
    getAllProduct():Promise<ProdEntity[]>;
    getProductData(productData: string):Promise<ProdEntity>;
}