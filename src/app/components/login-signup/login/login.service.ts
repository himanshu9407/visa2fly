import {Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  }) 
export class LoginService {

    AUTH_TOKEN :string = "";
    loggedIn = false;
    constructor( private http : HttpClient){
        
        this.AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN") || null ; 
    }

    getUserStatus () {
        return this.loggedIn
    }


    setUserStatus (status : boolean) {
        this.loggedIn = status;
    }

    getAuthToken () {
        return localStorage.getItem("AUTH_TOKEN");
    }


    setAuthToken (authToken : string) {
        localStorage.setItem("AUTH_TOKEN",authToken);
        this.AUTH_TOKEN = authToken;
    }

    getAuthTokenFromServer () {

    }


    loginUser (userId : string, password : string ,rememberMe : string,ip :string,temp :{email:boolean,mobile:boolean}) : Observable<any>  {

        const headers = new HttpHeaders ({"Content-Type" : "application/json", "visa-client" : "0"});
        // console.log(ip+ "************");
        let reqBody = {};
        if (temp.email) {
            reqBody = {email : userId,cell : "", password : password ,remember :rememberMe,ipAddress :ip,loginAttemptMethod : "0" };
        }
        else if (temp.mobile) {
            reqBody = {email : "",cell : userId, password : password ,remember :rememberMe,ipAddress :ip,loginAttemptMethod : "0" };

        }

        let reqBodyFinal = JSON.stringify(reqBody);

      
        console.log(reqBody);


        return this.http.post<any>('http://ec2-3-14-208-48.us-east-2.compute.amazonaws.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/account/login',reqBodyFinal,{headers:headers}) ;


    }



}