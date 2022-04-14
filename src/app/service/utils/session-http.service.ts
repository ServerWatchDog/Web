import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "./session.service";
import {environment} from "../../../environments/environment";
import {InHttp} from "./in-http";


@Injectable({
  providedIn: 'root'
})
export class SessionHttpService implements InHttp {

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) {
  }

  get<T>(path: string, result: (data: T) => void,
         error: (code: number, message: string) => void = (code, message) => {
         }) {
    this.http.get<T>(environment.api + path, {
      headers: {
        Authorization: "Bearer " + this.session.getSessionId()
      }
    }).subscribe({
      next: (status) => result(status),
      error: (fail) => error(fail.error.code, fail.error.message)
    })
  }

  delete<T>(path: string, result: (data: T) => void,
            error: (code: number, message: string) => void = (code, message) => {
            }) {
    this.http.delete<T>(environment.api + path, {
      headers: {
        Authorization: "Bearer " + this.session.getSessionId()
      }
    }).subscribe({
      next: (status) => result(status),
      error: (fail) => error(fail.error.code, fail.error.message)
    })
  }

  post<T>(path: string, data: object, result: (data: T) => void,
          error: (code: number, message: string) => void = (code, message) => {
          }
  ) {
    this.http.post<T>(environment.api + path, data, {
      headers: {
        Authorization: "Bearer " + this.session.getSessionId(),
        ContentType: 'application/json'
      }
    }).subscribe({
      next: (status) => result(status),
      error: (fail) => error(fail.error.code, fail.error.message)
    })
  }

  put<T>(path: string, data: object, result: (data: T) => void,
         error: (code: number, message: string) => void = (code, message) => {
         }
  ) {
    this.http.put<T>(environment.api + path, data, {
      headers: {
        Authorization: "Bearer " + this.session.getSessionId(),
        ContentType: 'application/json'
      }
    }).subscribe({
      next: (status) => result(status),
      error: (fail) => error(fail.error.code, fail.error.message)
    })
  }
}
