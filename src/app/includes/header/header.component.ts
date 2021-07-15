import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { LoginService } from "../../components/login-signup/login/login.service";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LogoutService } from "src/app/shared/logout.service";
import { SignupResponseModel } from "../../components/login-signup/signup/SignupResponse.model";
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
  visa2FlyForAll: boolean = false;
  visa2FlyForLogin:boolean = false;
  userDetails: any;
  constructor(
    private loginService: LoginService,
    private loginStatus: LoginStatusService,
    private logoutService: LogoutService,
    private toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private preloaderService: PreloaderService,
    private userFlow: UserFlowDetails,
    private deactivate: CanDeactivateGuard,
    private routerHistory: RouterHistory,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let url: string = event.url;
        let arr = url.split("/");

        arr[arr.length - 1] = arr[arr.length - 1].split("?")[0];

        if (
          // arr[1] == "slcontainer/signup" ||
          // arr[1] == "slcontainer/login" ||
          arr[1] == "visa-requirement" ||
          arr[1] == "freeVisa" ||
          arr[1] == "visaOnArrival" ||
          arr[1] == "profile" ||
          arr[1] == "payment" ||
          arr[1] == "myBookings" ||
          arr[1] == "bookingDetail" ||
          arr[1] == "visa-requirements" ||
          arr[1] == "addTraveller" ||
          event.url == "/sim/checkout" ||
          // arr[1] == "slcontainer" ||
          arr[1] == "Terms&Conditions" ||
          arr[1] == "Privacy-Policy" ||
          arr[1] == "cookie-Policy" ||
          arr[1] == "cancellation-Policy" ||
          arr[1] == "404" ||
          arr[1] == "About-Us" ||
          arr[1] == "offers" ||
          arr[1] == "insurance" ||
          arr[1] == "australia-visa-online" ||
          arr[1] == "austria-visa-online" ||
          arr[1] == "antigua & barbuda-visa-online" ||
          arr[1] == "armenia-visa-online" ||
          arr[1] == "bahrain-visa-online" ||
          arr[1] == "bhutan-visa-online" ||
          arr[1] == "belgium-visa-online" ||
          arr[1] == "azerbaijan-visa-online" ||
          arr[1] == "brazil-visa-online" ||
          arr[1] == "ukraine-visa-online" ||
          arr[1] == "china-visa-online" ||
          arr[1] == "canada-visa-online" ||
          arr[1] == "cambodia-visa-online" ||
          arr[1] == "denmark-visa-online" ||
          arr[1] == "dubai-visa-online" ||
          arr[1] == "egypt-visa-online" ||
          arr[1] == "ethiopia-visa-online" ||
          arr[1] == "estonia-visa-online" ||
          arr[1] == "finland-visa-online" ||
          arr[1] == "france-visa-online" ||
          arr[1] == "georgia-visa-online" ||
          arr[1] == "germany-visa-online" ||
          arr[1] == "iraq-visa-online" ||
          arr[1] == "japan-visa-online" ||
          arr[1] == "kenya-visa-online" ||
          arr[1] == "malaysia-visa-online" ||
          arr[1] == "maldives-visa-online" ||
          arr[1] == "malta-visa-online" ||
          arr[1] == "new-zealand-visa-online" ||
          arr[1] == "south-africa-visa-online" ||
          arr[1] == "netherlands-visa-online" ||
          arr[1] == "russia-visa-online" ||
          arr[1] == "rwanda-visa-online" ||
          arr[1] == "singapore-visa-online" ||
          arr[1] == "spain-visa-online" ||
          arr[1] == "sri-lanka-visa-online" ||
          arr[1] == "swiss-visa-online" ||
          arr[1] == "taiwan-visa-online" ||
          arr[1] == "tajikistan-visa-online" ||
          arr[1] == "thailand-visa-online" ||
          arr[1] == "turkey-visa-online" ||
          arr[1] == "uae-visa-online" ||
          arr[1] == "uk-visa-online" ||
          arr[1] == "usa-visa-online" ||
          arr[1] == "uzbekistan-visa-online" ||
          arr[1] == "vietnam-visa-online" ||
          arr[1] == "zambia-visa-online"
        ) {
          this.showTransparentNavbar = false;
          this.visa2FlyForAll = true;
          this.visa2FlyForLogin = false;
          // $("#loginBUtton").removeClass("content").addClass("login");
          $("#loginButton").addClass("login").css({"display": "block"});
          $("#signupButton").addClass("btn-outline-light").css({"display": "block"});
          // $("button").addClass("btn-outline-light");
          $("a").removeClass("content").addClass("navlink");
          $("#navbarDropdown").removeClass("dropDownMenu");
        } else if(arr[1] == "slcontainer") {
          this.showTransparentNavbar = true;
          this.visa2FlyForLogin = true;
          this.visa2FlyForAll = false;
          $("#loginButton").removeClass("login").css({"display": "none"});
          $("#navbarDropdown").addClass("dropDownMenu");
          $("a").removeClass("navlink").addClass("content");
          $("#signupButton").removeClass("btn-outline-light").css({"display":"none"});
        } else {
          this.visa2FlyForAll = true;
          this.visa2FlyForLogin = false;
          $("#loginButton").addClass("login").css({"display": "block"});
          $("#signupButton").addClass("btn-outline-light").css({"display": "block"});
          // $("button").addClass("btn-outline-light");
          $("a").removeClass("content").addClass("navlink");
          $("#navbarDropdown").removeClass("dropDownMenu");
          // $("#visa").removeClass("content");
          this.showTransparentNavbar = true;
        }
      }
    });

    this.userLoggedIn = this.loginStatus.getUserLoggedIn();

    if (isPlatformBrowser(this.platformId)) {
      if (this.userFlow.getCookie("profile")) {
        this.userDetails = JSON.parse(this.userFlow.getCookie("profile"));
      }
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
            this.router.navigate(["/"]);
            this.preloaderService.showPreloader(false);
          } else if (data.code == "0") {
            this.loginService.setAuthToken("");
            this.loginStatus.setUserStatus(false);
            this.loginStatus.setUserLoggedIn(false);
            this.router.navigate(["/"]);
            this.userFlow.setCookie("profile", JSON.stringify({}));
            this.userFlow.removeAll();
            this.preloaderService.showPreloader(false);
          } else if (data.code == "301") {
            this.loginService.setAuthToken("");
            this.loginStatus.setUserStatus(false);
            this.loginStatus.setUserLoggedIn(false);
            this.router.navigate(["/"]);
            this.preloaderService.showPreloader(false);
            this.userFlow.setCookie("profile", JSON.stringify({}));
            this.toastr.error("" + data.message);
          } else {
            this.toastr.error(data.message.toString());
            this.router.navigate(["/"]);
            this.preloaderService.showPreloader(false);
          }
        },

        (err) => { }
      );
    }
  }

  toogleDropdown() {
    this.showDropDown = !this.showDropDown;
  }
}
