import {Injectable} from '@angular/core';
import {TitleService} from "../utils/title.service";

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  drawer: boolean = false;
  title: string = ""

  constructor(private titleService: TitleService) {
  }

  toggle() {
    this.drawer = !this.drawer
  }

  setTitle(title: string) {
    this.title = title;
    this.titleService.setTitle(title )
  }
}
