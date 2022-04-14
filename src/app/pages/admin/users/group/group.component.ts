import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DashBoardService} from "../../../../service/mods/dash-board.service";
import {MatTableDataSource} from "@angular/material/table";
import {MiniUserResultView, UserRoleResultView, UserRoleService} from "../../../../service/mods/user-role.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DeleteService} from "../../../../views/dialog/delete/delete.component";
import {RoleInsertService} from "./insert/role-insert.component";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements AfterViewInit {
  displayedColumns: string[] = ["name", "permissions", "users", "createTime", "config"];
  data: UserRoleResultView[] = [];
  dataSource = new MatTableDataSource<UserRoleResultView>(this.data);

  pageInfo = {
    length: 0,
    pageSize: 20,
    pageIndex: 0
  }

  constructor(private dash: DashBoardService,
              private userRole: UserRoleService,
              private _snackBar: MatSnackBar,
              private roleInsert: RoleInsertService,
              private deleteService: DeleteService,
              public dialog: MatDialog,) {
  }

  ngAfterViewInit(): void {
    this.dash.setTitle("角色管理")
    this.initPage()
  }


  private initPage() {
    this.userRole.select(this.pageInfo.pageIndex, this.pageInfo.pageSize).subscribe({
      next: (data) => {
        this.pageInfo.length = data.size
        this.dataSource.data = data.data
      }
    })
  }

  update(data: UserRoleResultView) {

    this.roleInsert.showDialog({
      description: data.description, name: data.name, permissions: data.permissions, users: data.users.map(it => it.id)
    }).subscribe({
      next: (result) => {
        if (result != null) {
          this.userRole.update(data.id, result).subscribe({
            next: () => {
              this.initPage()
            }
          })
        }
      }
    })
  }

  delete(data: UserRoleResultView) {
    this.deleteService.newDialog(data.name).subscribe({
      next: (status) => {
        if (status) {
          this.userRole.delete(data.id).subscribe({
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
    this.roleInsert.showDialog().subscribe({
      next: (data) => {
        if (data != null) {

          this.userRole.insert(data).subscribe({
            next: () => {
              this.initPage()
            }
          })
        }
      }
    })
  }

  formatUser(users: MiniUserResultView[]) {
    return users.map(it => it.name).join(",");
  }

  updatePage(pageIndex: number) {
    this.pageInfo.pageIndex = pageIndex
    this.initPage()
  }
}
