import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserView} from "../../../../../service/mods/user-crud.service";

@Component({
  selector: 'app-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.scss']
})
export class UserInsertComponent {
  name = new FormControl('');
  email = new FormControl('');
  phone = new FormControl('');
  password = new FormControl('');

  constructor(public dialogRef: MatDialogRef<UserInsertComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: UserView | null) {
    if (data != null) {
      this.name.setValue(data.name)
      this.email.setValue(data.email)
      this.phone.setValue(data.phone)
    }
  }

  ngOnInit(): void {
  }

  closeClick(): void {
    this.dialogRef.close();
  }

  post(): UserView {
    return {
      phone: this.phone.value,
      password: this.password.value,
      name: this.name.value,
      email: this.email.value,
      twoFactor: ""
    }
  }
}
