import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { VisaRequirementService } from '../visa-requirement.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { LoginService } from '../../login-signup/login/login.service';
import { RouterHistory } from 'src/app/shared/router-history.service';
import { RequirementsService } from '../../requirements/requirements.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-china',
  templateUrl: './china.component.html',
  styleUrls: ['./china.component.css'],
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
export class ChinaComponent implements OnInit {
  @ViewChild("t", { static: false }) t;
  ngbTabTitleClass;

  selectedRequirement: boolean = false;

  // public selectedCountryType = "France";
  public selectedVisaType = "Tourist";
  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  userControlDetail: any;
  public countryStatic = 'China';
  public MyQuotation: Array<any> = [];
  public MyQuotation1: Array<any> = [];
  public imagefield1: Array<any> = [];
  public purposeChooseForm: FormGroup;
  // public selectedPurpose = 'Tourist'; 
  businessArr: Array<any> = [];
  touristArr: Array<any> = [];
  transitArr: Array<any> = [];
  selectedBusiness: number = 1;
  selectedTransit: number = 1;
  selectedTourist: number = 1;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private requireQuotation: VisaRequirementService,
    private userFlow: UserFlowDetails, private loginStatus: LoginStatusService,
    private loginService: LoginService, private preloaderService: PreloaderService,
    private routerHistory: RouterHistory,
    private reqService: RequirementsService, private toastService: ToastService) {
    this.userControlDetail = this.userFlow.getUserFlowDetails();
    // console.log(this.userControlDetail.purpose);

    this.activeRoute.params.subscribe((params: any) => {
      this.selectedVisaType = params.purpose;
      // this.selectedCountryType = 'France';
      //  console.log(this.selectedCountryType);
    });

    let tempPurpose = this.selectedVisaType;
    //console.log(tempPurpose);
    this.purposeChooseForm = new FormGroup({
      'purposeSelected': new FormControl(tempPurpose)
    });
    this.requireQuotation.getRequireQuotation(this.countryStatic).subscribe((res: any) => {
      console.log(res);
      if (res.code == 0) {
        this.MyQuotation = res.data.quotations;
        //console.log(this.MyQuotation);
        this.MyQuotation.forEach((element) => {

          if (element.purpose == 'Business') {
            this.businessArr.push(element);
            // console.log(this.businessArr);
          } else if (element.purpose == 'Tourist') {
            this.touristArr.push(element);
            //console.log(this.touristArr);
          } else if (element.purpose == 'Transit') {
            this.transitArr.push(element);
            // console.log(this.transitArr);
          }
        });
        let purposeMain = this.selectedVisaType;
        let purposeUrl = purposeMain.charAt(0).toUpperCase() + purposeMain.slice(1);
        if (purposeUrl == 'Business') {
          this.MyQuotation1 = this.businessArr;
        } else if (purposeUrl == 'Tourist') {
          this.MyQuotation1 = this.touristArr;
        } else if (purposeUrl == 'Transit') {
          this.MyQuotation1 = this.transitArr;
        } else {
          this.router.navigate(['visa/']);
        }
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.t.select(this.selectedVisaType);

  }

  purposeChanged() {
    var purpose = this.purposeChooseForm.get('purposeSelected').value;
    // console.log(purpose);
    window.history.replaceState(
      "",
      "",
      "visa/apply for China visa online/" + purpose
    );
    // console.log(this.businessArr);

    if (purpose == 'Tourist') {
      this.MyQuotation1 = this.touristArr;
      this.t.select("Tourist");

    } else if (purpose == 'Business') {
      this.MyQuotation1 = this.businessArr;
      this.t.select("Business");
    } else {
      this.MyQuotation1 = this.transitArr;
      this.t.select("Transit");
    }
    // console.log(this.MyQuotation1);

  }


  navigateTo(purpose: any) {
    // window.location
    //let urlpurpose = this.MyQuotation1

    let purposeString: string = purpose.nextId;
    // console.log(purposeString);
    let purposeUrl = purposeString.charAt(0).toUpperCase() + purposeString.slice(1);
    this.purposeChooseForm.get('purposeSelected').setValue(purposeString);
    if (purposeString == 'Tourist') {
      this.MyQuotation1 = this.touristArr;
      this.selectedVisaType = 'Tourist';
      this.selectedTourist = 1;
      //this.t.select("Tourist");

    } else if (purposeString == 'Business') {
      this.MyQuotation1 = this.businessArr;
      this.selectedVisaType = 'Business';
      this.selectedBusiness = 1;
      // console.log(this.MyQuotation1);
      //this.t.select("Business");
    } else {
      this.MyQuotation1 = this.transitArr;
      this.selectedVisaType = 'Transit';
      this.selectedTransit = 1;
      //this.t.select("Transit");
    }
    // console.log(this.MyQuotation1);
    window.history.replaceState(
      "",
      "",
      "visa/apply for China visa online/" + purposeUrl
    );
    // console.log("url changed");
  }

  setActiveTourist(index: number) {
    this.selectedTourist = index;
    // console.log('business');
  }

  setActiveBusiness(index: number) {
    this.selectedBusiness = index;
    //  console.log('business');
  }

  setActiveTransit(index: number) {
    this.selectedTransit = index;
    // console.log('business');
  }

  navigate(quoteId: string, purpose: string, basePrice: number, serviceTax: number, stayPeriod: string, imageUploads: string) {

    this.preloaderService.showPreloader(true);

    // this.userFlow.setUserFlowDetails("country", this.selectedCountryType);
    this.userFlow.setUserFlowDetails("purpose", this.selectedVisaType);
    this.userFlow.setUserFlowDetails("quoteId", quoteId);
    //console.log(quoteId);
    this.userFlow.setUserFlowDetails("basePrice", JSON.stringify(basePrice));
    this.userFlow.setUserFlowDetails("serviceTax", JSON.stringify(serviceTax));
    this.userFlow.setUserFlowDetails("stayPeriod", stayPeriod);
    this.userFlow.setUserFlowDetails("imageUploads", JSON.stringify(this.imagefield1));


    //console.log(quoteId);

    let token = this.loginService.getAuthToken();
    if (token == null || token == undefined) {
      token = "";
    }
    this.loginStatus.verifyAuthToken(token).subscribe(
      (data: any) => {
        if (data.code == "0") {

          this.reqService.verifyQuotation(quoteId).subscribe(
            (data: any) => {
              console.log(data);

              if (data.code == "0") {
                this.routerHistory.pushHistory("visa-requirement");
                this.router.navigate(['addTraveller']);

                // setTimeout(() => {

                this.preloaderService.showPreloader(false);
                // }, 2000);

              }
              else {
                this.toastService.showNotification("" + data.message, 4000);
                this.preloaderService.showPreloader(false);
              }
            }
          );
        }
        else if (data.code == "301") {
          this.loginService.setAuthToken("");
          this.loginStatus.setUserStatus(false);
          this.loginStatus.setUserLoggedIn(false);
          // this.router.navigate(['visa']);
          this.preloaderService.showPreloader(false);
          localStorage.setItem("profile", JSON.stringify({}));
          this.routerHistory.pushHistory("req-and-quote");
          this.router.navigate(['slcontainer/login']);
          this.preloaderService.showPreloader(false);
        }
        else {
          this.routerHistory.pushHistory("req-and-quote");
          this.router.navigate(['slcontainer/login']);
          this.preloaderService.showPreloader(false);
        }

      }
    )



  }

}
