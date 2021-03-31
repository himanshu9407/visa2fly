import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginService } from "../../login-signup/login/login.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";

@Injectable({
  providedIn: "root"
})
export class B2bAddTrvService {
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private userFlow: UserFlowDetails
  ) {
  }

  submitForm(reqData) {
    let b2bUserFlowDetail_id = this.userFlow.getB2BUserFlowDetails().id;

    const headers = new HttpHeaders({ id: b2bUserFlowDetail_id, "visa-client": "0" });

    const base_url = this.userFlow.getBaseURL();
    // console.log(b2bUserFlowDetail_id);

    return this.http.post(base_url + "b2b/redirect/visa/apply", reqData, {
      headers: headers
    });
  }

  submitWarningForm() {
    let b2bUserFlowDetail_id = this.userFlow.getB2BUserFlowDetails().id;

    const headers = new HttpHeaders({ id: b2bUserFlowDetail_id, "visa-client": "0" });

    const base_url = this.userFlow.getBaseURL();

    return this.http.post(base_url + "b2b/redirect/visa/warning", {}, {
      headers: headers
    });
  }
}
