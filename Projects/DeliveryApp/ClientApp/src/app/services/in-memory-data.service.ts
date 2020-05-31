import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const restaurants = [
      { id: 1, name: 'Shells & Sauce' },
      { id: 2, name: 'Peter\'s Chinese' },
      { id: 3, name: 'Thai Basil' },
      { id: 4, name: 'Milk Market' }
    ];

    const products = [
      { id: 1, name: 'Bacon', price: 9.99 }, 
      { id: 2, name: 'Celery', price: 9.99 },
      { id: 3, name: 'Pasta', price: 9.99 },
      { id: 4, name: 'Cake', price: 9.99 }
    ];

    const inventories = [
      { id: 1, restaurantId: 1, product: products[0], quantity: 3 },
      { id: 2, restaurantId: 1, product: products[1], quantity: 3 },
      { id: 3, restaurantId: 1, product: products[2], quantity: 3 },
      { id: 4, restaurantId: 1, product: products[3], quantity: 3 },
    ];

    const categories = [
      { id: 1, menuId: 1, name: 'Appetizers' },
      { id: 1, menuId: 1, name: 'Entrees'},
      { id: 1, menuId: 1, name: 'Desserts'}
    ];
    
    const menus = [
      { id: 1, restaurantId: 1, categories: categories }
    ];

    return { restaurants, products, inventories, categories, menus };
  }
}
