import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SimCheckoutService } from './simcheckout.service';
import { Router } from '@angular/router';
import { PreloaderService } from 'src/app/shared/preloader.service';

@Component({
  selector: 'app-simcheckout',
  templateUrl: './simcheckout.component.html',
  styleUrls: ['./simcheckout.component.css']
})
export class SimcheckoutComponent implements OnInit {

  simCart : Array<any>  = [];
  totalPrice: number =0 ;
  simCheckoutForm : FormGroup
  selectedCountry :string = "";
  simReqObj : any;
  public paymentForm: any = {};
  buyerEmail = "";
  orderId = "";
  amount = "";
  currency = "";
  merchantIdentifier = "";
  returnUrl = "";
  checksum = "";
  primaryAddress = "";
  showMobileCart : boolean  =false;
  
  constructor(private simCheckoutService : SimCheckoutService, private router : Router,
    private preloaderService: PreloaderService) {

    this.simCart = JSON.parse(localStorage.getItem("simCart"));
    this.updateTotal();
    this.selectedCountry = localStorage.getItem("simSelectedCountry");
   }

  ngOnInit() {
    console.log(this.simCart);


    this.simCheckoutForm = new FormGroup ({
      "firstName" : new FormControl('',[Validators.required]),
      'lastName' : new FormControl('',[Validators.required]),
      "simActivationDate" : new FormControl('',[Validators.required]),
      "gender" : new FormControl ('male',[Validators.required]),
      "departureDate" : new FormControl('',[Validators.required]),
      "dateOfBirth" :  new FormControl ('',[Validators.required]),
      "passport" : new FormControl('',[Validators.required]),
      "gstNumber" : new FormControl(''),
      "address" : new FormControl('',[Validators.required]),
      "cell" : new FormControl('',[Validators.required]),
      "emailId" : new FormControl ('', [Validators.required]),
      "city": new FormControl ('',[Validators.required]),
      "state": new FormControl ('Haryana',[Validators.required]),
      "pinCode" : new FormControl('', [Validators.required]),
      "needInsurance" : new FormControl(true,[Validators.required]),
      "country" :new FormControl ('India'),



    });

  }
  updateTotal () {
   

    this.simCart.forEach((item : any) => {
     let  temp = item.quantity * (item.price + item.convenienceFee + item.convenienceFeeTAX );
     this.totalPrice = this.totalPrice + temp;
    });
    
  }
  submitForm () {
    let formValueObj = this.simCheckoutForm.value;

    let tempDob ="";
    let dob = this.simCheckoutForm.get('dateOfBirth').value;
    if (dob.month < 10 && dob.day < 10) {
      tempDob =  dob.year+"-0"+dob.month+"-0"+dob.day;
    }
    else if (dob.day < 10) {
      tempDob =  dob.year+"-"+dob.month+"-0"+dob.day;
    }
    else if (dob.month < 10)  {
      tempDob =  dob.year+"-0"+dob.month+"-"+dob.day;
    }
    else {
      tempDob =  dob.year+"-"+dob.month+"-"+dob.day;
    }

    let tempActivation ="";
    let doa = this.simCheckoutForm.get('dateOfBirth').value;
    if (doa.month < 10 && doa.day < 10) {
      tempActivation =  doa.year+"-0"+doa.month+"-0"+doa.day;
    }
    else if (doa.day < 10) {
      tempActivation =  doa.year+"-"+doa.month+"-0"+doa.day;
    }
    else if (doa.month < 10)  {
      tempActivation =  doa.year+"-0"+doa.month+"-"+doa.day;
    }
    else {
      tempActivation =  doa.year+"-"+doa.month+"-"+doa.day;
    }

    let tempdod ="";
    let dod = this.simCheckoutForm.get('dateOfBirth').value;
    if (dod.month < 10 && dod.day < 10) {
      tempdod =  dod.year+"-0"+dod.month+"-0"+dod.day;
    }
    else if (dod.day < 10) {
      tempdod =  dod.year+"-"+dod.month+"-0"+dod.day;
    }
    else if (dod.month < 10)  {
      tempdod =  dod.year+"-0"+dod.month+"-"+dod.day;
    }
    else {
      tempdod =  dod.year+"-"+dod.month+"-"+dod.day;
    }

    formValueObj.simActivationDate = tempActivation;
    formValueObj.dateOfBirth = tempDob;
    formValueObj.departureDate = tempdod;
    formValueObj.simPlanForCountry = this.selectedCountry;
    formValueObj.totalPayableAmount = this.totalPrice;

    this.simCart.forEach(element => {
      element.totalAmount = element.quantity * (element.price + element.convenienceFee + element.convenienceFeeTAX );
    });

    formValueObj.plansSelected = this.simCart;

    this.preloaderService.showPreloader(true);
    this.simCheckoutService.proceedToPayment(formValueObj).subscribe(

      (data : any) => {
        if (data.code == "0") {
          this.simCheckoutService.hitPaymentApi().subscribe (
            (data1 : any) => {
              console.log(data1);
              this.buyerEmail = data1.buyerEmail;
              this.orderId = data1.orderId;
              this.amount = data1.amount;
              this.currency = data1.currency;
              this.merchantIdentifier = data1.merchantIdentifier;
              this.returnUrl = data1.returnUrl;
              this.checksum = data1.checksum;
              console.log(document.forms["paymentForm"]);

              console.log(this.paymentForm);
              setTimeout(() => {
                this.preloaderService.showPreloader(false);
                document.forms["paymentForm"].submit();
              }, 2000);
            }
          );
        }
        else {
          this.router.navigate(['/sim/checkout']);
        }
      }
    );
  }

 

}
