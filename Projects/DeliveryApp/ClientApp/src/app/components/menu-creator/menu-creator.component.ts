import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { Inventory } from '../../models/inventory';
import { Menu } from '../../models/menu';
import { Item } from '../../models/item';
import { Category } from '../../models/category';

@Component({
  selector: 'app-menu-creator',
  templateUrl: './menu-creator.component.html',
  styleUrls: ['./menu-creator.component.css']
})
export class MenuCreatorComponent implements OnInit {

  menu: Menu;
  inventories: Inventory[];
  categories: Category[];
  category: Category;
  items: Item[];
  item: Item;

  constructor(private service: RestaurantService) {
  }

  ngOnInit() {
    this.getMenu(1);
    this.getInventories(1);
  }

  getMenu(id: number): void {
    this.service.getMenu(id).subscribe(menu => this.menu = menu);
  }

  getInventories(id: number): void {
    this.service.getInventories(id).subscribe(inventories => this.inventories = inventories);
  }

  delete(menu: Menu, categoryIndex: number, category: Category, itemIndex: number, item: Item): void {
    // this.menu.categories[categoryIndex].items = this.menu.categories[categoryIndex].items.filter(p => p !== item);
    this.service.deleteMenuItem(menu, this.menu.categories[categoryIndex], item).subscribe();
  }

  add(menu: Menu, categoryIndex: number, category: Category) {
    
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log('prev == next');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('prev != next');
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
