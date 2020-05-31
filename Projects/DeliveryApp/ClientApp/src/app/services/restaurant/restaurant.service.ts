import { Injectable } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { Inventory } from '../../models/inventory';
import { Menu } from '../../models/menu';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
 
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private menusUrl = 'api/menus';
  private inventoriesUrl = 'api/inventories';
  private categoriesUrl = 'api/categories';
  private productsUrl = 'api/products';

  private restaurauntsUrl = 'api/restaurants';
  // private url = 'https://localhost:5001/WeatherForecast';
  // private url = 'https://jsonplaceholder.typicode.com/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*' })
  };
  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.restaurauntsUrl);
  }

  getMenu(id: number): Observable<Menu> {
    const url = `${this.menusUrl}/${id}`;
    return this.http.get<Menu>(url);
  }

  getInventories(restaurant: Restaurant | number): Observable<Inventory[]> {
    const restaurantId = typeof restaurant === 'number' ? restaurant : restaurant.id;
    const url = `${this.inventoriesUrl}/?restaurantId=${restaurantId}`;
    console.log(url);
    return this.http.get<Inventory[]>(url);
  }

  addInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.inventoriesUrl, inventory, this.httpOptions);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions);
  }

  deleteMenuProduct(menu: Menu | number, category: Category | number, product: Product | number): Observable<Product> {
    const menuId = typeof menu === 'number' ? menu : menu.id;
    const categoryId = typeof category === 'number' ? category : category.id;
    const productId = typeof product === 'number' ? product : product.id;
    const url = `${this.menusUrl}/${menuId}/categories/${categoryId}/products/${productId}`

    return this.http.delete<Product>(url, this.httpOptions);
  }
}
