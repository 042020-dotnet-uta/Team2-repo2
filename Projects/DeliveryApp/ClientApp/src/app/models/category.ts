import { Item } from './item';
import { Restaurant } from './restaurant';

export interface Category {
    id: number;
    name: string;
    description: string;
    restaurant: Restaurant;
}