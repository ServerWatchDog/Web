import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {ClientView} from "../../../../../service/mods/client-crud.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MonitorGroupView} from "../../../../../service/mods/monitor-group.service";
import {Observable} from "rxjs";
import {MonitorTypeGroupInsertComponent} from "../../../monitor/group/insert/monitor-type-group-insert.component";

@Component({
  selector: 'app-client-insert',
  templateUrl: './client-insert.component.html',
  styleUrls: ['./client-insert.component.scss']
})
export class ClientInsertComponent implements OnInit {
  data: ClientView = {description: "", enable: false, name: "", refreshToken: true}

  constructor(public dialogRef: MatDialogRef<ClientInsertComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public internalData: ClientView | null) {
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
export class ClientInsertService {
  constructor(public dialog: MatDialog,
  ) {
  }

  showDialog(input: ClientView | null = null): Observable<ClientView> {
    return this.dialog.open(ClientInsertComponent, {
      width: "400px",
      data: input
    }).afterClosed()
  }
}
