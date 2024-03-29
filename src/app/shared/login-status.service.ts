import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserFlowDetails } from "./user-flow-details.service";
import { LoginService } from "../components/login-signup/login/login.service";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class LoginStatusService {
  isAuthenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private userFlow: UserFlowDetails,
    private loginService: LoginService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public subject = new Subject<any>();
  public subject1 = new Subject<any>();

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  getProfileData(): Observable<any> {
    return this.subject1.asObservable();
  }

  setUserStatus(status: boolean) {
    this.subject.next(status);
  }

  setUserProfile(profile: any) {
    // console.log(profile);
    this.subject1.next(profile);
  }

  setUserLoggedIn(status: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      this.userFlow.setCookie("userLoggedIn", "" + status);
    }
  }

  getUserLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.userFlow.getCookie("userLoggedIn")) {
        return JSON.parse(this.userFlow.getCookie("userLoggedIn"));
      }
    }
  }

  verifyAuthToken(authToken: string): Observable<any> {
    if (authToken == null || authToken == undefined) {
      authToken = "";
    }
    const headers = new HttpHeaders({ token: authToken, "visa-client": "0" });
    const base_url = this.userFlow.getBaseURL();

    return this.http.get<any>(base_url + "verifyToken", { headers: headers });
  }

  checkUserAuthentication() {
    let authToken = this.loginService.getAuthToken();
    if (authToken == null || authToken == undefined) {
      authToken = "";
    }
    const headers = new HttpHeaders({ token: authToken, "visa-client": "0" });
    const base_url = this.userFlow.getBaseURL();

    return this.http
      .get(base_url + "verifyToken", { headers: headers })
      .toPromise();
  }
}
