import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LoginService } from '../login-signup/login/login.service';
import { Router } from '@angular/router';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { MyBookingsService } from './mybookings.service';
import { DownloadImageService } from 'src/app/shared/DownloadImage.service';
import { ToastService } from 'src/app/shared/toast.service';
import { feedbackModal } from '../../interfaces/home_formData';
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  totalCount : number = 0;

  myBookings : Array<any> = [];
  myBookingsPc : Array<any> = [];
  myBookingsMobile : Array<any> = [];
  activePcBookingPage : Array<any> = [];

  bookingIdFilter: boolean = true;
  dateFilter: boolean = true;
  filter: any;
  selectedFilter = "dateFilter";
  sortFilter: FormGroup;
  maxDate: { year: number; month: number; day: number };
  minDate: { year: any; month: number; day: number };
  minDateOfTo: { year: any; month: any; day: any; };

  activePcPageNumber : number = 0;
  activeMobilePageNumber : number = 0;
  activeMobileBookingPage : Array<any> = [];
  public allBooking : any;
  AUTH_TOKEN = "";
  
  public bookingData : any;
  bookingStatus : boolean = false;
   FeedbackForm : FormGroup;
   

  constructor(private loginStatus : LoginStatusService, private loginService : LoginService,
              private  router :Router ,private preloaderService :PreloaderService, private bookingService : MyBookingsService,
              private downloadImageService : DownloadImageService, private toastService : ToastService,private fb : FormBuilder) {
    this.myBookings =   [];
      
 var bookingIdC;
 
    this.FeedbackForm = new FormGroup({
      
      'f3-rating' : new FormControl(null),
      'f1-rating' : new FormControl(null),
      'f2-rating' : new FormControl(null),
      'FeedbackEdit' : new FormControl(null)
    });
    
   
    

    this.AUTH_TOKEN = this.loginService.getAuthToken();

    this.loginStatus.verifyAuthToken(this.AUTH_TOKEN).subscribe(
      ( data : any ) => {
               
        if (data.code == "0") {
          this.bookingService.getBookingsFromServer().subscribe((res) =>{
            this.allBooking = res;
           // console.log(this.allBooking);
             // this.myBookings = this.allBooking;
               // console.log(this.myBookings[0]['booking']);
             if(this.allBooking != null ) {
              // console.log(this.myBookings);
              this.totalCount = this.allBooking.data.bookings.length;

              localStorage.setItem('bookingStatus', JSON.stringify(this.allBooking.data.takeFeedback));

               bookingIdC= localStorage.getItem('bookingStatus');
              this.bookingStatus = bookingIdC; 
              // console.log(bookingIdC);              
               // console.log(this.totalCount);
              //var bookingId = this.allBooking.data.feedbackToBeTakenFor;
              //console.log(this.allBooking.data.takeFeedback);
              this.allBooking.data.bookings.forEach(element => {
                if (element.booking.bookingStatus == "Sim order confirmed" ||element.booking.bookingStatus == "Payment completed"
                ||element.booking.bookingStatus == "Visa application approved") {
                  element.booking.statusColor = "g";
                }
                else if (element.booking.bookingStatus="Payment failed" || element.booking.bookingStatus=="Visa application rejected") {
                  element.booking.statusColor = "r";
    
                }
                else {
                  element.booking.statusColor = "y";
    
                }
                if (element.booking.paymentStatus == "Payment completed") {
                  element.booking.paymentColor = "g";
    
                }
                else if (element.booking.paymentStatus == "Payment completed") {
                  element.booking.paymentColor = "g";
                }
                else {
                  element.booking.paymentColor = 'y';
                }
              });
    
              this.activeMobileBookingPage = this.myBookingsMobile[0];
    
             }
            else {
              this.totalCount = 0;
            }
           
          
        });
          this.preloaderService.showPreloader(false);
      };
    });
    //var bookingId = this.allBooking.data.;
    
    
}

  
  ngOnInit() {
  
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth(),
      day: current.getDate()
    };

    this.sortFilter = new FormGroup({
      searchFilter: new FormControl(),
      fromDate: new FormControl("", [Validators.required]),
      toDate: new FormControl("", [Validators.required]),
      bookingId: new FormControl("", [Validators.required])
    });

  }

  chkFromDate() {
    let temp: any = this.sortFilter.get("fromDate").value;
    this.minDateOfTo = {
      year: temp.year,
      month: temp.month,
      day: temp.day + 1
    };
  }
 
   
 

  // setActivePagePc(i : number) {
  //   this.activePcPageNumber = i;

  //   console.log(this.activePcPageNumber == i);
  
  // // window.scrollTo(0,0);
  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: 'smooth'
  // });
  //   this.activePcBookingPage = this.myBookingsPc[i];
  // }

  // setActivePageMobile ( i : number)  {
  //   this.activeMobilePageNumber = i;
  //   // window.scrollTo(0,0);
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  //   this.activeMobileBookingPage = this.myBookingsMobile[i];
  // }
  downloadInvoice (bookingId : string,bookingStatus : string) {
    // console.log("invoice called");
    if(bookingStatus == 'g') {

      this.downloadImageService.downloadInvoice(bookingId).subscribe(
        (response : any) => {
  
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          let url = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          a.href = url;
          a.download = "Invoice"+bookingId;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      )
    }
    else {
      this.toastService.showNotification("Invoice could not be generated as the payment failed.",4000);
    } 
  }


setActiveBooking (booking : any) {
  this.bookingService.setActiveBooking(booking);

  localStorage.setItem("activeBooking",JSON.stringify(booking));

  this.router.navigate(['bookingDetail']);
}

onSubmit(){
   
  var bookingId = this.allBooking.data.feedbackToBeTakenFor;
  // console.log(bookingId);

  let product = this.FeedbackForm.get("f3-rating").value;
  let info = this.FeedbackForm.get("f1-rating").value;
  let recommend = this.FeedbackForm.get("f2-rating").value;
  let userFeedback = this.FeedbackForm.get("FeedbackEdit").value;
  // console.log(this.FeedbackForm.value);

  this.bookingService.postFeedback(bookingId,product,info,recommend,userFeedback).subscribe((res) =>{
    
    // this.toastService.showNotification("Feedback Submitted", 1000);
  });
  this.toastService.showNotification("Feedback Submitted", 2000);
  return this.bookingStatus = false;
 }

}
