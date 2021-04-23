import {
  FormGroup,
  FormControl, Validators
} from "@angular/forms";
import { Component, OnInit, ViewChild, HostListener, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router, RouterStateSnapshot, RoutesRecognized } from "@angular/router";
import { PreloaderService } from "src/app/shared/preloader.service";
import { MyBookingsService } from "./mybookings.service";
import { DownloadImageService } from "src/app/shared/DownloadImage.service";
import { ToastrService } from "ngx-toastr";

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Title, Meta } from "@angular/platform-browser";
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { Subscription } from "rxjs";
@Component({
  selector: "app-my-bookings",
  templateUrl: "./my-bookings.component.html",
  styleUrls: ["./my-bookings.component.css"],
  animations: [
    trigger("simpleFadeAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(800)]),
      transition(
        ":leave",
        animate(800, style({ opacity: 0, background: "green" }))
      ),
    ]),
  ],
})
export class MyBookingsComponent implements OnInit, OnDestroy {
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
  feedbackMsg: boolean;
  public bookingData: any;
  bookingStatus: boolean = false;
  feedbackForm: FormGroup;
  bookingSearchForm: FormGroup;
  bookingFilterForm: FormGroup;
  filteredBookingsEmpty: boolean = false;
  filterdDateArr = [];
  public isButtonVisible = false;
  feedbackBookingDetail: Array<any> = [];
  totalItems: number;
  currentPage1: number;
  currentPage2: number;
  scrollBy: number = 0;
  bookingIdInputError: boolean = false;
  route_subcription: Subscription;
  currentPageIndex: number;
  currentPageSize: number;
  bookingFindByFilter: Array<any> = [];
  fromDate: boolean = false;
  toDate: boolean = false;
  errorDisplayedByDeskstop: boolean = false;
  errorDisplayedByMobile: boolean = false;
  display='none'; //default Variable

  constructor(
    private router: Router,
    private preloaderService: PreloaderService,
    private bookingService: MyBookingsService,
    private downloadImageService: DownloadImageService,
    private toastr: ToastrService,
    private titleService: Title,
    private meta: Meta,
    private userflow: UserFlowDetails,
    private activatedRoute: ActivatedRoute
  ) {
    this.myBookings = [];

      if (screen.width >= 767) {
        this.currentPageSize = 6;
        this.errorDisplayedByDeskstop = true;
        this.errorDisplayedByMobile = false;
      } else {
        this.currentPageSize = 4;
        this.errorDisplayedByMobile = true;
        this.errorDisplayedByDeskstop = false;
      }

    this.feedbackForm = new FormGroup({
      "f3-rating": new FormControl(null, Validators.required),
      "f1-rating": new FormControl(null, Validators.required),
      "f2-rating": new FormControl(null, Validators.required),
      FeedbackEdit: new FormControl(null, Validators.required),
    });

    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };

    this.bookingSearchForm = new FormGroup({
      searchBy: new FormControl("byDate"),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl({value : '' , disabled: true}, Validators.required),
      bookingId: new FormControl('', [Validators.required]),
    });

    this.bookingFilterForm = new FormGroup({
      visa: new FormControl(false),
      sim: new FormControl(false),
      insurance: new FormControl(false),
    });

