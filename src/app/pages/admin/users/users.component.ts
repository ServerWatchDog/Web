import { Component, OnInit } from '@angular/core';
import {DashBoardService} from "../../../service/mods/dash-board.service";
import {TitleService} from "../../../service/utils/title.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  links: ChildRoute[] = [{
    name: '用户管理',
    url: '/user/user'
  }, {
    name: '角色管理',
    url: '/user/group'
  }, {
    name: '权限一览',
    url: '/user/permission'}
  ];
  activeLink = this.links[0];


  constructor(
    public dash: DashBoardService, private title: TitleService,
    private route:Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("用户管理")
    if ('/user' == decodeURI(this.route.url)) {
      this.route.navigate(['user','user']).then()
    }
    for (let link of this.links) {
      if (link.url == this.route.url){
        this.activeLink = link
      }
    }
  }

}

export interface ChildRoute {
  name: string,
  url: string
}
