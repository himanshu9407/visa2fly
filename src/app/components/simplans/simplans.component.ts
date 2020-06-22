import { Component, OnInit } from "@angular/core";
import { SimService } from "../sim/sim.service";
import { Router } from "@angular/router";
import { PreloaderService } from "src/app/shared/preloader.service";
// import { ToastService } from 'src/app/shared/toast.service';
import { LoginService } from "../login-signup/login/login.service";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title, Meta } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Component({
  selector: "app-simplans",
  templateUrl: "./simplans.component.html",
  styleUrls: ["./simplans.component.css"]
})
export class SimplansComponent implements OnInit {
  simCountries: Array<any> = [];
  revertCountry: Array<any> = [];
  selectedSimCountry: any = "";
  selectedRevertCountry: string = "";
  simHomeForm: FormGroup;
  selectedCountry: string = "";
  // selectedCountry : string = "";

  selectedSimCountryData : Array<any> = [];
  simCart : Array<any> = [];
  simCartEmpty : boolean = true;
  totalPrice : number = 0;
  displayTotal : number = 0;
  simResp : any ;
  showMobileCart : boolean  = false;
  buttonLabel : string = "View Cart";
  title: string = "Visa2fly | Sim Plans";
  //selectedSimCountry : any = "";

  constructor(
    private simService: SimService,
    private router: Router,
    private preloaderService: PreloaderService,
    private toastr: ToastrService,
    private loginService: LoginService,
    private loginStatus: LoginStatusService,
    private routerHistory: RouterHistory,
    private titleService: Title,
    private meta: Meta,
    private userFlow: UserFlowDetails
  ) {
    // this.simCart = JSON.parse(this.userFlow.getCookie('simCart')) || [];
    this.preloaderService.showPreloader(true);
    // this.simResp = JSON.parse(this.userFlow.getCookie('simResp')) || [];
    this.selectedCountry = this.userFlow.getCookie("simSelectedCountry") || "";
    this.revertCountry.push(this.selectedCountry);
    // console.log(this.selectedCountry)
  }

