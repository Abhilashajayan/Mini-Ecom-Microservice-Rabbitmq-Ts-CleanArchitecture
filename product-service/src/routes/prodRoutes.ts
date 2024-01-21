import { Router, Request, Response } from 'express';
import { ProductRepository } from '../repository/prodRepo';
import { ProductModel } from '../adapters/productSchema';
import { productUsecase } from '../usecase/prodUsecase';
import { productControllers } from '../controllers/productContoller';


export class productRouters {
    router = Router();

    constructor(){
        const productRepository = new ProductRepository(ProductModel);
        const productUsecases = new productUsecase(productRepository);
        const productContoller = new productControllers(productUsecases);

        this.router.post('/product/addProduct', (req: Request, res: Response) => {
            productContoller.add_Product(req, res);
        });

        this.router.post('/product/deleteProduct', (req: Request, res: Response) => {
            productContoller.delete_Product(req, res);
        });

        this.router.get('/product/getProduct', (req: Request, res: Response) => {
            productContoller.get_Product(req, res);
        });

        this.router.get('/product/getAll', (req: Request, res: Response) => {
            productContoller.getAllProduct(req, res);
        });

    }
}

export const productRouter = new productRouters().router;