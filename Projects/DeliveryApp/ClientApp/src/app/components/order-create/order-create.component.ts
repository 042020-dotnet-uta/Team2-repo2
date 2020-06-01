import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';
import { Restaurant } from '../../models/restaurant';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RestaurantService } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})

export class OrderCreateComponent implements OnInit {

  @Input() restaurant: Restaurant;
  categories: Category[];

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.restaurantService.getCategories().subscribe();
  }

  save(): void {
    this.restaurantService.placeOrder().subscribe();
    // this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

  goBack(): void {
    // this.location.back();
  }
}

