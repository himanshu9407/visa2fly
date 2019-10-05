import { Component, OnInit } from '@angular/core';
import { SimService } from '../sim/sim.service';
import { Router } from '@angular/router';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { ToastService } from 'src/app/shared/toast.service';
import { LoginService } from '../login-signup/login/login.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { RouterHistory } from 'src/app/shared/router-history.service';

@Component({
  selector: 'app-simplans',
  templateUrl: './simplans.component.html',
  styleUrls: ['./simplans.component.css']
})
export class SimplansComponent implements OnInit {

  selectedCountry : string = "";
  selectedSimCountryData : Array<any> = [];
  simCart : Array<any> = [];
  simCartEmpty : boolean = true;
  totalPrice : number = 0;
  simResp : any ;
  showMobileCart : boolean  = false;
  buttonLabel : string = "View Cart";

  constructor(private simService : SimService, private router : Router, 
    private preloaderService : PreloaderService, private toastService :ToastService,
    private loginService : LoginService, private loginStatus : LoginStatusService,
    private routerHistory : RouterHistory) {
      // this.simCart = JSON.parse(localStorage.getItem('simCart')) || [];
      this.preloaderService.showPreloader(true);
      // this.simResp = JSON.parse(localStorage.getItem('simResp')) || [];
      this.selectedCountry = localStorage.getItem('simSelectedCountry') || "";
     }

  ngOnInit() {

    if(this.selectedCountry == "" || this.selectedCountry == undefined || this.selectedCountry == null ){
      this.preloaderService.showPreloader(false);
      this.router.navigate(['sim']);
    }
    else {

      this.simService.getSimPlans(this.selectedCountry).subscribe(
        (data : any) => {
          if(data.code == "0") {
            this.selectedSimCountryData = data.data;
            localStorage.setItem("simResp",JSON.stringify(data.data));
            this.preloaderService.showPreloader(false);
            
            this.selectedSimCountryData.forEach((element : any) => {
              element.quantity = 0;
            });
            console.log(this.selectedSimCountryData);
          }
        }
      );
      
    }
  }

  checkIfCartEmpty ()  : boolean{
    if (this.simCart.length == 0) {
      return true;

    }
    else {
     return false;
    }
  }


  increaseItemCount (item : any) {

    console.log(item);
    let totalQuantity = 0;
    this.simCart.forEach(element => {
      totalQuantity =totalQuantity + element.quantity;
    });
    
    if (totalQuantity == 10) {
      this.toastService.showNotification("Maximum cart size reached !" , 4000);
    }
    else {
      let found = false;
      // {name : "sarga",roll: 46}

     

      for (let index = 0; index < this.simCart.length; index++) {
        // this.simCart.forEach((element : any) => {
          let element = this.simCart[index];
        
          if (element.planId == item.planId) {
            
            element.quantity = element.quantity +1;
            // console.log("hello");
            found = true;
            break;
          }
          else {
           found = false;
          }
        // });
        
      }

      if (!found) {

        item.quantity = item.quantity +1;
        this.simCart.push(item);
      }

      
      if (this.checkIfCartEmpty()) {
        this.simCartEmpty = true;
      }
      else {
        this.simCartEmpty = false;
      }
      
    }

    console.log(this.simCart);
    this.updateTotal();

  }

  decreaseItemCount (item : any) {
       
    let totalQuantity = 0;
    this.simCart.forEach(element => {
      totalQuantity =totalQuantity + element.quantity;
    });
    
   
    
      let found = false;

      this.simCart.forEach((element : any, index) => {
        if (element.planId == item.planId) {
          
          element.quantity = element.quantity - 1;
          console.log(element);
          found = true;

          if (element.quantity == 0) {
          //  this.simCart.
          this.simCart.splice(index,1);
          }
        }
        else {
         found = false;
        }
      });

      // if (!found) {

      //   item.quantity = item.quantity +1;
      //   this.simCart.push(item);
      // }

      
      if (this.checkIfCartEmpty()) {
        this.simCartEmpty = true;
      }
      else {
        this.simCartEmpty = false;
      }
      
    

    console.log(this.simCart);
    this.updateTotal()
  }


  updateTotal () {
    this.totalPrice = 0;

    this.simCart.forEach((item : any) => {
     let  temp = item.quantity * (item.price + item.convenienceFee + item.convenienceFeeTAX );
     this.totalPrice = this.totalPrice + temp;
    });
    
  }


  checkOut () {
    this.preloaderService.showPreloader(true);
    localStorage.setItem("simCart",JSON.stringify(this.simCart));
    let token = this.loginService.getAuthToken();
    if (token == null || token ==  undefined) {
      token = "";
    }

    
    
    this.loginStatus.verifyAuthToken(token).subscribe(
      (data: any) => {
        
        if(data.code == "0") {
          //do payment post
          this.router.navigate(['/sim/checkout']);
          this.preloaderService.showPreloader(false);
        }
        else {
          this.routerHistory.pushHistory("fail-login-sim");
          this.router.navigate(['slcontainer/login']);
          this.preloaderService.showPreloader(false);
        }


      }
    );


    // this.toastService.showNotification("checkout button clicked",4000);
  }
  toogleCartMobile () {
    this.showMobileCart = !this.showMobileCart;
    if(this.showMobileCart) {

      this.buttonLabel = "Go back";
    }
    else {
      this.buttonLabel = "View Cart";

    }
  }

}