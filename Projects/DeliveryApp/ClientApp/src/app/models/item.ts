export class Item {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryID: number;

    constructor(name: string, description: string, price: number, categoryID: number) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryID = categoryID;
    }
 }