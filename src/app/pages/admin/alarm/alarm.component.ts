import {Component, OnInit} from '@angular/core';
import {ChildRoute} from "../users/users.component";
import {DashBoardService} from "../../../service/mods/dash-board.service";
import {TitleService} from "../../../service/utils/title.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {


  links: ChildRoute[] = [{
    name: '预警规则管理',
    url: '/alarm/rules'
  }, {
    name: '预警规则分组',
    url: '/alarm/groups'
  }, {
    name: '终端绑定',
    url: '/alarm/clients'
  },{
    name:'通知目标',
    url:'/alarm/send'

  }
  ];
  activeLink = this.links[0];


  constructor(
    public dash: DashBoardService, private title: TitleService,
    private route: Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("预警管理")
    if ('/alarm' == decodeURI(this.route.url)) {
      this.route.navigate([this.links[0].url]).then()
    }
    for (let link of this.links) {
      if (link.url == this.route.url) {
        this.activeLink = link
      }
    }
  }

}
