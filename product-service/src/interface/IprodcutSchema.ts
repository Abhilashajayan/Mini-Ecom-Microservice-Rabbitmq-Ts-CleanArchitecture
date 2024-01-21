import { Document } from "mongoose";

export interface IProductSchema extends Document{
    product_id : string;
    product_price : number;
    product_name : string;
}