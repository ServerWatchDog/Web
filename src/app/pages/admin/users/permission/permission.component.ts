import {Component, OnInit} from '@angular/core';
import {MiniPermissionsView, UserPermissionsService} from "../../../../service/mods/user-permissions.service";

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  permissionsList: Array<MiniPermissionsView> = [];
  panelOpenState = false;
  constructor(private permissions: UserPermissionsService) {
  }

  ngOnInit(): void {
    this.permissions.select().subscribe({
      next: (data) => {
        this.permissionsList = data
      }
    })
  }

}
