import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Restaurant } from '../../models/restaurant';
import { User } from '../../models/user';

import { AuthService } from '../../auth.service';
import { DataService } from '../../services/data/data.service';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  user: User;
  restaurant: Restaurant;
  currentDate = new Date();
  restaurantUserTypeID: 4;
  adminUserTypeID: 1;

  constructor(private authService: AuthService,
              private restaurantService: RestaurantService,
              private router: Router,
              private dataService: DataService) { }

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
            this.user.userTypeID = this.restaurantUserTypeID;
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
          // this.getOrdersUser(this.user);
        });
      });
    } else {
      // REDIRECT
      console.log('illegal');
    }
    this.getRestaurant(1);
  }

  getRestaurant(id: number) {
    this.restaurantService.getRestaurant(id).subscribe(restaurant => this.restaurant = restaurant);
  }

  getOrders(id: number) {
    // 
  }

  onMenuClick() {
    this.dataService.setData(this.restaurant).subscribe(result => {
      this.restaurant = result;
      this.router.navigateByUrl('/menu-creator');
    });
  }
}