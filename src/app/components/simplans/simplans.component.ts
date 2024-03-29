import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from "@angular/core";
import { SimService } from "../sim/sim.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PreloaderService } from "src/app/shared/preloader.service";
// import { ToastService } from 'src/app/shared/toast.service';
import { LoginService } from "../login-signup/login/login.service";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title, Meta } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-simplans",
  templateUrl: "./simplans.component.html",
  styleUrls: ["./simplans.component.css"]
})
export class SimplansComponent implements OnInit, AfterViewInit {
  simCountries: Array<any> = [];
  revertCountry: Array<any> = [];
  selectedSimCountry: any = "";
  selectedRevertCountry: string = "";
  simHomeForm: FormGroup;
  selectedCountry: string = "";
  // selectedCountry : string = "";

  selectedSimCountryData: Array<any> = [];
  simCart: Array<any> = [];
  simCartEmpty: boolean = true;
  totalPrice: number = 0;
  displayTotal: number = 0;
  showMobileCart: boolean = false;
  buttonLabel: string = "View Cart";
  title: string = "Visa2fly | Sim Plans";
  plan_list_length = 0;

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
    private userFlow: UserFlowDetails,
    private activateRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.preloaderService.showPreloader(true);
    this.activateRoute.params.subscribe((params: any) => {
      console.log(params.simCountry);
      let joinSplit = [];
      if (params.simCountry == 'uae' || params.simCountry == 'usa') {
        this.selectedCountry = params.simCountry.toUpperCase();
      } else if (params.simCountry.split(' ').length > 1) {
        for (let split of params.simCountry.split(' ')) {
          const splitWord: string = split[0].toUpperCase() + split.slice(1);
          console.log(typeof splitWord);
          joinSplit.push(splitWord);
          this.selectedCountry = joinSplit.join(' ');
        }
      } else {
        this.selectedCountry = params.simCountry[0].toUpperCase() + params.simCountry.slice(1);
      }

      this.userFlow.setCookie("simSelectedCountry", this.selectedCountry);

      // console.log(this.selectedCountry)

      // switch (this.selectedCountry) {
      //   case "Czech Republic":
      //     this.userFlow.setCookie("simSelectedCountry", 'Czech Republic');
      //     break;
      //   case "Hong Kong":
      //     this.userFlow.setCookie("simSelectedCountry", 'Hong Kong');
      //     break;
      //   case "New Zealand":
      //     this.userFlow.setCookie("simSelectedCountry", 'New Zealand');
      //     break;
      //   case "Saudi Arabia":
      //     this.userFlow.setCookie("simSelectedCountry", 'Saudi Arabia');
      //     break;
      //   case "South Korea":
      //     this.userFlow.setCookie("simSelectedCountry", 'South Korea');
      //     break;
      //   case "Sri Lanka":
      //     this.userFlow.setCookie("simSelectedCountry", 'Sri Lanka');
      //     break;
      //   case "United Kingdom":
      //     this.userFlow.setCookie("simSelectedCountry", 'United Kingdom');
      //     break;
      //   case "USA":
      //     this.userFlow.setCookie("simSelectedCountry", 'USA');
      //     break;
      //   case "UAE":
      //     this.userFlow.setCookie("simSelectedCountry", 'UAE');
      //     break;
      //   default:
      //     this.userFlow.setCookie("simSelectedCountry", params.simCountry);
      // }
    });
    this.revertCountry.push(this.selectedCountry);
  }

  ngOnInit() {
    this.simHomeForm = new FormGroup({
      simSelect: new FormControl(this.selectedCountry, [Validators.required])
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
      this.router.navigate(["/sim"]);
    } else {
      this.simService
        .getSimPlans(this.selectedCountry)
        .subscribe((data: any) => {
          // console.log(data);

          if (data.code == "0" && data.data.length > 0) {
            this.selectedSimCountryData = data.data;

            this.selectedSimCountryData.forEach((element: any) => {
              element.quantity = 0;
            });
          } else {
            this.toastr.error(data.message);
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
    this.onBackButton();
    this.selectedSimCountry = this.simHomeForm.get("simSelect").value;
    // this.userFlow.setCookie("simSelectedCountry", this.selectedSimCountry);
    this.router.navigate(["/sim", this.selectedSimCountry.toLowerCase()]);
    this.preloaderService.showPreloader(true);

    if (
      this.selectedCountry == "" ||
      this.selectedCountry == undefined ||
      this.selectedCountry == null
    ) {
      this.router.navigate(["/sim"]);
    } else {
      this.selectedCountry = this.simHomeForm.get("simSelect").value;
      this.simService
        .getSimPlans(this.selectedCountry)
        .subscribe((data: any) => {
          if (data.code == "0" && data.data.length > 0) {
            this.selectedSimCountryData = data.data;
            this.preloaderService.showPreloader(false);

            this.selectedSimCountryData.forEach((element: any) => {
              element.quantity = 0;
            });
            this.revertCountry.push(this.selectedCountry);
          } else {
            this.selectedRevertCountry = this.revertCountry[
              this.revertCountry.length - 1
            ];
            this.toastr.error(data.message);
            this.simService
              .getSimPlans(this.selectedRevertCountry)
              .subscribe((data: any) => {
                this.selectedSimCountryData = data.data;
                this.preloaderService.showPreloader(false);

                this.selectedSimCountryData.forEach((element: any) => {
                  element.quantity = 0;
                });
              });
            this.selectedCountry = this.selectedRevertCountry;
          }
        });
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
    // console.log(item);
    // console.log("  ");
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

        // console.log(element.planId);

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
    // console.log(this.simCart);
    this.preloaderService.showPreloader(true);
    this.userFlow.setLocalStorage("simCart", JSON.stringify(this.simCart));
    let token = this.loginService.getAuthToken();
    if (token == null || token == undefined) {
      token = "";
    }

    this.loginStatus.verifyAuthToken(token).subscribe((data: any) => {
      if (data.code == "0") {
        //do payment post
        this.router.navigate(["/sim", "checkout"]);
        this.preloaderService.showPreloader(false);
      } else {
        this.routerHistory.pushHistory("fail-login-sim");
        this.router.navigate(["/slcontainer", "login"]);
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

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  @ViewChild('countryInput') countryInput: ElementRef;
  @ViewChild('countryInput_mobile') countryInput_mobile: ElementRef;

  focusInputField(fieldName: string) {
    setTimeout(() => {
      if (fieldName == 'country_mobile_sim') {
        this.countryInput_mobile.nativeElement.focus();
      } else if (fieldName == 'country') {
        this.countryInput.nativeElement.focus()
      }
    }, 10)
  }

  inputSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.toLocaleLowerCase().indexOf(term) > -1 || item.toLocaleLowerCase().indexOf(term) > -1;
  }

  inputSearchMobileFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.toLocaleLowerCase().indexOf(term) > -1 || item.toLocaleLowerCase().indexOf(term) > -1;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let country_input_simplan = document.getElementById('country_input_simplan');
      let simplan_home_heading = document.getElementById('simplan_home_heading');

      let country_mobile_simplan = document.getElementById('country_mobile_simplan');

      let simplan_input_container = document.getElementById('simplan_input_container');
      let body = document.getElementById('body');
      let homeform_label = document.getElementById('homeform_label');

      country_input_simplan.addEventListener('click', function () {
        // console.log('click');
        simplan_input_container.classList.add('overlay');
        country_mobile_simplan.classList.add('show_select');
        simplan_home_heading.classList.add('show_select');
        body.classList.add('noScroll');
        homeform_label.innerText = "Select Country";
      });
    }
  }

  // setPlanCardHeight() {
  //   let N = this.selectedSimCountryData.length;
  //   console.log(N);

  //   for (let i = 0; i < N; i++) {
  //     let planHeight = document.getElementById('planDesp_' + i);
  //     console.log(planHeight);
  //   }
  // }

  onBackButton() {
    let simplan_input_container = document.getElementById('simplan_input_container');
    let body = document.getElementById('body');

    let country_mobile_simplan = document.getElementById('country_mobile_simplan');
    let simplan_home_heading = document.getElementById('simplan_home_heading');

    simplan_input_container.classList.remove('overlay');
    body.classList.remove('noScroll');

    if (country_mobile_simplan.classList.contains('show_select')) {
      country_mobile_simplan.classList.remove('show_select');
      simplan_home_heading.classList.remove('show_select');
    }
  }
}
