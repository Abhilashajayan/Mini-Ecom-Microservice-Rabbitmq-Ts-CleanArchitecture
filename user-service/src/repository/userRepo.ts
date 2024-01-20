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

       async login(data:UserEntity): Promise<boolean> {
        try {
          console.log("check user");
          const email = data.email;
          const password = data.password;
          const user = await this.UserModel.findOne({ email: email }).exec();
    
          if (user && user.password === password) {
            console.log('login successful');
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error("Login failed:", error);
          throw new Error("Login failed");
        }
      }

}