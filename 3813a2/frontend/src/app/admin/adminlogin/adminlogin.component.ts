import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  formData: any = {
    username: '',
    password: ''
  };
  error = '';

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  login() {
    const self = this;
    this.http.post(`http://localhost:3000/auth/`, this.formData)
      .toPromise()
      .then((data: any) => {
        if (data.message) {
          self.error = data.message;
        } else {
          const userinfo = data[0];
          if (userinfo.role !== '0') {
            localStorage.setItem('userinfo', JSON.stringify(userinfo));
            localStorage.setItem('admin_login', '1');
            self.router.navigate(['admin']);
          } else {
            self.error = 'Insufficient authority of current account';
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

}
