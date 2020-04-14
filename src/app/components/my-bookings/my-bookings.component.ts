import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../login-signup/login/login.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { PreloaderService } from "src/app/shared/preloader.service";
import { MyBookingsService } from "./mybookings.service";
import { DownloadImageService } from "src/app/shared/DownloadImage.service";
// import { ToastService } from "src/app/shared/toast.service";
import { ToastrService } from 'ngx-toastr';
import { feedbackModal } from "../../interfaces/home_formData";

import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { Title, Meta } from "@angular/platform-browser";
@Component({
  selector: "app-my-bookings",
  templateUrl: "./my-bookings.component.html",
  styleUrls: ["./my-bookings.component.css"],
  animations: [
    // the fade-in/fade-out animation.
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(800)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(
        ":leave",
        animate(800, style({ opacity: 0, background: "green" }))
      )
    ])
  ]
})
export class MyBookingsComponent implements OnInit {
  [x: string]: any;
  totalCount: number = 0;
  title: string = "Visa2fly | My Bookings";

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
  public isButtonVisible = false;
  feedbackBookingDetail: Array<any> = [];

  constructor(
    private loginStatus: LoginStatusService,
    private loginService: LoginService,
    private router: Router,
    private preloaderService: PreloaderService,
    private bookingService: MyBookingsService,
    private downloadImageService: DownloadImageService,
    // private toastService: ToastService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private titleService: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute
  ) {
    this.myBookings = [];
    //

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


    // console.log(AUTH_TOKEN);

      if (this.bookingService.allBookings.length > 0) {
      this.bookingsForLoop = [...this.bookingService.allBookings];
      this.totalCount = this.bookingsForLoop.length;
      this.bookings = [...this.bookingService.allBookings];
      this.bookingsForLoop = [...this.bookingService.allBookings];
      // this.bookingService.allBookings = this.allBooking.data.bookings;
      this.filterdDateArr = [...this.bookingService.allBookings];
      // console.log("found bookings in service variable");
    } else {
      this.getAllBookings();
    }
    //end of constructor
  }

  // console.log(this.activePcPageNumber == i);

  // verifyTokenapi(){
  //   let AUTH_TOKEN = this.loginService.getAuthToken();
  //   this.loginStatus.verifyAuthToken(AUTH_TOKEN).subscribe(data => {
  //     if (data.code == "0") {
  //       console.log(data);
  //       this.bookingService.verifytokendetails = data;
  //       setTimeout(() => {
  //         this.preloaderService.showPreloader(false);
  //       }, 4000);
  //       this.getAllBookings();
  //     } else {
  //       this.router.navigate(["/visa"]);
  //     }
  //   });
  // }

