import { Component, OnInit } from '@angular/core';

import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantService } from '../../services/restaurant/restaurant.service';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(restaurants => this.restaurants = restaurants);
  }

}
