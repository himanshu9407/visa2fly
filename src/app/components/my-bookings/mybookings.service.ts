import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-signup/login/login.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: "root"
})
export class MyBookingsService {
    
    activeBooking : any;
    
    constructor (private router : Router,private loginService:LoginService, private http : HttpClient,private userFlow : UserFlowDetails) {}


    getBookingsFromServer(){
        let AUTH_TOKEN = this.loginService.getAuthToken();
        if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
           this.router.navigateByUrl['/visa'];
        }
        else {
   
              const base_url = this.userFlow.getBaseURL();
              const headers = new HttpHeaders({"token":AUTH_TOKEN,"visa-client":"0"});
              // console.log(AUTH_TOKEN);
   
             return this.http.get(base_url+'fetchBookings',{headers:  headers} );
        }
       //  console.log(AUTH_TOKEN);
       }

       postFeedback(bookingId : string,product : string, info : string, recommend : string, userFeedback : string){
        let AUTH_TOKEN = this.loginService.getAuthToken();
        if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
           this.router.navigateByUrl['/visa'];
        }
        else {
        const base_url = this.userFlow.getBaseURL();
        const headers = new HttpHeaders({"token":AUTH_TOKEN,"visa-client":"0"});

           return this.http.post(base_url + '', {headers:  headers});
       }
    }

    setActiveBooking(booking : any) {
        // console.log(booking);
        this.activeBooking = booking;

        this.router.navigate(['bookingDetails']);
    }
    getActiveBooking () {

        return this.activeBooking;
    }


}