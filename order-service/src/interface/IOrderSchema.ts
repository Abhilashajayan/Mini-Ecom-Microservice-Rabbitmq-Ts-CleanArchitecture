import { Document } from "mongoose";

export interface IOrderSchema extends Document {
    product: {
      product_id: string;
      product_name: string;
      product_price: number;
    };
    status: string; 
    count: number;
    totalPrice: number;
  }