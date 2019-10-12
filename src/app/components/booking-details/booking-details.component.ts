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
        (response : any) => {

          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          let url = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          a.href = url;
          a.download = bookingId+ ""+new Date();
          a.click();
          window.URL.revokeObjectURL(url);

        }
      );
     
    }
  }

}
