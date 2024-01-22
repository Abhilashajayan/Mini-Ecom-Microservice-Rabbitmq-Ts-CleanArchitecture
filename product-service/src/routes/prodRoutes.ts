import { Router, Request, Response } from 'express';
import { ProductRepository } from '../repository/prodRepo';
import { ProductModel } from '../adapters/productSchema';
import { productUsecase } from '../usecase/prodUsecase';
import { productControllers } from '../controllers/productContoller';
import { ProductService } from '../infra/rabbitmq';
import exp from 'constants';

export class productRouters {
    router = Router();

    constructor(){
        
        const productRepository = new ProductRepository(ProductModel);
        const productUsecases = new productUsecase(productRepository);
         const consumerMessage =  new ProductService(productUsecases);
        const productContoller = new productControllers(productUsecases);

        const rabbitMQ = async () => {
            try {
                await consumerMessage.initialize();
            } catch (error) {
                console.error("Error initializing RabbitMQ:", error);
            }
        };
        rabbitMQ();

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