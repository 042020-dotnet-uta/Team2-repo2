import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

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

  constructor(fb: FormBuilder, private dialog: MatDialog) {
    this.searchForm = fb.group({ });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent,{
      // minHeight:'400px',
      // minWidth:'300px'
    });
    this.dialogRef.afterClosed().subscribe(result => this.user = result);
  }
}