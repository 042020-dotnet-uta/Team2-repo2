export class OrderItem {
    id: number;
    orderID: number;
    itemID: number;

    constructor(itemID: number) {
        this.itemID = itemID;
    }
}