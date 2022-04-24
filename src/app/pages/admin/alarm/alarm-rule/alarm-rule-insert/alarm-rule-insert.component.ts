import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MonitorGroupView} from "../../../../../service/mods/monitor-group.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {AlarmInsertView, AlarmResultView} from "../../../../../service/mods/alarm-rule-crud.service";
import {SessionHttpService} from "../../../../../service/utils/session-http.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-alarm-rule-insert',
  templateUrl: './alarm-rule-insert.component.html',
  styleUrls: ['./alarm-rule-insert.component.scss']
})
export class AlarmRuleInsertComponent implements OnInit {

  data: AlarmResultView = {id: 0, expression: "", name: ""}
  vars: Array<AlarmRuleVarResultView> = []

  constructor(public dialogRef: MatDialogRef<AlarmRuleInsertComponent>,
              public dialog: MatDialog,
              private http: SessionHttpService,
              private _snake: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public internalData: AlarmResultView | null) {
    if (internalData != null) {
      this.data = {
        id: 0,
        expression: internalData.expression,
        name: internalData.name
      }
    }
  }

  ngOnInit(): void {
    this.http.asyncGet<Array<AlarmRuleVarResultView>>("/api/admin/alarm/rules/vars").subscribe({
      next: data => this.vars = data
    })
  }

  check(expression: string) {
    this.http.asyncPost<{ data: string }>('/api/admin/alarm/rules/check', {data: expression}).subscribe(
      {
        next: res => this._snake.open("校验完成，" + res.data, "", {
          duration: 5000
        })
      }
    )
  }
}

export interface AlarmRuleVarResultView {
  "id": string,
  "name": string,
  "type": string,
  "description": string
}

@Injectable({
  providedIn: 'root'
})
export class AlarmInsertService {
  constructor(public dialog: MatDialog,
  ) {
  }

  showDialog(input: AlarmResultView | null = null): Observable<AlarmInsertView> {
    return this.dialog.open(AlarmRuleInsertComponent, {
      width: "100%",
      data: input
    }).afterClosed()
  }
}
