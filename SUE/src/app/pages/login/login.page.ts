import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { IUser } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  badLogin: boolean;

  constructor(private http: HttpClient, private router: Router, public storage: Storage) {
    //this.badLogin = false;
  }

  ngOnInit() {
  }

  login() {
    console.log(`The email is: ${this.email}`);
    console.log(`Trying with password: ${this.password}`);

    let ip = 'http://34.69.192.84'
    let url = `${ip}/api/auth`;
    let headers = new HttpHeaders().set('Content-Type', 'application/JSON');

    this.http.post<IUser>(url, { 'email': this.email }, { headers }).subscribe(res => {
      console.log(`#########################################`);
      console.log(`Server Returned: `);
      this.storage.set('current_user', res);
      this.storage.get('current_user').then(res => {
        if (res.email) {
          console.log(res);
          this.router.navigateByUrl('/map');
        }
        else
          this.badLogin = true;
      });
    });
  }

}
