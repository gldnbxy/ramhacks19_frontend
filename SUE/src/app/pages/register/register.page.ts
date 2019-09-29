import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMajor } from 'src/app/interfaces/major.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: IUser;

  majors: IMajor[] = [{
    name: 'Computer Engineering',
    abrv: 'CPE'
  },
  {
    name: 'Computer Science',
    abrv: 'CS'
  },
  {
    name: 'Mechanical Engineering',
    abrv: 'ME'
  }];

  constructor(private http: HttpClient, private router: Router, public storage: Storage) {
    this.user = {
      firstname: null,
      lastname: null,
      email: null,
      phonenum: null,
      major: null,
      position: {
        internship: false,
        coop: false,
        fulltime: false
      },
      citizenship: null,
      linelocation: null
    };
  }

  ngOnInit() {
  }

  register() {
    console.log('making acct');

    let ip = 'http://34.69.192.84';
    let url = `${ip}/api/students`;
    let headers = new HttpHeaders().set('Content-Type', 'application/JSON');

    this.storage.set('current_user', this.user);
    this.http.post<boolean>(url, this.user, { headers }).subscribe(res => {
      console.log(`#########################################`);
      console.log(`Server Returned: `);
      console.log(res);
      this.router.navigateByUrl('/map');
    }, err => {
      console.log(err);
    });

  }

}
