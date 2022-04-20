import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MonitorGroupResultView, MonitorGroupService} from "../../../../service/mods/monitor-group.service";
import {MatTableDataSource} from "@angular/material/table";
import {DashBoardService} from "../../../../service/mods/dash-board.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MonitorGroupInsertService} from "../../monitor/group/insert/monitor-type-group-insert.component";
import {DeleteService} from "../../../../views/dialog/delete/delete.component";
import {MiniMonitorTypeResultView} from "../../../../service/mods/monitor-type.service";
import {ClientCrudService, ClientResultView} from "../../../../service/mods/client-crud.service";
import {MiniClientGroupResultView} from "../../../../service/mods/client-group.service";
import {ClientInsertService} from "./client-insert/client-insert.component";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements AfterViewInit {

  displayedColumns: string[] = ["id", "name", "description", "token", "enable", "groups", "config"];
  data: ClientResultView[] = [];
  dataSource = new MatTableDataSource<ClientResultView>(this.data);

  pageInfo = {
    length: 0,
    pageSize: 20,
    pageIndex: 0
  }

  constructor(private dash: DashBoardService,
              private client: ClientCrudService,
              private _snackBar: MatSnackBar,
              private clientInsert: ClientInsertService,
              private deleteService: DeleteService,) {
  }

  ngAfterViewInit(): void {
    this.initPage()
  }


  private initPage() {
    this.client.select(this.pageInfo.pageIndex, this.pageInfo.pageSize).subscribe({
      next: (data) => {
        this.pageInfo.length = data.size
        this.dataSource.data = data.data
      }
    })
  }

  update(data: ClientResultView) {
    this.clientInsert.showDialog({
      description: data.description,
      enable: data.enable, name: data.name, refreshToken: false


    }).subscribe({
      next: (result) => {
        if (result != null) {
          this.client.update(data.id, result).subscribe({
            next: () => {
              this.initPage()
            }
          })
        }
      }
    })
  }

  delete(data: ClientResultView) {
    this.deleteService.newDialog(data.name).subscribe({
      next: (status) => {
        if (status) {
          this.client.delete(data.id).subscribe({
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
    this.clientInsert.showDialog().subscribe({
      next: (data) => {
        if (data != null) {

          this.client.insert(data).subscribe({
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

  formatTypes(monitorTypes: Array<MiniMonitorTypeResultView>) {
    return monitorTypes.map(it => it.id).join(",")
  }

  formatStatus(enable: boolean) {
    if (enable) {
      return "已启用"
    } else {
      return "已禁用"
    }
  }

  formatGroups(groups: MiniClientGroupResultView[]) {
    return groups.map(it => it.roleName).join(",")
  }
}
