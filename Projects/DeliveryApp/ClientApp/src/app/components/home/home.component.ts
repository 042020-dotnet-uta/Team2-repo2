import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { DataService } from '../../services/data/data.service';
import { AuthService } from '../../auth.service';
import { GoogleService } from '../../services/google/google.service';

import { User } from '../../models/user';
import { stringify } from 'querystring';
import { async } from '@angular/core/testing';

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
  email: string;
  distance: string;
  org: string; //"address, city, Country";
  dest: string; //"like ^^";

  constructor(fb: FormBuilder, 
              private router: Router, 
              private dialog: MatDialog, 
              private service: DataService,
              public goog: GoogleService,
              public auth: AuthService) {
    if (this.auth.loggedIn) {
      auth.logout();
    }
    this.searchForm = fb.group({ 
      search: ''
    });
  }

  //first bind org and dest to use
  //since it uses promises make your method async and use await to get the distance
  async getDist(){
    let dist = await this.goog.getDistance(this.org, this.dest);
    this.distance = dist;
    alert(this.distance);
  }

  getEmail(){
    this.email = this.auth.getEmail();
    this.sayEmail();
  }
  sayEmail(){
    alert(this.email);
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
    this.service.setData(this.searchForm.value.search).subscribe(result => {
      this.search = result;
      this.router.navigateByUrl('/restaurants');
    });
  }
}