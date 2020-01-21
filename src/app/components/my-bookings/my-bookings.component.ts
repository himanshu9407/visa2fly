import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../login-signup/login/login.service";
import { Router } from "@angular/router";
import { PreloaderService } from "src/app/shared/preloader.service";
import { MyBookingsService } from "./mybookings.service";
import { DownloadImageService } from "src/app/shared/DownloadImage.service";
import { ToastService } from "src/app/shared/toast.service";
import { feedbackModal } from "../../interfaces/home_formData";
@Component({
  selector: "app-my-bookings",
  templateUrl: "./my-bookings.component.html",
  styleUrls: ["./my-bookings.component.css"]
})
export class MyBookingsComponent implements OnInit {
  totalCount: number = 0;

  myBookings: Array<any> = [];
  myBookingsPc: Array<any> = [];
  myBookingsMobile: Array<any> = [];
  activePcBookingPage: Array<any> = [];
  bookings = [];
  bookingsForLoop = [];
  filter: any;
  searchBy = "byDate";
  maxDate: { year: number; month: number; day: number };
  minDate: { year: any; month: number; day: number };
  minDateOfTo: { year: any; month: any; day: any };

  activePcPageNumber: number = 0;
  activeMobilePageNumber: number = 0;
  activeMobileBookingPage: Array<any> = [];
  public allBooking: any;
  AUTH_TOKEN = "";

  public bookingData: any;
  bookingStatus: boolean = false;
  FeedbackForm: FormGroup;
  bookingSearchForm: FormGroup;
  bookingFilterForm: FormGroup;
  filteredBookingsEmpty: boolean = false;
  filterdDateArr = [];
  private isButtonVisible = false;

  constructor(
    private loginStatus: LoginStatusService,
    private loginService: LoginService,
    private router: Router,
    private preloaderService: PreloaderService,
    private bookingService: MyBookingsService,
    private downloadImageService: DownloadImageService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.myBookings = [];
    this.preloaderService.showPreloader(true);

    var bookingIdC;

    this.FeedbackForm = new FormGroup({
      "f3-rating": new FormControl(null),
      "f1-rating": new FormControl(null),
      "f2-rating": new FormControl(null),
      FeedbackEdit: new FormControl(null)
    });

    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    this.bookingSearchForm = new FormGroup({
      searchBy: new FormControl("byDate"),
      fromDate: new FormControl(null),
      toDate: new FormControl(null),
      bookingId: new FormControl("")
    });

    this.bookingFilterForm = new FormGroup({
      visa: new FormControl(false),
      sim: new FormControl(false),
      insurance: new FormControl(false)
    });

    this.AUTH_TOKEN = this.loginService.getAuthToken();

    this.loginStatus.verifyAuthToken(this.AUTH_TOKEN).subscribe((data: any) => {
      if (data.code == "0") {
        this.bookingService.getBookingsFromServer().subscribe(res => {
          this.allBooking = res;
          this.bookings = this.allBooking.data.bookings;
          this.bookingsForLoop = this.allBooking.data.bookings;
          this.filterdDateArr = this.allBooking.data.bookings;
        
          if (this.allBooking != null) {
            this.totalCount = this.allBooking.data.bookings.length;

            localStorage.setItem(
              "bookingStatus",
              JSON.stringify(this.allBooking.data.takeFeedback)
            );

            setTimeout(() => {
              this.preloaderService.showPreloader(false);
            }, 1000);

            //  bookingIdC= localStorage.getItem('bookingStatus');
            // this.bookingStatus = bookingIdC;
            this.allBooking.data.bookings.forEach(element => {
              if (
                element.booking.bookingStatus == "Sim order confirmed" ||
                element.booking.bookingStatus == "Payment completed" ||
                element.booking.bookingStatus == "Visa application approved"
              ) {
                element.booking.statusColor = "g";
              } else if (
                (element.booking.bookingStatus =
                  "Payment failed" ||
                  element.booking.bookingStatus == "Visa application rejected")
              ) {
                element.booking.statusColor = "r";
              } else {
                element.booking.statusColor = "y";
              }
              if (element.booking.paymentStatus == "Payment completed") {
                element.booking.paymentColor = "g";
              } else if (element.booking.paymentStatus == "Payment completed") {
                element.booking.paymentColor = "g";
              } else {
                element.booking.paymentColor = "y";
              }
            });

            this.activeMobileBookingPage = this.myBookingsMobile[0];
          } else {
            this.totalCount = 0;
          }
        });
      } else {
        this.router.navigate(["/visa"]);
      }
    });

    //end of constructor
  }

  // console.log(this.activePcPageNumber == i);

  ngOnInit() {}

  fromDateChanged() {
    this.minDateOfTo = this.bookingSearchForm.get("fromDate").value;
  }

