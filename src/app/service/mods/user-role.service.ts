import {Injectable} from '@angular/core';
import {Crud, CrudDeleteResult, PageResult} from "../utils/crud";
import {Observable} from "rxjs";
import {SessionHttpService} from "../utils/session-http.service";

@Injectable({
  providedIn: 'root'
})
export class UserRoleService implements Crud<UserRoleView, UserRoleResultView> {

  constructor(private http: SessionHttpService) {
  }

  delete(id: number): Observable<CrudDeleteResult> {
    return this.http.asyncDelete<CrudDeleteResult>("/api/admin/roles/" + id);
  }

  insert(input: UserRoleView): Observable<UserRoleResultView> {
    return this.http.asyncPost<UserRoleResultView>("/api/admin/roles", input);
  }

  select(index: number, size: number): Observable<PageResult<UserRoleResultView>> {
    return this.http.asyncGet<PageResult<UserRoleResultView>>("/api/admin/roles?index=" + index + "&size=" + size);
  }

  update(id: number, input: UserRoleView): Observable<UserRoleResultView> {
    return this.http.asyncPut<UserRoleResultView>("/api/admin/roles/" + id, input);
  }

}

export interface UserRoleView {
  "name": string,
  "description": string,
  "permissions": Array<string>,
  "users": Array<number>
}

export interface UserRoleResultView {
  "id": number,
  "name": string,
  "description": string,
  "permissions": Array<string>,
  "users": Array<MiniUserResultView>
  "createTime": string,
  "updateTime": string,
}

export interface MiniUserResultView {
  "id": number,
  "name": string,
  "email": string
}
