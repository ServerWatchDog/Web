import {AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {MiniUserResultView, UserRoleResultView, UserRoleService} from "../../../../service/mods/user-role.service";
import {MatTableDataSource} from "@angular/material/table";
import {DashBoardService} from "../../../../service/mods/dash-board.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoleInsertService} from "../../users/group/insert/role-insert.component";
import {DeleteService} from "../../../../views/dialog/delete/delete.component";
import {MatDialog} from "@angular/material/dialog";
import {MonitorTypeResultView, MonitorTypeService} from "../../../../service/mods/monitor-type.service";
import {MonitorGroupView} from "../../../../service/mods/monitor-group.service";
import {MonitorTypeInsertService} from "./insert/monitor-type-insert.component";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MonitorComponent implements AfterViewInit {
  displayedColumns: string[] = ["name", "description", "type", "typeGroup", "config"];
  data: MonitorTypeResultView[] = [];
  dataSource = new MatTableDataSource<MonitorTypeResultView>(this.data);

  pageInfo = {
    length: 0,
    pageSize: 20,
    pageIndex: 0
  }

  constructor(private dash: DashBoardService,
              private _snackBar: MatSnackBar,
              private monitorType: MonitorTypeService,
              private monitorInsert: MonitorTypeInsertService,
              private deleteService: DeleteService,
              public dialog: MatDialog,) {
  }

  ngAfterViewInit(): void {
    this.dash.setTitle("采集指标管理")
    this.initPage()
  }



  private initPage() {
    this.monitorType.select(this.pageInfo.pageIndex, this.pageInfo.pageSize).subscribe({
      next: (data) => {
        this.pageInfo.length = data.size
        this.dataSource.data = data.data
      }
    })
  }

  update(data: MonitorTypeResultView) {
    this.monitorInsert.showDialog({
      description: data.description, name: data.name,
      id: data.id, type: data.type, typeGroupId: data.typeGroup.id
    }).subscribe({
      next: (result) => {
        if (result != null) {
          this.monitorType.update(data.id, result).subscribe({
            next: () => {
              this.initPage()
            }
          })
        }
      }
    })
  }

  delete(data: MonitorTypeResultView) {
    this.deleteService.newDialog(data.name).subscribe({
      next: (status) => {
        if (status) {
          this.monitorType.delete(data.id).subscribe({
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

          this.monitorType.insert(data).subscribe({
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

  formatType(typeGroup: MonitorGroupView) {
    return typeGroup.name
  }
}
