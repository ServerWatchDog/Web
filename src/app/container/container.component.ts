import {Component} from '@angular/core';
import {TitleService} from "../service/utils/title.service";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ModAppService} from "../service/mods/mod-app.service";

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  status = '正在初始化';
  finish = false

  constructor(private appMod: ModAppService,
              private route: Router
    , private title: TitleService) {

  }

  ngOnInit(): void {
    this.title.setTitle('初始化')
    if (environment.production) {
      console.info("当前为部署模式")
    } else {
      console.warn("当前为开发模式")
    }
    this.appMod.globalInit((status) => {
      switch (status) {
        case this.appMod.NETWORK_ERROR:
          this.route.navigate(['502']).then()
          break;
        case this.appMod.NOT_INSTALL:
          this.route.navigate(['/install']).then()
          break;
        case this.appMod.NOT_LOGIN:
          this.route.navigate(['/login']).then()
          break;
        case this.appMod.SUCCESS:
          if ('/' == decodeURI(window.location.pathname)) {
            this.route.navigate(['dashboard']).then()
          } else {

          }
          break;
      }
      this.finish = true
    })
  }

}
