import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';
import { Item } from '../../models/item';
import { Restaurant } from '../../models/restaurant';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  restaurant: Restaurant;
  displayedColumns = [ 'select', 'id', 'name', 'price', 'description'];

  constructor(private route: ActivatedRoute,
              private restaurantService: RestaurantService) { 
    const id = + this.route.snapshot.paramMap.get('id');
    this.restaurant = new Restaurant(id, null, null);
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

  save(): void {
    // this.restaurantService.placeOrder().subscribe();
    // this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

  goBack(): void {
    // this.location.back();
  }

  selection = new SelectionModel<Item>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // const numRows = this.category.items.length;
    // return numSelected === numRows;
    return false;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.category.items.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}

