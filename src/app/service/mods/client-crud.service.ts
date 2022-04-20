import {Injectable} from '@angular/core';
import {MiniClientGroupResultView} from "./client-group.service";
import {Crud, CrudDeleteResult, PageResult} from "../utils/crud";
import {map, Observable} from "rxjs";
import {SessionHttpService} from "../utils/session-http.service";

@Injectable({
  providedIn: 'root'
})
export class ClientCrudService implements Crud<ClientView, ClientResultView, number> {
  path = "/api/admin/client/clients"

  constructor(private http: SessionHttpService) {
  }


  delete(id: number): Observable<CrudDeleteResult> {
    return this.http.asyncDelete(this.path + "/" + id);
  }

  insert(input: ClientView): Observable<ClientResultView> {
    return this.http.asyncPost(this.path, input);
  }

  select(index: number, size: number): Observable<PageResult<ClientResultView>> {
    return this.http.asyncGet(this.path + "?index=" + index + "&size=" + size);
  }

  update(id: number, input: ClientView): Observable<ClientResultView> {
    return this.http.asyncPut(this.path + "/" + id, input);
  }

  selectMini():Observable<Array<MiniClientResultView>> {
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

export interface ClientResultView {
  id: number,
  "name": string,
  "description": string,
  "token": string,
  "enable": boolean,
  groups: Array<MiniClientGroupResultView>,
  createTime: string,
  updateTime: string
}

export interface ClientView {
  "name": string,
  "description": string,
  "refreshToken": boolean,
  "enable": boolean
}

export interface MiniClientResultView {
  id: number,
  "name": string,
}
