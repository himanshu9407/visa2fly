import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { LoginService } from '../../login-signup/login/login.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';

@Injectable({
  providedIn: 'root'
})
export class B2bReqService {

  constructor(private http: HttpClient, private userFlow: UserFlowDetails,
    private loginStatus: LoginStatusService, private loginService: LoginService) { }

  getRequirementsData(country: string) :Promise <any> {

    let AUTH = 'dhjasd73bd28j';

    const base_url = this.userFlow.getBaseURL();
    const headers = new HttpHeaders({ "AUTH": AUTH, "visa-client": "0" });

    return this.http.get(base_url + 'b2b/visa/country/' + country, { headers: headers }).toPromise();
  }

  verifyQuotation (quoteId : string) {
    let AUTH = 'dhjasd73bd28j';

    let base_url = this.userFlow.getBaseURL();
    // let AUTH_TOKEN = this.loginService.getAuthToken();
    // if(AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
        // AUTH_TOKEN = "";
    // }
    const headers = new HttpHeaders ({"Auth": AUTH, "visa-client" : "0"});
    const params = new HttpParams().set("quoteId",quoteId);
    return this.http.get(base_url+"packageOpt",{headers : headers, params:params});
}
}
