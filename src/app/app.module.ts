import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {ContainerComponent} from './container/container.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {LoginComponent} from './pages/login/login.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SideBarComponent} from './views/side-bar/side-bar.component';
import {UsersComponent} from './pages/admin/users/users.component';
import {ConsoleComponent} from "./pages/console/console.component";
import {UserComponent} from './pages/admin/users/user/user.component';
import {GroupComponent} from './pages/admin/users/group/group.component';
import {UserInsertComponent} from './pages/admin/users/user/insert/user-insert.component';
import {DeleteComponent} from './views/dialog/delete/delete.component';
import {RoleInsertComponent} from './pages/admin/users/group/insert/role-insert.component';
import {PermissionComponent} from './pages/admin/users/permission/permission.component';
import {MonitorsComponent} from './pages/admin/monitor/monitors.component';
import {MonitorGroupComponent} from "./pages/admin/monitor/group/monitor-group.component";
import {MonitorTypeInsertComponent} from './pages/admin/monitor/monitor/insert/monitor-type-insert.component';
import {MonitorTypeGroupInsertComponent} from './pages/admin/monitor/group/insert/monitor-type-group-insert.component';
import {MonitorComponent} from "./pages/admin/monitor/monitor/monitor.component";
import {ClientsComponent} from './pages/admin/clients/clients.component';
import {ClientComponent} from './pages/admin/clients/client/client.component';
import {ClientGroupComponent} from "./pages/admin/clients/group/client-group.component";
import {ClientInsertComponent} from './pages/admin/clients/client/client-insert/client-insert.component';
import {
  ClientGroupInsertComponent
} from './pages/admin/clients/group/client-group-insert/client-group-insert.component';
import {AlarmComponent} from './pages/admin/alarm/alarm.component';
import {AlarmRuleComponent} from './pages/admin/alarm/alarm-rule/alarm-rule.component';
import {AlarmRuleGroupComponent} from './pages/admin/alarm/alarm-rule-group/alarm-rule-group.component';
import {AlarmRuleClientComponent} from './pages/admin/alarm/alarm-rule-client/alarm-rule-client.component';
import {LogsComponent} from './pages/admin/logs/logs.component';
import {ClientLogComponent} from './pages/admin/logs/client-log/client-log.component';
import {AlarmLogComponent} from './pages/admin/logs/alarm-log/alarm-log.component';
import {MessageLogComponent} from './pages/admin/logs/message-log/message-log.component';
import {OperateLogComponent} from './pages/admin/logs/operate-log/operate-log.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {ClientMonitorComponent} from "./pages/admin/clients/client-monitor/client-monitor.component";
import { ClientMonitorUpdateComponent } from './pages/admin/clients/client-monitor/client-monitor-update/client-monitor-update.component';
import { SystemConfigComponent } from './pages/admin/system/system-config/system-config.component';
import { SystemComponent } from './pages/admin/system/system.component';
import { AlarmSendComponent } from './pages/admin/alarm/alarm-send/alarm-send.component';
import { AlarmRuleInsertComponent } from './pages/admin/alarm/alarm-rule/alarm-rule-insert/alarm-rule-insert.component';

@NgModule({
  declarations: [
    ContainerComponent,
    LoginComponent,
    DashboardComponent,
    ConsoleComponent,
    SideBarComponent,
    UsersComponent,
    UserComponent,
    GroupComponent,
    UserInsertComponent,
    DeleteComponent,
    RoleInsertComponent,
    PermissionComponent,
    MonitorsComponent,
    MonitorComponent,
    MonitorGroupComponent,
    MonitorTypeInsertComponent,
    MonitorTypeGroupInsertComponent,
    ClientsComponent,
    ClientComponent,
    ClientGroupComponent,
    ClientInsertComponent,
    ClientMonitorComponent,
    ClientGroupInsertComponent,
    AlarmComponent,
    AlarmRuleComponent,
    AlarmRuleGroupComponent,
    AlarmRuleClientComponent,
    LogsComponent,
    ClientLogComponent,
    AlarmLogComponent,
    MessageLogComponent,
    OperateLogComponent,
    ClientMonitorUpdateComponent,
    SystemConfigComponent,
    SystemComponent,
    AlarmSendComponent,
    AlarmRuleInsertComponent
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [ContainerComponent]
})
export class AppModule {
}
