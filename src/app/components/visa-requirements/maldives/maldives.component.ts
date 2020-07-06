import { Component, OnInit, AfterViewInit, ViewChild, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { ToastrService } from 'ngx-toastr';
import { VisaRequirementService } from "../visa-requirement.service";
import { HomeFormComponent } from "../../home-form/home-form.component";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../../login-signup/login/login.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { RequirementsService } from "../../requirements/requirements.service";
import { Title, Meta } from "@angular/platform-browser";
import { SeoService } from 'src/app/shared/seo.service';
import { DOCUMENT } from '@angular/common';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-maldives",
  templateUrl: "./maldives.component.html",
  styleUrls: ["./maldives.component.css"],
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
export class MaldivesComponent implements OnInit, AfterViewInit {

  @ViewChild("t") t;
  ngbTabTitleClass;
  public onlinestatus: boolean = false;

  selectedRequirement: boolean = false;

  public selectedVisaType = "Tourist";
  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  userControlDetail: any;
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

  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  
  public selectedCountrytype = "Maldives";

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private requireQuotation: VisaRequirementService,
    private userFlow: UserFlowDetails,
    private loginStatus: LoginStatusService,
    private toastr: ToastrService,
    private loginService: LoginService,
    private preloaderService: PreloaderService,
    private routerHistory: RouterHistory,
    private titleService: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    private reqService: RequirementsService,
    @Inject(DOCUMENT) private doc
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params["purpose"]) {
        this.router.navigate(['visa','maldives-visa-online']);
      }
    });

    this.preloaderService.showPreloader(true);

    if (this.userFlow.getCookie("selectedVisaPurpose")) {
      this.selectedVisaType = this.userFlow.getCookie("selectedVisaPurpose");
    } else {
      this.selectedVisaType = "Tourist";
    }

    let tempPurpose = this.selectedVisaType;
    this.purposeChooseForm = new FormGroup({
      purposeSelected: new FormControl(tempPurpose)
    });
    // this.requireQuotation.getRequireQuotation(this.selectedCountrytype).subscribe((res : any) => {
    //   if(res.code == 0){
    //     this.MyQuotation = res.data.quotations;
    //     this.onlinestatus = res.data.onlineCategory;
    //     this.userFlow.setUserFlowDetails("onlineCountry", JSON.stringify(res.data.onlineCategory));
    //     this.MyQuotation.forEach((element) => {

    //       if(element.purpose == 'Business'){
    //       this.businessArr.push(element);
    //     }else if(element.purpose == 'Tourist'){
    //       this.touristArr.push(element);
    //     }else if(element.purpose == 'Transit'){
    //       this.transitArr.push(element);
    //     }
    //     });
    //     let purposeMain = this.selectedVisaType;
    //     let purposeUrl = purposeMain.charAt(0).toUpperCase() + purposeMain.slice(1);
    //     if(purposeUrl == 'Business')
    //     {
    //       this.MyQuotation1 = this.businessArr;
    //     }else if(purposeUrl == 'Tourist') {
    //       this.MyQuotation1 = this.touristArr;
    //     }else if(purposeUrl == 'Transit'){
    //       this.MyQuotation1 = this.transitArr;
    //     }else{
    //       this.router.navigate(['visa/']);
    //     }
    // }
    // });

    setTimeout(() => {
      this.preloaderService.showPreloader(false);
    }, 500);
  }

  ngOnInit() {
    this.titleService.setTitle("Maldives Visa | Apply For Maldives Visa Online for Indians- Visa2Fly");
    
    this.meta.updateTag({
      name: "keywords",
      content:
        "apply for maldives e-visa, maldives tourist visa application, maldives tourist visa for indian, apply for maldives e visa, maldives e-visa for indians",
    });
    this.meta.updateTag({
      name: "description",
      content:
        "Apply for Maldives tourist visa for Indians online at Visa2Fly to make it quicker. We offer great online visa answers so that you get rid of visa worries. Apply here",
    });

    // facebook and linkedin
    this.meta.updateTag({
      property: "og:title",
      content:
        "Maldives Visa | Apply For Maldives Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({ property: "type", content: "website" });
    this.meta.updateTag({
      property: "og:image",
      content: "https://static.visa2fly.com/country/Maldives.jpg",
    });
    this.meta.updateTag({
      property: "og:url",
      content: "https://visa2fly.com/visa/maldives-visa-online",
    });
    this.meta.updateTag({
      property: "og:image:alt",
      content:
        "Maldives Visa | Apply For Maldives Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "og:description",
      content:
        "Apply for Maldives tourist visa for Indians online at Visa2Fly to make it quicker. We offer great online visa answers so that you get rid of visa worries. Apply here",
    });

    // twitter
    this.meta.updateTag({
      property: "twitter:card",
      content: "summary",
    });
    this.meta.updateTag({
      property: "twitter:title",
      content:
        "Maldives Visa | Apply For Maldives Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:image",
      content: "https://static.visa2fly.com/country/Maldives.jpg",
    });
    this.meta.updateTag({
      property: "twitter:image:alt",
      content:
        "Maldives Visa | Apply For Maldives Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:description",
      content:
        "Apply for Maldives tourist visa for Indians online at Visa2Fly to make it quicker. We offer great online visa answers so that you get rid of visa worries. Apply here",
    });
    this.meta.updateTag({
      property: "twitter:site",
      content: "@visa2fly",
    });
    this.meta.updateTag({
      property: "twitter:creator",
      content: "@visa2fly",
    });

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", "https://visa2fly.com/visa/maldives-visa-online");
  }

  ngAfterViewInit() {
    this.t.select(this.selectedVisaType);
  }

  purposeChanged() {
    var purpose = this.purposeChooseForm.get("purposeSelected").value;
    this.userFlow.setCookie("selectedVisaPurpose", purpose);

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
      this.selectedVisaType = "Tourist";
      this.selectedTourist = 1;
      //this.t.select("Tourist");
    } else if (purposeString == "Business") {
      this.MyQuotation1 = this.businessArr;
      this.selectedVisaType = "Business";
      this.selectedBusiness = 1;
      // console.log(this.MyQuotation1);
      //this.t.select("Business");
    } else {
      this.MyQuotation1 = this.transitArr;
      this.selectedVisaType = "Transit";
      this.selectedTransit = 1;
      //this.t.select("Transit");
    }
    this.userFlow.setCookie("selectedVisaPurpose", purposeUrl);
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

  resetPage() {
    this.userFlow.setCookie("selectedVisaPurpose", "Tourist");
  }

//   navigate(
//     quoteId: string,
//     purpose: string,
//     category: string,
//     minTravelDate: number,
//     basePrice: number,
//     serviceTax: number,
//     stayPeriod: string,
//     imageUploads: string
//   ) {
//     this.preloaderService.showPreloader(true);

//     this.userFlow.setUserFlowDetails("country", this.selectedCountrytype);
//     this.userFlow.setUserFlowDetails("purpose", this.selectedVisaType);
//     this.userFlow.setUserFlowDetails("quoteId", quoteId);
//     //console.log(quoteId);
//     this.userFlow.setUserFlowDetails("category", category);

//     this.userFlow.setUserFlowDetails(
//       "minTravelDate",
//       JSON.stringify(minTravelDate)
//     );
//     this.userFlow.setUserFlowDetails("basePrice", JSON.stringify(basePrice));
//     this.userFlow.setUserFlowDetails("serviceTax", JSON.stringify(serviceTax));
//     this.userFlow.setUserFlowDetails("stayPeriod", stayPeriod);
//     this.userFlow.setUserFlowDetails(
//       "imageUploads",
//       JSON.stringify(this.imagefield1)
//     );

//     //console.log(quoteId);

//     let token = this.loginService.getAuthToken();
//     if (token == null || token == undefined) {
//       token = "";
//     }
//     this.loginStatus.verifyAuthToken(token).subscribe((data: any) => {
//       if (data.code == "0") {
//         this.reqService.verifyQuotation(quoteId).subscribe((data: any) => {
//           // console.log(data);

//           if (data.code == "0") {
//             this.routerHistory.pushHistory("visa-requirement");
//             this.router.navigate(["addTraveller"]);

//             // setTimeout(() => {

//             this.preloaderService.showPreloader(false);
//             // }, 2000);
//           } else {
//             this.toastService.showNotification("" + data.message, 4000);
//             this.preloaderService.showPreloader(false);
//           }
//         });
//       } else if (data.code == "301") {
//         this.loginService.setAuthToken("");
//         this.loginStatus.setUserStatus(false);
//         this.loginStatus.setUserLoggedIn(false);
//         // this.router.navigate(['visa']);
//         this.preloaderService.showPreloader(false);
//         this.userFlow.setCookie("profile", JSON.stringify({}));
//         this.routerHistory.pushHistory("req-and-quote");
//         this.router.navigate(["slcontainer/login"]);
//         this.preloaderService.showPreloader(false);
//       } else {
//         this.routerHistory.pushHistory("req-and-quote");
//         this.router.navigate(["slcontainer/login"]);
//         this.preloaderService.showPreloader(false);
//       }
//     });
//   }
}
