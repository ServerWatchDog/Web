import {Injectable} from '@angular/core';
import {Crud, CrudDeleteResult, PageResult} from "../utils/crud";
import {map, Observable} from "rxjs";
import {SessionHttpService} from "../utils/session-http.service";
import {MiniUserResultView, UserRoleService} from "./user-role.service";

@Injectable({
  providedIn: 'root'
})
export class UserCrudService implements Crud<UserView, UserResultView> {

  constructor(private http: SessionHttpService) {
  }

  delete(id: number): Observable<CrudDeleteResult> {
    return this.http.asyncDelete("/api/admin/users/" + id);
  }

  insert(input: UserView): Observable<UserResultView> {
    return this.http.asyncPost("/api/admin/users", input);
  }

  select(index: number, size: number): Observable<PageResult<UserResultView>> {
    return this.http.asyncGet("/api/admin/users?index=" + index + "&size=" + size);
  }

  update(id: number, input: UserView): Observable<UserResultView> {
    return this.http.asyncPut("/api/admin/users/" + id, input);
  }

  selectMini(): Observable<Array<MiniUserResultView>> {
    return this.select(0, 1000).pipe(
      map((data: PageResult<UserResultView>) => data.data)
    ).pipe(map((data: Array<UserResultView>) => data.map(it => {
      return {
        "id": it.id,
        "name": it.name,
        "email": it.email
      }
    })))
  }
}

export interface UserResultView {
  "id": number,
  "name": string,
  "email": string,
  "phone": string,
  "createTime": string,
  "updateTime": string,
  "role": Array<MiniRoleResultView>
}

export interface MiniRoleResultView {
  id: number
  name: string
}

export interface UserView {
  "name": string,
  "email": string,
  "phone": string,
  "password": string,
  "twoFactor": string
}
