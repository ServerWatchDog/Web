import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RoleInsertData} from "../../../users/group/insert/role-insert.component";
import {MonitorGroupView} from "../../../../../service/mods/monitor-group.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-insert',
  templateUrl: './monitor-type-group-insert.component.html',
  styleUrls: ['./monitor-type-group-insert.component.scss']
})
export class MonitorTypeGroupInsertComponent implements OnInit {
  data: MonitorGroupView = {description: "", name: ""}

  constructor(public dialogRef: MatDialogRef<MonitorTypeGroupInsertComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public internalData: MonitorGroupView | null) {
    if (internalData != null) {
      this.data = internalData
    }
  }

  ngOnInit(): void {
  }

}

@Injectable({
  providedIn: 'root'
})
export class MonitorGroupInsertService {
  constructor(public dialog: MatDialog,
  ) {
  }

  showDialog(input: MonitorGroupView | null = null): Observable<MonitorGroupView> {
    return this.dialog.open(MonitorTypeGroupInsertComponent, {
      width: "400px",
      data: input
    }).afterClosed()
  }
}
