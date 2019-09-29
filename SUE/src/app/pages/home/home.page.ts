import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router) { }

  login() {
    console.log("Sign In button clicked");
    this.router.navigateByUrl('/login');
  }

  signUp() {
    console.log("Sign Up button clicked");
    this.router.navigateByUrl('/register');
  }

}
