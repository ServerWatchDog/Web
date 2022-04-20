import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {
  MonitorTypeService,
  MonitorTypeView,
  MonitorValueTypeResultView
} from "../../../../../service/mods/monitor-type.service";
import {
  MiniMonitorGroupView,
  MonitorGroupService,
} from "../../../../../service/mods/monitor-group.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable, zip} from "rxjs";

@Component({
  selector: 'app-insert',
  templateUrl: './monitor-type-insert.component.html',
  styleUrls: ['./monitor-type-insert.component.scss']
})
export class MonitorTypeInsertComponent implements OnInit {

  resultData: MonitorTypeView = {description: "", id: "", name: "", type: "", typeGroupId: 0}
  dataType: Array<MonitorValueTypeResultView> = [];
  typeGroup: Array<MiniMonitorGroupView> = [];

  constructor(public dialogRef: MatDialogRef<MonitorTypeInsertComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: MonitorTypeInsertData | null) {
    if (data != null) {
      if (data.data != null) {
        this.resultData = data.data
      }
      this.dataType = data.dataType
      this.typeGroup = data.typeGroup
    }
  }

  ngOnInit(): void {
  }
}

export interface MonitorTypeInsertData {
  data: MonitorTypeView,
  typeGroup: Array<MiniMonitorGroupView>,
  dataType: Array<MonitorValueTypeResultView>
}

@Injectable({
  providedIn: 'root'
})
export class MonitorTypeInsertService {
  constructor(
    public dialog: MatDialog,
    private groups: MonitorGroupService,
    private monitorType: MonitorTypeService,
  ) {
  }

  showDialog(oldData: MonitorTypeView | null = null): Observable<MonitorTypeView> {
    return new Observable<MonitorTypeView>(server => {
      zip(this.groups.selectMini(), this.monitorType.types()).subscribe({
        next: (last) => {
          this.dialog.open(MonitorTypeInsertComponent, {
            width: "400px",
            data: {
              data: oldData,
              typeGroup: last[0],
              dataType: last[1]
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
