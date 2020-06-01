export class Item {
    id: number;
    name: string;
    description: string;
    price: number;
    category: number;

    constructor(name: string, description: string, price: number, category: number) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }
 }