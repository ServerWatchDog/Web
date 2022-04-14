import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session = '';


  constructor() {
    const session = localStorage.getItem("user.session");
    if (session != null) {
      this.session = session;
    }
  }

  updateSessionId(data: string) {
    localStorage.setItem("user.session", data);
    this.session = data;
  }

  getSessionId() {
    return this.session;
  }

  clear() {
    localStorage.removeItem("user.session")
  }
}
