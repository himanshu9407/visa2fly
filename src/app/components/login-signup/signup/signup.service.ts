import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SignupResponseModel } from './SignupResponse.model';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';


@Injectable({
    providedIn: 'root'
  })  
export class SignupService {

    
    constructor(private http : HttpClient, private userFlow : UserFlowDetails){}

    getOtp(mobile: string) : Observable<any> {
        let params = new HttpParams().set("cell",mobile);
        console.log(params);
        const base_url = this.userFlow.getBaseURL();

        return this.http.get<any>(base_url+"sendOtp", {params : params});
    }


    createUser (reqBody) {
        const base_url = this.userFlow.getBaseURL();
        const headers = new HttpHeaders ({"Content-Type" : "application/json", "visa-client" : "0"});
        return this.http.post<any>(base_url+'signup',reqBody,{headers:headers});
    }
}