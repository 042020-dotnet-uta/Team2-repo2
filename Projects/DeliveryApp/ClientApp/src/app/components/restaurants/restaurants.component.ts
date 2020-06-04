import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { Restaurant } from '../../models/restaurant';
import { Item } from '../../models/item';

import { DataService } from '../../services/data/data.service';
import { RestaurantService } from '../../services/restaurant/restaurant.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  inventoryForm: FormGroup;

  name = new FormControl("", Validators.required);

  product: Item;
  restaurant: Restaurant;
  restaurants: Restaurant[];
  search: string;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(private restaurantService: RestaurantService, 
              private dataService: DataService, 
              private fb: FormBuilder) {
    this.inventoryForm = fb.group({
      "name": ["", Validators.required],
      "price": ["", Validators.required],
      "quantity": ["", Validators.required]
    });
    
  }

  ngOnInit() {
    this.dataService.getData().subscribe(search => this.search = search);
    this.getOrders();
    this.getRestaurants();
  }

  getOrders(): void {
    //
  }

  getRestaurants(): void {
    if (this.search == null) {
      this.search = '';
    } 
    this.restaurantService.getRestaurants().subscribe(restaurants => this.restaurants = restaurants.filter(r => r.name.includes(this.search)));
  }

  onSubmit() {
    console.log("model-based form submitted");
    console.log(this.inventoryForm);
    let restaurantId = 1;
    let product = new Item(this.inventoryForm.value.name, '', this.inventoryForm.value.price, null);
    let quantity = this.inventoryForm.value.quantity;
    // let inventory = new Inventory(restaurantId, product, quantity);
    // this.restaurantService.addInventory(inventory).subscribe(i => { this.inventories.push(i); this.table.renderRows() });
    this.table.renderRows();
  }
}
