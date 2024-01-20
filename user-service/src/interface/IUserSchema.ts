import { Document } from "mongoose";

export interface IUserSchema extends Document {
    id: string;
    name?: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }