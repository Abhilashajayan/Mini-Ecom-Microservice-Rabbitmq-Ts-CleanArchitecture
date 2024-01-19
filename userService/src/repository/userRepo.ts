import { UserEntity } from "../entities/UserEntity";
import { IUserSchema } from "../interface/IUserSchema";
import { IUserCase } from "../interface/IUserUsecase";
import { Model } from "mongoose";

export class userRepository implements IUserCase{

    private readonly UserModel: Model<IUserSchema>;

    constructor(UserModel: Model<IUserSchema>) {
        this.UserModel = UserModel;
      }
      async register(user: UserEntity): Promise<void> {
        try {
          console.log("user repo" , user);
          
          const newUser = new this.UserModel(user);
          await newUser.save();
          console.log(newUser);
          
        } catch (error) {
          console.error("Registration failed:", error);
          throw new Error("Registration failed");
        }
      }
}