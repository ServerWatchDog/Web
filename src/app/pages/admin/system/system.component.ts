import {Component, OnInit} from '@angular/core';
import {ChildRoute} from "../users/users.component";
import {DashBoardService} from "../../../service/mods/dash-board.service";
import {TitleService} from "../../../service/utils/title.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {


  links: ChildRoute[] = [{
    name: '配置管理',
    url: '/system/config'
  }
    // , {
    //   name: '终端分组',
    //   url: '/client/group'
    // }, {
    //   name: '采集指标管理',
    //   url: '/client/monitor'
    // }
  ];
  activeLink = this.links[0];


  constructor(
    public dash: DashBoardService, private title: TitleService,
    private route: Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("系统管理")
    if ('/system' == decodeURI(this.route.url)) {
      this.route.navigate(['system', 'config']).then()
    }
    for (let link of this.links) {
      if (link.url == this.route.url) {
        this.activeLink = link
      }
    }
  }

}
