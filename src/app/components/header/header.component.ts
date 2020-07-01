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
import { isPlatformBrowser } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
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
    private userFlow: UserFlowDetails,
    private deactivate: CanDeactivateGuard,
    private routerHistory: RouterHistory,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // console.log("header called again");

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // console.log(event.url);
        let url: string = event.url;
        let arr = url.split("/");

        if (
          arr[1] == "visa-requirement" ||
          arr[1] == "freeVisa" ||
          arr[1] == "visaOnArrival" ||
          arr[1] == "profile" ||
          arr[1] == "myBookings" ||
          arr[1] == "bookingDetail" ||
          arr[1] == "visa-requirements" ||
          arr[1] == "addTraveller" ||
          event.url == "/sim/checkout" ||
          arr[1] == "slcontainer" ||
          arr[1] == "tnc" ||
          arr[1] == "privacyPolicy" ||
          arr[1] == "cookiePolicy" ||
          arr[1] == "cancellationPolicy" ||
          arr[1] == "page-not-found" ||
          arr[1] == "aboutUs" ||
          arr[2] == "australia-visa-online" ||
          arr[2] == "azerbaijan-visa-online" ||
          arr[2] == "china-visa-online" ||
          arr[2] == "cambodia-visa-online" ||
          arr[2] == "dubai-visa-online" ||
          arr[2] == "ethiopia-visa-online" ||
          arr[2] == "france-visa-online" ||
          arr[2] == "malaysia-visa-online" ||
          arr[2] == "maldives-visa-online" ||
          arr[2] == "netherlands-visa-online" ||
          arr[2] == "singapore-visa-online" ||
          arr[2] == "spain-visa-online" ||
          arr[2] == "sri-lanka-visa-online" ||
          arr[2] == "swiss-visa-online" ||
          arr[2] == "thailand-visa-online" ||
          arr[2] == "turkey-visa-online" ||
          arr[2] == "uk-visa-online" ||
          arr[2] == "usa-visa-online" ||
          arr[2] == "vietnam-visa-online" ||
          arr[2] == "brazil-visa-online" ||
          arr[2] == "russia-visa-online" ||
          arr[2] == "uzbekistan-visa-online" ||
          arr[2] == "tajiskistan-visa-online" ||
          arr[2] == "zambia-visa-online"
        ) {
          this.showTransparentNavbar = false;
        } else {
          this.showTransparentNavbar = true;
        }
      }
    });

    this.userLoggedIn = this.loginStatus.getUserLoggedIn();

    if (isPlatformBrowser(this.platformId)) {
      this.userDetails = JSON.parse(this.userFlow.getCookie("profile"));
    }

    this.loginStatus.getData().subscribe((userLoggedIn) => {
      this.userLoggedIn = userLoggedIn;
    });

    this.loginStatus.getProfileData().subscribe((profile) => {
      this.userDetails = profile;
    });
  }

  logoutUser() {
    if (isPlatformBrowser(this.platformId)) {
      this.preloaderService.showPreloader(true);
      this.toogleDropdown();
      this.logoutService.logoutUser().subscribe(
        (data: SignupResponseModel) => {
          if (!data) {
            this.toastr.error("Something went wrong! Please try again later");
            this.router.navigate(["visa"]);
            this.preloaderService.showPreloader(false);
          } else if (data.code == "0") {
            this.loginService.setAuthToken("");
            this.loginStatus.setUserStatus(false);
            this.loginStatus.setUserLoggedIn(false);
            this.router.navigate(["visa"]);
            this.userFlow.setCookie("profile", JSON.stringify({}));
            this.preloaderService.showPreloader(false);
          } else if (data.code == "301") {
            this.loginService.setAuthToken("");
            this.loginStatus.setUserStatus(false);
            this.loginStatus.setUserLoggedIn(false);
            this.router.navigate(["visa"]);
            this.preloaderService.showPreloader(false);
            this.userFlow.setCookie("profile", JSON.stringify({}));
            this.toastr.error("" + data.message);
          } else {
            this.toastr.error(data.message.toString());
            this.router.navigate(["visa"]);
            this.preloaderService.showPreloader(false);
          }
        },

        (err) => {}
      );
    }
  }

  toogleDropdown() {
    this.showDropDown = !this.showDropDown;
  }
}
