import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Order } from '../../models/order';
import { User } from '../../models/user';

import { AuthService } from '../../auth.service';
import { DataService } from '../../services/data/data.service';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private authService: AuthService,
              private dataService: DataService,
              private restaurantService: RestaurantService) { }
  showNav: true;

  orders: Order[];
  user: User;
  users: User[];

  displayedColumns: string[] = ['id', 'customer', 'total', 'order date'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
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
            this.getOrdersUser(this.user);
            
        });
      }
    });
  }

  getOrdersUser(user: User) {
    console.log('here');
    this.restaurantService.getOrders().subscribe(results => {
      console.log(this.user.id);
      this.orders = results.filter(order => order.customerID == this.user.id);
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
