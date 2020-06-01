import { Item } from './item';
import { Restaurant } from './restaurant';

export class Inventory {
    id: number;
    restaurantId: number;
    item: Item;
    quantity: number;
    constructor(restaurantId: number, item: Item, quantity) {
        this.restaurantId = restaurantId;
        this.item = item;
        this.quantity = quantity;
    }
}