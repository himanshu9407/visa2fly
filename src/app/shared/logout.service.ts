import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../components/login-signup/login/login.service';

@Injectable({
    providedIn: 'root'
  }) 
export class LogoutService {


    constructor(private http : HttpClient,private loginService : LoginService){}
    logoutUser() {
        let AUTH_TOKEN = this.loginService.getAuthToken();
        let headers = new HttpHeaders({'token':AUTH_TOKEN,'visa-client':"0"});
        return this.http.post<any>('https://staging2.visa2fly.com/logout',{},{headers:headers})
    }
    
}