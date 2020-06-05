import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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

  search: string;
  searchForm: FormGroup;

  constructor(fb: FormBuilder,
              private router: Router, 
              private authService: AuthService,
              private dataService: DataService,
              private restaurantService: RestaurantService) {
      this.searchForm = fb.group({ 
        search: ''
      });
     }
  showNav: true;

  orders: Order[];
  user: User;
  users: User[];
  adminUserTypeID: 1 // really bad idea
  customerUserTypeID: 3; // bad idea
  currentDate = new Date();

  displayedColumns: string[] = ['id', 'customer', 'total', 'order date'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    if (this.authService.loggedIn) {
      this.authService.userProfile$.subscribe(user => {
        this.user = new User();
        this.user.fName = user.given_name;
        this.user.lName = user.family_name;
        this.user.password = user.email;
        this.restaurantService.getUsers().subscribe(users => {
          let temp = users.filter(user => user.password == this.user.password);
          if ((temp == null || temp.length == 0)) {
            this.user.userTypeID = this.customerUserTypeID;
            this.restaurantService.addUser(this.user).subscribe(user => {
              this.user = user;
              console.log(`${this.user.id} created!`);
            });
          } else {
            console.log("exists");
            console.log(temp[0].userTypeID);
            this.user = temp[0];
          }
          // TODO CHECK IF USER IS ADMIN OR CUSTOMER TYPE

          // if allowed..
          this.getOrdersUser(this.user);
        });
      });
    } else {
      // REDIRECT
      console.log('illegal');
    }
  }

  getOrdersUser(user: User) {
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

  onSubmit() {
    this.dataService.setData(this.searchForm.value.search).subscribe(result => {
      this.search = result;
      this.router.navigateByUrl('/restaurants');
    });
  }
}
