import mongoose, { Document, Model } from "mongoose";
import { IOrderSchema } from "../interface/IOrderSchema";

const orderSchema = new mongoose.Schema<IOrderSchema>(
  {
    product: {
      product_id: {
        type: String,
        required: true,
      },
      product_name: {
        type: String,
        required: true,
      },
      product_price: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["pending", "cancelled", "delivered"],
      default: "pending",
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const OrderModel: Model<IOrderSchema> = mongoose.model<IOrderSchema>(
  "OrderModel",
  orderSchema
);