  downloadInvoice(bookingId: string, bookingStatus: string) {
    // console.log("invoice called");
    if (bookingStatus == "g") {
      this.downloadImageService
        .downloadInvoice(bookingId)
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
          a.download = "Invoice" + bookingId;
          a.click();
          window.URL.revokeObjectURL(url);
        });
    } else {
      this.toastService.showNotification(
        "Invoice could not be generated as the payment failed.",
        4000
      );
    }
  }

  setActiveBooking(booking: any) {
    this.bookingService.setActiveBooking(booking);

    localStorage.setItem("activeBooking", JSON.stringify(booking));

    this.router.navigate(["bookingDetail"]);
  }

  onSubmit() {
    var bookingId = this.allBooking.data.feedbackToBeTakenFor;
    // console.log(bookingId);

    let product = this.FeedbackForm.get("f3-rating").value;
    let info = this.FeedbackForm.get("f1-rating").value;
    let recommend = this.FeedbackForm.get("f2-rating").value;
    let userFeedback = this.FeedbackForm.get("FeedbackEdit").value;
    // console.log(this.FeedbackForm.value);

    this.bookingService
      .postFeedback(bookingId, product, info, recommend, userFeedback)
      .subscribe(res => {
        // this.toastService.showNotification("Feedback Submitted", 1000);
      });
    this.toastService.showNotification("Feedback Submitted", 2000);
    this.bookingStatus = false;
  }

  smoothScrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  searchBookingsByDate() {
    let toDate = this.bookingSearchForm.get("toDate").value;
    toDate = [
      toDate.year,
      toDate.month < 10 ? "0" + toDate.month : toDate.month,
      toDate.day < 10 ? "0" + toDate.day : toDate.day
    ].join("-");

    let fromDate = this.bookingSearchForm.get("fromDate").value;
    fromDate = [
      fromDate.year,
      fromDate.month < 10 ? "0" + fromDate.month : fromDate.month,
      fromDate.day < 10 ? "0" + fromDate.day : fromDate.day
    ].join("-");

    let toDateCmp = new Date(toDate);
    let toDateTime = toDateCmp.getTime();
    let fromDateCmp = new Date(fromDate);
    let fromDateTime = fromDateCmp.getTime();
    let searchedBookingsArr = [];

    this.bookings.forEach(booking => {
      let bookingDate = booking.booking.bookingDate;
      let bookingDateTime = new Date(bookingDate).getTime();
      //  console.log("from date "+fromDateTime);
      //  console.log("booking date "+bookingDateTime);
      //  console.log("to date "+toDateTime);
      if (fromDateTime <= bookingDateTime && bookingDateTime <= toDateTime) {
        searchedBookingsArr.push(booking);
        //  console.log(booking);
      } else {
        //  console.log("sadsa");
      }
    });

    //  console.log(searchedBookingsArr);

    this.bookingsForLoop = searchedBookingsArr;
    this.filterdDateArr = searchedBookingsArr;

    if (
      this.bookingsForLoop == undefined ||
      this.bookingsForLoop == null ||
      this.bookingsForLoop.length == 0
    ) {
      this.filteredBookingsEmpty = true;
      this.toastService.showNotification(
        "Bookings with applied filter not found !",
        10000
      );
    } else {
      this.filteredBookingsEmpty = false;
    }

    // console.log(this.bookingSearchForm.value);
  }
  searchBookingsByBookingId() {
    let bookingId = this.bookingSearchForm.get("bookingId").value;
    // console.log(bookingId);
    let arr = [];
    let found = false;

    this.bookings.forEach(booking => {
      if (booking.booking.bookingId == bookingId) {
        // console.log("hello");
        arr.push(booking);
        this.bookingsForLoop = arr;
        found = true;
        this.isButtonVisible = true;
      }
    });
    if (!found) {
      this.bookingsForLoop = [];
      this.filteredBookingsEmpty = true;
      this.isButtonVisible = true;
    }
  }

  filterBookings() {
    let tempBookingArr = [];

    //  console.log(this.bookingFilterForm.value);

    this.filterdDateArr.forEach(booking => {
      let bookingType = booking.booking.bookingType;

      if (this.bookingFilterForm.get("visa").value == true) {
        if (bookingType == "Visa") {
          tempBookingArr.push(booking);
        }
      }

      if (this.bookingFilterForm.get("sim").value == true) {
        if (bookingType == "Sim") {
          tempBookingArr.push(booking);
        }
      }

      if (this.bookingFilterForm.get("insurance").value == true) {
        if (bookingType == "Insurance") {
          tempBookingArr.push(booking);
        }
      }
    });

    this.bookingsForLoop = tempBookingArr;

    if (this.bookingsForLoop.length == 0) {
      this.filteredBookingsEmpty = true;
    } else {
      this.filteredBookingsEmpty = false;
    }
  }

  seeBooking() {
    //  console.log('seeBooking');
    this.bookingFilterForm.reset();
    //  this.bookingSearchForm.reset();
    this.bookingSearchForm.get("fromDate").setValue(null);
    this.bookingSearchForm.get("toDate").setValue(null);
    this.bookingSearchForm.get("bookingId").setValue("");
    this.bookingsForLoop = this.bookings;
    this.filteredBookingsEmpty = false;
  }

  closeFeed() {
    this.bookingStatus = false;
  }

  clearFilters() {
    this.bookingSearchForm.get("bookingId").setValue("");
    this.bookingSearchForm.get("fromDate").setValue(null);
    this.bookingSearchForm.get("toDate").setValue(null);
    this.bookingFilterForm.reset();

    this.bookingsForLoop = this.bookings;
    if (this.bookings.length != 0) {
      this.filteredBookingsEmpty = false;
      this.isButtonVisible = false;
    } else {
      this.filteredBookingsEmpty = true;
    }
  }
}
