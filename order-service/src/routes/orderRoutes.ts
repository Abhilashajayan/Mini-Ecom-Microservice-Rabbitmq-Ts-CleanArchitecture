import { Response, Request, Router } from "express";
import { orderRepository } from "../repository/orderRepo";
import { OrderModel } from "../adapters/orderSchema";
import { orderUsecase } from "../usecases/orderUsecase";
import { orderController } from "../controllers/orderControllers";
import { Rabbitmq } from "../infra/rabbitmq";

export class orderRouter {
    router = Router();
   

    constructor(){
        const rabbitmq = new Rabbitmq();
        const orderRepositorys = new orderRepository(OrderModel);
        const orderUsecases = new orderUsecase(orderRepositorys);
        const orderControllers = new orderController(orderUsecases,rabbitmq);

        this.router.post('/order/placeOrder', (req: Request, res: Response) => {
            orderControllers.place_order(req, res);
        });

    }
}

export const orderRouters = new orderRouter().router;