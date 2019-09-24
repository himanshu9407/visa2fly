import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class MyBookingsService {
    
    activeBooking : any;
    
    constructor (private router : Router) {}



    setActiveBooking(booking : any) {
        console.log(booking);
        this.activeBooking = booking;

        this.router.navigate(['bookingDetails']);
    }
    getActiveBooking () {

        return this.activeBooking;
    }


}