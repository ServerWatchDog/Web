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
import {AlarmComponent} from "./pages/admin/alarm/alarm.component";
import {AlarmRuleComponent} from "./pages/admin/alarm/alarm-rule/alarm-rule.component";
import {AlarmRuleGroupComponent} from "./pages/admin/alarm/alarm-rule-group/alarm-rule-group.component";
import {AlarmRuleClientComponent} from "./pages/admin/alarm/alarm-rule-client/alarm-rule-client.component";
import {LogsComponent} from "./pages/admin/logs/logs.component";
import {ClientLogComponent} from "./pages/admin/logs/client-log/client-log.component";
import {AlarmLogComponent} from "./pages/admin/logs/alarm-log/alarm-log.component";
import {MessageLogComponent} from "./pages/admin/logs/message-log/message-log.component";
import {OperateLogComponent} from "./pages/admin/logs/operate-log/operate-log.component";
import {ClientMonitorComponent} from "./pages/admin/clients/client-monitor/client-monitor.component";
import {SystemComponent} from "./pages/admin/system/system.component";
import {SystemConfigComponent} from "./pages/admin/system/system-config/system-config.component";
import {AlarmSendComponent} from "./pages/admin/alarm/alarm-send/alarm-send.component";

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

    }, {
      path: 'system',
      component: SystemComponent,
      children: [
        {
          path: 'config',
          component: SystemConfigComponent
        }
      ]
    },
    {
      path: 'logs',
      component: LogsComponent,
      children: [
        {
          path: 'client',
          component: ClientLogComponent
        }, {
          path: 'alarm',
          component: AlarmLogComponent
        }, {
          path: 'message',
          component: MessageLogComponent
        }, {
          path: 'operate',
          component: OperateLogComponent
        }
      ]
    },
    {
      path: 'alarm',
      component: AlarmComponent,
      children: [
        {
          path: 'rules',
          component: AlarmRuleComponent
        }, {
          path: 'groups',
          component: AlarmRuleGroupComponent
        }, {
          path: 'clients',
          component: AlarmRuleClientComponent
        }, {
          path: 'send',
          component: AlarmSendComponent
        }
      ]
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
