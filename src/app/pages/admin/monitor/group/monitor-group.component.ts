import {AfterViewInit, Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DashBoardService} from "../../../../service/mods/dash-board.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteService} from "../../../../views/dialog/delete/delete.component";
import {
  MonitorGroupService,
  MonitorGroupResultView
} from "../../../../service/mods/monitor-group.service";
import {MiniMonitorTypeResultView} from "../../../../service/mods/monitor-type.service";
import {MonitorGroupInsertService} from "./insert/monitor-type-group-insert.component";

@Component({
  selector: 'app-group',
  templateUrl: './monitor-group.component.html',
  styleUrls: ['./monitor-group.component.scss']
})
export class MonitorGroupComponent implements AfterViewInit {
  displayedColumns: string[] = ["id", "name", "description", "monitorTypes", "config"];
  data: MonitorGroupResultView[] = [];
  dataSource = new MatTableDataSource<MonitorGroupResultView>(this.data);

  pageInfo = {
    length: 0,
    pageSize: 20,
    pageIndex: 0
  }

  constructor(private dash: DashBoardService,
              private monitorGroup: MonitorGroupService,
              private _snackBar: MatSnackBar,
              private monitorInsert: MonitorGroupInsertService,
              private deleteService: DeleteService,) {
  }

  ngAfterViewInit(): void {
    this.dash.setTitle("采集指标分组管理")
    this.initPage()
  }


  private initPage() {
    this.monitorGroup.select(this.pageInfo.pageIndex, this.pageInfo.pageSize).subscribe({
      next: (data) => {
        this.pageInfo.length = data.size
        this.dataSource.data = data.data
      }
    })
  }

  update(data: MonitorGroupResultView) {
    this.monitorInsert.showDialog({
      description: data.description, name: data.name

    }).subscribe({
      next: (result) => {
        if (result != null) {
          this.monitorGroup.update(data.id, result).subscribe({
            next: () => {
              this.initPage()
            }
          })
        }
      }
    })
  }

  delete(data: MonitorGroupResultView) {
    this.deleteService.newDialog(data.name).subscribe({
      next: (status) => {
        if (status) {
          this.monitorGroup.delete(data.id).subscribe({
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
    this.monitorInsert.showDialog().subscribe({
      next: (data) => {
        if (data != null) {

          this.monitorGroup.insert(data).subscribe({
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
}
