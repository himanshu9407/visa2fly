import { Component, OnInit } from '@angular/core';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { LoginService } from '../login-signup/login/login.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LogoutService } from 'src/app/shared/logout.service';
import { ToastService } from 'src/app/shared/toast.service';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css']
})
export class MobileNavComponent implements OnInit {
  userLoggedIn : boolean = false;
  userDetails : any;


  constructor(private loginService: LoginService, private loginStatus : LoginStatusService,
    private logoutService : LogoutService,private toastService : ToastService,
    private router : Router, private preloaderService : PreloaderService, private userFlowDetails : UserFlowDetails) { }

  ngOnInit() {
    this.userLoggedIn = this.loginStatus.getUserLoggedIn();
    
  //  console.log(this.userLoggedIn);

    this.userDetails = JSON.parse(localStorage.getItem('profile'));
    console.log(this.userDetails);
    // this.userLoggedIn = this.loginStatus.getUserLoggedIn() || false;

    this.loginStatus.getData().subscribe(
      (userLoggedIn) => {
        this.userLoggedIn = userLoggedIn;
      }
    );

    this.loginStatus.getProfileData().subscribe(
      (profile) => {
        this.userDetails = profile;
      }
    );
  }

}
