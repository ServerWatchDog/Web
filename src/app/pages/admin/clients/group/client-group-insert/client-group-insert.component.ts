import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MonitorTypeService, MonitorTypeView} from "../../../../../service/mods/monitor-type.service";
import {MiniMonitorGroupView, MonitorGroupService} from "../../../../../service/mods/monitor-group.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable, zip} from "rxjs";
import {ClientCrudService, MiniClientResultView} from "../../../../../service/mods/client-crud.service";
import {UserRoleService} from "../../../../../service/mods/user-role.service";
import {ClientGroupView} from "../../../../../service/mods/client-group.service";
import {MiniRoleResultView} from "../../../users/user/user.component";

@Component({
  selector: 'app-client-group-insert',
  templateUrl: './client-group-insert.component.html',
  styleUrls: ['./client-group-insert.component.scss']
})
export class ClientGroupInsertComponent implements OnInit {

  resultData: ClientGroupView = {clients: [], description: "", roleId: 0}
  clients: Array<MiniClientResultView> = [];
  roles: Array<MiniRoleResultView> = [];

  constructor(public dialogRef: MatDialogRef<ClientGroupInsertComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: ClientGroupTypeInsertData | null) {
    if (data != null) {
      if (data.data != null) {
        this.resultData = data.data
      }
      this.clients = data.clients
      this.roles = data.roles
    }
  }

  ngOnInit(): void {
  }
}

export interface ClientGroupTypeInsertData {
  data: ClientGroupView,
  clients: Array<MiniClientResultView>,
  roles: Array<MiniRoleResultView>
}

@Injectable({
  providedIn: 'root'
})
export class ClientGroupInsertService {
  constructor(
    public dialog: MatDialog,
    private clients: ClientCrudService,
    private roleService: UserRoleService,
  ) {
  }

  showDialog(oldData: ClientGroupView | null = null): Observable<ClientGroupView> {
    return new Observable<ClientGroupView>(server => {
      zip(this.clients.selectMini(), this.roleService.selectMini()).subscribe({
        next: (last) => {
          this.dialog.open(ClientGroupInsertComponent, {
            width: "400px",
            data: {
              data: oldData,
              clients: last[0],
              roles: last[1]
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
