import {Injectable} from '@angular/core';
import {Crud} from "../utils/crud";
import {UserRoleResultView, UserRoleView} from "./user-role.service";
import {SessionHttpService} from "../utils/session-http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {

  constructor(private http: SessionHttpService) {
  }

  select(): Observable<MiniPermissionsView[]> {
    return this.http.asyncGet<MiniPermissionsView[]>("/api/admin/permissions")
  }

}

export interface MiniPermissionsView {
  id: string
  description: string
}