    if (this.bookingService.allBookings.length > 0) {
      this.bookingsForLoop = [...this.bookingService.allBookings];
      this.totalCount = this.bookingsForLoop.length;
      this.currentPage1 = this.bookingService.currentPage1;
      this.currentPage2 = this.bookingService.currentPage2;
      this.bookings = [...this.bookingService.allBookings];
      this.bookingsForLoop = [...this.bookingService.allBookings];
      // console.log(this.bookingService.searchBy);
      if(this.bookingService.searchBy === null && this.bookingService.searchBy === undefined) {
        this.bookingSearchForm.get('searchBy').setValue('byDate');
      } else {
        this.bookingSearchForm.get('searchBy').setValue(this.bookingService.searchBy);
      }

      if(this.bookingService.fromDate === null || this.bookingService.fromDate === undefined) {
        this.bookingSearchForm.get('fromDate').setValue('');
        this.bookingSearchForm.get('toDate').disable();
      } else {
        this.bookingSearchForm.get('fromDate').setValue(bookingService.fromDate);
      }

      if(this.bookingService.toDate === null || this.bookingService.toDate === undefined) {
        this.bookingSearchForm.get('toDate').setValue('');
      } else {
        this.bookingSearchForm.get('toDate').enable();
        this.bookingSearchForm.get('toDate').setValue(bookingService.toDate);
      }

      if(this.bookingService.bookingID === null || this.bookingService.bookingID === undefined) {
        this.bookingSearchForm.get('bookingId').setValue('');
      } else {
        this.bookingSearchForm.get('bookingId').setValue(this.bookingService.bookingID);
      }

      if(this.bookingService.visa === null || this.bookingService.visa === undefined) {
        this.bookingFilterForm.get('visa').setValue(false);
      } else {
        this.bookingFilterForm.get('visa').setValue(true);
      }

      if(this.bookingService.sim === null || this.bookingService.sim === undefined) {
        this.bookingFilterForm.get('sim').setValue(false);
      } else {
        this.bookingFilterForm.get('sim').setValue(true);
      }

      if(this.bookingService.insurance === null || this.bookingService.insurance === undefined) {
        this.bookingFilterForm.get('insurance').setValue(false);
      } else {
        this.bookingFilterForm.get('insurance').setValue(true);
      }
      this.totalItems = this.bookingService.totalItems;
    } else {
      this.currentPageIndex = 1;
      this.getAllBookings(this.currentPageIndex, this.currentPageSize);
    }
  }

  ngOnDestroy(): void {
    if (this.route_subcription) {
      this.route_subcription.unsubscribe();
    }
  }

  desktopBooking(event: number) {
    // console.log(event);
    this.currentPage1 = event;
    // console.log(this.currentPage1);
    this.bookingService.currentPage1 = this.currentPage1;
    let pageSize = 6;
    if(this.bookingSearchForm.get('fromDate').pristine && this.bookingSearchForm.get('fromDate').invalid
    || this.bookingSearchForm.get('toDate').pristine && this.bookingSearchForm.get('toDate').invalid) {
      this.getAllBookings(this.currentPage1, pageSize);
      let topPicker: number;
      if (window.innerWidth > 600) {
        topPicker = 250;
      } else {
        topPicker = 550;
      }
      window.scrollTo({
        top: topPicker + this.scrollBy,
        left: 0,
        behavior: "smooth",
      });
    } else {
      let toDate = this.bookingSearchForm.get("toDate").value;
      this.bookingService.toDate = toDate;
      toDate = [
        toDate.year,
        toDate.month < 10 ? "0" + toDate.month : toDate.month,
        toDate.day < 10 ? "0" + toDate.day : toDate.day,
      ].join("-");

      let fromDate = this.bookingSearchForm.get("fromDate").value;
      this.bookingService.fromDate = fromDate;
      fromDate = [
        fromDate.year,
        fromDate.month < 10 ? "0" + fromDate.month : fromDate.month,
        fromDate.day < 10 ? "0" + fromDate.day : fromDate.day,
      ].join("-");

      let visa = this.bookingFilterForm.get("visa").value;
      let sim = this.bookingFilterForm.get("sim").value;
      let insurance = this.bookingFilterForm.get("insurance").value;

      if(visa === true) {
        this.bookingFindByFilter.push('Visa');
        this.bookingService.visa = 'visa';
      }

      if(sim === true) {
        this.bookingFindByFilter.push('Sim');
        this.bookingService.sim = 'sim';
      }

      if(insurance === true) {
        this.bookingFindByFilter.push('Insurance');
        this.bookingService.insurance = 'insurance'
      }

      if(this.bookingFindByFilter.length > 0) {
        this.bookingService.
        postBookingFindByFilter(fromDate, toDate, this.currentPage1,
        pageSize, this.bookingFindByFilter).subscribe(data => {
          if(data.code === "0") {
            this.allBooking = data;
            this.bookingsForLoop = [...data.data.bookings];
            this.bookingService.allBookings = data.data.bookings;
            this.totalItems = data.data.totalNumberOfBookings;
            this.bookingService.totalItems = this.totalItems;
            this.display = 'none';
            this.filteredBookingsEmpty = false;
            // console.log(this.bookingsForLoop);
            this.allBooking.data.bookings.forEach((element) => {
              if (
                element.booking.bookingStatus == "Sim order confirmed" ||
                element.booking.bookingStatus == "Payment completed" ||
                element.booking.bookingStatus == "Visa application approved" ||
                element.booking.bookingStatus == "Insurance policy generated"
              ) {
                element.booking.statusColor = "g";
              } else if (
                element.booking.bookingStatus == "Payment failed" ||
                element.booking.bookingStatus == "Visa application rejected"
              ) {
                element.booking.statusColor = "r";
              } else {
                element.booking.statusColor = "y";
              }

              if (element.booking.paymentStatus == "Payment completed") {
                element.booking.paymentColor = "g";
              } else {
                element.booking.paymentColor = "y";
              }
            });
            let topPicker: number;
            if (window.innerWidth > 600) {
              topPicker = 250;
            } else {
              topPicker = 550;
            }
            window.scrollTo({
              top: topPicker + this.scrollBy,
              left: 0,
              behavior: "smooth",
            });
          } else {
            // this.totalCount = 0;
            let topPicker: number;
            if (window.innerWidth > 600) {
              topPicker = 250;
            } else {
              topPicker = 550;
            }
            window.scrollTo({
              top: topPicker + this.scrollBy,
              left: 0,
              behavior: "smooth",
            });
            this.display = 'none';
            this.totalItems = 0;
            this.bookingsForLoop = [];
            this.filteredBookingsEmpty = true;
            this.toastr.error(data.message);
          }
        });
        this.bookingFindByFilter = [];
      } else {
        this.bookingService.postBookingsByDateFromServer(fromDate, toDate, this.currentPage1, pageSize).subscribe(res => {
          if(res.code === '0')
          {
            this.allBooking = res;
            this.bookingsForLoop = this.allBooking.data.bookings;
            this.bookingService.allBookings = this.allBooking.data.bookings;
            this.totalItems = this.allBooking.data.totalNumberOfBookings;
            this.bookingService.totalItems = this.totalItems;

            if (this.allBooking != null) {
              this.totalCount = this.allBooking.data.bookings.length;
            }

            this.allBooking.data.bookings.forEach((element) => {
              if (
                element.booking.bookingStatus == "Sim order confirmed" ||
                element.booking.bookingStatus == "Payment completed" ||
                element.booking.bookingStatus == "Visa application approved" ||
                element.booking.bookingStatus == "Insurance policy generated"
              ) {
                element.booking.statusColor = "g";
              } else if (
                element.booking.bookingStatus == "Payment failed" ||
                element.booking.bookingStatus == "Visa application rejected"
              ) {
                element.booking.statusColor = "r";
              } else {
                element.booking.statusColor = "y";
              }

              if (element.booking.paymentStatus == "Payment completed") {
                element.booking.paymentColor = "g";
              } else {
                element.booking.paymentColor = "y";
              }

              // console.log('  ');
              // console.log(element.booking.paymentStatus)
              // console.log(element.booking.paymentColor)
            });
            this.toastr.success("Booking find by Date !");
            let topPicker: number;
            if (window.innerWidth > 600) {
              topPicker = 250;
            } else {
              topPicker = 550;
            }
            window.scrollTo({
              top: topPicker + this.scrollBy,
              left: 0,
              behavior: "smooth",
            });
            // console.log(res);
          } else {
            this.totalCount = 0;
            this.toastr.error(res.message);
            let topPicker: number;
            if (window.innerWidth > 600) {
              topPicker = 250;
            } else {
              topPicker = 550;
            }
            window.scrollTo({
              top: topPicker + this.scrollBy,
              left: 0,
              behavior: "smooth",
            });
          }
        })
      }
    }



  }

  mobileBooking(event: number) {
    this.currentPage2 = event;
    let pageSize = 4;
    this.bookingService.currentPage2 = this.currentPage2;
    if(this.bookingSearchForm.get('fromDate').pristine && this.bookingSearchForm.get('fromDate').invalid
    || this.bookingSearchForm.get('toDate').pristine && this.bookingSearchForm.get('toDate').invalid)
    {
      this.getAllBookings(this.currentPage2, pageSize);
    } else {
      let toDate = this.bookingSearchForm.get("toDate").value;
      this.bookingService.toDate = toDate;
      toDate = [
        toDate.year,
        toDate.month < 10 ? "0" + toDate.month : toDate.month,
        toDate.day < 10 ? "0" + toDate.day : toDate.day,
      ].join("-");

      let fromDate = this.bookingSearchForm.get("fromDate").value;
      this.bookingService.fromDate = fromDate;
      fromDate = [
        fromDate.year,
        fromDate.month < 10 ? "0" + fromDate.month : fromDate.month,
        fromDate.day < 10 ? "0" + fromDate.day : fromDate.day,
      ].join("-");

      let visa = this.bookingFilterForm.get("visa").value;
      let sim = this.bookingFilterForm.get("sim").value;
      let insurance = this.bookingFilterForm.get("insurance").value;

      if(visa === true) {
      this.bookingFindByFilter.push('Visa');
      this.bookingService.visa = 'visa';
      }

      if(sim === true) {
        this.bookingFindByFilter.push('Sim');
        this.bookingService.sim = 'sim';
      }

      if(insurance === true) {
        this.bookingFindByFilter.push('Insurance');
        this.bookingService.insurance = 'insurance'
      }

      if(this.bookingFindByFilter.length > 0) {
        this.bookingService.
        postBookingFindByFilter(fromDate, toDate, this.currentPage2,
        pageSize, this.bookingFindByFilter).subscribe(data => {
          if(data.code === "0") {
            this.allBooking = data;
            this.bookingsForLoop = [...data.data.bookings];
            this.bookingService.allBookings = data.data.bookings;
            this.totalItems = data.data.totalNumberOfBookings;
            this.bookingService.totalItems = this.totalItems;
            this.display = 'none';
            this.filteredBookingsEmpty = false;
            // console.log(this.bookingsForLoop);
            this.allBooking.data.bookings.forEach((element) => {
              if (
                element.booking.bookingStatus == "Sim order confirmed" ||
                element.booking.bookingStatus == "Payment completed" ||
                element.booking.bookingStatus == "Visa application approved" ||
                element.booking.bookingStatus == "Insurance policy generated"
              ) {
                element.booking.statusColor = "g";
              } else if (
                element.booking.bookingStatus == "Payment failed" ||
                element.booking.bookingStatus == "Visa application rejected"
              ) {
                element.booking.statusColor = "r";
              } else {
                element.booking.statusColor = "y";
              }

              if (element.booking.paymentStatus == "Payment completed") {
                element.booking.paymentColor = "g";
              } else {
                element.booking.paymentColor = "y";
              }
            });
            let topPicker: number;
            if (window.innerWidth > 600) {
              topPicker = 150;
            } else {
              topPicker = 450;
            }
            window.scrollTo({
              top: topPicker + this.scrollBy,
              left: 0,
              behavior: "smooth",
            });
          } else {
            // this.totalCount = 0;
            let topPicker: number;
            if (window.innerWidth > 600) {
              topPicker = 150;
            } else {
              topPicker = 450;
            }
            window.scrollTo({
              top: topPicker + this.scrollBy,
              left: 0,
              behavior: "smooth",
            });
            this.display = 'none';
            this.totalItems = 0;
            this.bookingsForLoop = [];
            this.filteredBookingsEmpty = true;
            this.toastr.error(data.message);
          }
        });
        this.bookingFindByFilter = [];
      } else {
        this.bookingService.postBookingsByDateFromServer(fromDate, toDate, this.currentPage2, pageSize).subscribe(res => {
          if(res.code === '0')
          {
            this.allBooking = res;
            this.bookingsForLoop = this.allBooking.data.bookings;
            this.bookingService.allBookings = this.allBooking.data.bookings;
            this.totalItems = this.allBooking.data.totalNumberOfBookings;
            this.bookingService.totalItems = this.totalItems;

            if (this.allBooking != null) {
              this.totalCount = this.allBooking.data.bookings.length;
            }

            this.allBooking.data.bookings.forEach((element) => {
              if (
                element.booking.bookingStatus == "Sim order confirmed" ||
                element.booking.bookingStatus == "Payment completed" ||
                element.booking.bookingStatus == "Visa application approved" ||
                element.booking.bookingStatus == "Insurance policy generated"
              ) {
                element.booking.statusColor = "g";
              } else if (
                element.booking.bookingStatus == "Payment failed" ||
                element.booking.bookingStatus == "Visa application rejected"
              ) {
                element.booking.statusColor = "r";
              } else {
                element.booking.statusColor = "y";
              }

              if (element.booking.paymentStatus == "Payment completed") {
                element.booking.paymentColor = "g";
              } else {
                element.booking.paymentColor = "y";
              }

              // console.log('  ');
              // console.log(element.booking.paymentStatus)
              // console.log(element.booking.paymentColor)
            });
            this.toastr.success("Booking find by Date !");
            let topPicker: number;
            if (window.innerWidth > 600) {
              topPicker = 150;
            } else {
              topPicker = 450;
            }
            window.scrollTo({
              top: topPicker + this.scrollBy,
              left: 0,
              behavior: "smooth",
            });
            // console.log(res);
          } else {
            this.totalCount = 0;
            this.toastr.error(res.message);
            let topPicker: number;
              if (window.innerWidth > 600) {
                topPicker = 150;
              } else {
                topPicker = 450;
              }
              window.scrollTo({
                top: topPicker + this.scrollBy,
                left: 0,
                behavior: "smooth",
              });
            }
        })
      }

    }


  }

  getAllBookings(pageNo: number, pageSize: number) {
    let searchBy = this.bookingSearchForm.get('searchBy').value;
    this.bookingService.searchBy = searchBy;
    this.bookingService.fetchBooking(pageNo, pageSize).subscribe((res) => {
      if (res.code === '0') {
        this.allBooking = res;

        this.bookings = this.allBooking.data.bookings;
        this.bookingsForLoop = this.allBooking.data.bookings;
        this.bookingService.allBookings = this.allBooking.data.bookings;
        this.bookingService.currentPage1 = pageNo;
        this.bookingService.currentPage2 = pageNo;
        // this.filterdDateArr = this.allBooking.data.bookings;
        this.totalItems = res.data.totalNumberOfBookings;
        this.bookingService.totalItems = this.totalItems;


        if (this.allBooking != null) {
          this.totalCount = this.allBooking.data.bookings.length;
          // console.log(res);

          if (this.allBooking.data.takeFeedback) {
            this.userflow.setCookie("bookingStatus", JSON.stringify("true"));

            setTimeout(() => {
              this.bookingStatus = JSON.parse(
                this.userflow.getCookie("bookingStatus")
              );
            }, 15000);
          }

          setTimeout(() => {
            this.preloaderService.showPreloader(false);
          }, 1000);

          var bookingid = this.allBooking.data.feedbackToBeTakenFor;

          this.allBooking.data.bookings.forEach((element) => {
            if (
              element.booking.bookingStatus == "Sim order confirmed" ||
              element.booking.bookingStatus == "Payment completed" ||
              element.booking.bookingStatus == "Visa application approved" ||
              element.booking.bookingStatus == "Insurance policy generated"
            ) {
              element.booking.statusColor = "g";
            } else if (
              element.booking.bookingStatus == "Payment failed" ||
              element.booking.bookingStatus == "Visa application rejected"
            ) {
              element.booking.statusColor = "r";
            } else {
              element.booking.statusColor = "y";
            }

            if (element.booking.paymentStatus == "Payment completed") {
              element.booking.paymentColor = "g";
            } else {
              element.booking.paymentColor = "y";
            }

            // console.log('  ');
            // console.log(element.booking.paymentStatus)
            // console.log(element.booking.paymentColor)
          });
          let arr1 = [];
          this.bookings.forEach((booking) => {
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
      } else if (res.code == 301) {
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
        content: "",
      },
    ]);
  }

  fromDateChanged() {
    this.minDateOfTo = this.bookingSearchForm.get("fromDate").value;
    this.bookingSearchForm.get('toDate').enable();
  }

  downloadInvoice(bookingId: string, bookingStatus: string) {
    if (bookingStatus == "g") {
      this.downloadImageService.createDownloadInvoice(bookingId).subscribe((res: any) => {
        if(res.code === "0") {
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
        }
      })
    } else {
      this.toastr.error(
        "Invoice could not be generated as the payment failed."
      );
    }
  }

  downloadPolicy(policyNumber: string, bookingStatus: string, bookingId: string) {
    // console.log(policyNumber);
    // if (bookingStatus == "y") {
    //   this.downloadImageService
    //     .getPolicy(policyNumber)
    //     .subscribe((res: any) => {
    //       console.log(res);
    //       if (res.code == "0") {
    //         this.downloadImageService.downloadPolicy(bookingId).subscribe((response: any) => {
    //           let dataType = response.type;
    //           let binaryData = [];
    //           binaryData.push(response);
    //           var a = document.createElement("a");
    //           document.body.appendChild(a);
    //           a.style.display = "none";
    //           let url = window.URL.createObjectURL(
    //             new Blob(binaryData, { type: dataType })
    //           );
    //           a.href = url;
    //           a.download = "Invoice" + policyNumber;
    //           a.click();
    //           window.URL.revokeObjectURL(url);
    //         });
    //       } else {
    //         this.toastr.error(res.message);
    //       }
    //     });
    // } else {
    //   console.log(bookingStatus);
    //   this.toastr.error(
    //     "Policy could not be generated as the payment failed."
    //   );
    // }

    this.downloadImageService
      .getPolicy(policyNumber)
      .subscribe((res: any) => {
        // console.log(res);
        if (res.code === "0") {
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

  setActiveBooking(booking: any) {
    if (screen.width >= 767) {
      booking.lastPageDetail = {
        pageNo: this.currentPage1,
        pageSize: 6
      };
    } else {
      booking.lastPageDetail = {
        pageNo: this.currentPage2,
        pageSize: 4
      }
    }

    this.userflow.setCookie("activeBooking", JSON.stringify(booking));

    console.log(booking);

    this.bookingService.setActiveBooking(booking);

    this.router.navigate(["/bookingDetail"]);

  }

  onSubmit() {
    var bookingid = this.allBooking.data.feedbackToBeTakenFor;
    let rateOne = this.feedbackForm.get("f3-rating").value;
    let rateTwo = this.feedbackForm.get("f1-rating").value;
    let rateThree = this.feedbackForm.get("f2-rating").value;
    let suggestion = this.feedbackForm.get("FeedbackEdit").value;
    let notInterested = false;

    if (this.feedbackForm.get("f3-rating").value == null
      || this.feedbackForm.get("f1-rating").value == null
      || this.feedbackForm.get("f2-rating").value == null) {
      this.feedbackMsg = true;
      this.toastr.error("Please fill the feedback form!");
    } else {

      this.bookingService
        .postFeedback(
          bookingid,
          rateOne,
          rateTwo,
          rateThree,
          suggestion,
          notInterested
        )
        .subscribe((res) => { });
      this.toastr.success("Feedback Submitted");
      this.bookingStatus = false;
    }
  }

  smoothScrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  searchBookingsByDate() {
    let searchBy = this.bookingSearchForm.get('searchBy').value;
    this.bookingFilterForm.get('visa').setValue('');
    this.bookingFilterForm.get('sim').setValue('');
    this.bookingFilterForm.get('insurance').setValue('');
    this.bookingService.searchBy = searchBy;
    if(this.bookingSearchForm.get('fromDate').invalid && this.bookingSearchForm.get('fromDate').pristine
    || this.bookingSearchForm.get('toDate').invalid && this.bookingSearchForm.get('toDate').pristine) {
      if (screen.width >= 767) {
        this.errorDisplayedByDeskstop = true;
        this.errorDisplayedByMobile = false;
      } else {
        this.errorDisplayedByMobile = true;
        this.errorDisplayedByDeskstop = false;
      }
      this.fromDate = true;
      this.toDate = true;
      console.log("Himanshu");
    } else if(this.bookingSearchForm.get('fromDate').value != null && this.bookingSearchForm.get('toDate').value != null) {
    let toDate = this.bookingSearchForm.get("toDate").value;
    this.bookingService.toDate = toDate;
    toDate = [
      toDate.year,
      toDate.month < 10 ? "0" + toDate.month : toDate.month,
      toDate.day < 10 ? "0" + toDate.day : toDate.day,
    ].join("-");

    let fromDate = this.bookingSearchForm.get("fromDate").value;
    this.bookingService.fromDate = fromDate;
    fromDate = [
      fromDate.year,
      fromDate.month < 10 ? "0" + fromDate.month : fromDate.month,
      fromDate.day < 10 ? "0" + fromDate.day : fromDate.day,
    ].join("-");

    if (screen.width >= 767) {
      this.currentPageSize = 6;
    } else {
      this.currentPageSize = 4;
    }
    this.currentPage1 = 1;
    this.currentPage2 = 1;
    this.bookingService.currentPage1 = this.currentPage1;
    this.bookingService.currentPage2 = this.currentPage2;
    // this.currentPageSize = 6;

    this.bookingService.postBookingsByDateFromServer(fromDate, toDate, this.currentPage1, this.currentPageSize).subscribe(res => {
      if(res.code === '0')
      {
        this.allBooking = res;
        this.bookingsForLoop = this.allBooking.data.bookings;
        this.bookingService.allBookings = this.allBooking.data.bookings;
        this.totalItems = this.allBooking.data.totalNumberOfBookings;
        this.bookingService.totalItems = this.totalItems;
        this.filteredBookingsEmpty = false;

        if (this.allBooking != null) {
          this.totalCount = this.allBooking.data.bookings.length;
        }

        this.allBooking.data.bookings.forEach((element) => {
          if (
            element.booking.bookingStatus == "Sim order confirmed" ||
            element.booking.bookingStatus == "Payment completed" ||
            element.booking.bookingStatus == "Visa application approved" ||
            element.booking.bookingStatus == "Insurance policy generated"
          ) {
            element.booking.statusColor = "g";
          } else if (
            element.booking.bookingStatus == "Payment failed" ||
            element.booking.bookingStatus == "Visa application rejected"
          ) {
            element.booking.statusColor = "r";
          } else {
            element.booking.statusColor = "y";
          }

          if (element.booking.paymentStatus == "Payment completed") {
            element.booking.paymentColor = "g";
          } else {
            element.booking.paymentColor = "y";
          }

          // console.log('  ');
          // console.log(element.booking.paymentStatus)
          // console.log(element.booking.paymentColor)
        });
        this.toastr.success("Booking find by Date !");
        // console.log(res);
      } else {
        this.totalCount = 0;
        this.totalItems = 0;
        this.filteredBookingsEmpty = true;
        this.toastr.error(res.message);
      }
    });
    }

    // let toDateCmp = new Date(toDate);
    // let toDateTime = toDateCmp.getTime();
    // let fromDateCmp = new Date(fromDate);
    // let fromDateTime = fromDateCmp.getTime();
    // var searchedBookingsArr = [];
    // this.bookingFilterForm.reset();
    // this.bookings.forEach((booking) => {
    //   let bookingDate = booking.booking.bookingDate;
    //   let bookingDateTime = new Date(bookingDate).getTime();
    //   if (fromDateTime <= bookingDateTime && bookingDateTime <= toDateTime) {
    //     searchedBookingsArr.push(booking);
    //     console.log(searchedBookingsArr);
    //     this.toastr.success("Booking find by Date !");
    //   } else {
    //   }
    // });

    // this.bookingsForLoop = searchedBookingsArr;
    // this.filterdDateArr = searchedBookingsArr;

    // if (
    //   this.bookingsForLoop == undefined ||
    //   this.bookingsForLoop == null ||
    //   this.bookingsForLoop.length == 0
    // ) {
    //   this.filteredBookingsEmpty = true;
    //   this.toastr.error("Bookings with applied filter not found !");
    // } else {
    //   this.filteredBookingsEmpty = false;
    // }
  }

  searchBookingsByBookingId() {
    let searchBy = this.bookingSearchForm.get('searchBy').value;
    this.bookingService.searchBy = searchBy;
    this.bookingFilterForm.get('visa').setValue('');
    this.bookingFilterForm.get('sim').setValue('');
    this.bookingFilterForm.get('insurance').setValue('');
    let bookingId = this.bookingSearchForm.get("bookingId").value;
    this.bookingService.bookingID = bookingId;
    this.currentPageIndex = 1;
    this.currentPage2 = 1;
    this.currentPage1 = 1;
    this.bookingService.currentPage1 = this.currentPageIndex;
    this.bookingService.currentPage2 = this.currentPageIndex;
    let arr = [];

    if(bookingId === '') {
      this.filteredBookingsEmpty = false;
      this.bookingIdInputError = true;
    } else if(bookingId.length < 18) {
      this.filteredBookingsEmpty = false;
      this.bookingIdInputError = true;
    } else {
      this.bookingService.postFindBookingById(bookingId).subscribe(res => {
        if(res.code === '0')
        {
          // arr.push(res.data.bookings)
          this.allBooking = res.data.bookings;
          this.bookingService.allBookings = this.allBooking;
          this.bookingsForLoop = res.data.bookings;
          // console.log(this.allBooking);
          this.currentPageSize = 1;
          this.allBooking.forEach((element) => {
            if (
              element.booking.bookingStatus == "Sim order confirmed" ||
              element.booking.bookingStatus == "Payment completed" ||
              element.booking.bookingStatus == "Visa application approved" ||
              element.booking.bookingStatus == "Insurance policy generated"
            ) {
              element.booking.statusColor = "g";
            } else if (
              element.booking.bookingStatus == "Payment failed" ||
              element.booking.bookingStatus == "Visa application rejected"
            ) {
              element.booking.statusColor = "r";
            } else {
              element.booking.statusColor = "y";
            }

            if (element.booking.paymentStatus == "Payment completed") {
              element.booking.paymentColor = "g";
            } else {
              element.booking.paymentColor = "y";
            }
          });
          // console.log(this.bookingsForLoop);
          this.totalCount = 1;
          this.bookingService.totalItems = this.totalCount;
          this.totalItems = 1;
          this.bookingIdInputError = false;
        } else {
          this.bookingsForLoop = [];
          this.totalCount = 0;
          this.totalItems = 0;
          this.toastr.error(res.message);
          this.filteredBookingsEmpty = true;
          this.isButtonVisible = true;
          this.bookingIdInputError = false;
        }
      })
    }


    // this.bookings.forEach((booking) => {
    //   if (booking.booking.bookingId == bookingId) {
    //     arr.push(booking);
    //     this.bookingsForLoop = arr;
    //     found = true;
    //     this.isButtonVisible = true;
    //     this.bookingIdInputError = false;
    //   }
    // });
    // if (!found) {
    //   this.bookingsForLoop = [];
    //   this.filteredBookingsEmpty = true;
    //   this.isButtonVisible = true;
    //   this.bookingIdInputError = true;
    // }
  }

  // filterBookings() {
  //   let tempBookingArr = [];
  //   if (this.filterdDateArr.length !== 0) {
  //     this.filterdDateArr.forEach((booking) => {
  //       let bookingType = booking.booking.bookingType;

  //       if (this.bookingFilterForm.get("visa").value == true) {
  //         if (bookingType == "Visa") {
  //           tempBookingArr.push(booking);
  //         }
  //       }

  //       if (this.bookingFilterForm.get("sim").value == true) {
  //         if (bookingType == "Sim") {
  //           tempBookingArr.push(booking);
  //         }
  //       }

  //       if (this.bookingFilterForm.get("insurance").value == true) {
  //         if (bookingType == "Insurance") {
  //           tempBookingArr.push(booking);
  //         }
  //       }
  //     });
  //   } else {
  //     this.bookings.forEach((booking) => {
  //       let bookingType = booking.booking.bookingType;

  //       if (this.bookingFilterForm.get("visa").value == true) {
  //         if (bookingType == "Visa") {
  //           tempBookingArr.push(booking);
  //         }
  //       }

  //       if (this.bookingFilterForm.get("sim").value == true) {
  //         if (bookingType == "Sim") {
  //           tempBookingArr.push(booking);
  //         }
  //       }

  //       if (this.bookingFilterForm.get("insurance").value == true) {
  //         if (bookingType == "Insurance") {
  //           tempBookingArr.push(booking);
  //         }
  //       }
  //     });
  //   }

  //   this.bookingsForLoop = tempBookingArr;

  //   if (this.bookingsForLoop.length == 0) {
  //     this.filteredBookingsEmpty = true;
  //   } else {
  //     this.filteredBookingsEmpty = false;
  //   }
  // }

  filterByDate() {
    if(this.bookingSearchForm.get('fromDate').invalid || this.bookingSearchForm.get('toDate').invalid) {
      this.fromDate = true;
      this.toDate = true;
      this.display = 'none';
    } else {
      this.display = 'block';
    }
  }

  closeModel() {
    this.display = 'none';
  }

  filterBookingFunction() {
    let toDate = this.bookingSearchForm.get("toDate").value;
    this.bookingService.toDate = toDate;
    toDate = [
      toDate.year,
      toDate.month < 10 ? "0" + toDate.month : toDate.month,
      toDate.day < 10 ? "0" + toDate.day : toDate.day,
    ].join("-");

    let fromDate = this.bookingSearchForm.get("fromDate").value;
    this.bookingService.fromDate = fromDate;
    fromDate = [
      fromDate.year,
      fromDate.month < 10 ? "0" + fromDate.month : fromDate.month,
      fromDate.day < 10 ? "0" + fromDate.day : fromDate.day,
    ].join("-");

    if (screen.width >= 767) {
      this.currentPageSize = 6;
    } else {
      this.currentPageSize = 4;
    }
    this.currentPage1 = 1;
    this.currentPage2 = 1;
    this.bookingService.currentPage1 = this.currentPage1;
    this.bookingService.currentPage2 = this.currentPage2;

    let visa = this.bookingFilterForm.get("visa").value;
    let sim = this.bookingFilterForm.get("sim").value;
    let insurance = this.bookingFilterForm.get("insurance").value;

    if(visa === true) {
      this.bookingFindByFilter.push('Visa');
      this.bookingService.visa = 'visa';
    }

    if(sim === true) {
      this.bookingFindByFilter.push('Sim');
      this.bookingService.sim = 'sim';
    }

    if(insurance === true) {
      this.bookingFindByFilter.push('Insurance');
      this.bookingService.insurance = 'insurance'
    }

    this.bookingService.
    postBookingFindByFilter(fromDate, toDate, this.currentPage1,
    this.currentPageSize, this.bookingFindByFilter).subscribe(data => {
      if(data.code === "0") {
        this.allBooking = data;
        this.bookingsForLoop = [...data.data.bookings];
        this.bookingService.allBookings = data.data.bookings;
        this.totalItems = data.data.totalNumberOfBookings;
        this.bookingService.totalItems = this.totalItems;
        this.display = 'none';
        this.filteredBookingsEmpty = false;
        // console.log(this.bookingsForLoop);
        this.allBooking.data.bookings.forEach((element) => {
          if (
            element.booking.bookingStatus == "Sim order confirmed" ||
            element.booking.bookingStatus == "Payment completed" ||
            element.booking.bookingStatus == "Visa application approved" ||
            element.booking.bookingStatus == "Insurance policy generated"
          ) {
            element.booking.statusColor = "g";
          } else if (
            element.booking.bookingStatus == "Payment failed" ||
            element.booking.bookingStatus == "Visa application rejected"
          ) {
            element.booking.statusColor = "r";
          } else {
            element.booking.statusColor = "y";
          }

          if (element.booking.paymentStatus == "Payment completed") {
            element.booking.paymentColor = "g";
          } else {
            element.booking.paymentColor = "y";
          }
        });
      } else {
        // this.totalCount = 0;
        this.display = 'none';
        this.totalItems = 0;
        this.bookingsForLoop = [];
        this.filteredBookingsEmpty = true;
        this.toastr.error(data.message);
      }
    });
    this.bookingFindByFilter = [];

  }

  seeBooking() {
    //  console.log('seeBooking');
    this.bookingFilterForm.reset();
    //  this.bookingSearchForm.reset();
    this.bookingSearchForm.get("fromDate").reset();
    this.bookingSearchForm.get("toDate").reset();
    this.bookingSearchForm.get("bookingId").reset();
    this.getAllBookings(this.currentPageIndex, this.currentPageSize);
    this.bookingService.fromDate = null;
    this.bookingService.toDate = null;
    this.bookingService.bookingID = null;
    this.bookingSearchForm.get('toDate').disable();
    // this.filterByDate();
    this.fromDate = false;
    this.toDate = false;
    // this.bookingsForLoop = this.bookings;
    this.filteredBookingsEmpty = false;
    // this.preloaderService.showPreloader(true);
  }

  closeFeed() {
    var bookingid = this.allBooking.data.feedbackToBeTakenFor;
    // console.log(bookingId);

    let rateOne = this.feedbackForm.get("f3-rating").value;
    let rateTwo = this.feedbackForm.get("f1-rating").value;
    let rateThree = this.feedbackForm.get("f2-rating").value;
    let suggestion = this.feedbackForm.get("FeedbackEdit").value;
    // console.log(this.feedbackForm.value);
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
      .subscribe((res) => { });
    this.bookingStatus = false;
  }

  clearFilters() {
    let searchBy = this.bookingSearchForm.get('searchBy').value;
    this.bookingService.searchBy = searchBy;
    this.bookingSearchForm.get("bookingId").setValue("");
    this.bookingSearchForm.get("fromDate").setValue(null);
    this.bookingSearchForm.get("toDate").setValue(null);
    this.bookingFilterForm.reset();
    // this.filterdDateArr = [];
    // this.bookingsForLoop = this.bookings;
    // this.bookingIdInputError = false;
    // if (this.bookings.length != 0) {
    //   this.filteredBookingsEmpty = false;
    //   this.isButtonVisible = false;
    // } else {
    //   this.filteredBookingsEmpty = true;
    // }
  }

  downloadEvisa(bookingId: string, bookingFrom: string) {
    document.getElementById('evisa_download').classList.add('progress_loader');
    this.bookingService.getCreateEvisaFromServicer(bookingId, bookingFrom).
      subscribe(res => {
        if (res.data.evisaFound) {
          this.bookingService.getEvisaFromServicer(bookingId, bookingFrom)
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
