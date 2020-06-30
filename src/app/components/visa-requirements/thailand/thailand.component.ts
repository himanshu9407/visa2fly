import { Data } from "./../../../interfaces/requirement";
import { country } from "./../../../interfaces/home_formData";
import { FormGroup, FormControl } from "@angular/forms";
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Inject,
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { VisaRequirementService } from "../visa-requirement.service";
import { HomeFormComponent } from "../../home-form/home-form.component";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../../login-signup/login/login.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { RequirementsService } from "../../requirements/requirements.service";
import { Title, Meta } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { SeoService } from "src/app/shared/seo.service";
import { DOCUMENT } from "@angular/common";

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-thailand",
  templateUrl: "./thailand.component.html",
  styleUrls: ["./thailand.component.css"],
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
export class ThailandComponent implements OnInit, AfterViewInit {
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
  public imageCatogory: Array<any> = [];
  businessArr: Array<any> = [];
  touristArr: Array<any> = [];
  transitArr: Array<any> = [];
  selectedBusiness: number = 1;
  selectedTransit: number = 1;
  selectedTourist: number = 1;

  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  public countryStatic = "Thailand";
  public PurposeUse: any;
  title: string = "Thailand E Visa Online| Thailand Tourist Visa - Visa2fly";

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
        this.router.navigate(['visa','thailand-visa-online']);
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
      purposeSelected: new FormControl(tempPurpose),
    });

    this.requireQuotation
      .getRequireQuotation(this.countryStatic)
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

          this.imagefield1 = this.imageCatogoryTemp;

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

    this.PurposeUse = this.purposeChooseForm.get("purposeSelected").value;
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.meta.addTags([
      {
        name: "keywords",
        content:
          "apply for thailand e-visa, thailand tourist visa application, thailand tourist visa for indian, apply for thailand e visa, thailand e-visa for indians",
      },
      {
        name: "description",
        content:
          "Get your Thailand e visa online by Visa2fly today. Get to know the Thailand e-visa requirements and easily apply for Thailand tourist visa. Know More",
      },
    ]);

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute(
      "href",
      "https://visa2fly.com/visa-requirements/apply-for-Thailand-visa-online"
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
    this.imagefield1 = this.imageCatogoryTemp;
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

    this.userFlow.setUserFlowDetails("purpose", this.selectedVisaType);
    this.userFlow.setUserFlowDetails("country", this.countryStatic);
    this.userFlow.setUserFlowDetails("quoteId", quoteId);
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
          } else {
            this.toastr.error("" + data.message);
            this.preloaderService.showPreloader(false);
          }
        });
      } else if (data.code == "301") {
        this.loginService.setAuthToken("");
        this.loginStatus.setUserStatus(false);
        this.loginStatus.setUserLoggedIn(false);
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
