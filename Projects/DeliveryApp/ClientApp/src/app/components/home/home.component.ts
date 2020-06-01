import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

import { RedirectService } from '../../services/redirect/redirect.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User;
  searchForm: FormGroup;
  dialogRef: MatDialogRef<DialogComponent>;
  search: string;

  constructor(fb: FormBuilder, private router: Router, private dialog: MatDialog, private service: RedirectService) {
    this.searchForm = fb.group({ 
      search: ''
    });
  }

  openCustomerDialog() {
    this.dialogRef = this.dialog.open(DialogComponent,{
      // height: '330px',
      // width: '400px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      this.router.navigateByUrl('/customer') });
  }

  openDriverDialog() {
    this.dialogRef = this.dialog.open(DialogComponent,{});
    this.dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      this.router.navigateByUrl('/driver') });
  }

  openRestaurantDialog() {
    this.dialogRef = this.dialog.open(DialogComponent,{});
    this.dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      this.router.navigateByUrl('/restaurant') });
  }

  

  onSubmit() {
    console.log(this.searchForm.value.search);
    this.service.restaurantNameSearch(this.searchForm.value.search).subscribe(result => {
      this.search = result;
      this.service.search = this.search;
      this.router.navigateByUrl('/restaurants');
    });
  }
}