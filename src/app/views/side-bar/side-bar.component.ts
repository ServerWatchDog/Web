import {Component, OnInit} from '@angular/core';
import {DashBoardService} from "../../service/mods/dash-board.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SessionHttpService} from "../../service/utils/session-http.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  public info: UserInfo = {
    "name": "",
    "url": "",
    "email": "",
    "roles": ""
  };

  constructor(
    private dashboard: DashBoardService,
    private route: Router,
    public dialog: MatDialog,
    private shttp: SessionHttpService
  ) {
    this.shttp.get<UserInfo>("/view/user/info", res => {
      this.info = res
    })
  }

  ngOnInit(): void {

  }


  private defaultMenu: Menu[] = [
    {
      title: '控制台',
      url: '/dashboard'
    },
    {
      title: '终端管理',
      url: '/client'
    },
    {
      title: '预警管理',
      url: '/alarm'
    },
    {
      title: '采集管理',
      url: '/monitor'
    }, {
      title: '日志管理',
      url: '/logs'
    }, {
      title: '用户管理',
      url: '/user'
    }, {
      title: '系统管理',
      url: '/system'
    }, {
      title: '个人中心',
      url: '/profile'
    }
  ]


  menu: Menu[] = [...this.defaultMenu];

  openUrl(path: string) {
    this.dashboard.toggle()
    if (!decodeURI(this.route.url).startsWith(path)) {
      this.route.navigate([path]).then()
    }
  }

  logout() {
  }

  select(url: string) {
    if (decodeURI(this.route.url).startsWith(url)) {
      return "item-select"
    } else {
      return "item-no-select"
    }
  }

}

export interface UserInfo {
  "name": string,
  "email": string,
  "url": string,
  "roles": string
}

export interface Menu {
  title: string,
  url: string
}
