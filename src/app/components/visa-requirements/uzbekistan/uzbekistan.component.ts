import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
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
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/shared/seo.service';
import { DOCUMENT } from '@angular/common';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-uzbekistan',
  templateUrl: './uzbekistan.component.html',
  styleUrls: ['./uzbekistan.component.css'],
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
export class UzbekistanComponent implements OnInit {
  @ViewChild("t", { static: false }) t;
  ngbTabTitleClass;

  selectedRequirement: boolean = false;

  // public selectedCountryType = "France";
  public selectedVisaType = "Tourist";
  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  userControlDetail: any;
  public MyQuotation: Array<any> = [];
  public MyQuotation1: Array<any> = [];
  public imagefield1: Array<any> = [];
  public purposeChooseForm: FormGroup;
  public onlinestatus: boolean = false;

  // public selectedPurpose = 'Tourist';
  businessArr: Array<any> = [];
  touristArr: Array<any> = [];
  transitArr: Array<any> = [];
  selectedBusiness: number = 1;
  selectedTransit: number = 1;
  selectedTourist: number = 1;
  public selectedCountrytype = "Uzbekistan";
  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  public imageUpload1: Array<any> = [];
  title: string = 'Apply For Uzbekistan Visa Online- Visa2Fly';

  constructor(private activeRoute: ActivatedRoute,
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
    @Inject(DOCUMENT) private doc,) {

      this.userControlDetail = this.userFlow.getUserFlowDetails();
    // console.log(this.userControlDetail.purpose);

    this.preloaderService.showPreloader(true);

    if (this.userFlow.getCookie("selectedVisaPurpose")) {
      this.selectedVisaType = this.userFlow.getCookie("selectedVisaPurpose");
    } else {
      this.selectedVisaType = "Tourist";
    }

    let tempPurpose = this.selectedVisaType;
    //console.log(tempPurpose);
    this.purposeChooseForm = new FormGroup({
      purposeSelected: new FormControl(tempPurpose)
    });

    this.requireQuotation
    .getRequireQuotation(this.selectedCountrytype)
    .subscribe((res: any) => {
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
        this.MyQuotation.forEach(element => {
          if (element.purpose == "Business") {
            this.businessArr.push(element);
          } else if (element.purpose == "Tourist") {
            this.touristArr.push(element);
          } else if (element.purpose == "Transit") {
            this.transitArr.push(element);
          }
        });
        let purposeMain = this.selectedVisaType;
        let purposeUrl = purposeMain.charAt(0).toUpperCase() + purposeMain.slice(1);
        if(purposeUrl == 'Business')
          {
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

  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.meta.addTags([
      { name:"keywords", content:"apply for uzbekistan e-visa, uzbekistan tourist visa application, uzbekistan tourist visa for indian, apply for uzbekistan e visa, uzbekistan e-visa for indians" },
      {
        name: "description",
        content: "Planning to visit uzbekistan? Apply your uzbekistan e-visa online at Visa2Fly to make experience a hassle-free and convenient experience. Visa2Fly offers a swifter visa process with additional benefits like travel insurance and travel sim cards. Know more."
      }
    ]);

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", "https://visa2fly.com/visa/uzbekistan-visa-online");
  }

  ngAfterViewInit() {
    this.t.select(this.selectedVisaType);
  }

  purposeChanged() {
    var purpose = this.purposeChooseForm.get("purposeSelected").value;
    this.userFlow.setCookie("selectedVisaPurpose", purpose);

    if (purpose == "Tourist") {
      this.MyQuotation1 = this.touristArr;
      this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
      this.t.select("Tourist");
    } else if (purpose == "Business") {
      this.MyQuotation1 = this.businessArr;

      this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
      this.t.select("Business");
    } else {
      this.MyQuotation1 = this.transitArr;
      this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
      this.t.select("Transit");
    }
    this.imagefield1 = this.imageCatogoryTemp;

  }

  navigateTo(purpose: any) {
    let purposeString: string = purpose.nextId;
    let purposeUrl = purposeString.charAt(0).toUpperCase() + purposeString.slice(1);
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

    this.imagefield1 = this.imageCatogoryTemp;
    this.userFlow.setCookie("selectedVisaPurpose", purposeUrl);
  }

  setActiveTourist(index: number) {
    this.selectedTourist = index;
  }

  setActiveBusiness(index: number) {
    this.selectedBusiness = index;
  }

  setActiveTransit(index: number) {
    this.selectedTransit = index;
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

    this.userFlow.setUserFlowDetails("country", this.selectedCountrytype);
    this.userFlow.setUserFlowDetails("purpose", this.selectedVisaType);
    this.userFlow.setUserFlowDetails("quoteId", quoteId);
    //console.log(quoteId);
    this.userFlow.setUserFlowDetails("category", category);

    this.userFlow.setUserFlowDetails("minTravelDate", JSON.stringify(minTravelDate));
    this.userFlow.setUserFlowDetails("basePrice", JSON.stringify(basePrice));
    this.userFlow.setUserFlowDetails("serviceTax", JSON.stringify(serviceTax));
    this.userFlow.setUserFlowDetails("stayPeriod", stayPeriod);
    this.userFlow.setUserFlowDetails("imageUploads",JSON.stringify(this.imagefield1));

    //console.log(quoteId);

    let token = this.loginService.getAuthToken();
    if (token == null || token == undefined) {
      token = "";
    }
    this.loginStatus.verifyAuthToken(token).subscribe((data: any) => {
      if (data.code == "0") {
        this.reqService.verifyQuotation(quoteId).subscribe((data: any) => {
          // console.log(data);

          if (data.code == "0") {
            this.routerHistory.pushHistory("visa-requirement");
            this.router.navigate(["addTraveller"]);

            // setTimeout(() => {

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
        this.userFlow.setCookie("profile", JSON.stringify({}));
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