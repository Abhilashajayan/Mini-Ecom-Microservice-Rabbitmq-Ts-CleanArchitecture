import amqp from 'amqplib';
import { IUserSchema } from '../interface/IUserSchema';
import { UserUsecase } from '../usecases/userUsecase';

export class rabbitmq {
    private Connection: amqp.Connection | null = null;
    private Channel: amqp.Channel | null = null;
    constructor(public userUsecases: UserUsecase){}

    async initialize() {
        try{
        const rabbitmqUrl = "amqp://localhost:5672";
        this.Connection = await amqp.connect(rabbitmqUrl);
        this.Channel = await this.Connection.createChannel();
        console.log("the connection is established");
        }catch(err){
            console.log(err,"the connection is not established");
            process.exit(1);
        }
    }

    async userRegConsumer(){
        if(!this.Channel){
            await this.initialize();
        }
        if(this.Channel){
            const queue = "userReg";
            await this.Channel.assertQueue(queue, { durable: true });
            await this.Channel.consume(
                queue,
                (msg) => {
                  if (msg !== null && msg.content) {  
                    try {
                      console.log('row message ',msg);
                      
                      const data = JSON.parse(msg.content.toString());
                      console.log("Received message:", data);
                      this.userUsecases.register(data);
                    } catch (error) {
                      console.error("Error parsing message content:", error);
                      console.log("Raw message content:", msg.content.toString());
                    }
                  }
                },
                { noAck: true }
              );
            } else {
              console.error("Failed to create a channel");
            
        }
    }


    async userLoginConsumer() {
      if (!this.Channel) {
          await this.initialize();
      }
  
      if (this.Channel) {
        await this.Channel.assertQueue('response_queue', { durable: false });
        const queue = 'login_queue';
        await this.Channel.assertQueue(queue, { durable: false });

        this.Channel.consume(queue, async (msg) => {
            if (msg !== null && msg.content) {
                try {
                    console.log('Raw login message:', msg);
                    const loginData = JSON.parse(msg.content.toString());
                    console.log('Received login message:', loginData);
                    const loginResult = await this.userUsecases.login(loginData);
                    const correlationId = msg.properties.correlationId;
                    const responseQueue = msg.properties.replyTo;

                    if (correlationId && responseQueue) {
                        const responseMessage = JSON.stringify(loginResult);
                        await this.Channel.sendToQueue(responseQueue, Buffer.from(responseMessage), {
                            correlationId,
                        });
                        console.log('Login response sent:', responseMessage);
                    }
                } catch (error) {
                    console.error('Error parsing login message content:', error);
                    console.log('Raw login message content:', msg.content.toString());
                }
            }
        }, { noAck: true });
      } else {
          console.error("Failed to create a channel");
      }
  }
  

   
    
}