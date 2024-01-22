import { OrderEntity } from "../entities/OrderEntity";

export interface IOrderUsercase {
    placeOrder(orderData : OrderEntity):Promise<OrderEntity>;
}