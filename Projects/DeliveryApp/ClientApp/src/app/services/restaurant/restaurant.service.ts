import { Injectable } from '@angular/core';

import { Category } from '../../models/category';
import { Item } from '../../models/item';
import { Menu } from '../../models/menu';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/orderitem';
import { Restaurant } from '../../models/restaurant';
import { User } from '../../models/user';

import { environment } from '../../../environments/environment';
 
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = environment.base;

  private categories = 'categories';
  private items = 'items';
  private menus = 'menus';
  private orders = 'orders';
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

  getCategories(): Observable<Category[]> {
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

  addOrder(order: Order): Observable<Order> {
    const url = `${this.baseUrl}/${this.orders}`;
    return this.http.post<Order>(url, order, this.httpOptions);
  }

  addOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    const url = `${this.baseUrl}/orderassignmentreasons`;
    return this.http.post<OrderItem>(url, orderItem, this.httpOptions);
  }

  getOrders(): Observable<Order[]> {
    const url = `${this.baseUrl}/orders`;
    return this.http.get<Order[]>(url);
  }

  getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<User[]>(url);
  }

  addUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/${this.users}`;
    return this.http.post<User>(url, user, this.httpOptions);
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
