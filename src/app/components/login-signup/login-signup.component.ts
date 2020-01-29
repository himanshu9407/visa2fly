import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router : Router,
    @Inject(PLATFORM_ID) private platformId: Object
    ) {

   }
public show_login:boolean = false;
public show_signup:boolean = false;

  ngOnInit () { 
    this.route.params.subscribe(
      (params: Params) => {
        // console.log(params);
        if (params['form'] == "login"){
          this.showLogin();
        }
        if (params['form'] == "signup") {
          this.showSignup();
        } 
      }
    );
   }

  showSignup() {
  if(this.show_signup == false) {
    this.show_signup = true;
  }
  this.show_login = false;
  $('#Login').css("border-radius","0px 20px 20px 0px");

$('#Login').removeClass('signup-capsule');
$('#Login').addClass('login-capsule');
$('#SignUp').removeClass('login-capsule');
$('#SignUp').addClass('signup-capsule');
$('#SignUp').css("border-radius","20px 0px 0px 20px");

  }

  showLogin() {
   if(this.show_login == false) {
    this.show_login = true;
    }
  this.show_signup = false;
  if (isPlatformBrowser(this.platformId)) {
  $('#SignUp').css("border-radius","20px 0px 0px 20px");

  $('#SignUp').removeClass('signup-capsule');
  $('#SignUp').addClass('login-capsule');
  $('#Login').removeClass('login-capsule');
  $('#Login').addClass('signup-capsule');
  $('#Login').css("border-radius","0px 20px 20px 0px");
  }


  }

  navigateToLogin() {
    this.router.navigate(['slcontainer','login']);
  }
  navigateToSignup() {
    this.router.navigate(['slcontainer','signup']);
  }
}
