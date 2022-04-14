import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ConsoleComponent} from "./pages/console/console.component";
import {UsersComponent} from "./pages/admin/users/users.component";
import {UserComponent} from "./pages/admin/users/user/user.component";
import {GroupComponent} from "./pages/admin/users/group/group.component";

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: '',
  component: ConsoleComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    }, {
      path: 'user',
      component: UsersComponent,
      children: [
        {
          path: "user",
          component: UserComponent
        }, {
          path: "group",
          component: GroupComponent
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
