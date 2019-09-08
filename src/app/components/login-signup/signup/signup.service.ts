import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SignupResponseModel } from './SignupResponse.model';


@Injectable({
    providedIn: 'root'
  })  
export class SignupService {

    
    constructor(private http : HttpClient){}

    getOtp(mobile: string) : Observable<any> {
        let params = new HttpParams().set("cell",mobile);
        console.log(params);
        return this.http.get<any>("https://staging2.visa2fly.com/sendOtp", {params : params});
    }


    createUser (reqBody) {
        const headers = new HttpHeaders ({"Content-Type" : "application/json", "visa-client" : "0"});
        return this.http.post<any>('https://staging2.visa2fly.com/signup',reqBody,{headers:headers});
    }
}