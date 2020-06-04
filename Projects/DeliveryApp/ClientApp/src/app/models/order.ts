import { OrderItem } from './orderitem';

export class Order {
    id: number;
    customerID: number;
    preparerID: number;
    driverID: number;
    locationID: number;
    orderItems: OrderItem[];

    constructor(customerID: number, preparerID: number, driverID: number, locationID: number) {
        this.customerID = customerID;
        this.preparerID = preparerID;
        this.driverID = driverID;
        this.locationID = locationID;
        this.orderItems = [];
    }
}
