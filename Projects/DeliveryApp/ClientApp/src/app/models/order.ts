import { OrderItem } from './orderitem';
import { Restaurant } from './restaurant';

export class Order {
    id: number;
    customerID: number;
    preparerID: number;
    driverID: number;
    locationID: number;
    location: Restaurant;
    orderItems: OrderItem[];

    constructor(customerID: number, preparerID: number, driverID: number, locationID: number) {
        this.customerID = customerID;
        this.preparerID = preparerID;
        this.driverID = driverID;
        this.locationID = locationID;
        this.orderItems = [];
    }
}
