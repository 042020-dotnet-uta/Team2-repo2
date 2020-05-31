import { Category } from './category';
import { Restaurant } from './restaurant';

export interface Menu {
    id: number;
    restaurant: Restaurant;
    categories?: Category[]; 
}