  ngOnInit() {
    this.simHomeForm = new FormGroup({
      simSelect: new FormControl("this.", [Validators.required])
    });

    this.simService.getSimcountries().subscribe((data: any) => {
      if (data.code == "0") {
        // console.log(data);
        // this.preloaderService.showPreloader(true);
        this.simCountries = data.data;
        setTimeout(() => {
          this.preloaderService.showPreloader(false);
        }, 6000);
      } else {
        this.router.navigate(["/sim"]);
        setTimeout(() => {
          this.preloaderService.showPreloader(false);
        }, 4000);
        this.toastr.error(data.message);
      }
    });

    if (
      this.selectedCountry == "" ||
      this.selectedCountry == undefined ||
      this.selectedCountry == null
    ) {
      this.preloaderService.showPreloader(false);
      this.router.navigate(["sim"]);
    } else {
      this.simService
        .getSimPlans(this.selectedCountry)
        .subscribe((data: any) => {
          if (data.code == "0" && data.data.length > 0) {
            this.selectedSimCountryData = data.data;
            this.userFlow.setCookie("simResp", JSON.stringify(data.data));

            this.selectedSimCountryData.forEach((element: any) => {
              element.quantity = 0;
            });
            // console.log(this.selectedSimCountryData);
          } else {
            this.toastr.error(data.message);
            // console.log(this.selectedRevertCountry);
            this.router.navigate(["/sim"]);
          }
        });
    }

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

  onClickSelect() {
    this.selectedSimCountry = this.simHomeForm.get("simSelect").value;
    this.userFlow.setCookie("simSelectedCountry", this.selectedSimCountry);
    this.preloaderService.showPreloader(true);
    if (
      this.selectedCountry == "" ||
      this.selectedCountry == undefined ||
      this.selectedCountry == null
    ) {
      // this.preloaderService.showPreloader(true);
      this.router.navigate(["sim"]);
    } else {
      this.selectedCountry = this.simHomeForm.get("simSelect").value;
      // console.log(this.revertCountry);
      this.simService
        .getSimPlans(this.selectedCountry)
        .subscribe((data: any) => {
          if (data.code == "0" && data.data.length > 0) {
            this.selectedSimCountryData = data.data;
            this.userFlow.setCookie("simResp", JSON.stringify(data.data));
            // this.preloaderService.showPreloader(false);
            // setTimeout(() => {
            this.preloaderService.showPreloader(false);
            // }, 4000);

            this.selectedSimCountryData.forEach((element: any) => {
              element.quantity = 0;
            });
            this.revertCountry.push(this.selectedCountry);
            // console.log(this.revertCountry);
            // console.log(this.selectedSimCountryData);
          } else {
            this.selectedRevertCountry = this.revertCountry[
              this.revertCountry.length - 1
            ];
            this.toastr.error(data.message);
            // console.log(this.selectedRevertCountry);
            this.simService
              .getSimPlans(this.selectedRevertCountry)
              .subscribe((data: any) => {
                this.selectedSimCountryData = data.data;
                this.userFlow.setCookie("simResp", JSON.stringify(data.data));
                // this.preloaderService.showPreloader(false);
                // setTimeout(() => {
                this.preloaderService.showPreloader(false);
                // }, 4000);

                this.selectedSimCountryData.forEach((element: any) => {
                  element.quantity = 0;
                });
                // console.log(this.selectedSimCountryData);
              });
            this.selectedCountry = this.selectedRevertCountry;
          }
        });
      // this.userFlow.setCookie("simSelectedCountry",this.selectedCountry);
    }
  }

  checkIfCartEmpty(): boolean {
    if (this.simCart.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  increaseItemCount(item: any) {
    //console.log(item);
    let totalQuantity = 0;
    this.simCart.forEach(element => {
      totalQuantity = totalQuantity + element.quantity;
    });

    if (totalQuantity == 10) {
      this.toastr.warning("Maximum Cart Limit Reached !");
    } else {
      let found = false;
      // {name : "sarga",roll: 46}

      for (let index = 0; index < this.simCart.length; index++) {
        // this.simCart.forEach((element : any) => {
        let element = this.simCart[index];

        if (element.planId == item.planId) {
          element.quantity = element.quantity + 1;
          // console.log("hello");
          found = true;
          break;
        } else {
          found = false;
        }
        // });
      }

      if (!found) {
        item.quantity = item.quantity + 1;
        this.simCart.push(item);
      }

      if (this.checkIfCartEmpty()) {
        this.simCartEmpty = true;
      } else {
        this.simCartEmpty = false;
      }
    }

    //console.log(this.simCart);
    this.updateTotal();
  }

  decreaseItemCount(item: any) {
    let totalQuantity = 0;
    this.simCart.forEach(element => {
      totalQuantity = totalQuantity + element.quantity;
    });

    let found = false;

    this.simCart.forEach((element: any, index) => {
      if (element.planId == item.planId) {
        element.quantity = element.quantity - 1;
        // console.log(element);
        found = true;

        if (element.quantity == 0) {
          //  this.simCart.
          this.simCart.splice(index, 1);
        }
      } else {
        found = false;
      }
    });

    // if (!found) {

    //   item.quantity = item.quantity +1;
    //   this.simCart.push(item);
    // }

    if (this.checkIfCartEmpty()) {
      this.simCartEmpty = true;
    } else {
      this.simCartEmpty = false;
    }

    //console.log(this.simCart);
    this.updateTotal();
  }

  updateTotal() {
    this.totalPrice = 0;
    this.displayTotal = 0;

    this.simCart.forEach((item: any) => {
      let temp =
        item.quantity *
        (item.price + item.convenienceFee + item.convenienceFeeTAX);
      this.totalPrice = this.totalPrice + temp;
    });

    this.simCart.forEach((item: any) => {
      let temp1 = item.quantity * item.priceWithoutGST;
      this.displayTotal = this.displayTotal + temp1;
    });
  }

  checkOut() {
    this.preloaderService.showPreloader(true);
    this.userFlow.setCookie("simCart", JSON.stringify(this.simCart));
    let token = this.loginService.getAuthToken();
    if (token == null || token == undefined) {
      token = "";
    }

    this.loginStatus.verifyAuthToken(token).subscribe((data: any) => {
      if (data.code == "0") {
        //do payment post
        this.router.navigate(["/sim/checkout"]);
        this.preloaderService.showPreloader(false);
      } else {
        this.routerHistory.pushHistory("fail-login-sim");
        this.router.navigate(["slcontainer/login"]);
        this.preloaderService.showPreloader(false);
      }
    });

  }
  toogleCartMobile() {
    this.showMobileCart = !this.showMobileCart;
    if (this.showMobileCart) {
      this.buttonLabel = "Go back";
    } else {
      this.buttonLabel = "View Cart";
    }
  }
}
