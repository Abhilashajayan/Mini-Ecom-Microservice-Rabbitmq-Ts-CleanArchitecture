export class ProdEntity {

    public readonly product_name: string; 
    public readonly product_price: number;
    public readonly product_id?: string;

    constructor(product_id : string , product_name : string , product_price: number) {
            this.product_id = product_id;
            this.product_name = product_name;
            this.product_price = product_price;   
    }
}