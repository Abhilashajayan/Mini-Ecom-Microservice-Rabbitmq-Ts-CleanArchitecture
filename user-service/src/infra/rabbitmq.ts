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
      try {
        if (!this.Channel) {
          await this.initialize();
        }
    
        if (this.Channel) {
          const queue = 'userLogin';
          await this.Channel.assertQueue(queue, { durable: true });
    
          this.Channel.consume(
            queue,
            async (msg) => {
              if (msg !== null && msg.content) {
                try {
                  const data = JSON.parse(msg.content.toString());
                  console.log("Received login credential:", data);
    
                  const isValid = await this.userUsecases.login(data);
    
                  const responseQueue = msg.properties.replyTo;
                  const correlationId = msg.properties.correlationId;
    
                  this.Channel.sendToQueue(
                    responseQueue,
                    Buffer.from(JSON.stringify(isValid)),
                    { correlationId }
                  );
    
                  this.Channel.ack(msg);
                } catch (error) {
                  console.error("Error parsing message content:", error);
                  console.log("Raw message content:", msg.content.toString());
    
                  this.Channel.ack(msg);
                }
              }
            },
            { noAck: false }
          );
    
          console.log("Waiting for login requests. To exit press CTRL+C");
        } else {
          console.error("Failed to create a channel");
        }
      } catch (error) {
        console.error("Error in userLoginConsumer:", error);
      }
    }
    
}