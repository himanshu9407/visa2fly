import { Component, OnInit } from '@angular/core';
import { MyBookingsService } from '../my-bookings/mybookings.service';
import { ToastService } from 'src/app/shared/toast.service';
import { DownloadImageService } from 'src/app/shared/DownloadImage.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  selectedBooking : any;
  constructor(private myBookingService : MyBookingsService, private toastService : ToastService,
    private downloadImageService: DownloadImageService) {
    let temp = this.myBookingService.getActiveBooking();    
    let localStorageBooking = JSON.parse(localStorage.getItem("activeBooking"));
    if (temp == null || temp == undefined) {
      temp = localStorageBooking;
    }
    this.selectedBooking = temp;

    console.log(this.selectedBooking);
  }

  ngOnInit() {

  }
  downloadImage(url : string, bookingId : string) {
    if (url == null || url == undefined) {
      this.toastService.showNotification("File not found !",4000);
    }
    else {
      this.downloadImageService.downloadImageWithUrl(url,bookingId).subscribe(
        (data : any) => {
          if(data.code == "0") {
            this.toastService.showNotification(data.message+"",4000);
          }
          else {
            this.toastService.showNotification(data.message+"",4000);

          }
        }
      );
     
    }
  }

}
