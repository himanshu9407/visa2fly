import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { LoginService } from '../../login-signup/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class B2bSimcheckoutService {

  constructor(private http : HttpClient, private userFlow : UserFlowDetails, private loginService: LoginService,
    private loginStatus : LoginStatusService) { }

  proceedToPayment(reqObj : any, id: string) {
    // console.log(reqObj);
     let token = this.loginService.getAuthToken();
     if(token == null || token == undefined) {
         token = "";
     }
     console.log(reqObj);
     let headers = new HttpHeaders({'id' : id,'visa-client':"0"});
     const base_url = this.userFlow.getBaseURL();

     return this.http.post(base_url +'b2b/redirect/sim/select/plans',reqObj,{headers : headers});


 }

 hitPaymentApi () {

     let base_url = this.userFlow.getBaseURL();
     let AUTH_TOKEN = this.loginService.getAuthToken();
     let headers = new HttpHeaders({'token':AUTH_TOKEN,'visa-client':"0"});
     return this.http.post(base_url +"payment/process",{},{headers:headers});
 }
}
