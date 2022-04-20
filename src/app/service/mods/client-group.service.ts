import {Injectable} from '@angular/core';
import {MiniRoleResultView} from "./user-crud.service";
import {MiniClientResultView} from "./client-crud.service";
import {Crud, CrudDeleteResult, PageResult} from "../utils/crud";
import {Observable} from "rxjs";
import {SessionHttpService} from "../utils/session-http.service";

@Injectable({
  providedIn: 'root'
})
export class ClientGroupService implements Crud<ClientGroupView, ClientGroupResultView, number> {
  path = "/api/admin/client/groups"

  constructor(private http: SessionHttpService) {
  }


  delete(id: number): Observable<CrudDeleteResult> {
    return this.http.asyncDelete(this.path + "/" + id);

  }

  insert(input: ClientGroupView): Observable<ClientGroupResultView> {
    return this.http.asyncPost(this.path, input);
  }

  select(index: number, size: number): Observable<PageResult<ClientGroupResultView>> {
    return this.http.asyncGet(this.path + "?index=" + index + "&size=" + size);
  }

  update(id: number, input: ClientGroupView): Observable<ClientGroupResultView> {
    return this.http.asyncPut(this.path + "/" + id, input);
  }
}

export interface ClientGroupView {
  "description": string,
  "roleId": number,
  "clients": Array<number>
}

export interface ClientGroupResultView {
  "id": number,
  "description": string,
  "role": MiniRoleResultView,
  "clients": Array<MiniClientResultView>
  createTime: string,
  updateTime: string
}

export interface MiniClientGroupResultView {
  "roleName": "string",
  "description": "string"
}
