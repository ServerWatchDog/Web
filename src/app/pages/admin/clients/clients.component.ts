import {Component, OnInit} from '@angular/core';
import {ChildRoute} from "../users/users.component";
import {DashBoardService} from "../../../service/mods/dash-board.service";
import {TitleService} from "../../../service/utils/title.service";
import {Router} from "@angular/router";
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {


  links: ChildRoute[] = [{
    name: '终端管理',
    url: '/client/client'
  }, {
    name: '终端分组',
    url: '/client/group'
  }, {
    name: '终端采集配置',
    url: '/client/monitor'
  }
  ];
  activeLink = this.links[0];


  constructor(
    public dash: DashBoardService, private title: TitleService,
    private route: Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("终端管理")
    if ('/client' == decodeURI(this.route.url)) {
      this.route.navigate(['client', 'client']).then()
    }
    for (let link of this.links) {
      if (link.url == this.route.url) {
        this.activeLink = link
      }
    }
  }
}
