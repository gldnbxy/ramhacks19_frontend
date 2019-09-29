import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMajor } from 'src/app/interfaces/major.interface';
import { IUser } from 'src/app/interfaces/user.interface';


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

  constructor(private http: HttpClient) {
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
      citizenship: null
    };
  }

  ngOnInit() {
  }

  register() {
    console.log('making acct');

    let ip = 'http://34.69.192.84'
    let url = `${ip}/api/students`;
    let headers = new HttpHeaders().set('Content-Type', 'application/JSON');

    this.http.post<Boolean>(url, this.user, { headers }).subscribe(res => {
      console.log(`#########################################`);
      console.log(`Server Returned: `);
      console.log(res);
    });

  }

}
