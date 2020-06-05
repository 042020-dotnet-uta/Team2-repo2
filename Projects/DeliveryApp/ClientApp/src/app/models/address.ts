export class Address {
    id: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    constructor(id: number, address1: string, address2: string, city: string, state: string, zipCode: string){
        this.id = id;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}