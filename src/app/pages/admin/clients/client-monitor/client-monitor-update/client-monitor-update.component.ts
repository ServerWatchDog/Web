import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ClientCrudService} from "../../../../../service/mods/client-crud.service";
import {UserRoleService} from "../../../../../service/mods/user-role.service";
import {Observable} from "rxjs";
import {ClientMonitorResultView} from "../../../../../service/mods/client-monitor.service";
import {ClientGroupTypeInsertData} from "../../group/client-group-insert/client-group-insert.component";
import {
  MiniMonitorTypeResultView,
  MonitorTypeResultView,
  MonitorTypeService,
  MonitorValueTypeResultView
} from "../../../../../service/mods/monitor-type.service";
import {MonitorGroupResultView, MonitorGroupService} from "../../../../../service/mods/monitor-group.service";

@Component({
  selector: 'app-client-monitor-update',
  templateUrl: './client-monitor-update.component.html',
  styleUrls: ['./client-monitor-update.component.scss']
})
export class ClientMonitorUpdateComponent implements OnInit {
  monitorData: Array<MMonitor> = [];
  monitorGroupData: Array<MonitorGroupResultView> = []

  constructor(public dialogRef: MatDialogRef<ClientMonitorUpdateComponent>,
              public dialog: MatDialog,
              private monitor: MonitorTypeService,
              private monitorGroup: MonitorGroupService,
              @Inject(MAT_DIALOG_DATA) public data: ClientMonitorResultView | null) {
  }


  ngOnInit(): void {
    this.monitor.select(0, 9999).subscribe({
      next: data => this.monitorData = data.data.map(it => {
        let data: MMonitor = {
          id: it.id,
          name: it.name,
          selected: this.data?.monitorType?.filter(da => da.id == it.id)?.length != 0
        }
        return data
      })
    })

    this.monitorGroup.select(0, 9999).subscribe({
      next: data => this.monitorGroupData = data.data
    })
  }

  selectGroup(monitorTypes: Array<MiniMonitorTypeResultView>, selected: boolean) {
    monitorTypes.forEach(e =>
      this.monitorData.forEach(d => {
        if (d.id == e.id) {
          d.selected = selected
        }
      })
    )
  }

  selected(description: Array<MiniMonitorTypeResultView>): boolean {
    let map = description.map(it => it.id + "");
    for (let m of this.monitorData) {
      if (map.includes(m.id) && !m.selected) {
        return false
      }
    }
    return true
  }

  resultData() {
    return this.monitorData.filter(it => it.selected).map(data => data.id)
  }
}

export interface MMonitor {
  "id": string,
  "name": string,
  selected: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ClientMonitorInsertService {
  constructor(
    public dialog: MatDialog,
  ) {
  }

  showDialog(oldData: ClientMonitorResultView): Observable<Array<number>> {
    return this.dialog.open(ClientMonitorUpdateComponent, {
      width: '100%',
      data: oldData
    }).afterClosed()
  }
}
