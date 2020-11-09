import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-booking-status',
  templateUrl: './booking-status.component.html',
  styleUrls: ['./booking-status.component.css']
})
export class BookingStatusComponent implements OnInit {
  bookingStatus: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe((params: any) => {
      console.log(params);
    });
    
    console.log("params");
  }

  ngOnInit(): void {
  }

}