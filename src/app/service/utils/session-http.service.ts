import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "./session.service";
import {environment} from "../../../environments/environment";
import {InHttp} from "./in-http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SessionHttpService implements InHttp {

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) {
  }

  asyncGet<T>(path: string): Observable<T> {
    return this.http.get<T>(environment.api + path, {
      headers: {
        Authorization: "Bearer " + this.session.getSessionId()
      }
    })
  }

  get<T>(path: string, result: (data: T) => void,
         error: (code: number, message: string) => void = (code, message) => {
         }) {
    this.asyncGet<T>(path).subscribe({
      next: (status) => result(status),
      error: (fail) => error(fail.error.code, fail.error.message)
    })
  }

  asyncDelete<T>(path: string): Observable<T> {
    return this.http.delete<T>(environment.api + path, {
      headers: {
        Authorization: "Bearer " + this.session.getSessionId()
      }
    })
  }

  delete<T>(path: string, result: (data: T) => void,
            error: (code: number, message: string) => void = (code, message) => {
            }) {
    this.asyncDelete<T>(path).subscribe({
      next: (status) => result(status),
      error: (fail) => error(fail.error.code, fail.error.message)
    })
  }

  asyncPost<T>(path: string, data: object): Observable<T> {
    return this.http.post<T>(environment.api + path, data, {
      headers: {
        Authorization: "Bearer " + this.session.getSessionId(),
        ContentType: 'application/json'
      }
    })
  }

  post<T>(path: string, data: object, result: (data: T) => void,
          error: (code: number, message: string) => void = (code, message) => {
          }
  ) {
    this.asyncPost<T>(path, data).subscribe({
      next: (status) => result(status),
      error: (fail) => error(fail.error.code, fail.error.message)
    })
  }

  asyncPut<T>(path: string, data: object): Observable<T> {
    return this.http.put<T>(environment.api + path, data, {
      headers: {
        Authorization: "Bearer " + this.session.getSessionId(),
        ContentType: 'application/json'
      }
    })
  }

  put<T>(path: string, data: object, result: (data: T) => void,
         error: (code: number, message: string) => void = (code, message) => {
         }
  ) {
    this.asyncPut<T>(path, data).subscribe({
      next: (status) => result(status),
      error: (fail) => error(fail.error.code, fail.error.message)
    })
  }
}
