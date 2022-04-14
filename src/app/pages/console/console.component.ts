import {Component, OnInit} from '@angular/core';
import {DashBoardService} from "../../service/mods/dash-board.service";

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  constructor(public dashboard: DashBoardService) {
  }

  ngOnInit(): void {
  }

}
