import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { LoginService } from '../login-signup/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private http: HttpClient,
    private loginService: LoginService,
    private userFlow: UserFlowDetails) { }

  createPolicy(reqData) {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    let headers = new HttpHeaders({ 'token': AUTH_TOKEN, 'visa-client': "0" });
    const base_url = this.userFlow.getBaseURL();

    return this.http.post(base_url + "insurance/createPolicy", reqData, { headers: headers });
  }

  getPremium(reqData) {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    let headers = new HttpHeaders({ 'token': AUTH_TOKEN, 'visa-client': "0" });
    const base_url = this.userFlow.getBaseURL();

    return this.http.post(base_url + "insurance/getPremium", reqData, { headers: headers });
  }
}
