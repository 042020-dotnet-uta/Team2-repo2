import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';
import { Item } from '../../models/item';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/orderitem';
import { Restaurant } from '../../models/restaurant';
import { User } from '../../models/user';

import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { RestaurantService } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})

export class OrderCreateComponent implements OnInit {

  category: Category;
  categories: Category[];
  user: User;
  order: Order;
  orderItems: Map<number, OrderItem>;
  restaurant: Restaurant;
  displayedColumns = [ 'select', 'id', 'name', 'price', 'description'];

  constructor(private route: ActivatedRoute,
              private restaurantService: RestaurantService) { 
    // TODO: AUTH
    this.user = new User(6);
    let driver = new User(6);
    let preparer = new User(6);

    const id = + this.route.snapshot.paramMap.get('id');
    this.restaurant = new Restaurant(id, null, null);
    // kludge, orders CAN'T have a preparer or a driver at this point.
    this.order = new Order(this.user.id, preparer.id, driver.id, this.restaurant.id);
    this.orderItems = new Map<number, OrderItem>();
  }

  ngOnInit(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.getRestaurant(id);
    this.getCategoriesAndItems(this.restaurant);
  }

  getRestaurant(id: number): void {
    this.restaurantService.getRestaurant(id).subscribe(restaurant => this.restaurant = restaurant);
    // this.restaurantService.getCategories().subscribe();
  }

  getCategoriesAndItems(restaurant: Restaurant) {
    this.restaurantService.getCategories(this.restaurant).subscribe(categories => {
      this.categories = categories.filter(category => category.restaurantID == this.restaurant.id);
      this.categories.forEach(category => {
        this.restaurantService.getItems(category).subscribe(items => {category.items = items.filter(item => item.categoryID == category.id); });
      });
    });
  }

  selection = new SelectionModel<Item>(true, []);

  /** The label for the checkbox on the passed row */
  checkboxLabel(item?: Item): string {
    // if (!item) {
    //   return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    // }

    if (this.selection.isSelected(item) && !this.orderItems.has(item.id)) {
      let orderItem = new OrderItem(item.id);
      this.order.orderItems.push(orderItem);
      this.orderItems.set(item.id, orderItem);
    }
    return `${this.selection.isSelected(item) ? 'deselect' : 'select'} item ${item.id + 1}`;
  }

  onPlaceOrderClick() {
    this.restaurantService.addOrder(this.order).subscribe(result =>
      { });
  }
}

