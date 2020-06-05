export class Restaurant { 
    id: number;
    name: string;
    description: string;
    address: any;
    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}