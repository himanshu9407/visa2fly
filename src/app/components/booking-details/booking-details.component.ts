import { Data } from "./../../interfaces/requirement";
import { ActivatedRoute } from "@angular/router";
// import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from "@angular/core";
import { MyBookingsService } from "../my-bookings/mybookings.service";
// import { ToastService } from "src/app/shared/toast.service";
import { DownloadImageService } from "src/app/shared/DownloadImage.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

import { PlatformLocation } from "@angular/common";
import { PreloaderService } from "src/app/shared/preloader.service";
import { Title, Meta } from "@angular/platform-browser";
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

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
  insuranceDetail: Array<any> = [];
  constructor(
    private myBookingService: MyBookingsService,
    // private toastService: ToastService,
    private toastr: ToastrService,
    private downloadImageService: DownloadImageService,
    private router: Router,
    private location: PlatformLocation,
    private titleService: Title,
    private meta: Meta,
    private userFlow: UserFlowDetails,
    private preloaderService: PreloaderService
  ) {
    this.preloaderService.showPreloader(true);
    let temp = this.myBookingService.getActiveBooking();
    let localStorageBooking = JSON.parse(this.userFlow.getCookie("activeBooking"));
    if (temp == null || temp == undefined) {
      temp = localStorageBooking;
    }
    this.selectedBooking = temp;
    this.insuranceDetail.push(this.selectedBooking.insuranceBookings);
    console.log(this.insuranceDetail);
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
      this.toastr.error("File not found !");
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

  downloadPolicy(policyNumber: string, bookingStatus: string, bookingId: string) {
    //   if (bookingStatus == "g") {
    //     this.downloadImageService
    //       .downloadPolicy(policyNumber)
    //       .subscribe((response: any) => {
    //         // console.log(response);
    //         let dataType = response.type;
    //         let binaryData = [];
    //         binaryData.push(response);
    //         var a = document.createElement("a");
    //         document.body.appendChild(a);
    //         a.style.display = "none";
    //         let url = window.URL.createObjectURL(
    //           new Blob(binaryData, { type: dataType })
    //         );
    //         a.href = url;
    //         a.download = "Invoice" + policyNumber;
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //       });
    //   } else {
    //     this.toastr.error(
    //       "Policy could not be generated as the payment failed."
    //     );
    //   }

    this.downloadImageService
      .getPolicy(policyNumber)
      .subscribe((res: any) => {
        console.log(res);
        if (res.code == "0") {
          this.downloadImageService.downloadPolicy(bookingId).subscribe((response: any) => {
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
            a.download = "Invoice" + policyNumber;
            a.click();
            window.URL.revokeObjectURL(url);
          });
        } else {
          this.toastr.error(res.message);
        }
      });
  }

  downloadEvisa(bookingId: string, bookingFrom: string) {
    document.getElementById('evisa_download').classList.add('progress_loader');
    this.myBookingService.getCreateEvisaFromServicer(bookingId, bookingFrom).
      subscribe(res => {
        if (res.data.evisaFound) {
          this.myBookingService.getEvisaFromServicer(bookingId, bookingFrom)
            .subscribe((response: any) => {
              document.getElementById('evisa_download').classList.remove('progress_loader');
              let dataType = response.type;
              let binaryData = [];
              binaryData.push(response);
              var a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              let url = window.URL.createObjectURL(
                new Blob(binaryData, { type: 'application/pdf' })
              );
              a.href = url;
              a.download = bookingId + " " + "evisa";
              a.click();
              window.URL.revokeObjectURL(url);
            }, err => {
              document.getElementById('evisa_download').classList.remove('progress_loader');
            })
        } else {
          this.toastr.error(res.message);
          document.getElementById('evisa_download').classList.remove('progress_loader');
        }
      }, err => {
        document.getElementById('evisa_download').classList.remove('progress_loader');
      });

  }
}
