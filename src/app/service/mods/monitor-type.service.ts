import {Injectable} from '@angular/core';
import {Crud, CrudDeleteResult, PageResult} from "../utils/crud";
import {MonitorGroupResultView} from "./monitor-group.service";
import {Observable} from "rxjs";
import {SessionHttpService} from "../utils/session-http.service";

@Injectable({
  providedIn: 'root'
})
export class MonitorTypeService implements Crud<MonitorTypeView, MonitorTypeResultView, string> {
  path = "/api/admin/monitor/types"

  constructor(private http: SessionHttpService) {
  }

  types(): Observable<Array<MonitorValueTypeResultView>> {
    return this.http.asyncGet(this.path + "/types")
  }

  delete(id: string): Observable<CrudDeleteResult> {
    return this.http.asyncDelete(this.path + "/" + id);
  }

  insert(input: MonitorTypeView): Observable<MonitorTypeResultView> {
    return this.http.asyncPost(this.path, input);
  }

  select(index: number, size: number): Observable<PageResult<MonitorTypeResultView>> {
    return this.http.asyncGet(this.path + "?index=" + index + "&size=" + size);
  }

  update(id: string, input: MonitorTypeView): Observable<MonitorTypeResultView> {
    return this.http.asyncPut(this.path + "/" + id, input);
  }
}

export interface MonitorValueTypeResultView {
  id: string,
  "description": string
}

export interface MonitorTypeView {
  "id": string,
  "name": string,
  "description": string,
  "typeGroupId": number,
  "type": string
}

export interface MonitorTypeResultView {
  "id": string,
  "name": string,
  "description": string,
  "type": string,
  typeGroup: MonitorGroupResultView
}

export interface MiniMonitorTypeResultView {
  "id": "string",
  "name": "string"
}
