import { Product } from './product';

export interface Category {
    id: number;
    menuId: number;
    name: string;
    products?: Product[];
}