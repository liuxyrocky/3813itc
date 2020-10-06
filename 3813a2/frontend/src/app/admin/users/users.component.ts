import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  modalStatus = 0;
  userinfo = null;
  channelName = '';
  userName = '';
  channelId = '';
  adminType = {
    1: 'Group Assis',
    2: 'Group Admin',
    3: 'Super Admin'
  };
  role = null;
  users = null;
  permissionsDict = {
    1: ['invite user', 'remove user', 'create channel'],
    2: ['create group', 'create channel', 'invite user', 'remove user', 'remove channel', 'remove group', 'set assis']
  };

  get_permission(activity) {
    if (this.role === '3') {
      return true;
    }
    const pList = this.permissionsDict[this.role];
    return pList.indexOf(activity) > -1;
  }

  constructor(private router: Router, private http: HttpClient, private routeInfo: ActivatedRoute) {
  }

  getChannelUser() {

  }

  get_user_info(username) {
    const self = this;
    this.http.post(`http://localhost:3000/get_user/`, {username})
      .toPromise()
      .then((data: any) => {
        self.userinfo = data[0];
        self.role = self.userinfo.role;
      })
      .catch(err => {
        console.log(err);
      });
  }

  removeUser(username) {
    const self = this;
    this.http.post(`http://localhost:3000/channel/user/delete`, {cid: self.channelId, name: username})
      .toPromise()
      .then((data: any) => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  check_login() {
    const self = this;
    const login = localStorage.getItem('admin_login');
    if (login && login === '1') {
      self.userinfo = JSON.parse(localStorage.getItem('userinfo'));
      self.get_user_info(self.userinfo.username);
    } else {
      self.router.navigate(['admin/login']);
    }
  }

  ngOnInit() {
    this.check_login();
    this.getUsers();
  }

  showModal() {
    this.modalStatus = 1;
  }

  InviteUser() {
    const self = this;
    this.http.post(`http://localhost:3000/channel/user`, {cid: self.channelId, name: self.userName})
      .toPromise()
      .then((data: any) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('add success');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUsers() {
    const self = this;
    this.routeInfo.queryParams.subscribe((res) => {
      self.channelName = res.name;
      self.channelId = res.cid;
      this.http.get(`http://localhost:3000/channel/user/${res.cid}`,)
        .toPromise()
        .then((data: any) => {
          self.users = data;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  hideModal() {
    this.modalStatus = 0;
  }

}
