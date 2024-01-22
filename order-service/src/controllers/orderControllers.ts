import { orderUsecase } from "../usecases/orderUsecase"
import { Request , Response } from "express";
import { OrderEntity } from "../entities/OrderEntity";
import { Rabbitmq } from "../infra/rabbitmq";

export class orderController {
    private readonly orderUsecases: orderUsecase;
    private readonly rabbitmqService: Rabbitmq;

    constructor(orderUsecases: orderUsecase, rabbitmqService: Rabbitmq) {
        this.orderUsecases = orderUsecases;
        this.rabbitmqService = rabbitmqService;
    }

    place_order = async (req: Request, res: Response) => {
        try {
            const orderData = req.body;
            const product: any = await this.rabbitmqService.productDetailsPublisher(orderData.product_id);
            if(product._id === orderData.product_id) {
                const orderDetails:OrderEntity = {
                    product:{
                        product_id : product._id,
                        product_name : product.product_name,
                        product_price : product.product_price
                    },
                    count : orderData.count,
                    status : "pending",
                    totalPrice : orderData.totalPrice
                }
           const orderPlaced = await this.orderUsecases.placeOrder(orderDetails)
            res.status(200).json({ orderPlaced });
            }else{
                return res.status(404).json("no product details");
            }
        } catch (err) {
            console.error("Error placing order:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    cancel_order = async (req: Request, res: Response)=>{
        try{
            const orderData:any = req.body as string;
            console.log(orderData);
            const cancelOrder = await this.orderUsecases.cancelOrder(orderData);
            return res.status(200).json({cancelOrder: cancelOrder});
        }catch (err) {
           return res.status(500).json({error: err});
        }
    }
    
    
}