import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-status',
  templateUrl: './booking-status.component.html',
  styleUrls: ['./booking-status.component.css']
})
export class BookingStatusComponent implements OnInit {
  bookingStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
