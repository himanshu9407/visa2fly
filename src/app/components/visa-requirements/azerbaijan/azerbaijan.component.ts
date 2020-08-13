import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Inject,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { VisaRequirementService } from "../visa-requirement.service";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../../login-signup/login/login.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { RequirementsService } from "../../requirements/requirements.service";
import { Title, Meta } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-azerbaijan",
  templateUrl: "./azerbaijan.component.html",
  styleUrls: ["./azerbaijan.component.css"],
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
      ),
    ]),
  ],
})
export class AzerbaijanComponent implements OnInit, AfterViewInit {
  @ViewChild("t", { static: false }) t;
  ngbTabTitleClass;

  selectedRequirement: boolean = false;

  // public selectedCountryType = "France";
  public selectedVisaType = "Tourist";
  desktopJustify = "justified";
  desktopOrientation = "horizontal";
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
  public selectedCountrytype = "Azerbaijan";
  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  public imageUpload1: Array<any> = [];

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
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private doc
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params["purpose"]) {
        this.router.navigate(["visa", "azerbaijan-visa-online"]);
      }
    });

    this.preloaderService.showPreloader(true);

    if (this.userFlow.getCookie("selectedVisaPurpose")) {
      this.selectedVisaType = this.userFlow.getCookie("selectedVisaPurpose");
    } else {
      this.selectedVisaType = "Tourist";
    }

    let tempPurpose = this.selectedVisaType;
    //console.log(tempPurpose);
    this.purposeChooseForm = new FormGroup({
      purposeSelected: new FormControl(tempPurpose),
    });

    this.requireQuotation
      .getRequireQuotation(this.selectedCountrytype)
      .subscribe((res: any) => {
        //  console.log(res);
        if (res.code == 0) {
          this.MyQuotation = res.data.quotations;

          this.imageCatogory.push(res.data.imageUploadInfo);

          this.imageCatogoryBusinessTemp = this.imageCatogory[0]["BUSINESS"];
          //console.log(this.imageCatogoryBusinessTemp);

          this.imageCatogoryTouristTemp = this.imageCatogory[0]["TOURIST"];
          //console.log(this.imageCatogoryTouristTemp);

          this.imageCatogoryTransitTemp = this.imageCatogory[0]["TRANSIT"];
          //console.log(this.imageCatogoryTransitTemp);

          this.onlinestatus = res.data.onlineCategory;
          // this.category = res.data.category;

          this.userFlow.setUserFlowDetails(
            "onlineCountry",
            JSON.stringify(res.data.onlineCategory)
          );

          this.MyQuotation.forEach((element) => {
            if (element.purpose == "Business") {
              this.businessArr.push(element);
            } else if (element.purpose == "Tourist") {
              this.touristArr.push(element);
            } else if (element.purpose == "Transit") {
              this.transitArr.push(element);
            }
          });

          let purposeMain = this.selectedVisaType;
          let purposeUrl =
            purposeMain.charAt(0).toUpperCase() + purposeMain.slice(1);
          if (purposeUrl == "Business") {
            this.MyQuotation1 = this.businessArr;
            this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
          } else if (purposeUrl == "Tourist") {
            this.MyQuotation1 = this.touristArr;
            this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
          } else if (purposeUrl == "Transit") {
            this.MyQuotation1 = this.transitArr;
            this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
          } else {
            this.router.navigate(["visa/"]);
          }

          setTimeout(() => {
            this.preloaderService.showPreloader(false);
          }, 500);
        } else {
          setTimeout(() => {
            this.preloaderService.showPreloader(false);
            this.router.navigate(["/"]);
          }, 2000);
          this.toastr.error("Country Not Found");
        }
      });
  }

  ngOnInit() {
    this.titleService.setTitle(
      "Azerbaijan Visa | Apply For Azerbaijan Visa Online for Indians- Visa2Fly"
    );
    this.meta.updateTag({
      name: "keywords",
      content:
        "apply for azerbaijan e-visa, azerbaijan tourist visa application, azerbaijan tourist visa for indian, apply for azerbaijan e visa, azerbaijan e-visa for indians",
    });
    this.meta.updateTag({
      name: "description",
      content:
        "Apply online for Azerbaijan e-visa directly at the Visa2Fly web portal. For swifter processing of  Azerbaijan e-visa apply online to earn maximum benefits. Visa2Fly also provides travel insurance and travel sim cards to make you experience a hassle-free process.",
    });

    // facebook and linkedin
    this.meta.updateTag({
      property: "og:title",
      content:
        "Azerbaijan Visa | Apply For Azerbaijan Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({ property: "type", content: "website" });
    this.meta.updateTag({
      property: "og:image",
      content: "https://static.visa2fly.com/country/Azerbaijan.jpg",
    });
    this.meta.updateTag({
      property: "og:url",
      content: "https://visa2fly.com/visa/azerbaijan-visa-online",
    });
    this.meta.updateTag({
      property: "og:image:alt",
      content:
        "Azerbaijan Visa | Apply For Azerbaijan Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "og:description",
      content:
        "Apply online for Azerbaijan e-visa directly at the Visa2Fly web portal. For swifter processing of  Azerbaijan e-visa apply online to earn maximum benefits. Visa2Fly also provides travel insurance and travel sim cards to make you experience a hassle-free process.",
    });

    // twitter
    this.meta.updateTag({
      property: "twitter:card",
      content: "summary",
    });
    this.meta.updateTag({
      property: "twitter:title",
      content:
        "Azerbaijan Visa | Apply For Azerbaijan Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:image",
      content: "https://static.visa2fly.com/country/Australia.jpg",
    });
    this.meta.updateTag({
      property: "twitter:image:alt",
      content:
        "Azerbaijan Visa | Apply For Azerbaijan Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:description",
      content:
        "Apply online for Azerbaijan e-visa directly at the Visa2Fly web portal. For swifter processing of  Azerbaijan e-visa apply online to earn maximum benefits. Visa2Fly also provides travel insurance and travel sim cards to make you experience a hassle-free process.",
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
    link.setAttribute(
      "href",
      "https://visa2fly.com/visa/azerbaijan-visa-online"
    );
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
  }

  navigateTo(purpose: any) {
    let purposeString: string = purpose.nextId;
    let purposeUrl =
      purposeString.charAt(0).toUpperCase() + purposeString.slice(1);
    this.purposeChooseForm.get("purposeSelected").setValue(purposeString);
    if (purposeString == "Tourist") {
      this.MyQuotation1 = this.touristArr;
      this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
      this.selectedVisaType = "Tourist";
      this.selectedTourist = 1;
      //this.t.select("Tourist");
    } else if (purposeString == "Business") {
      this.MyQuotation1 = this.businessArr;
      this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
      this.selectedVisaType = "Business";
      this.selectedBusiness = 1;
      // console.log(this.MyQuotation1);
      //this.t.select("Business");
    } else {
      this.MyQuotation1 = this.transitArr;
      this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
      this.selectedVisaType = "Transit";

      this.selectedTransit = 1;
      //this.t.select("Transit");
    }

    this.imagefield1 = this.imageCatogoryTemp;
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
  }

  resetPage() {
    this.userFlow.setCookie("selectedVisaPurpose", "Tourist");
  }

  navigate(
    quoteId: string,
    purpose: string,
    category: string,
    minTravelDate: number,
    basePrice: number,
    serviceTax: number,
    stayPeriod: string,
    imageUpload: boolean,
  ) {
    this.preloaderService.showPreloader(true);

    this.userFlow.setUserFlowDetails("country", this.selectedCountrytype);
    this.userFlow.setUserFlowDetails("purpose", purpose);
    this.userFlow.setUserFlowDetails("quoteId", quoteId);
    this.userFlow.setUserFlowDetails("category", category);
    this.userFlow.setUserFlowDetails(
      "minTravelDate",
      JSON.stringify(minTravelDate)
    );
    this.userFlow.setUserFlowDetails("basePrice", JSON.stringify(basePrice));
    this.userFlow.setUserFlowDetails("serviceTax", JSON.stringify(serviceTax));
    this.userFlow.setUserFlowDetails("stayPeriod", stayPeriod);
    this.userFlow.setUserFlowDetails("imageUpload", JSON.stringify(imageUpload));
    this.userFlow.setUserFlowDetails(
      "imageUploads",
      JSON.stringify(this.imageCatogoryTemp)
    );

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
