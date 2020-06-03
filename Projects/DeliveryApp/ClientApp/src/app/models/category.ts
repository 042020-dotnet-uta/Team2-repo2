import { Item } from './item';
import { Restaurant } from './restaurant';

export class Category {
    id: number;
    name: string;
    description: string;
    restaurantID: number;
    items?: Item[];
    constructor(name: string, description: string, restaurantID: number, items?: Item[]) {
        this.name = name;
        this.description = description;
        this.restaurantID = restaurantID;
        this.items = items;
    }
}