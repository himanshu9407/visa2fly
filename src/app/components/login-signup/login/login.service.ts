import {Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  }) 
export class LoginService {

    AUTH_TOKEN = null;
    constructor( private http : HttpClient){
        
        this.AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN") || null ; 
    }

    getAuthToken () {
        return this.AUTH_TOKEN;
    }


    setAuthToken () {
        localStorage.setItem("AUTH_TOKEN","SARTHAK");
    }

    getAuthTokenFromServer () {

    }


    loginUser (userId : string, password : string ,rememberMe : string) : Observable<any>  {

        const headers = new HttpHeaders ({"Content-Type" : "application/json", "visa-client" : "0"});
        let reqBody = {userId : userId, password : password ,remember :rememberMe,ipAddress :"",loginAttemptMethod : "0" };
        let reqBodyFinal = JSON.stringify(reqBody);

      


        return this.http.post<any>('http://ec2-3-14-208-48.us-east-2.compute.amazonaws.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/account/login',reqBodyFinal,{headers:headers}) ;


    }



}