import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LoginService } from '../login-signup/login/login.service';
import { Router } from '@angular/router';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { MyBookingsService } from './mybookings.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  totalCount : number = 0;

  myBookings : Array<any> = [];
  myBookingsPc : Array<any> = [];
  myBookingsMobile : Array<any> = [];
  activePcBookingPage : Array<any> = [];
  activeMobileBookingPage : Array<any> = [];

  AUTH_TOKEN = "";

  constructor(private loginStatus : LoginStatusService, private loginService : LoginService,
              private  router :Router ,private preloaderService :PreloaderService, private bookingService : MyBookingsService) {
    this.myBookings =   [];

    this.preloaderService.showPreloader(true);
    


}

ngOnInit() {
    this.AUTH_TOKEN = this.loginService.getAuthToken();

    this.loginStatus.verifyAuthToken(this.AUTH_TOKEN).subscribe(
      ( data : any ) => {
               
        if (data.code == "0") {
          this.myBookings = data.data.bookings;
          if(this.myBookings !=null ) {

            this.totalCount = data.data.bookings.length;
            this.myBookings.forEach(element => {
              if (element.booking.bookingStatus == "Sim order confirmed" ||element.booking.bookingStatus == "Payment completed"
              ||element.booking.bookingStatus == "Visa application approved"  ) {
                element.booking.statusColor = "g";
              }
              else if (element.booking.bookingStatus="Payment failed" || element.booking.bookingStatus=="Visa application rejected") {
                element.booking.statusColor = "r";
  
              }
              else {
                element.booking.statusColor = "y";
  
              }
              if (element.booking.paymentStatus == "Payment completed") {
                element.booking.paymentColor = "g";
  
              }
              else if (element.booking.paymentStatus == "Payment completed") {
                element.booking.paymentColor = "g";
              }
              else {
                element.booking.paymentColor = 'y';
              }
            })
  
            let temparray,chunk = 6
  
            for (let i=0,j=this.myBookings.length; i<j; i+=chunk) {
              temparray = this.myBookings.slice(i,i+chunk);
              this.myBookingsPc.push(temparray);
          
            }
            this.activePcBookingPage = this.myBookingsPc[0];
  
            let temparray1,chunk1 = 4
  
            for (let i=0,j=this.myBookings.length; i<j; i+=chunk1) {
              temparray1 = this.myBookings.slice(i,i+chunk1);
              this.myBookingsMobile.push(temparray1);
          
            
            }
            this.activeMobileBookingPage = this.myBookingsMobile[0];
  
            console.log(this.myBookingsMobile);
          }
          else {
            this.totalCount = 0;
          }

        
         
        }
        else {
          // router.navigate(['']);
        }
    }      
    );
  }

  setActivePagePc(i : number) {
  
  window.scrollTo(0,0);
    this.activePcBookingPage = this.myBookingsPc[i];
  }

  setActivePageMobile ( i : number)  {
    window.scrollTo(0,0);
    this.activeMobileBookingPage = this.myBookingsMobile[i];
  }


setActiveBooking (booking : any) {
  this.bookingService.setActiveBooking(booking);

  localStorage.setItem("activeBooking",JSON.stringify(booking));

  this.router.navigate(['bookingDetail']);
}

}
