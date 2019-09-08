import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserFlowDetails } from './user-flow-details.service';

@Injectable({
    providedIn: 'root'
  })  
export class LoginStatusService {

    constructor( private http : HttpClient, private userFlow : UserFlowDetails){}

    public subject = new  Subject<any>();
    public subject1 = new Subject<any>();

    getData(): Observable <any> {
        return this.subject.asObservable();
    }

    getProfileData (): Observable<any> {
        return this.subject1.asObservable();
    }


    setUserStatus (status : boolean) {
        this.subject.next(status);
    }

    setUserProfile (profile : {}) {
        console.log(profile);
        this.subject1.next(profile);
    }

    setUserLoggedIn(status: boolean) {
        localStorage.setItem("userLoggedIn",""+status);
    }

    getUserLoggedIn() {
        return JSON.parse(localStorage.getItem("userLoggedIn"));
    }


    verifyAuthToken (authToken : string) {
        const headers = new HttpHeaders({"token":authToken,"visa-client":"0"});
        const base_url = this.userFlow.getBaseURL();

        return this.http.get(base_url+'verifyToken', {headers:headers});
    }

    
}