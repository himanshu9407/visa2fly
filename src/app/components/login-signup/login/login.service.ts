import {Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Injectable({
    providedIn: 'root'
  }) 
export class LoginService {

    AUTH_TOKEN :string = "";
    loggedIn = false;
   
    constructor( private http : HttpClient, private userFlow : UserFlowDetails){
        
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

    // setUserProfile (userProfile : object) {
    //     localStorage.setItem("")
    // }

    getAuthTokenFromServer () {

    }

    sendLoginOtp (userId : string) : Observable<any>  {
        const headers = new HttpHeaders ({"Content-Type" : "application/json", "visa-client" : "0"});

        const params = new HttpParams().set("userId",userId);

        const base_url = this.userFlow.getBaseURL();


        return this.http.get(base_url+'sendOtpForLogin',{headers:headers,params:params});
    }


    loginUser (userId : string, otp : string ,rememberMe : string,ip :string,temp :{email:boolean,mobile:boolean}) : Observable<any>  {

        const headers = new HttpHeaders ({"Content-Type" : "application/json", "visa-client" : "0"});
        let reqBody = {};
        if (temp.email) {
            reqBody = {emailId : userId,cell : "", otp : otp ,remember :rememberMe,ipAddress :ip,loginAttemptMethod : "0" };
        }
        else if (temp.mobile) {
            reqBody = {emailId : "",cell : userId, otp : otp ,remember :rememberMe,ipAddress :ip,loginAttemptMethod : "0" };
            
        }
        
        let reqBodyFinal = JSON.stringify(reqBody);

      
        //console.log(reqBody);

        let random = new Date().getTime();
        const base_url = this.userFlow.getBaseURL();
        return this.http.post<any>(base_url+'account/login?v='+random,reqBodyFinal,{headers:headers}) ;


    }



}