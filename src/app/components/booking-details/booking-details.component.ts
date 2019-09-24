import { Component, OnInit } from '@angular/core';
import { MyBookingsService } from '../my-bookings/mybookings.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  selectedBooking : any;
  constructor(private myBookingService : MyBookingsService) {
    let temp = this.myBookingService.getActiveBooking();    
    this.selectedBooking = temp;

    console.log(this.selectedBooking);
  }

  ngOnInit() {
  }

}
