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

  myBookings : Array<any> = [];

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
          console.log(data.data.bookings);
          this.myBookings = data.data.bookings;

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


          setTimeout(() => {
              
              this.preloaderService.showPreloader(false);
          }, 4000);
        }
        else {
          // router.navigate(['']);
        }
    }      
    );
  }
  setActiveBooking (booking : any) {
    this.bookingService.setActiveBooking(booking);

    this.router.navigate(['bookingDetail']);
  }

}
