import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login-signup/login/login.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class AddTravellerService {

    constructor (private http : HttpClient, private loginService:LoginService) {}

    submitForm (reqData) {
        let AUTH_TOKEN = this.loginService.getAuthToken();
        let headers = new HttpHeaders({'token':AUTH_TOKEN,'visa-client':"0"});

        
        return this.http.post('https://staging2.visa2fly.com/submitApplication',reqData,{headers:headers});
    }
}