import {Injectable} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  title = "首页"

  constructor(private titleService: Title) {
    titleService.setTitle(this.title)
    this.titleService = titleService
  }

  setTitle(title: string) {
    this.title = title
    this.titleService.setTitle(title)
  }
}
