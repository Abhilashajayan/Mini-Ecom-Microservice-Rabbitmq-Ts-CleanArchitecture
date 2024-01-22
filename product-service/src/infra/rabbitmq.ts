import amqp from 'amqplib';
import { productUsecase } from '../usecase/prodUsecase';

export class ProductService {
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;

    constructor(public productUsecase: productUsecase) {}

    async initialize() {
        try {
            const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";
            this.connection = await amqp.connect(rabbitmqUrl);
            this.channel = await this.connection.createChannel();
            console.log("Product Response service connection is established");

            const exchange = 'product_exchange';
            await this.channel.assertExchange(exchange, 'direct', { durable: false });
            const queueName = 'product_response_queue';
            await this.channel.assertQueue(queueName, { durable: false });
            this.channel.bindQueue(queueName, exchange, '');

            this.channel.consume(queueName, async (msg) => {
                if (msg) {
                    const product_id: string = msg.content.toString();
                    console.log("Received product_id:", product_id);

                    try {
                        const productData = await this.productUsecase.getProductData(product_id);
                        this.channel!.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(productData)), {
                            correlationId: msg.properties.correlationId,
                        });

                        this.channel!.ack(msg);
                    } catch (error) {
                        console.error("Error retrieving product data:", error);
                        this.channel!.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ error  : error.message })), {
                            correlationId: msg.properties.correlationId,
                        });

                        this.channel!.ack(msg);
                    }
                }
            }, { noAck: false });

        } catch (e) {
            console.error("Product Response service connection failed");
            process.exit(1);
        }
    }
}
