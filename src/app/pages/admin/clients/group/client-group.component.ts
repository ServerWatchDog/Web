import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MonitorGroupResultView, MonitorGroupService} from "../../../../service/mods/monitor-group.service";
import {MatTableDataSource} from "@angular/material/table";
import {DashBoardService} from "../../../../service/mods/dash-board.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MonitorGroupInsertService} from "../../monitor/group/insert/monitor-type-group-insert.component";
import {DeleteService} from "../../../../views/dialog/delete/delete.component";
import {MiniMonitorTypeResultView} from "../../../../service/mods/monitor-type.service";
import {ClientGroupResultView, ClientGroupService} from "../../../../service/mods/client-group.service";
import {MiniClientResultView} from "../../../../service/mods/client-crud.service";
import {ClientGroupInsertService} from "./client-group-insert/client-group-insert.component";

@Component({
  selector: 'app-group',
  templateUrl: './client-group.component.html',
  styleUrls: ['./client-group.component.scss']
})
export class ClientGroupComponent implements AfterViewInit {
  displayedColumns: string[] = ["id", "description", "role", "clients", "config"];
  data: ClientGroupResultView[] = [];
  dataSource = new MatTableDataSource<ClientGroupResultView>(this.data);

  pageInfo = {
    length: 0,
    pageSize: 20,
    pageIndex: 0
  }

  constructor(private dash: DashBoardService,
              private clientGroup: ClientGroupService,
              private _snackBar: MatSnackBar,
              private groupInsert: ClientGroupInsertService,
              private deleteService: DeleteService,) {
  }

  ngAfterViewInit(): void {
    this.initPage()
  }


  private initPage() {
    this.clientGroup.select(this.pageInfo.pageIndex, this.pageInfo.pageSize).subscribe({
      next: (data) => {
        this.pageInfo.length = data.size
        this.dataSource.data = data.data
      }
    })
  }

  update(data: ClientGroupResultView) {
    this.groupInsert.showDialog({
      clients: data.clients.map(it => it.id), description: data.description, roleId: data.role.id

    }).subscribe({
      next: (result) => {
        if (result != null) {
          this.clientGroup.update(data.id, result).subscribe({
            next: () => {
              this.initPage()
            }
          })
        }
      }
    })
  }

  delete(data: ClientGroupResultView) {
    this.deleteService.newDialog(data.id).subscribe({
      next: (status) => {
        if (status) {
          this.clientGroup.delete(data.id).subscribe({
            next: (status) => {
              if (status.data) {
                this._snackBar.open("删除成功！", "", {duration: 1000})
                this.initPage()
              }
            }
          })
        }
      }
    })
  }

  insert() {
    this.groupInsert.showDialog().subscribe({
      next: (data) => {
        if (data != null) {
          this.clientGroup.insert(data).subscribe({
            next: () => {
              this.initPage()
            }
          })
        }
      }
    })
  }


  updatePage(pageIndex: number) {
    this.pageInfo.pageIndex = pageIndex
    this.initPage()
  }

  formatClient(clients: MiniClientResultView[]) {
    return clients.map(it => it.name).join(",");
  }
}
