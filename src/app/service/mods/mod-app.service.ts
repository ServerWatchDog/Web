import {Injectable} from '@angular/core';
import {SessionService} from "../utils/session.service";
import {SessionHttpService} from "../utils/session-http.service";

@Injectable({
  providedIn: 'root'
})
export class ModAppService {
  NETWORK_ERROR = "NETWORK_ERROR";
  NOT_INSTALL = "NOT_INSTALL";
  NOT_LOGIN = "NOT_LOGIN";
  SUCCESS = "SUCCESS";

  constructor(private session: SessionService, private shttp: SessionHttpService) {
  }

  globalInit(param: (status: string) => void) {
    const sessionId = this.session.getSessionId();
    if (sessionId == '') {
      param(this.NOT_LOGIN)
      return
    }
    this.shttp.get("/view/user/info", data => {
      param(this.SUCCESS)
    }, (error, message) => {
      this.session.clear()
      console.log(message)
      param(this.NOT_LOGIN)
    })
  }
}
