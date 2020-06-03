import { Injectable } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
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

  getRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.baseUrl}/${this.restaurants}/${id}`;
    return this.http.get<Restaurant>(url);
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    const url = `${this.baseUrl}/${this.restaurants}`;
    return this.http.post<Restaurant>(url, restaurant, this.httpOptions);
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    const restaurantId = typeof restaurant === 'number' ? restaurant : restaurant.id;
    const url = `${this.baseUrl}/${this.restaurants}/${restaurantId}`;
    return this.http.put<Restaurant>(url, restaurant, this.httpOptions);
  }

  deleteRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    const restaurantId = typeof restaurant === 'number' ? restaurant : restaurant.id;
    const url = `${this.baseUrl}/${this.restaurants}/${restaurantId}`;
    return this.http.delete<Restaurant>(url, this.httpOptions);
  }

  getCategories(restaurant: Restaurant): Observable<Category[]> {
    const restaurantId = typeof restaurant === 'number' ? restaurant : restaurant.id;
    const url = `${this.baseUrl}/${this.categories}`;
    return this.http.get<Category[]>(url);
  }

  addCategory(category: Category): Observable<Category> {
    const url = `${this.baseUrl}/${this.categories}`;
    return this.http.post<Category>(url, category, this.httpOptions);
  }

  getItems(category: Category): Observable<Item[]> {
    const categoryId = typeof category === 'number' ? category : category.id;
    const url = `${this.baseUrl}/${this.items}/?categoryId=${categoryId}`;
    return this.http.get<Item[]>(url);
  }

  addItem(item: Item): Observable<Item> {
    const url = `${this.baseUrl}/${this.items}`;
    return this.http.post<Item>(url, item, this.httpOptions);
  }







  //
  getMenu(id: number): Observable<Menu> {
    const url = `${this.baseUrl}/${this.menus}/${id}`;
    return this.http.get<Menu>(url);
  }

  deleteMenuItem(menu: Menu | number, category: Category | number, item: Item | number): Observable<Item> {
    const menuId = typeof menu === 'number' ? menu : menu.id;
    const categoryId = typeof category === 'number' ? category : category.id;
    const itemId = typeof item === 'number' ? item : item.id;
    const url = `${this.baseUrl}/${this.menus}/${menuId}/categories/${categoryId}/items/${itemId}`

    return this.http.delete<Item>(url, this.httpOptions);
  }
}
