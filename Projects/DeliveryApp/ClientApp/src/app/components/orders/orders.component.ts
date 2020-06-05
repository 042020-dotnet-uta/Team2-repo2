import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Order } from '../../models/order';
import { Restaurant } from '../../models/restaurant';
import { User } from '../../models/user';

import { AuthService } from '../../auth.service';
import { DataService } from '../../services/data/data.service';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  restaurant: Restaurant;
  user: User;
  currentDate = new Date();
  
  displayedColumns: string[] = ['id', 'customer', 'total', 'order date'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private authService: AuthService, 
              private dataService: DataService,
              private restaurantService: RestaurantService) { 
    this.user = new User(6);
    this.restaurant = new Restaurant(1, null, null);
  }

  ngOnInit(): void {
    this.getOrdersRestaurant(this.restaurant);
  }

  getOrdersRestaurant(restaurant: Restaurant) {
    this.restaurantService.getOrders().subscribe(results => {
      this.orders = results.filter(order => order.locationID == this.restaurant.id);
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
