import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ClientCrudService, ClientResultView} from "../../../../service/mods/client-crud.service";
import {MatTableDataSource} from "@angular/material/table";
import {DashBoardService} from "../../../../service/mods/dash-board.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClientInsertService} from "../../clients/client/client-insert/client-insert.component";
import {DeleteService} from "../../../../views/dialog/delete/delete.component";
import {MiniMonitorTypeResultView} from "../../../../service/mods/monitor-type.service";
import {MiniClientGroupResultView} from "../../../../service/mods/client-group.service";
import {AlarmResultView, AlarmRuleCrudService} from "../../../../service/mods/alarm-rule-crud.service";
import {AlarmInsertService, AlarmRuleInsertComponent} from "./alarm-rule-insert/alarm-rule-insert.component";

@Component({
  selector: 'app-alarm-rule',
  templateUrl: './alarm-rule.component.html',
  styleUrls: ['./alarm-rule.component.scss']
})
export class AlarmRuleComponent implements AfterViewInit {
  displayedColumns: string[] = ["id", "name", "rules", "config"];
  data: AlarmResultView[] = [];
  dataSource = new MatTableDataSource<AlarmResultView>(this.data);

  pageInfo = {
    length: 0,
    pageSize: 20,
    pageIndex: 0
  }

  constructor(private dash: DashBoardService,
              private service: AlarmRuleCrudService,
              private _snackBar: MatSnackBar,
              private insertService: AlarmInsertService,
              private deleteService: DeleteService,) {
  }

  ngAfterViewInit(): void {
    this.initPage()
  }


  private initPage() {
    this.service.select(this.pageInfo.pageIndex, this.pageInfo.pageSize).subscribe({
      next: (data) => {
        this.pageInfo.length = data.size
        this.dataSource.data = data.data
      }
    })
  }

  update(data: AlarmResultView) {
    this.insertService.showDialog(data).subscribe({
      next: (result) => {
        if (result != null) {
          this.service.update(data.id, result).subscribe({
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
          this.service.delete(data.id).subscribe({
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
    this.insertService.showDialog().subscribe({
      next: (data) => {
        if (data != null) {
          this.service.insert(data).subscribe({
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


}
