import { Request , Response } from "express";
import { productUsecase } from "../usecase/prodUsecase";
import { ProdEntity } from "../entities/ProEntity";


export class productControllers {
    private readonly productUsecases: productUsecase;
    constructor(productUsecases: productUsecase) {
        this.productUsecases = productUsecases;
      }

      async add_Product(req: Request, res: Response) {
        try {
            const productData: ProdEntity = req.body;
            console.log(productData);
            await this.productUsecases.addProduct(productData);
            res.status(200).send('product added successfully');
        } catch (error) {
            res.status(500).send('Error while adding product');
            console.log('Error while adding => ', error);
        }
    }

    async delete_Product(req: Request, res: Response){
        try{
            const productData: ProdEntity = req.body;
            console.log(productData);
            await this.productUsecases.deleteProduct(productData);
            res.status(200).json('product deleted successfully');
        }catch(err){
            res.status(500).json("error while deleting the product");
            console.log(err)
        }
    }
    
    async get_Product(req: Request, res: Response){
        try{
            const productData: ProdEntity = req.body;
            console.log(productData);
           const product = await this.productUsecases.getProduct(productData);
            res.status(200).json(product);
        }catch(err){
            res.status(500).json("error while fetching data");
            console.log(err);
         }

    }   


    async getAllProduct(req: Request, res: Response){
        try{
            const getAllProduct = await this.productUsecases.getAllProduct();
            res.status(200).json(getAllProduct);
        }catch(err){
            res.status(500).json("cannot fetch all the products");
            console.log(err);
        }
    }

}