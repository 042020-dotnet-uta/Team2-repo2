import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CustomerComponent } from '../../src/app/components/customer/customer.component';
import { DriverComponent } from '../../src/app/components/driver/driver.component';
import { HomeComponent } from '../../src/app/components/home/home.component';
import { MenuCreatorComponent } from '../../src/app/components/menu-creator/menu-creator.component';
import { RestaurantComponent } from '../../src/app/components/restaurant/restaurant.component';
import { RestaurantsComponent } from '../../src/app/components/restaurants/restaurants.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { NavbarComponent } from '../../src/app/components/navbar/navbar.component'; 
import { OrdersComponent } from './components/orders/orders.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'customer', component: CustomerComponent },
  { path: 'driver', component: DriverComponent },
  { path: 'menu-creator', component: MenuCreatorComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'restaurants/:id', component: OrderCreateComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
