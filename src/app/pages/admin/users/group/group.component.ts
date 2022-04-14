import {Component, OnInit} from '@angular/core';
import {DashBoardService} from "../../../../service/mods/dash-board.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(private dash: DashBoardService) {
  }

  ngOnInit(): void {
    this.dash.setTitle("角色管理")
  }

}
