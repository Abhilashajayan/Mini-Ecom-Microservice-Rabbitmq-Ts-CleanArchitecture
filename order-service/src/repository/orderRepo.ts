import { IOrderUsercase } from "../interface/IOrderUsecase";
import { Model } from "mongoose";
import { IOrderSchema } from "../interface/IOrderSchema";
import { OrderEntity } from "../entities/OrderEntity";


export class orderRepository implements  IOrderUsercase{
    constructor(public orderModel:Model<IOrderSchema>){}

     async placeOrder(orderData: OrderEntity): Promise<OrderEntity> {
        const newProduct = new this.orderModel(orderData)
        await newProduct.save();
        return newProduct;
    }
    async cancelOrder(orderData: OrderEntity): Promise<OrderEntity | null> {
        console.log(orderData.id,"the data");
        const cancelledOrder = await this.orderModel.findOneAndUpdate(
            { _id: orderData.id, status: { $ne: "cancelled" } }, 
            { $set: { status: "cancelled" } },
            { new: true } 
          );
        console.log(cancelledOrder);
        return cancelledOrder;
    }
}