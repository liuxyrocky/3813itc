import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {


  modalStatus = 0;
  userinfo = null;
  channelName = '';
  groupName = '';
  groupId = '';
  adminType = {
    1: 'Group Assis',
    2: 'Group Admin',
    3: 'Super Admin'
  };
  role = null;
  channels = null;
  permissionsDict = {
    1: ['invite user', 'remove user', 'create channel'],
    2: ['create group', 'create channel', 'invite user', 'remove user', 'remove channel', 'remove group', 'set assis']
  };

  constructor(private router: Router, private http: HttpClient, private routeInfo: ActivatedRoute) {
  }

  add_channel() {
    const self = this;
    const name = self.channelName;
    this.http.post(`http://localhost:3000/channel/`, {name, group_id: self.groupId})
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

  ngOnInit() {
    this.check_login();
    this.getChannel();
  }

  deleteChannel(id) {
    this.http.post(`http://localhost:3000/channel/delete`, {id})
      .toPromise()
      .then((data: any) => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getChannel() {
    const self = this;
    this.routeInfo.queryParams.subscribe((res) => {
      self.groupName = res.name;
      self.groupId = res.gid;
      this.http.get(`http://localhost:3000/group/${res.gid}`, {})
        .toPromise()
        .then((data: any) => {
          self.channels = data;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  showModal() {
    this.modalStatus = 1;
  }

  hideModal() {
    this.modalStatus = 0;
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


}
