import {Component, OnInit} from '@angular/core';
import {ChildRoute} from "../users/users.component";
import {DashBoardService} from "../../../service/mods/dash-board.service";
import {TitleService} from "../../../service/utils/title.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {


  links: ChildRoute[] = [{
    name: '终端采集日志',
    url: '/logs/client'
  }, {
    name: '终端报警日志',
    url: '/logs/alarm'
  }, {
    name: '消息推送日志',
    url: '/logs/message'
  }, {
    name: '操作日志',
    url: '/logs/operate'
  }
  ];
  activeLink = this.links[0];


  constructor(
    public dash: DashBoardService, private title: TitleService,
    private route: Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("日志管理")
    if ('/logs' == decodeURI(this.route.url)) {
      this.route.navigate([this.links[0].url]).then()
    }
    for (let link of this.links) {
      if (this.route.url.startsWith(link.url)) {
        this.activeLink = link
      }
    }
  }

}
