import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { LoginService } from '../login-signup/login/login.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';

@Injectable({
    providedIn : "root"
})

export class SimCheckoutService {
    constructor (private http : HttpClient, private userFlow : UserFlowDetails, private loginService: LoginService,
        private loginStatus : LoginStatusService) {}


    proceedToPayment(reqObj : any) {
       // console.log(reqObj);
        let token = this.loginService.getAuthToken();
        if(token == null || token == undefined) {
            token = "";
        }
        console.log(token);
        let headers = new HttpHeaders({'token':token,'visa-client':"0"});
        const base_url = this.userFlow.getBaseURL();

        return this.http.post(base_url+'sim/select/plans',reqObj,{headers : headers});


    }

    hitPaymentApi () {
        
        let base_url = this.userFlow.getBaseURL();
        let AUTH_TOKEN = this.loginService.getAuthToken();
        let headers = new HttpHeaders({'token':AUTH_TOKEN,'visa-client':"0"});
        return this.http.post(base_url+"payment/process",{},{headers:headers});
    }
}