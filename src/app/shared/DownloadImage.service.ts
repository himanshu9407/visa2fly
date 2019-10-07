import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserFlowDetails } from './user-flow-details.service';
import { LoginService } from '../components/login-signup/login/login.service';

@Injectable({
    providedIn : "root"
})
export class DownloadImageService {

    constructor (private http : HttpClient, private userFlowDetails : UserFlowDetails,
        private loginService : LoginService) {}


    downloadImageWithUrl(url : string, bookingId : string) {
        let token = this.loginService.getAuthToken();
        if(token == null || token == undefined) {
            token = "";
        }
        // console.log(token);
        let headers = new HttpHeaders({'token':token,'visa-client':"0"});
        let base_url = this.userFlowDetails.getBaseURL();
        return this.http.get(base_url+"profile"+"/downloadFile/"+bookingId+"/"+url,{headers :headers});
    }
}