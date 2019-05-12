import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  constructor() { }
public show_login:boolean = false;
public show_signup:boolean = true;

  ngOnInit () {  }

  showSignup() {
  if(this.show_signup == false) {
    this.show_signup = true;
    }
  this.show_login = false;
// $('#Login').removeClass('signup-capsule');
// $('#Login').addClass('login-capsule');
// $('#Signup').removeClass('login-capsule');
// $('#Signup').addClass('signup-capsule');


  }

  showLogin() {
   if(this.show_login == false) {
    this.show_login = true;
    }
  this.show_signup = false;
  // $('#Signup').removeClass('signup-capsule');
  // $('#Signup').addClass('login-capsule');
  // $('#Login').removeClass('login-capsule');
  // $('#Login').addClass('signup-capsule');



  }
}
