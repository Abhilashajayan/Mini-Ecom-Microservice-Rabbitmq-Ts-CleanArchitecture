import { IproductUsecase } from "../interface/IproductUsecase";
import { Model } from "mongoose";
import { ProdEntity } from "../entities/ProEntity";
import { IProductSchema } from "../interface/IprodcutSchema";

export class ProductRepository  implements IproductUsecase {
    constructor(public productModel : Model<IProductSchema>){}

    async addProduct(productData: ProdEntity): Promise<void> {
        const newProduct = new this.productModel(productData)
        await newProduct.save()
    }

    async deleteProduct(productData: ProdEntity): Promise<void> {
        const deleteProduct = await this.productModel.findByIdAndDelete(productData.product_id);
        console.log(deleteProduct);
    }

   async getProduct(productData: ProdEntity): Promise<ProdEntity> {
        const getProduct = await this.productModel.findById(productData.product_id);
        return getProduct;
    }

    async getAllProduct(): Promise<ProdEntity[]> {
        const getAllProduct = await this.productModel.find();
        return getAllProduct;
    }

   async getProductData(productData: string): Promise<ProdEntity> {
        const getProductData = await this.productModel.findById(productData);
        return getProductData;       
    }

    
}