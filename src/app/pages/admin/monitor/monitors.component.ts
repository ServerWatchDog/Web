import { Component, OnInit } from '@angular/core';
import {DashBoardService} from "../../../service/mods/dash-board.service";
import {TitleService} from "../../../service/utils/title.service";
import {Router} from "@angular/router";
import {ChildRoute} from "../users/users.component";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss']
})
export class MonitorsComponent implements OnInit {


  links: ChildRoute[] = [{
    name: '采集指标管理',
    url: '/monitor/monitor'
  }, {
    name: '采集指标分组',
    url: '/monitor/group'
  }
  ];
  activeLink = this.links[0];


  constructor(
    public dash: DashBoardService, private title: TitleService,
    private route:Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("采集管理")
    if ('/monitor' == decodeURI(this.route.url)) {
      this.route.navigate(['monitor','monitor']).then()
    }
    for (let link of this.links) {
      if (link.url == this.route.url){
        this.activeLink = link
      }
    }
  }

}
