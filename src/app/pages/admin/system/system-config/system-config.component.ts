import {Component, OnInit} from '@angular/core';
import {SessionHttpService} from "../../../../service/utils/session-http.service";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {
  dataForms: Array<Pair<SystemConfigResultView, FormControl>> = []


  constructor(private http: SessionHttpService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.http.asyncGet<Array<SystemConfigResultView>>("/api/admin/configs").subscribe({
      next: data => {
        this.dataForms = data.map(it => {
          return {
            first: it,
            second: new FormControl(it.value)
          }
        })
      }
    })
  }

  submit(key: string, value: string) {
    this.http.asyncPost('/api/admin/configs', [{
      key: key,
      value: value
    }]).subscribe({
      next: _ => {
        this._snackBar.open("修改成功！", "", {
          duration: 1000
        })
        this.ngOnInit()
      }
    })
  }
}

export interface SystemConfigResultView {
  key: string,
  value: string,
  defaultValue: string,
  description: string,
  type: string
}

export interface Pair<K, V> {
  first: K,
  second: V
}
