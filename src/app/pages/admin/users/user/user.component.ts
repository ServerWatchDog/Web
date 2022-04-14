import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DashBoardService} from "../../../../service/mods/dash-board.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserInsertComponent} from "./insert/user-insert.component";
import {UserCrudService, UserResultView} from "../../../../service/mods/user-crud.service";
import {DeleteService} from "../../../../views/dialog/delete/delete.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'password', 'registerDate', 'groupName', 'config'];
  data: Array<UserResultView> = [];
  dataSource = new MatTableDataSource<UserResultView>(this.data);

  constructor(private dash: DashBoardService,
              private _snackBar: MatSnackBar,
              private deleteService: DeleteService,
              public dialog: MatDialog, private user: UserCrudService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  pageInfo = {
    length: 0,
    pageSize: 20,
    pageIndex: 0
  }

  initPage() {
    this.user.select(this.pageInfo.pageIndex, this.pageInfo.pageSize).subscribe({
      next: (data) => {
        this.dataSource.data = data.data
        this.pageInfo.length = data.size
      }
    })
  }

  ngAfterViewInit(): void {
    this.dash.setTitle("用户管理")
    this.initPage()
  }


  configPage(event: PageEvent) {
    this.pageInfo.pageIndex = event.pageIndex
    this.initPage()
  }

  edit(item: UserResultView) {
    this.dialog.open(UserInsertComponent, {
      width: '400px',
      data: item
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.user.update(item.id, result).subscribe({
          next: () => {
            this.initPage()
          }, error: () => {
            this._snackBar.open("操作失败，", "确定", {
              duration: 1000
            })
          }
        })
      }
    })
  }

  delete(item: UserResultView) {
    this.deleteService.newDialog(item.name).subscribe({
      next: (result) => {
        if (result) {
          this.user.delete(item.id).subscribe({
            next: (res) => {
              if (res.data) {
                this._snackBar.open("删除成功！", "确定", {
                  duration: 1000
                })
              }
            }
          })
        }
      }
    })
  }

  add() {
    this.dialog.open(UserInsertComponent, {
      width: '400px',
      data: null
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.user.insert(result).subscribe({
          next: () => {
            this.initPage()
          }, error: () => {
            this._snackBar.open("操作失败，", "确定", {
              duration: 1000
            })
          }
        })
      }
    })
  }

  formatRole(role: Array<MiniRoleResultView>) {
    return role.map(it => it.name).join(",")
  }
}

export interface MiniRoleResultView {
  id: number
  name: string
}
