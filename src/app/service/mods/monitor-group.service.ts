import {Injectable} from '@angular/core';
import {Crud, CrudDeleteResult, PageResult} from "../utils/crud";
import {map, Observable} from "rxjs";
import {MiniMonitorTypeResultView} from "./monitor-type.service";
import {SessionHttpService} from "../utils/session-http.service";

@Injectable({
  providedIn: 'root'
})
export class MonitorGroupService implements Crud<MonitorGroupView, MonitorGroupResultView, number> {

  path = "/api/admin/monitor/groups"

  constructor(private http: SessionHttpService) {
  }

  delete(id: number): Observable<CrudDeleteResult> {
    return this.http.asyncDelete(this.path + "/" + id);
  }

  insert(input: MonitorGroupView): Observable<MonitorGroupResultView> {
    return this.http.asyncPost(this.path, input);
  }

  select(index: number, size: number): Observable<PageResult<MonitorGroupResultView>> {
    return this.http.asyncGet(this.path + "?index=" + index + "&size=" + size);
  }

  update(id: number, input: MonitorGroupView): Observable<MonitorGroupResultView> {
    return this.http.asyncPut(this.path + "/" + id, input);
  }

  selectMini(): Observable<Array<MiniMonitorGroupView>> {
    return this.select(0, 1000).pipe(
      map(it => it.data)
    ).pipe(map(it => it.map(data => {
      return {
        id: data.id,
        name: data.name,
        "description": data.description
      };
    })));
  }
}

export interface MonitorGroupView {
  name: string,
  "description": string
}

export interface MiniMonitorGroupView {
  id: number,
  name: string,
  description: string
}

export interface MonitorGroupResultView {
  "id": number,
  "name": string,
  "description": string,
  monitorTypes: Array<MiniMonitorTypeResultView>
}
