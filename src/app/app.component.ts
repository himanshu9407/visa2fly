import {
  Component,
  OnInit,
} from "@angular/core";
import { PreloaderService } from "./shared/preloader.service";
import { LoginStatusService } from "./shared/login-status.service";
import { LoginService } from "./components/login-signup/login/login.service";
import { UserFlowDetails } from "./shared/user-flow-details.service";
import { Router, NavigationStart } from "@angular/router";

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
  showVisaHeader: boolean;
  showB2BHeader: boolean;
  showB2BSimHeader: boolean;
  showB2bSimFooter: boolean;
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

        arr[arr.length - 1] = arr[arr.length - 1].split("?")[0];

        // if (arr[1] == "b2b") {
        //   this.showB2BHeader = true;
        //   this.showVisaHeader = false;
        //   this.showB2BSimHeader = false;
        //   this.showB2bSimFooter = false;
        // } else if (arr[2] == "b2b/sim") {
        //   this.showB2BSimHeader = true;
        //   this.showVisaHeader = false;
        //   this.showB2BHeader = false;
        //   this.showB2bSimFooter = true;
        //   // this.showB2BHeader = false;
        // } else {
        //   // this.showB2BSimHeader =
        //   this.showVisaHeader = true;
        //   this.showB2BSimHeader = true;
        //   this.showB2BHeader = false;
        //   this.showB2bSimFooter = false;
        // }

        this.activeRoute = arr[1];

        if (arr[1] == "b2b" &&
          ((arr[2] == "home") ||
            (arr[2] == "visa-requirement") ||
            (arr[2] == "b2b-add-traveller"))) {
          this.showB2BHeader = true;
        } else if (arr[1] == "b2b" &&
          ((arr[2] == "sim") ||
            (arr[2] == "plans") ||
            (arr[2] == "application-form"))) {
          this.showB2BSimHeader = true;
        } else {
          this.showB2BHeader = false;
          this.showB2BSimHeader = false;
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


// orderId=1605165242794W7TC3&responseCode=100&responseDescription=The%20transaction%20was%20completed%20successfully&checksum=b4c9d4656b43e96faf385dc1679f2f71211ca7c9380e65aa8efc6a88a55ef256&amount=349000&doRedirect=false&paymentMode=Credit%20Card&cardId=ccbeaadd20191223a6485ca4e353baf6f844b5923c65b27192b7bdee7f1435b1~8
// cardScheme=Visa&cardToken=4111%20XXXX%20XXXX%201111&bank=HDFC&bankid=NA&paymentMethod=411111&cardhashid=CH108&productDescription=NA&product1Description=NA&product2Description=NA&product3Description=NA&product4Description=NA&pgTransId=ZP5b3e3a84d476f&pgTransTime=11/12/2020%2012:44:23
