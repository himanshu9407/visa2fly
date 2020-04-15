import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-signup/login/login.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { response } from 'express';

@Injectable({
    providedIn: "root"
})
export class MyBookingsService {

    activeBooking : any;
    allBookings : Array <any> = [];
    verifytokendetails : Array<any> = [];
    constructor (private router : Router,private loginService:LoginService, private http : HttpClient,private userFlow : UserFlowDetails)  {}


    getBookingsFromServer() : Observable<any> {
        let AUTH_TOKEN = this.loginService.getAuthToken();
        if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
           this.router.navigateByUrl['/visa'];
        }
        else {

              const base_url = this.userFlow.getBaseURL();
              const headers = new HttpHeaders({"token":AUTH_TOKEN,"visa-client":"0"});
              // console.log(AUTH_TOKEN);

             return this.http.get(base_url+'fetchBookings',{headers:  headers});
        }
       //  console.log(AUTH_TOKEN);
       }

       postFeedback(bookingid : string,rateOne : string, rateTwo : string, rateThree : string, suggestion : string, notInterested : boolean) : Observable<any>{
        let feedback = {};
        let AUTH_TOKEN = this.loginService.getAuthToken();
        const headers = new HttpHeaders({"token":AUTH_TOKEN,"visa-client":"0"});
        if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
           this.router.navigateByUrl['/visa'];
        }
        else {
        feedback = {bookingId : bookingid, rateOne : rateOne, rateTwo : rateTwo, rateThree :rateThree, suggestion : suggestion, notInterested : notInterested }

        const base_url = this.userFlow.getBaseURL();
        return this.http.post(base_url + 'feedback/submit', feedback, {headers:  headers});
            // console.log(feedback);
        }


        }

    setActiveBooking(booking : any) {
        // console.log(booking);
        this.activeBooking = booking;
        // console.log(booking);
        this.router.navigate(['bookingDetails']);
    }



    getActiveBooking () {

        return this.activeBooking;
    }


}
