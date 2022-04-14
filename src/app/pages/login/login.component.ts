import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TitleService} from "../../service/utils/title.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpService} from "../../service/utils/http.service";
import {SessionService} from "../../service/utils/session.service";

interface LoginResult {
  code: number
  token: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private title: TitleService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private session: SessionService,
              private route: Router, private http: HttpService) {
    this.title.setTitle("控制台登陆")
  }

  ngOnInit(): void {
  }

  showCode = false

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    code: ['', []]
  })


  login() {
    const post = {
      "account": this.loginForm.value.email,
      "password": this.loginForm.value.password,
      "twoFactor": this.loginForm.value.code
    }
    this.http.post<LoginResult>("/view/users/login", post, result => {
      console.log(result)
      console.log(result.code)
      if (result.code != 0) {
        this._snackBar.open("登陆错误：" + result.token, "确定", {
          duration: 1000
        })
      } else {
        this._snackBar.open("登陆成功", "确定", {
          duration: 1000
        })
        this.session.updateSessionId(result.token)
        this.route.navigate(["dashboard"]).then()
      }
    }, (code, message) => {
      console.log(message)
      this._snackBar.open("未知错误：" + message, "确定", {
        duration: 1000
      })
    })
  }

}
