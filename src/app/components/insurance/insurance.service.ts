import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { LoginService } from '../login-signup/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  permiumCalculated: Subject<Array<{planType: string, premiumCalculated: number, gst: number}>> = new Subject();
  loadingSkeleton: Subject<boolean> = new Subject();

  constructor(private http: HttpClient,
    private loginService: LoginService,
    private userFlow: UserFlowDetails) { }

  createPolicy(reqData) {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    let headers = new HttpHeaders({ 'token': AUTH_TOKEN});
    const base_url = this.userFlow.getBaseURL();

    return this.http.post(base_url + "insurance/createPolicy", reqData, { headers: headers });
  }

  getPremium(reqData) {
    const base_url = this.userFlow.getBaseURL();
    return this.http.post(base_url + "insurance/getPremium", reqData);
  }

  paymentInitiate(bookingId: string) {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    let headers = new HttpHeaders({ 'token': AUTH_TOKEN, 'bookingId':  bookingId });
    const base_url = this.userFlow.getBaseURL();

    return this.http.post(base_url + "insurance/payment/initiate", '', { headers: headers });
  }

  pinCodeCityState(reqBody) {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    let headers = new HttpHeaders({ 'token': AUTH_TOKEN});
    const base_url = this.userFlow.getBaseURL();

    return this.http.post(base_url + "validate/PinCodeCityState", reqBody, { headers: headers });
  }
}
