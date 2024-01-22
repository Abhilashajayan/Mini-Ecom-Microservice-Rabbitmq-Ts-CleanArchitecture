import amqp from 'amqplib';

export class Rabbitmq {
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;

    async initialize() {
        try {
            const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";
            this.connection = await amqp.connect(rabbitmqUrl);
            this.channel = await this.connection.createChannel();
            console.log("RabbitMQ connection is established");

        } catch (e) {
            console.error("RabbitMQ connection failed");
            process.exit(1);
        }
    }

    async productDetailsPublisher(product_id: string): Promise<any> {
        try {
            if (!this.channel) {
                await this.initialize();
            }
    
            const exchange = 'product_exchange';
            await this.channel.assertExchange(exchange, 'direct', { durable: false });
            const callbackQueue = await this.channel.assertQueue('', { exclusive: true });
            const correlationId = Math.random().toString();
    
            this.channel!.publish(exchange, '', Buffer.from(product_id), {
                replyTo: callbackQueue.queue,
                correlationId: correlationId,
            });
    
            console.log("Product details request sent:", product_id);
    
            return new Promise((resolve) => {
                this.receiveResponse(callbackQueue.queue, resolve);
            });
        } catch (error) {
            console.error('Error in productDetailsPublisher:', error);
            throw error;
        }
    }
    
    private async receiveResponse(callbackQueue: string, resolve: (value: any) => void): Promise<void> {
        try {
            this.channel!.consume(callbackQueue, (message) => {
                if (message) {
                    const response = JSON.parse(message.content.toString());
                    resolve(response);
                }
            }, { noAck: true });
        } catch (error) {
            console.error('Error in receiveResponse:', error);
            throw error;
        }
    }
    


}
