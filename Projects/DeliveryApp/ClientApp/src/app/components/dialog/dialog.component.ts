import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogComponent>) {
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: ''});
  }

  ngOnInit() {
  }
  
  onCloseDialog() {
      this.dialogRef.close();
  }
  submit() {
    this.dialogRef.close(this.form.value);
  }
}
