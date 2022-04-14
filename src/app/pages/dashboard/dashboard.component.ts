import {Component, OnInit} from '@angular/core';
import {DashBoardService} from "../../service/mods/dash-board.service";
import {TitleService} from "../../service/utils/title.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dashboard: DashBoardService,
              private title:TitleService) {
    title.setTitle("控制台")
  }

  ngOnInit(): void {
  }

}
