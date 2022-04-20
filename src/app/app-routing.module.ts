import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ConsoleComponent} from "./pages/console/console.component";
import {UsersComponent} from "./pages/admin/users/users.component";
import {UserComponent} from "./pages/admin/users/user/user.component";
import {GroupComponent} from "./pages/admin/users/group/group.component";
import {PermissionComponent} from "./pages/admin/users/permission/permission.component";
import {MonitorsComponent} from "./pages/admin/monitor/monitors.component";
import {MonitorComponent} from "./pages/admin/monitor/monitor/monitor.component";
import {MonitorGroupComponent} from "./pages/admin/monitor/group/monitor-group.component";
import {ClientsComponent} from "./pages/admin/clients/clients.component";
import {ClientComponent} from "./pages/admin/clients/client/client.component";
import {ClientGroupComponent} from "./pages/admin/clients/group/client-group.component";
import {ClientMonitorComponent} from "./pages/admin/clients/client-monitor/client-monitor.component";

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: '',
  component: ConsoleComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,

    },
    {
      path: 'user',
      component: UsersComponent,
      children: [
        {
          path: "user",
          component: UserComponent
        }, {
          path: "group",
          component: GroupComponent
        }, {
          path: "permission",
          component: PermissionComponent
        }
      ]
    },
    {
      path: 'monitor',
      component: MonitorsComponent,
      children: [
        {
          path: 'monitor',
          component: MonitorComponent
        },
        {
          path: 'group',
          component: MonitorGroupComponent
        }
      ]
    },
    {
      path: 'client',
      component: ClientsComponent,
      children: [
        {
          path: "client",
          component: ClientComponent
        },
        {
          path: "group",
          component: ClientGroupComponent
        },
        {
          path: "monitor",
          component: ClientMonitorComponent
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
