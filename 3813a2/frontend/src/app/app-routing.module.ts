import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ChatroomComponent} from './chatroom/chatroom.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AdminComponent} from './admin/admin.component';
import {ChannelsComponent} from './admin/channels/channels.component';
import {UsersComponent} from './admin/users/users.component';
import { AllusersComponent } from './admin/allusers/allusers.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'admin/users',
    component: AllusersComponent,
  },
  {
    path: 'admin/login',
    component: AdminloginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin/channel',
    component: ChannelsComponent,
  },
  {
    path: 'admin/user',
    component: UsersComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'room',
    component: ChatroomComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
