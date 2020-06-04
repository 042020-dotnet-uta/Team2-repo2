import { Order } from './order';
import { Item } from './item';

export class OrderItem {
    id: number;

    // kludge, our APIs don't support nested posting
    reason: number;
    description: number;


    constructor(itemID: number, orderID?: number, ) {
        this.reason = orderID;
        this.description = itemID;
    }
}