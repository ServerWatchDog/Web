import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  checked: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string) {
  }

}

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  constructor(public dialog: MatDialog) {
  }

  newDialog(data: any): Observable<boolean> {
    return this.dialog.open(DeleteComponent, {
      width: '400px',
      data: "你确定删除 \'" + data + "\' 吗？此操作不可恢复！"
    }).afterClosed();
  }
}
