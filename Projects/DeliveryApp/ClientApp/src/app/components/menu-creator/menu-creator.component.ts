import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Menu } from '../../models/menu';
import { Item } from '../../models/item';
import { Category } from '../../models/category';
import { Restaurant } from '../../models/restaurant';

import { DataService } from '../../services/data/data.service';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';


@Component({
  selector: 'app-menu-creator',
  templateUrl: './menu-creator.component.html',
  styleUrls: ['./menu-creator.component.css']
})
export class MenuCreatorComponent implements OnInit {

  menu: Menu;
  categories: Category[];
  category: Category;
  items: Item[];
  item: Item;
  restaurant: Restaurant;
  asyncTabs: Observable<any[]>;
  displayedColumns = ['id', 'name', 'price', 'description'];
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private dataService: DataService,
    private restaurantService: RestaurantService,
    public dialog: MatDialog) {
    this.restaurant = new Restaurant(1, null, null);
  }

  ngOnInit() {
    // this.dataService.getData().subscribe(restaurant => this.restaurant = restaurant);
    this.getCategoriesAndItems(this.restaurant);
    // this.getItems(this.restaurant);
  }

  getCategoriesAndItems(restaurant: Restaurant) {
    this.restaurantService.getCategories().subscribe(categories => {
      this.categories = categories.filter(category => category.restaurantID == this.restaurant.id);
      this.categories.forEach(category => {
        this.restaurantService.getItems(category).subscribe(items => {category.items = items.filter(item => item.categoryID == category.id)});
      });
    });
  }

  openAddItemDialog() {
    const dialogRef = this.dialog.open(MenuCreatorDialogComponent, {
      data: this.categories
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.categoryId) { 
        var newItem = new Item(result.name, result.description, result.price, result.categoryId);
        this.restaurantService.addItem(newItem).subscribe(item => this.getCategoriesAndItems(this.restaurant));
      } else {
        var newCategory = new Category(result.name, result.description, this.restaurant.id);
        console.log(newCategory);
        this.restaurantService.addCategory(newCategory).subscribe(item => this.getCategoriesAndItems(this.restaurant));
      }
      // this.item = new Item(result.name, result.description, result.price, result.categoryId);
    });
  }

  delete(menu: Menu, categoryIndex: number, category: Category, itemIndex: number, item: Item): void {
    // this.menu.categories[categoryIndex].items = this.menu.categories[categoryIndex].items.filter(p => p !== item);
    // this.service.deleteMenuItem(menu, this.menu.categories[categoryIndex], item).subscribe();
  }
}

@Component({
  selector: 'menu-creator-dialog',
  templateUrl: 'menu-creator.dialog.html',
})
export class MenuCreatorDialogComponent {
  itemForm: FormGroup;
  categoryForm: FormGroup;
  category;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MenuCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public categories: Category[]) {
    this.itemForm = this.formBuilder.group({
      name: '',
      price: '',
      description: '',
      categoryId: '',
      categoryName: ''
    });
    this.categoryForm = this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }
  onItemConfirmClick() {
    this.dialogRef.close(this.itemForm.value);
  }
  onCategoryConfirmClick() {
    this.dialogRef.close(this.categoryForm.value);
  }
}



