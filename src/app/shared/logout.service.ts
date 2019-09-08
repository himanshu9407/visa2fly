import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../components/login-signup/login/login.service';
import { UserFlowDetails } from './user-flow-details.service';

@Injectable({
    providedIn: 'root'
  }) 
export class LogoutService {


    constructor(private http : HttpClient,private loginService : LoginService, private userFlow : UserFlowDetails){}
    logoutUser() {
        let AUTH_TOKEN = this.loginService.getAuthToken();
        let headers = new HttpHeaders({'token':AUTH_TOKEN,'visa-client':"0"});
        const base_url = this.userFlow.getBaseURL();

        return this.http.post<any>(base_url+'logout',{},{headers:headers})
    }
    
}