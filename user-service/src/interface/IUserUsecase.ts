import { UserEntity } from "../entities/UserEntity";

export interface IUserCase {
  register(user: UserEntity): Promise<void>;
  login(data:UserEntity ): Promise<void> ;
}