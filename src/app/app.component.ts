import {
  Component,
  AfterViewInit,
  OnInit,
  AfterContentChecked,
  AfterViewChecked
} from "@angular/core";
import { HomeServiceService } from "./home-service.service";
import { HomeFormService } from "./components/home-form/home-form.service";
import { PreloaderService } from "./shared/preloader.service";
import { LoginStatusService } from "./shared/login-status.service";
import { LoginService } from "./components/login-signup/login/login.service";
import { SignupResponseModel } from "./components/login-signup/signup/SignupResponse.model";
import { UserFlowDetails } from "./shared/user-flow-details.service";
import { AuthGuard } from "./auth/auth.guard";
import { AuthenticationGuard } from "./shared/AuthenticationGuard.service";
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public dummyData = {
    code: "0",
    status: "SUCCESS",
    message: "Data Fetched Successfully",
    data: {
      countries: ["Australia", "Dubai", "Russia"],
      data: {
        Australia: {
          countryName: "Austrailia",
          purpose: ["BUSINESS", "TOURIST"],
          entryType: ["SINGLE ENTRY"],
          residenceOf: ["Delhi", "Noida", "Gurgaon"]
        },
        Dubai: {
          countryName: "Dubai",
          purpose: ["BUSINESS", "TOURIST"],
          entryType: ["SINGLE ENTRY", "MULTIPLE ENTRY"],
          residenceOf: ["Delhi", "Noida", "Gurgaon"]
        },
        Russia: {
          countryName: "Russia",
          purpose: ["BUSINESS", "TOURIST"],
          entryType: ["SINGLE ENTRY", "MULTIPLE ENTRY"],
          residenceOf: ["Delhi", "Noida", "Gurgaon"]
        }
      }
    }
  };
  homeFormData: any;
  title = "visa-App";
  public showPreloader: boolean = false;
  users: object;
  showB2BHeader: boolean;
  constructor(
    private homeFormService: HomeFormService,
    private preloaderService: PreloaderService,
    private loginStatusService: LoginStatusService,
    private router: Router,
    private loginService: LoginService,
    private userFlow: UserFlowDetails,
    private authService: AuthenticationGuard
  ) {
    // this.router.navigate(['/home']);
  }

  ngOnInit() {

    this.preloaderService.getAlert().subscribe((showPreloader: boolean) => {
      this.showPreloader = showPreloader;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // console.log(event.url);
        let url: string = event.url;
        let arr = url.split("/");

        if (arr[1] == "b2b") {
          this.showB2BHeader = true;
          // console.log('checkout3');
        } else {
          this.showB2BHeader = false;
          // console.log("Kuldeep");
        }
      }
    });

    let token = this.loginService.getAuthToken();

    if (token == "" || token == null || token == undefined) {
      this.userFlow.setUserProfile({});
      this.loginStatusService.setUserLoggedIn(false);
    } else {
      this.loginStatusService
        .verifyAuthToken(token)
        .toPromise()
        .then((data: any) => {
          if (data.code == "0") {
            this.userFlow.setUserProfile(data.data);
            this.loginStatusService.setUserLoggedIn(true);
            this.loginStatusService.setUserProfile(data.data.profile);
          } else if (data.code == "301") {
            this.loginService.setAuthToken("");
            this.loginStatusService.setUserStatus(false);
            this.loginStatusService.setUserLoggedIn(false);
            localStorage.setItem("profile", JSON.stringify({}));
          } else {
            this.userFlow.setUserProfile({});
            this.loginStatusService.setUserLoggedIn(false);
          }
        });
    }
  }
}