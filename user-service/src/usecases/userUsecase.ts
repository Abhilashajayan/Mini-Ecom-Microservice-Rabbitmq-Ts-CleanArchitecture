import { IUserSchema } from "../interface/IUserSchema";
import { IUserCase } from "../interface/IUserUsecase";
import { userRepository } from "../repository/userRepo";
import { UserEntity } from "../entities/UserEntity";

export class UserUsecase implements IUserCase{

    constructor(private UserRepository:userRepository ){}

    async register(user: UserEntity): Promise<void> {
      return this.UserRepository.register(user);
    }
    async login(data:UserEntity): Promise<void> {
      return this.UserRepository.login(data);
    }
    
}