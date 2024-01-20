import { UserEntity } from "../entities/UserEntity";

export interface IUserCase {
  register(user: UserEntity): Promise<void>;
//   login(email : string , password : string ): Promise<boolean>;
}