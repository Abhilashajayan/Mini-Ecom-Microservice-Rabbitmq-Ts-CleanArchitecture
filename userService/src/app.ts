import express from 'express';
import cors from 'cors';
import nocache from 'nocache';
import { rabbitmq } from './infra/rabbitmq'
import { UserUsecase } from './usecases/userUsecase';
import { userRepository } from './repository/userRepo';
import { UserModel } from './adapters/userSchema';

const userRepositorys = new userRepository(UserModel);
const userUsecases = new UserUsecase(userRepositorys);
const consumerMessage = new rabbitmq(userUsecases);


const app = express();
const port =  process.env.PORT || 3001;
app.use(cors());

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const rabbitMQ = async () => {
    await consumerMessage.userRegConsumer()
  };
rabbitMQ();

app.listen(port, () => {
    console.log(`Server Running on ${port}`);
  });