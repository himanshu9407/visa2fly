import { Data } from "./../../interfaces/requirement";
import { ActivatedRoute } from "@angular/router";
// import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from "@angular/core";
import { MyBookingsService } from "../my-bookings/mybookings.service";
import { ToastService } from "src/app/shared/toast.service";
import { DownloadImageService } from "src/app/shared/DownloadImage.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { PlatformLocation } from "@angular/common";
import { PreloaderService } from "src/app/shared/preloader.service";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-booking-details",
  templateUrl: "./booking-details.component.html",
  styleUrls: ["./booking-details.component.css"]
})
export class BookingDetailsComponent implements OnInit {
  public url: string;
  selectedBooking: any;
  redirectTo: any;
  bookingStatus: boolean = false;
  title: string = "Visa2fly | Booking Details";
  constructor(
    private myBookingService: MyBookingsService,
    private toastService: ToastService,
    private downloadImageService: DownloadImageService,
    private router: Router,
    private location: PlatformLocation,
    private titleService: Title,
    private meta: Meta,
    // private activatedRoute = ActivateRoute,
    private preloaderService: PreloaderService
  ) {
    this.preloaderService.showPreloader(true);
    let temp = this.myBookingService.getActiveBooking();
    let localStorageBooking = JSON.parse(localStorage.getItem("activeBooking"));
    if (temp == null || temp == undefined) {
      temp = localStorageBooking;
    }
    this.selectedBooking = temp;
    setTimeout(() => {
      this.preloaderService.showPreloader(false);
    }, 2000);
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      }
      // { name: "author", content: "rsgitech" },
      // { name: "robots", content: "index, follow" }
    ]);
  }

  downloadImage(url: string, bookingId: string) {
    if (url == null || url == undefined) {
      this.toastService.showNotification("File not found !", 4000);
    } else {
      this.downloadImageService
        .downloadImageWithUrl(url, bookingId)
        .subscribe((response: any) => {
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          let url = window.URL.createObjectURL(
            new Blob(binaryData, { type: dataType })
          );
          a.href = url;
          a.download = bookingId + "" + new Date();
          a.click();
          window.URL.revokeObjectURL(url);
        });
    }
  }
}
