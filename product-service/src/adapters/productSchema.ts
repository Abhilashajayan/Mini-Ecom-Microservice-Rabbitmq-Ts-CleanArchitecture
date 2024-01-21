import mongoose, { Model } from "mongoose";
import { IProductSchema } from "../interface/IprodcutSchema";

const productSchema = new mongoose.Schema<IProductSchema>({
  product_name: {
    type: String,
    required: true,
    unique: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
});

export const ProductModel: Model<IProductSchema> = mongoose.model<IProductSchema>(
  "ProductModel",
  productSchema
);