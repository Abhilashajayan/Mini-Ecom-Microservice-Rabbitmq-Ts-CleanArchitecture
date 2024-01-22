import { IOrderUsercase } from "../interface/IOrderUsecase";
import { OrderEntity } from "../entities/OrderEntity";
import { orderRepository } from "../repository/orderRepo";



export class orderUsecase implements IOrderUsercase {
    constructor(public OrderRepository: orderRepository
        ){}

    async placeOrder(orderData: OrderEntity): Promise<OrderEntity> {
      const orderDetails =  await this.OrderRepository.placeOrder(orderData);
      return orderDetails;
    }
}