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
        return this.http.get<any>("http://ec2-3-14-208-48.us-east-2.compute.amazonaws.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/sendOtp", {params : params});
    }
}