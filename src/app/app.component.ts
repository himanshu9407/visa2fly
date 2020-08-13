import {
  Component,
  AfterViewInit,
  OnInit,
  AfterContentChecked,
  AfterViewChecked,
} from "@angular/core";
import { HomeServiceService } from "./home-service.service";
import { PreloaderService } from "./shared/preloader.service";
import { LoginStatusService } from "./shared/login-status.service";
import { LoginService } from "./components/login-signup/login/login.service";
import { SignupResponseModel } from "./components/login-signup/signup/SignupResponse.model";
import { UserFlowDetails } from "./shared/user-flow-details.service";
import { AuthGuard } from "./auth/auth.guard";
import { AuthenticationGuard } from "./shared/AuthenticationGuard.service";
import { Router, NavigationStart } from "@angular/router";
import { CookiesService } from "@ngx-utils/cookies/src/cookies.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  homeFormData: any;
  title = "visa-App";
  public showPreloader: boolean = false;
  users: object;
  showB2BHeader: boolean;
  hideFooter: boolean;
  activeRoute: string;
  constructor(
    private preloaderService: PreloaderService,
    private loginStatusService: LoginStatusService,
    private router: Router,
    private loginService: LoginService,
    private userFlow: UserFlowDetails,
  ) {
  }

  ngOnInit() {
    this.preloaderService.getAlert().subscribe((showPreloader: boolean) => {
      this.showPreloader = showPreloader;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let url: string = event.url;
        let arr = url.split("/");

        this.activeRoute = arr[1];

        if (arr[1] == "b2b") {
          this.showB2BHeader = true;
        } else {
          this.showB2BHeader = false;
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
            this.userFlow.setCookie("profile", JSON.stringify({}));
          } else {
            this.userFlow.setUserProfile({});
            this.loginStatusService.setUserLoggedIn(false);
          }
        });
    }
  }
}
