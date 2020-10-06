import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { ChannelsComponent } from './admin/channels/channels.component';
import { AllusersComponent } from './admin/allusers/allusers.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    UsersComponent,
    ChannelsComponent,
    AllusersComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
