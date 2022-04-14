import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DashBoardService} from "../../../../service/mods/dash-board.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SessionHttpService} from "../../../../service/utils/session-http.service";
import {PageData} from "../../../../service/utils/crud.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserInsertComponent} from "./insert/user-insert.component";
import {DeleteComponent} from "../../../../views/dialog/delete/delete.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'password', 'registerDate', 'groupName', 'config'];
  data: Array<UserPageView> = [];
  dataSource = new MatTableDataSource<UserPageView>(this.data);

  constructor(private dash: DashBoardService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog, private http: SessionHttpService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  index = 0;
  size = 20;
  length = 0;

  initPage() {
    this.http.get<PageData<UserResultView>>("/api/admin/users?index=" + this.index + "&size=" + this.size, res => {
      this.length = this.size
      this.dataSource.data = res.data.map(it => {
        return {
          "id": it.id,
          "name": it.name,
          "email": it.email,
          "phone": it.phone,
          "createTime": it.createTime,
          "updateTime": it.updateTime,
          "role": it.role.map(role => {
            return role.name
          }).join(",")
        }
      });
      console.log(this.dataSource.data)
    })
  }

  ngAfterViewInit(): void {
    this.dash.setTitle("用户管理")
    this.initPage()
  }


  configPage(event: PageEvent) {
    this.index = event.pageIndex
    this.initPage()
  }

  edit(item: UserResultView) {
    this.dialog.open(UserInsertComponent, {
      width: '400px',
      data: item
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.http.put("/api/admin/users/" + item.id, result, () => {
          this.initPage()
        }, msg => {
          this._snackBar.open("操作失败，" + msg, "确定", {
            duration: 1000
          })
        })
      }
    })
  }

  delete(item: UserResultView) {
    this.dialog.open(DeleteComponent, {
      width: '400px',
      data: '你确定删除用户  \"' + item.name + "\" 吗？删除后将不可恢复！"
    }).afterClosed().subscribe(result => {
      if (result == true) {
        this.http.delete("/api/admin/users/" + item.id, () => {
          this._snackBar.open("删除成功！", "确定", {
            duration: 1000
          })
          this.initPage()
        }, msg => {
          this._snackBar.open("删除失败，" + msg, "确定", {
            duration: 1000
          })
        })
      }
    })
  }

  add() {
    this.dialog.open(UserInsertComponent, {
      width: '400px',
      data: null
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.http.post("/api/admin/users", result, () => {
          this.initPage()
        }, msg => {
          this._snackBar.open("操作失败，" + msg, "确定", {
            duration: 1000
          })
        })
      }
    })
  }

}

export interface UserResultView {
  "id": number,
  "name": string,
  "email": string,
  "phone": string,
  "createTime": string,
  "updateTime": string,
  "role": Array<MiniRoleResultView>
}

export interface MiniRoleResultView {
  id: number
  name: string
}

export interface UserPageView {
  "id": number,
  "name": string,
  "email": string,
  "phone": string,
  "createTime": string,
  "updateTime": string,
  "role": string
}

export interface UserView {
  "name": string,
  "email": string,
  "phone": string,
  "password": string,
  "twoFactor": string
}
