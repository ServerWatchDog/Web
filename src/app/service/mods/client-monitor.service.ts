import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PageResult} from "../utils/crud";
import {SessionHttpService} from "../utils/session-http.service";

@Injectable({
  providedIn: 'root'
})
export class ClientMonitorService {

  constructor(private http: SessionHttpService) {
  }

  select(pageIndex: number, pageSize: number): Observable<PageResult<ClientMonitorResultView>> {
    return this.http.asyncGet('/api/admin/client/monitors');
  }

  updateById(id: number, res: Array<number>): Observable<ClientMonitorResultView> {
    return this.http.asyncPost("/api/admin/client/monitors/" + id + "/updateType", res)
  }
}

export interface ClientMonitorResultView {
  client: {
    id: number,
    name: string
  }
  monitorType: Array<{
    "id": string,
    "name": string,

  }>
}
