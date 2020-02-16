import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginService } from "../../login-signup/login/login.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";

@Injectable({
  providedIn: "root"
})
export class B2bAddTrvService {
  b2bUserFlowDetail: any;
  ID: any;
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private userFlow: UserFlowDetails
  ) {
    this.b2bUserFlowDetail = this.userFlow.getB2BUserFlowDetails();
    this.ID = this.b2bUserFlowDetail.id;
  }

  submitForm(reqData) {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    // console.log(AUTH_TOKEN);
    const headers = new HttpHeaders({ id: this.ID, "visa-client": "0" });

    const base_url = this.userFlow.getBaseURL();

    return this.http.post(base_url + "b2b/redirect/visa/apply", reqData, {
      headers: headers
    });
  }

  hitPaymentApi() {
    let base_url = this.userFlow.getBaseURL();
    let AUTH_TOKEN = this.loginService.getAuthToken();
    let headers = new HttpHeaders({ token: AUTH_TOKEN, "visa-client": "0" });
    return this.http.post(
      base_url + "payment/process",
      {},
      { headers: headers }
    );
  }
}
