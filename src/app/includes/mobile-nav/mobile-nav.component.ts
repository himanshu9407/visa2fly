import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { LoginService } from "../../components/login-signup/login/login.service";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LogoutService } from "src/app/shared/logout.service";
// import { ToastService } from 'src/app/shared/toast.service';
import { ToastrService } from "ngx-toastr";
import { PreloaderService } from "src/app/shared/preloader.service";
import { NavigationStart, Router } from "@angular/router";
import { SignupResponseModel } from "../../components/login-signup/signup/SignupResponse.model";
import { isPlatformBrowser } from "@angular/common";
import * as $ from "jquery";

@Component({
  selector: "app-mobile-nav",
  templateUrl: "./mobile-nav.component.html",
  styleUrls: ["./mobile-nav.component.css"],
})
export class MobileNavComponent implements OnInit {
  userLoggedIn: boolean = false;
  userDetails: any;
  headerForAll: boolean = false;
  visa2FlyLogoForAll: boolean = false;
  visa2FlyLogoForlogin: boolean = false;

  constructor(
    private loginService: LoginService,
    private loginStatus: LoginStatusService,
    private logoutService: LogoutService,
    private toastr: ToastrService,
    private router: Router,
    private preloaderService: PreloaderService,
    private userFlow: UserFlowDetails,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let url: string = event.url;
        let arr = url.split("/");

        arr[arr.length - 1] = arr[arr.length - 1].split("?")[0];

        if (
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
          arr[1] == "tnc" ||
          arr[1] == "privacyPolicy" ||
          arr[1] == "cookiePolicy" ||
          arr[1] == "cancellationPolicy" ||
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
          this.headerForAll = true;
          this.visa2FlyLogoForAll = true;
          this.visa2FlyLogoForAll = false;
        } else if(arr[1] == "slcontainer") {
          this.visa2FlyLogoForAll = false;
          this.visa2FlyLogoForAll = true;
          this.headerForAll = false;
        } else {
          this.visa2FlyLogoForAll = true;
          this.visa2FlyLogoForAll = false;
          this.headerForAll = true;
        }
      }
    });

    this.userLoggedIn = this.loginStatus.getUserLoggedIn();

    //  console.log(this.userLoggedIn);
    if (this.userFlow.getCookie("profile")) {
      if (isPlatformBrowser(this.platformId)) {
        this.userDetails = JSON.parse(this.userFlow.getCookie("profile"));
      }
    }
    // console.log(this.userDetails);
    // this.userLoggedIn = this.loginStatus.getUserLoggedIn() || false;

    this.loginStatus.getData().subscribe((userLoggedIn) => {
      this.userLoggedIn = userLoggedIn;
    });

    this.loginStatus.getProfileData().subscribe((profile) => {
      this.userDetails = profile;
    });
  }
  logoutUser() {
    this.preloaderService.showPreloader(true);
    // console.log("logout called");

    if (isPlatformBrowser(this.platformId)) {
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
            this.preloaderService.showPreloader(false);
            this.userFlow.setCookie("profile", JSON.stringify({}));
            this.userFlow.removeAll();
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
}
