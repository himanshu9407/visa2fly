import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-signup/login/login.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LogoutService } from 'src/app/shared/logout.service';
import { SignupResponseModel } from '../login-signup/signup/SignupResponse.model';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn : boolean = false;
  showDropDown : boolean = false;

  userDetails : any;
  constructor(private loginService: LoginService, private loginStatus : LoginStatusService,
    private logoutService : LogoutService,private toastService : ToastService,
    private router : Router, private preloaderService : PreloaderService, private userFlowDetails : UserFlowDetails) { }




  ngOnInit() {

    // console.log("header called again");

    
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


  logoutUser () {
    this.preloaderService.showPreloader(true);
    // console.log("logout called");
    this.toogleDropdown();
    this.logoutService.logoutUser().subscribe(
      (data : SignupResponseModel) => {
        if (!data) {
          this.toastService.showNotification("Something went wrong! Please try again later",4000);
          this.router.navigate(['home']);
          this.preloaderService.showPreloader(false);
        }
        else if (data.code == "0") {
          this.loginService.setAuthToken("");
          this.loginStatus.setUserStatus(false);
          this.loginStatus.setUserLoggedIn(false);
          this.router.navigate(['home']);
          this.preloaderService.showPreloader(false);
          localStorage.setItem("profile",JSON.stringify({}));
        }

        else {
          this.toastService.showNotification(data.message.toString(),4000);
          this.router.navigate(['home']);
          this.preloaderService.showPreloader(false);
        }

      },

      (err) => {

      }
    );
  }
  

  toogleDropdown() {
    this.showDropDown = !this.showDropDown;
  }
}
