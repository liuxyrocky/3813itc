import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  modalStatus = 0;
  userinfo = null;
  groupName = '';
  adminType = {
    1: 'Group Assis',
    2: 'Group Admin',
    3: 'Super Admin'
  };
  role = null;
  groups = null;
  permissionsDict = {
    1: ['invite user', 'remove user', 'create channel'],
    2: ['create group', 'create channel', 'invite user', 'remove user', 'remove channel', 'remove group', 'set assis']
  };

  constructor(private router: Router, private http: HttpClient) {
  }

  deleteGroup(id) {
    this.http.post(`http://localhost:3000/group/delete`, {id})
      .toPromise()
      .then((data: any) => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  get_permission(activity) {
    if (this.role === '3') {
      return true;
    }
    const pList = this.permissionsDict[this.role];
    return pList.indexOf(activity) > -1;
  }

  add_group() {
    const self = this;
    const name = self.groupName;
    this.http.post(`http://localhost:3000/group/`, {name})
      .toPromise()
      .then((data: any) => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.check_login();
    this.get_groups();
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

  get_groups() {
    const self = this;
    this.http.get(`http://localhost:3000/group/`, {})
      .toPromise()
      .then((data: any) => {
        self.groups = data;
        console.log(self.groups);
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

  showModal() {
    this.modalStatus = 1;
  }

  hideModal() {
    this.modalStatus = 0;
  }
}
