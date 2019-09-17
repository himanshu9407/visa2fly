import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login-signup/login/login.service';
import { Injectable } from '@angular/core';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Injectable({
    providedIn:'root'
})
export class AddTravellerService {

    constructor (private http : HttpClient, private loginService:LoginService, private userFlow : UserFlowDetails) {}

    submitForm (reqData) {
        let AUTH_TOKEN = this.loginService.getAuthToken();
        console.log(AUTH_TOKEN);
        let headers = new HttpHeaders({'token':AUTH_TOKEN,'visa-client':"0"});

        const base_url = this.userFlow.getBaseURL();
        
        return this.http.post(base_url+"submitApplication",reqData,{ headers: headers});
    }
}