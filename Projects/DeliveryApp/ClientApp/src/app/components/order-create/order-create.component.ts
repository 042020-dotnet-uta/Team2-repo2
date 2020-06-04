import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';
import { Item } from '../../models/item';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/orderitem';
import { Restaurant } from '../../models/restaurant';
import { User } from '../../models/user';

import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { AuthService } from '../../auth.service';
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
  displayedColumns = ['select', 'id', 'name', 'price', 'description'];

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private restaurantService: RestaurantService) {
    this.authService.userProfile$.subscribe(user => {
      this.user = new User();
      this.user.fName = user.given_name;
      this.user.lName = user.family_name;
      this.user.password = user.email;
      if (user == null) {
        // TODO USER NOT AUTHENTICATED, REDIRECT TO DASHBOARD
        console.log('illegal');
      } else {
        this.restaurantService.getUsers().subscribe(users => {
          let temp = users.filter(user => user.password == this.user.password);
          if (temp == null || temp.length == 0) {

            // TODO GET USER TYPE FROM ROUTER
            this.user.userTypeID = 1;
            console.log(this.user);

            this.restaurantService.addUser(this.user).subscribe(user => {
              this.user = user;
              console.log(`${this.user.id} created!`);
            });
          } else {
            console.log("exists");
            this.user = temp[0];
          }
          // TODO CHECK IF USER IS ADMIN OR CUSTOMER TYPE


          // if allowed..
          let driver = new User(this.user.id);
          let preparer = new User(this.user.id);

          const id = + this.route.snapshot.paramMap.get('id');
          this.restaurant = new Restaurant(id, null, null);
          // kludge, orders CAN'T have a preparer or a driver at this point.
          this.order = new Order(this.user.id, preparer.id, driver.id, this.restaurant.id);

        });
      }
    });
    // this.user = new User(6);

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
    this.restaurantService.getCategories().subscribe(categories => {
      this.categories = categories.filter(category => category.restaurantID == this.restaurant.id);
      this.categories.forEach(category => {
        this.restaurantService.getItems(category).subscribe(items => { category.items = items.filter(item => item.categoryID == category.id); });
      });
    });
  }

  selection = new SelectionModel<Item>(true, []);

  /** The label for the checkbox on the passed row */
  checkboxLabel(item?: Item): string {
    // if (!item) {
    //   return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    // }

    // TODO REMOVE FROM MAP IF NOT SELECTED
    if (this.selection.isSelected(item) && !this.orderItems.has(item.id)) {
      console.log(this.user.id);
      let orderItem = new OrderItem(item.id);
      this.order.orderItems.push(orderItem);
      this.orderItems.set(item.id, orderItem);
    }
    return `${this.selection.isSelected(item) ? 'deselect' : 'select'} item ${item.id + 1}`;
  }

  // TODO DON'T PLACE ORDER IF NO ORDERS
  onPlaceOrderClick() {
    console.log(this.order);
    this.restaurantService.addOrder(this.order).subscribe(result => {
      this.orderItems.forEach(orderItem => {
        orderItem.reason = result.id;
        this.restaurantService.addOrderItem(orderItem).subscribe();
      });
    });
  }
}

