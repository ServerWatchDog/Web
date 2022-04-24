import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ClientGroupResultView, ClientGroupService} from "../../../../service/mods/client-group.service";
import {MatTableDataSource} from "@angular/material/table";
import {DashBoardService} from "../../../../service/mods/dash-board.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClientGroupInsertService} from "../group/client-group-insert/client-group-insert.component";
import {DeleteService} from "../../../../views/dialog/delete/delete.component";
import {ClientMonitorResultView, ClientMonitorService} from "../../../../service/mods/client-monitor.service";
import {ClientMonitorInsertService} from "./client-monitor-update/client-monitor-update.component";

@Component({
  selector: 'app-client-monitor',
  templateUrl: './client-monitor.component.html',
  styleUrls: ['./client-monitor.component.scss']
})
export class ClientMonitorComponent implements AfterViewInit {
  displayedColumns: string[] = ["id", "name", "rule", "config"];
  data: ClientMonitorResultView[] = [];
  dataSource = new MatTableDataSource<ClientMonitorResultView>(this.data);

  pageInfo = {
    length: 0,
    pageSize: 10,
    pageIndex: 0
  }

  constructor(private dash: DashBoardService,
              private clientGroup: ClientGroupService,
              private _snackBar: MatSnackBar,
              private clientUpdate: ClientMonitorInsertService,
              private clientMonitor: ClientMonitorService,) {
  }

  ngAfterViewInit(): void {
    this.initPage()
  }


  private initPage() {
    this.clientMonitor.select(this.pageInfo.pageIndex, this.pageInfo.pageSize).subscribe({
      next: (data) => {
        this.pageInfo.length = data.size
        this.dataSource.data = data.data
      }
    })
  }

  update(data: ClientMonitorResultView) {
    this.clientUpdate.showDialog(data).subscribe({
      next: res => {
        if (res != null) {
          this.clientMonitor.updateById(data.client.id, res).subscribe({
            next: _ => this.initPage()
          })
        }
      }
    })
  }


  updatePage(pageIndex: number) {
    this.pageInfo.pageIndex = pageIndex
    this.initPage()
  }

  typeFormat(monitorType: ClientMonitorResultView) {
    return monitorType.monitorType.map(e => e.name).join(" , ");
  }
}
