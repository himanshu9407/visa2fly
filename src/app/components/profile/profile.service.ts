import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LoginService } from '../login-signup/login/login.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Injectable({
    providedIn:"root"
})
export class ProfileService {


    constructor(private http : HttpClient, private loginStaus : LoginStatusService,
        private loginService :LoginService, private userFlow : UserFlowDetails){}


    updateProfile (data: any) {
        let AUTH_TOKEN = this.loginService.getAuthToken();
        if (AUTH_TOKEN == undefined || AUTH_TOKEN == null) {
            AUTH_TOKEN = "";
        }
        let headers = new HttpHeaders({'token':AUTH_TOKEN,'visa-client':"0"});
        let base_url = this.userFlow.getBaseURL();
        return this.http.post(base_url+"profile/update",data,{headers : headers});
    }
}