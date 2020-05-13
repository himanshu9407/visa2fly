import { Data } from "./../../../interfaces/requirement";
import { country } from "./../../../interfaces/home_formData";
import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { VisaRequirementService } from "../visa-requirement.service";
import { HomeFormComponent } from "../../home-form/home-form.component";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../../login-signup/login/login.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { RequirementsService } from "../../requirements/requirements.service";
import { Title, Meta } from "@angular/platform-browser";
import { SeoService } from 'src/app/shared/seo.service';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-united-kingdom",
  templateUrl: "./united-kingdom.component.html",
  styleUrls: ["./united-kingdom.component.css"],
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
export class UnitedKingdomComponent implements OnInit, AfterViewInit {
  @ViewChild("t", { static: false }) t;
  ngbTabTitleClass;
  public onlinestatus: boolean = false;

  selectedRequirement: boolean = false;

  public selectedVisaType = "Tourist";
  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  userControlDetail: any;
  public MyQuotation: Array<any> = [];
  public MyQuotation1: Array<any> = [];
  public purposeChooseForm: FormGroup;
  public selectedPurpose = "Tourist";
  public imagefield1: Array<any> = [];
  businessArr: Array<any> = [];
  touristArr: Array<any> = [];
  transitArr: Array<any> = [];
  selectedBusiness: number = 1;
  selectedTransit: number = 1;
  selectedTourist: number = 1;

  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];

  public countryStatic = "United Kingdom";
  public PurposeUse: any;
  title: string = "UK Visa Application Apply Now - Visa2fly";

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private requireQuotation: VisaRequirementService,
    private userFlow: UserFlowDetails,
    private toastr: ToastrService,
    private loginStatus: LoginStatusService,
    private loginService: LoginService,
    private preloaderService: PreloaderService,
    private routerHistory: RouterHistory,
    private reqService: RequirementsService,
    private titleService: Title,
    private meta: Meta,
    private seoService: SeoService
  ) {
    // this.userControlDetail = this.userFlow.getUserFlowDetails();
    // // console.log(this.userControlDetail);
    this.userControlDetail = this.userFlow.getUserFlowDetails();
    this.preloaderService.showPreloader(true);
    // console.log(this.userControlDetail.purpose);

    this.activeRoute.params.subscribe((params: any) => {
      this.selectedVisaType = params.purpose;
      // console.log(this.selectedVisaType);
    });

    let tempPurpose = this.selectedVisaType;
    //console.log(tempPurpose);
    this.purposeChooseForm = new FormGroup({
      purposeSelected: new FormControl(tempPurpose)
    });
    this.requireQuotation
      .getRequireQuotation(this.countryStatic)
      .subscribe((res: any) => {
        //console.log(res);
        if (res.code == 0) {
          this.MyQuotation = res.data.quotations;

          this.imageCatogory.push(res.data.imageUploadInfo);

          this.imageCatogoryBusinessTemp = this.imageCatogory[0]["BUSINESS"];

          this.imageCatogoryTouristTemp = this.imageCatogory[0]["TOURIST"];

          this.imageCatogoryTransitTemp = this.imageCatogory[0]["TRANSIT"];

          this.onlinestatus = res.data.onlineCategory;
          this.userFlow.setUserFlowDetails(
            "onlineCountry",
            JSON.stringify(res.data.onlineCategory)
          );
          // console.log(this.MyQuotation);
          this.MyQuotation.forEach(element => {
            if (element.purpose == "Business") {
              this.businessArr.push(element);
              // console.log(this.businessArr);
            } else if (element.purpose == "Tourist") {
              this.touristArr.push(element);
              //console.log(this.touristArr);
            } else if (element.purpose == "Transit") {
              this.transitArr.push(element);
              // console.log(this.transitArr);
            }
          });
          let purposeMain = this.selectedVisaType;
          let purposeUrl =
            purposeMain.charAt(0).toUpperCase() + purposeMain.slice(1);
            if (purposeUrl == "Business") {
              this.MyQuotation1 = this.businessArr;
              this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
            }else if(purposeUrl == 'Tourist') {
              this.MyQuotation1 = this.touristArr;
              this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
            }else if(purposeUrl == 'Transit'){
              this.MyQuotation1 = this.transitArr;
              this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
            }else{
              this.router.navigate(['visa/']);
            }

            this.imagefield1 = this.imageCatogoryTemp;

          setTimeout(() => {
            this.preloaderService.showPreloader(false);
          }, 500);
        } else {
          setTimeout(() => {
            this.preloaderService.showPreloader(false);
            this.router.navigate(["/"]);
          }, 2000);
          this.toastr.error(
            "Country Not Found"
          );
        }
      });

    this.PurposeUse = this.purposeChooseForm.get("purposeSelected").value;
  }

  ngOnInit() {
    this.createLinkForCanonicalURL();
    
    this.titleService.setTitle(this.title);
    this.meta.addTags([
      { name: "keywords", content: "apply for UK e-visa, UK tourist visa application, UK tourist visa for Indian, apply for UK e visa, UK e-visa for Indians" },
      {
        name: "description",
        content: "Avail online visa services for your UK visa application at Visa2Fly. Get assured online visa services and immigration services that make your UK visa application process hassle-free and convenient. Fill your UK visa application online at Visa2fly now.  "
      },
    ]);
  }

  createLinkForCanonicalURL() {
    this.seoService.createLinkForCanonicalURL();
  }

  ngAfterViewInit() {
    this.t.select(this.selectedVisaType);
  }

  // ngAfterViewInit() {
  //   this.t.select(this.selectedVisaType);
  // }
  purposeChanged() {
    var purpose = this.purposeChooseForm.get("purposeSelected").value;
    // console.log(purpose);
    window.history.replaceState(
      "",
      "",
      "/visa-requirements/apply-for-UK-visa-online/" + purpose
    );
    // console.log(this.businessArr);

    if (purpose == "Tourist") {
      this.MyQuotation1 = this.touristArr;
      this.t.select("Tourist");
    } else if (purpose == "Business") {
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
    let purposeUrl =
      purposeString.charAt(0).toUpperCase() + purposeString.slice(1);
    this.purposeChooseForm.get("purposeSelected").setValue(purposeString);
  if (purposeString == "Tourist") {
      this.MyQuotation1 = this.touristArr;
      this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
      this.selectedVisaType = "Tourist";
      this.selectedTourist = 1;
    } else if (purposeString == "Business") {
      this.MyQuotation1 = this.businessArr;
      this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
      this.selectedVisaType = "Business";
      this.selectedBusiness = 1;
    } else {
      this.MyQuotation1 = this.transitArr;
      this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
      this.selectedVisaType = "Transit";

      this.selectedTransit = 1;
    }
    // console.log(this.MyQuotation1);
    window.history.replaceState(
      "",
      "",
      "/visa-requirements/apply-for-UK-visa-online/" + purposeUrl
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

  navigate(
    quoteId: string,
    purpose: string,
    category: string,
    minTravelDate: number,
    basePrice: number,
    serviceTax: number,
    stayPeriod: string,
    imageUploads: string
  ) {
    this.preloaderService.showPreloader(true);

    this.userFlow.setUserFlowDetails("purpose", this.selectedVisaType);
    this.userFlow.setUserFlowDetails("country", this.countryStatic);
    this.userFlow.setUserFlowDetails("quoteId", quoteId);
    //console.log(quoteId);
    this.userFlow.setUserFlowDetails("category", category);

    this.userFlow.setUserFlowDetails(
      "minTravelDate",
      JSON.stringify(minTravelDate)
    );
    this.userFlow.setUserFlowDetails("basePrice", JSON.stringify(basePrice));
    this.userFlow.setUserFlowDetails("serviceTax", JSON.stringify(serviceTax));
    this.userFlow.setUserFlowDetails("stayPeriod", stayPeriod);
    this.userFlow.setUserFlowDetails(
      "imageUploads",
      JSON.stringify(this.imagefield1)
    );

    //console.log(quoteId);

    let token = this.loginService.getAuthToken();
    if (token == null || token == undefined) {
      token = "";
    }
    this.loginStatus.verifyAuthToken(token).subscribe((data: any) => {
      if (data.code == "0") {
        this.reqService.verifyQuotation(quoteId).subscribe((data: any) => {
          if (data.code == "0") {
            this.routerHistory.pushHistory("visa-requirement");
            this.router.navigate(["addTraveller"]);


            this.preloaderService.showPreloader(false);
            // }, 2000);
          } else {
            this.toastr.error("" + data.message);
            this.preloaderService.showPreloader(false);
          }
        });
      } else if (data.code == "301") {
        this.loginService.setAuthToken("");
        this.loginStatus.setUserStatus(false);
        this.loginStatus.setUserLoggedIn(false);
        // this.router.navigate(['visa']);
        this.preloaderService.showPreloader(false);
        localStorage.setItem("profile", JSON.stringify({}));
        this.routerHistory.pushHistory("req-and-quote");
        this.router.navigate(["slcontainer/login"]);
        this.preloaderService.showPreloader(false);
      } else {
        this.routerHistory.pushHistory("req-and-quote");
        this.router.navigate(["slcontainer/login"]);
        this.preloaderService.showPreloader(false);
      }
    });
  }
}
