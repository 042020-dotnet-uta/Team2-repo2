import { Injectable } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { Inventory } from '../../models/inventory';
import { Menu } from '../../models/menu';
import { Category } from '../../models/category';
import { Item } from '../../models/item';

import { environment } from '../../../environments/environment';
 
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = environment.base;

  private categories = 'categories';
  private inventories = 'inventories';
  private menus = 'menus';
  private items = 'items';
  private restaurants = 'restaurants';
  private users = 'users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*' })
  };
  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    const url = `${this.baseUrl}/${this.restaurants}`;
    return this.http.get<Restaurant[]>(url);
  }

  getCategories(): Observable<Category[]> {
    return null;
  }

  placeOrder(): Observable<Category[]> {
    return null;
  }

  getMenu(id: number): Observable<Menu> {
    const url = `${this.baseUrl}/${this.menus}/${id}`;
    return this.http.get<Menu>(url);
  }

  getInventories(restaurant: Restaurant | number): Observable<Inventory[]> {
    const restaurantId = typeof restaurant === 'number' ? restaurant : restaurant.id;
    const url = `${this.baseUrl}/${this.inventories}/?restaurantId=${restaurantId}`;
    console.log(url);
    return this.http.get<Inventory[]>(url);
  }

  addInventory(inventory: Inventory): Observable<Inventory> {
    const url = `${this.baseUrl}/${this.inventories}`;
    return this.http.post<Inventory>(url, inventory, this.httpOptions);
  }

  addItem(item: Item): Observable<Item> {
    const url = `${this.baseUrl}/${this.items}`;
    return this.http.post<Item>(url, item, this.httpOptions);
  }

  deleteMenuItem(menu: Menu | number, category: Category | number, item: Item | number): Observable<Item> {
    const menuId = typeof menu === 'number' ? menu : menu.id;
    const categoryId = typeof category === 'number' ? category : category.id;
    const itemId = typeof item === 'number' ? item : item.id;
    const url = `${this.baseUrl}/${this.menus}/${menuId}/categories/${categoryId}/items/${itemId}`

    return this.http.delete<Item>(url, this.httpOptions);
  }
}
