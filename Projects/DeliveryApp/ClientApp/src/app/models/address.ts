export class Address {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    constructor(address1: string, address2: string, city: string, state: string, zipCode: string){
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}