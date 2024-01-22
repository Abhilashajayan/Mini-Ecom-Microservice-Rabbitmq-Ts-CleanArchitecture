export class OrderEntity {
    public readonly order_id?: string;
    public readonly product: {
      product_id: string;
      product_name: string;
      product_price: number;
    };
    public readonly status: string;
    public readonly count: number;
    public readonly totalPrice: number;
  
    constructor(
      order_id: string,
      product_id: string,
      product_name: string,
      product_price: number,
      status: string,
      count: number,
      totalPrice: number
    ) {
      this.order_id = order_id;
      this.product = {
        product_id: product_id,
        product_name: product_name,
        product_price: product_price,
      };
      this.status = status;
      this.count = count;
      this.totalPrice = totalPrice;
    }
  }
  