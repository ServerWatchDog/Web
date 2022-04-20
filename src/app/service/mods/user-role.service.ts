import {Injectable} from '@angular/core';
import {Crud, CrudDeleteResult, PageResult} from "../utils/crud";
import {map, Observable} from "rxjs";
import {SessionHttpService} from "../utils/session-http.service";
import {MiniRoleResultView} from "./user-crud.service";

@Injectable({
  providedIn: 'root'
})
export class UserRoleService implements Crud<UserRoleView, UserRoleResultView, number> {

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

  selectMini(): Observable<Array<MiniRoleResultView>> {
    return this.select(0, 1000).pipe(
      map(it => it.data)
    ).pipe(map(
      data => data.map(it => {
        return {
          "id": it.id,
          "name": it.name,
        }
      })
    ));
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
