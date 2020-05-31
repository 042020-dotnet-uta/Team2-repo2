export class Product {
    id: number;
    name: string;
    price: number;
    category?: number;

    constructor(name: string, price: number, category?: number) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
 }