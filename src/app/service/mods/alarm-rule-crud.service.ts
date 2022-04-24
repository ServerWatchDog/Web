import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {CrudDeleteResult, PageResult} from "../utils/crud";
import {SessionHttpService} from "../utils/session-http.service";

@Injectable({
  providedIn: 'root'
})
export class AlarmRuleCrudService {

  constructor(
    private http: SessionHttpService
  ) {
  }

  select(pageIndex: number, pageSize: number): Observable<PageResult<AlarmResultView>> {
    return this.http.asyncGet<PageResult<AlarmResultView>>('/api/admin/alarm/rules?index=' + pageIndex + '&size=' + pageSize);
  }

  delete(id: number): Observable<CrudDeleteResult> {
    return this.http.asyncDelete<CrudDeleteResult>("/api/admin/alarm/rules/" + id)
  }

  insert(data: AlarmInsertView) {
    return this.http.asyncPost("/api/admin/alarm/rules", data)

  }

  update(id: number, result: AlarmInsertView) {
    return this.http.asyncPut("/api/admin/alarm/rules/" + id, result)
  }
}

export interface AlarmInsertView {
  "name": string,
  "expression": string
}

export interface AlarmResultView {
  "id": number,
  "name": string,
  "expression": string
}
