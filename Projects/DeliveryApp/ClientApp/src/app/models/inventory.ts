import { Product } from './product';
import { Restaurant } from './restaurant';

export class Inventory {
    id: number;
    restaurantId: number;
    product: Product;
    quantity: number;
    constructor(restaurantId: number, product: Product, quantity) {
        this.restaurantId = restaurantId;
        this.product = product;
        this.quantity = quantity;
    }
}