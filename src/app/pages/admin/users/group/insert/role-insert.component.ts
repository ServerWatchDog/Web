import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MiniUserResultView, UserRoleView} from "../../../../../service/mods/user-role.service";
import {MiniPermissionsView, UserPermissionsService} from "../../../../../service/mods/user-permissions.service";
import {Observable, zip} from "rxjs";
import {UserCrudService} from "../../../../../service/mods/user-crud.service";

@Component({
  selector: 'app-insert',
  templateUrl: './role-insert.component.html',
  styleUrls: ['./role-insert.component.scss']
})
export class RoleInsertComponent implements OnInit {
  resultData: UserRoleView = {
    description: "", name: "", permissions: [], users: []
  }
  users: Array<MiniUserResultView> = [];
  permissions: Array<MiniPermissionsView> = [];

  constructor(public dialogRef: MatDialogRef<RoleInsertComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: RoleInsertData | null) {
    if (data != null) {
      if (data.data != null) {
        this.resultData = data.data
      }
      this.permissions = data.permissions
      this.users = data.users
    }
  }

  close() {
    this.dialogRef.close(this.resultData)
  }

  ngOnInit(): void {
  }

}

export interface RoleInsertData {
  data: UserRoleView | null
  permissions: Array<MiniPermissionsView>
  users: Array<MiniUserResultView>
}

@Injectable({
  providedIn: 'root'
})
export class RoleInsertService {
  constructor(
    public dialog: MatDialog,
    private users: UserCrudService,
    private permissions: UserPermissionsService) {
  }

  showDialog(oldData: UserRoleView | null = null): Observable<UserRoleView> {
    return new Observable<UserRoleView>(server => {
      zip(this.users.selectMini(), this.permissions.select()).subscribe({
        next: (data) => {
          this.dialog.open(RoleInsertComponent, {
            width: "400 px",
            data: {
              data: oldData,
              users: data[0],
              permissions: data[1]
            }
          }).afterClosed().subscribe({
            next: data => {
              server.next(data)
              server.complete()
            }
          })
        }
      })
    })
  }
}