  getAllBookings() {
    this.bookingService.getBookingsFromServer().subscribe(res => {
      if(res.code == 0)
      {
      this.allBooking = res;
      this.bookings = this.allBooking.data.bookings;
      this.bookingsForLoop = this.allBooking.data.bookings;
      this.bookingService.allBookings = this.allBooking.data.bookings;
      this.filterdDateArr = this.allBooking.data.bookings;

      if (this.allBooking != null) {
        this.totalCount = this.allBooking.data.bookings.length;

        localStorage.setItem(
          "bookingStatus",
          JSON.stringify(this.allBooking.data.takeFeedback)
        );
        let bookingOption = JSON.parse(localStorage.getItem("bookingStatus"));
        this.bookingStatus = bookingOption;

        setTimeout(() => {
          this.preloaderService.showPreloader(false);
        }, 1000);

        var bookingid = this.allBooking.data.feedbackToBeTakenFor;
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
        let arr1 = [];
        this.bookings.forEach(booking => {
          if (booking.booking.bookingId == bookingid) {
            // console.log("hello");
            arr1.push(booking);
            this.feedbackBookingDetail = arr1;
            // this.isButtonVisible = true;
          }
        });

        this.activeMobileBookingPage = this.myBookingsMobile[0];
      } else {
        this.totalCount = 0;
      }
      }else if(res.code == 301)
      {
        this.router.navigate(["/visa"]);
      }
    });
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

  // @HostListener('click') doSomething(){
  //   this.bookingStatus = false;
  // }

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
      this.toastr.error(
        "Invoice could not be generated as the payment failed."
      );
    }
  }

  setActiveBooking(booking: any) {
    this.bookingService.setActiveBooking(booking);

    localStorage.setItem("activeBooking", JSON.stringify(booking));

    this.router.navigate(["bookingDetail"]);
  }

  onSubmit() {
    var bookingid = this.allBooking.data.feedbackToBeTakenFor;
    // console.log(bookingId);

    let rateOne = this.FeedbackForm.get("f3-rating").value;
    let rateTwo = this.FeedbackForm.get("f1-rating").value;
    let rateThree = this.FeedbackForm.get("f2-rating").value;
    let suggestion = this.FeedbackForm.get("FeedbackEdit").value;
    // console.log(this.FeedbackForm.value);
    let notInterested = false;
    this.bookingService
      .postFeedback(
        bookingid,
        rateOne,
        rateTwo,
        rateThree,
        suggestion,
        notInterested
      )
      .subscribe(res => {
      });
      this.toastr.success("Feedback Submitted");
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
    var searchedBookingsArr = [];
    this.bookingFilterForm.reset();
    this.bookings.forEach(booking => {
      let bookingDate = booking.booking.bookingDate;
      let bookingDateTime = new Date(bookingDate).getTime();
      //  console.log("from date "+fromDateTime);
      //  console.log("booking date "+bookingDateTime);
      //  console.log("to date "+toDateTime);
      if (fromDateTime <= bookingDateTime && bookingDateTime <= toDateTime) {
        searchedBookingsArr.push(booking);
        //  console.log(booking);
        this.toastr.success("Booking find by Date !");
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
      this.toastr.error(
        "Bookings with applied filter not found !"
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
        this.toastr.success("Booking find by ID !");
      }
    });
    if (!found) {
      this.bookingsForLoop = [];
      this.filteredBookingsEmpty = true;
      this.isButtonVisible = true;
      this.toastr.error("Please Check Booking ID !");
    }
  }

  filterBookings() {
    let tempBookingArr = [];
    // this.bookingSearchForm.get("bookingId").setValue("");
    // this.bookingSearchForm.get("fromDate").setValue(null);
    // this.bookingSearchForm.get("toDate").setValue(null);
    // this.bookingFilterForm.reset();
    //  console.log(this.bookingFilterForm.value);
    if (this.filterdDateArr.length !== 0) {
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
    } else {
      this.bookings.forEach(booking => {
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
    }

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
    // this.preloaderService.showPreloader(true);
  }

  closeFeed() {
    var bookingid = this.allBooking.data.feedbackToBeTakenFor;
    // console.log(bookingId);

    let rateOne = this.FeedbackForm.get("f3-rating").value;
    let rateTwo = this.FeedbackForm.get("f1-rating").value;
    let rateThree = this.FeedbackForm.get("f2-rating").value;
    let suggestion = this.FeedbackForm.get("FeedbackEdit").value;
    // console.log(this.FeedbackForm.value);
    let notInterested = true;
    this.bookingService
      .postFeedback(
        bookingid,
        rateOne,
        rateTwo,
        rateThree,
        suggestion,
        notInterested
      )
      .subscribe(res => {
      });
    this.bookingStatus = false;
  }

  clearFilters() {
    this.bookingSearchForm.get("bookingId").setValue("");
    this.bookingSearchForm.get("fromDate").setValue(null);
    this.bookingSearchForm.get("toDate").setValue(null);
    this.bookingFilterForm.reset();
    this.filterdDateArr = [];
    this.bookingsForLoop = this.bookings;
    if (this.bookings.length != 0) {
      this.filteredBookingsEmpty = false;
      this.isButtonVisible = false;
    } else {
      this.filteredBookingsEmpty = true;
    }
  }
}
