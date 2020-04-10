import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { LoginService } from "../login-signup/login/login.service";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LogoutService } from "src/app/shared/logout.service";
import { SignupResponseModel } from "../login-signup/signup/SignupResponse.model";
import { ToastService } from "src/app/shared/toast.service";
import { Router, ActivatedRoute, NavigationStart } from "@angular/router";
import { PreloaderService } from "src/app/shared/preloader.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { CanDeactivateGuard } from "src/app/shared/can-deactivate.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  userLoggedIn: boolean = false;
  showDropDown: boolean = false;
  showTransparentNavbar: boolean = true;

  userDetails: any;
  constructor(
    private loginService: LoginService,
    private loginStatus: LoginStatusService,
    private logoutService: LogoutService,
    // private toastService: ToastService,
    private toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private preloaderService: PreloaderService,
    private userFlowDetails: UserFlowDetails,
    private deactivate: CanDeactivateGuard,
    private routerHistory: RouterHistory,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // console.log("header called again");

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // console.log(event.url);
        let url: string = event.url;
        let arr = url.split("/");

        if (
          arr[1] == "visa-requirement" || arr[1] == "freeVisa" || arr[1] == "visaOnArrival" || arr[1] == "profile" || arr[1] == "myBookings" || arr[1] == "bookingDetail" || arr[1] == "visa-requirements" || arr[1] == "addTraveller" || event.url == "/sim/checkout" || arr[1] == "slcontainer" || arr[1] == "tnc" || arr[1] == "privacyPolicy" || arr[1] == "cookiePolicy" || arr[1] == "cancellationPolicy" || arr[1] == "page-not-found") {
          this.showTransparentNavbar = false;
          // console.log('checkout3');
        } else {
          this.showTransparentNavbar = true;
          // console.log("Kuldeep");
        }

      }
    });
    // if (this.router.url == "/") {
    //   showTransparent = true;
    // }
    // else {
    //   false;
    // }

    this.userLoggedIn = this.loginStatus.getUserLoggedIn();

    //  console.log(this.userLoggedIn);
    if (isPlatformBrowser(this.platformId)) {
    this.userDetails = JSON.parse(localStorage.getItem("profile"));
    }
    // console.log(this.userDetails);
    // this.userLoggedIn = this.loginStatus.getUserLoggedIn() || false;

    this.loginStatus.getData().subscribe(userLoggedIn => {
      this.userLoggedIn = userLoggedIn;
    });

    this.loginStatus.getProfileData().subscribe(profile => {
      this.userDetails = profile;
    });
    
  }

  logoutUser() {
    if (isPlatformBrowser(this.platformId)) {
    this.preloaderService.showPreloader(true);
    // console.log("logout called");
    this.toogleDropdown();
    this.logoutService.logoutUser().subscribe(
      (data: SignupResponseModel) => {
        if (!data) {
          this.toastr.error(
            "Something went wrong! Please try again later"
          );
          this.router.navigate(["visa"]);
          this.preloaderService.showPreloader(false);
        } else if (data.code == "0") {
          this.loginService.setAuthToken("");
          this.loginStatus.setUserStatus(false);
          this.loginStatus.setUserLoggedIn(false);
          this.router.navigate(["visa"]);
          localStorage.setItem("profile", JSON.stringify({}));
          this.preloaderService.showPreloader(false);
        } else if (data.code == "301") {
          this.loginService.setAuthToken("");
          this.loginStatus.setUserStatus(false);
          this.loginStatus.setUserLoggedIn(false);
          this.router.navigate(["visa"]);
          this.preloaderService.showPreloader(false);
          localStorage.setItem("profile", JSON.stringify({}));
          this.toastr.error("" + data.message);
        } else {
          this.toastr.error(data.message.toString());
          this.router.navigate(["visa"]);
          this.preloaderService.showPreloader(false);
        }
      },

      err => {}
    );
  }
}

  toogleDropdown() {
    this.showDropDown = !this.showDropDown;
  }
}
