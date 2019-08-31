import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-signup/login/login.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LogoutService } from 'src/app/shared/logout.service';
import { SignupResponseModel } from '../login-signup/signup/SignupResponse.model';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn : boolean = false;
  showDropDown : boolean = false;
  constructor(private loginService: LoginService, private loginStatus : LoginStatusService,
    private logoutService : LogoutService,private toastService : ToastService,
    private router : Router) { }

  ngOnInit() {
    this.loginStatus.getData().subscribe(
      (userLoggedIn) => {
        this.userLoggedIn = userLoggedIn;
      }
    );
  }

  logoutUser () {
    console.log("logout called");
    this.toogleDropdown();
    this.logoutService.logoutUser().subscribe(
      (data : SignupResponseModel) => {
        if (!data) {
          this.toastService.showNotification("Something went wrong! Please try again later",4000);
        }
        else if (data.code == "0") {
          console.log(data);
          this.loginService.setAuthToken("");
          this.loginStatus.setUserStatus(false);
          this.router.navigate(['home']);
        }

        else {
          console.log(data);
          this.toastService.showNotification(data.message.toString(),4000);
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
