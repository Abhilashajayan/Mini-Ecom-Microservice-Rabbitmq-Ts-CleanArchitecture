import { IproductUsecase } from "../interface/IproductUsecase";
import { ProdEntity } from "../entities/ProEntity";
import { ProductRepository } from "../repository/prodRepo";

export class productUsecase implements  IproductUsecase {
    constructor(public productRepository: ProductRepository){}

    async addProduct(productData: ProdEntity): Promise<void> {
        await this.productRepository.addProduct(productData)
    }

    async deleteProduct(productData: ProdEntity): Promise<void> {
        await this.productRepository.deleteProduct(productData);
    }

    async getProduct(productData: ProdEntity): Promise<ProdEntity> {
       return await this.productRepository.getProduct(productData);
    }

    async getAllProduct(): Promise<ProdEntity[]> {
        return await this.productRepository.getAllProduct();
    }

    async getProductData(productData: string):Promise<ProdEntity>{
        return await this.productRepository.getProductData(productData);
    }
}