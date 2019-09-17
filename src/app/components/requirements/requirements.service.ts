

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LoginService } from '../login-signup/login/login.service';
@Injectable({
    providedIn: "root"
})
export class RequirementsService {
    constructor(private http: HttpClient, private userFlow : UserFlowDetails,
        private loginStatus : LoginStatusService, private loginService : LoginService) { }

    getRequirementsData(country: string, purpose: string, entryType: string) :Promise <any> {
        let obj = {
            purpose: purpose,
            entryType: entryType
        };
        const base_url = this.userFlow.getBaseURL();

        let params = new HttpParams({ fromObject: obj });
        console.log(obj);
        return this.http.get(base_url+'info/' + country, { params: params }).toPromise();
    }

    verifyQuotation (quoteId : string) {

        let base_url = this.userFlow.getBaseURL();

        let AUTH_TOKEN = this.loginService.getAuthToken();

        if(AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
            AUTH_TOKEN = "";
        }

        const headers = new HttpHeaders ({"token" : AUTH_TOKEN, "visa-client" : "0"});
        const params = new HttpParams().set("quoteId",quoteId);


        return this.http.get(base_url+"packageOpt",{headers : headers, params:params});


    }
}
