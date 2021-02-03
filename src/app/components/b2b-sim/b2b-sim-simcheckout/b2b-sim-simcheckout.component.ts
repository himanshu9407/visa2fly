import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { SimCheckoutService } from '../../simcheckout/simcheckout.service';

@Component({
  selector: 'app-b2b-sim-simcheckout',
  templateUrl: './b2b-sim-simcheckout.component.html',
  styleUrls: ['./b2b-sim-simcheckout.component.css']
})
export class B2bSimSimcheckoutComponent implements OnInit {
  simCart: Array<any> = [];
  totalPrice: number = 0;
  simCheckoutForm: FormGroup;
  selectedCountry: string = "";
  simReqObj: any;
  public paymentForm: any = {};
  buyerEmail = "";
  orderId = "";
  amount = "";
  maxDateOfTravel: any = "";
  maxDateDob: any = "";
  currency = "";
  merchantIdentifier = "";
  returnUrl = "";
  // departureDate;
  expandTable: boolean = true;
  checksum = "";
  primaryAddress = "";
  showMobileCart: boolean = false;
  minDate: any = "";
  maxTravelDate: any;
  totalQty: number = 0;
  title: string = "Visa2fly | Sim Checkout";
  paymentUrl: any = "";

  constructor(private simCheckoutService: SimCheckoutService,
    private router: Router,
    private preloaderService: PreloaderService,
    // private toastService: ToastService,
    private titleService: Title,
    private toastr: ToastrService,
    private meta: Meta,
    private userFlow: UserFlowDetails) {

      this.simCart = JSON.parse(this.userFlow.getCookie("simCart"));
      this.updateTotal();
      this.totalQuantity();
      this.selectedCountry = this.userFlow.getCookie("simSelectedCountry");

     }

   ngOnInit() {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    //console.log(this.simCart);

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    this.maxDateDob = {
      year: yesterday.getFullYear(),
      month: yesterday.getMonth() + 1,
      day: yesterday.getDate()
    };

    const today = new Date();
    today.setDate(today.getDate() + 99);

    this.maxTravelDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    // console.log(this.simCart);

    this.simCheckoutForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      simActivationDate: new FormControl("", [Validators.required]),
      gender: new FormControl("male", [Validators.required]),
      // departureDate: new FormControl("", [Validators.required]),
      dateOfBirth: new FormControl("", [Validators.required]),
      passport: new FormControl("", [Validators.required]),
      gstNumber: new FormControl(""),
      address: new FormControl("", [Validators.required]),
      cell: new FormControl("", [Validators.required]),
      emailId: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      pinCode: new FormControl("", [Validators.required]),
      needInsurance: new FormControl(true, [Validators.required]),
      country: new FormControl("India")
    });

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

  updateTotal() {
    this.simCart.forEach((item: any) => {
      let temp =
        item.quantity *
        (item.price + item.convenienceFee + item.convenienceFeeTAX);
      this.totalPrice = this.totalPrice + temp;
    });
  }

  totalQuantity() {
    this.simCart.forEach((item: any) => {
      let qty = item.quantity;
      // console.log(qty)
      this.totalQty = this.totalQty + qty;
    });
    // return this.totalQty;
  }

  submitForm() {
    let formValueObj = this.simCheckoutForm.value;

    let tempDob = "";
    let dob = this.simCheckoutForm.get("dateOfBirth").value;
    if (dob.month < 10 && dob.day < 10) {
      tempDob = dob.year + "-0" + dob.month + "-0" + dob.day;
    } else if (dob.day < 10) {
      tempDob = dob.year + "-" + dob.month + "-0" + dob.day;
    } else if (dob.month < 10) {
      tempDob = dob.year + "-0" + dob.month + "-" + dob.day;
    } else {
      tempDob = dob.year + "-" + dob.month + "-" + dob.day;
    }

    let tempActivation = "";
    let doa = this.simCheckoutForm.get("simActivationDate").value;
    if (doa.month < 10 && doa.day < 10) {
      tempActivation = doa.year + "-0" + doa.month + "-0" + doa.day;
    } else if (doa.day < 10) {
      tempActivation = doa.year + "-" + doa.month + "-0" + doa.day;
    } else if (doa.month < 10) {
      tempActivation = doa.year + "-0" + doa.month + "-" + doa.day;
    } else {
      tempActivation = doa.year + "-" + doa.month + "-" + doa.day;
    }

    // let tempdod = "";
    // let dod = this.simCheckoutForm.get("departureDate").value;
    // if (dod.month < 10 && dod.day < 10) {
    //   tempdod = dod.year + "-0" + dod.month + "-0" + dod.day;
    // } else if (dod.day < 10) {
    //   tempdod = dod.year + "-" + dod.month + "-0" + dod.day;
    // } else if (dod.month < 10) {
    //   tempdod = dod.year + "-0" + dod.month + "-" + dod.day;
    // } else {
    //   tempdod = dod.year + "-" + dod.month + "-" + dod.day;
    // }

    formValueObj.simActivationDate = tempActivation;
    formValueObj.dateOfBirth = tempDob;
    // formValueObj.departureDate = tempdod;
    formValueObj.simPlanForCountry = this.selectedCountry;

    formValueObj.totalPayableAmount = this.totalPrice.toFixed(2);
    // console.log(formValueObj.totalPayableAmount);
    this.simCart.forEach(element => {
      element.totalAmount =
        element.quantity *
        (element.price + element.convenienceFee + element.convenienceFeeTAX);
      element.productId = element.planId;
      element.ratePlanId = element.tariffId;
    });

    formValueObj.plansSelected = this.simCart;
    // console.log(formValueObj);
    this.preloaderService.showPreloader(true);
    this.simCheckoutService
      .proceedToPayment(formValueObj)
      .subscribe((data: any) => {
        // console.log(data);
        if (data.code == "0") {
          // console.log(data);
          this.simCheckoutService.hitPaymentApi().subscribe((data1: any) => {
            // console.log(data1);
            this.buyerEmail = data1.buyerEmail;
            this.orderId = data1.orderId;
            this.amount = data1.amount;
            this.paymentUrl = data1.paymentUrl;
            this.currency = data1.currency;
            this.merchantIdentifier = data1.merchantIdentifier;
            this.returnUrl = data1.returnUrl;
            this.checksum = data1.checksum; 

            setTimeout(() => {
              this.preloaderService.showPreloader(false);
              document.forms["paymentForm"].submit();
            }, 2000);
          });
        } else {
          this.preloaderService.showPreloader(false);
          this.toastr.error(data.message);
          this.router.navigate(["/sim/checkout"]);
        }
      });
  }

  expand() {
    return (this.expandTable = !this.expandTable);
  }

}
