import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Restaurant } from '../../models/restaurant';

import { DataService } from '../../services/data/data.service';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor(private restaurantService: RestaurantService,
              private router: Router,
              private dataService: DataService) { }

  restaurant: Restaurant;

  ngOnInit(): void {
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
