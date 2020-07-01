import { element } from "protractor";
import {
  Component,
  OnInit,
  ɵConsole,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeServiceService } from "../../home-service.service";
import { requirementData } from "../../interfaces/requirement";
import { RequirementsService } from "./requirements.service";
import { RequirementsModel } from "./requirements.model";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../login-signup/login/login.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { FormGroup, FormControl } from "@angular/forms";
import { isPlatformBrowser } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import * as $ from "jquery";
import { Meta, Title } from "@angular/platform-browser";
@Component({
  selector: "app-requirements",
  templateUrl: "./requirements.component.html",
  styleUrls: ["./requirements.component.css"],
  animations: [
    trigger("inOutAnimation", [
      transition(":enter", [
        style({ height: 0, opacity: 0 }),
        animate("0.3s ease-out", style({ height: 300, opacity: 1 })),
      ]),
      transition(":leave", [
        style({ height: 300, opacity: 1 }),
        animate("0.4s ease-in", style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class RequirementsComponent implements OnInit {
  public regData: requirementData;
  public fieldName: string;

  public onlinestatus: boolean = false;

  public requirementsData: any;
  public userFlowDetails: any;

  public faqs: Array<any> = [];
  public dataSource: Array<{
    id: string;
    dataToggle: string;
    dataToggleHash: string;
  }> = [];

  public mainArr: Array<any> = [[]];
  public mobileMainArr: Array<any> = [[]];

  public selectedDataArr: Array<any> = [this.mainArr[0][0]];
  public mobileSelectedDataArr: Array<any> = [this.mobileMainArr[0][0]];

  public showRequirementsDetailArr = [true];
  public mobileShowRequirementsDetailArr = [true];
  public purposeApiNew: Array<any> = [];
  public purposeApi: Array<any> = [];
  public quotes = [];
  public selectedPurposeType: any;
  public selectedCountrytype: any;
  public importantInfo: Array<any> = [];
  businessArr: Array<any> = [];
  touristArr: Array<any> = [];
  transitArr: Array<any> = [];
  MyQuotation: Array<any> = [];
  Quotation: Array<any> = [];
  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  public imageUpload1: Array<any> = [];

  purposeChooseForm1: FormGroup;
  country: any;
  selectedVariable: any;
  constructor(
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    private myservice: HomeServiceService,
    private reqService: RequirementsService,
    private userFlow: UserFlowDetails,
    private routerHistory: RouterHistory,
    private toastr: ToastrService,
    private loginStatus: LoginStatusService,
    private loginService: LoginService,
    private preloaderService: PreloaderService,
    private activateRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.preloaderService.showPreloader(true);

    this.activateRoute.params.subscribe((params: any) => {
      this.selectedPurposeType = params.purpose;
      this.selectedCountrytype = params.country;
      this.selectedVariable = params.variable;

      switch (this.selectedCountrytype) {
        case "Australia":
          this.router.navigateByUrl("/visa/australia-visa-online/");
          break;
        case "Singapore":
          this.router.navigateByUrl("/visa/singapore-visa-online/");
          break;
        case "Cambodia":
          this.router.navigateByUrl("/visaCambodia-visa-online/");
          break;
        case "USA":
          this.router.navigateByUrl("/visa/usa-visa-online/");
          break;
        case "China":
          this.router.navigateByUrl("/visa/china-visa-online/");
          break;
        case "Dubai":
          this.router.navigateByUrl("/visa/dubai-visa-online/");
          break;
        case "Ethiopia":
          this.router.navigateByUrl("/visa/ethiopia-visa-online/");
          break;
        case "France":
          this.router.navigateByUrl("/visa/france-visa-online/");
          break;
        case "Maldives":
          this.router.navigateByUrl("/visa/maldives-visa-online/");
          break;
        case "Malaysia":
          this.router.navigateByUrl("/visa/malaysia-visa-online/");
          break;
        case "Spain":
          this.router.navigateByUrl("/visa/spain-visa-online/");
          break;
        case "Swiss":
          this.router.navigateByUrl("/visa/swiss-visa-online/");
          break;
        case "UK":
          this.router.navigateByUrl("/visa/uk-visa-online/");
          break;
        case "Sri-Lanka":
          this.router.navigateByUrl("/visa/sri-lanka-visa-online/");
          break;
        case "Azerbaijan":
          this.router.navigateByUrl("/visa/azerbaijan-visa-online/");
          break;
        case "Turkey":
          this.router.navigateByUrl("/visa/turkey-visa-online/");
          break;
        case "Thailand":
          this.router.navigateByUrl("/visa/thailand-visa-online/");
          break;
        case "Vietnam":
          this.router.navigateByUrl("/visa/vietnam-visa-online/");
          break;
        case "Netherlands":
          this.router.navigateByUrl("/visa/netherlands-visa-online/");
          break;
        case "Brazil":
          this.router.navigateByUrl("/visa/brazil-visa-online/");
          break;
        case "Russia":
          this.router.navigateByUrl("/visa/russia-visa-online/");
          break;
        case "Tajikistan":
          this.router.navigateByUrl("/visa/tajikistan-visa-online/");
          break;
        case "Uzbakistan":
          this.router.navigateByUrl("/visa/uzbakistan-visa-online/");
          break;
        case "Zambia":
          this.router.navigateByUrl("/visa/zambia-visa-online/");
          break;
      }
    });

    this.activateRoute.params.subscribe((params: any) => {});
    let tempPurpose = this.selectedPurposeType;
    this.purposeChooseForm1 = new FormGroup({
      purposeSelected: new FormControl(tempPurpose),
    });
    //Api Call
    this.reqService
      .getRequirementsData(this.selectedCountrytype)
      .then((data: any) => {
        if (isPlatformBrowser(this.platformId)) {
          if (data.code == "0") {
            this.requirementsData = data;
            this.Quotation = data.data.displayQuotes;
            this.Quotation.forEach((element) => {
              this.purposeApi.push(element.purpose);
              if (element.purpose == "Tourist") {
                this.touristArr.push(element);
              } else if (element.purpose == "Business") {
                this.businessArr.push(element);
              } else {
                this.transitArr.push(element);
              }
            });

            //Fetch Value From quotation and remove dublicate
            for (var value of this.purposeApi) {
              if (this.purposeApiNew.indexOf(value) === -1) {
                this.purposeApiNew.push(value);
              }
            }

            setTimeout(() => {
              this.preloaderService.showPreloader(false);
            }, 500);

            let purposeMain = this.selectedPurposeType;
            let purposeUrl =
              purposeMain.charAt(0).toUpperCase() + purposeMain.slice(1);
            var newImageCatogoryPurpose = purposeMain.toUpperCase();
            if (purposeUrl == "Business") {
              this.MyQuotation = this.businessArr;
            } else if (purposeUrl == "Tourist") {
              this.MyQuotation = this.touristArr;
            } else if (purposeUrl == "Transit") {
              this.MyQuotation = this.transitArr;
            } else {
              this.router.navigate(["visa/"]);
            }
            this.importantInfo = data.data.importantInfo;
            this.onlinestatus = data.data.onlineCategory;
            let tempFaqs = data.data.faqs;

            for (let key in tempFaqs) {
              let tempFaqObj = { title: key, content: tempFaqs[key] };
              this.faqs.push(tempFaqObj);
            }

            this.faqs.forEach((element, index) => {
              let temp = { id: "", dataToggle: "", dataToggleHash: "" };
              temp.id = "Traveller " + index;
              temp.dataToggle = "toogle" + index;
              temp.dataToggleHash = "#toogle" + index;
              this.dataSource.push(temp);
            });

            this.imageCatogory.push(data.data.imageUploadInfo);

            this.imageCatogoryBusinessTemp = this.imageCatogory[0]["BUSINESS"];
            this.imageCatogoryTouristTemp = this.imageCatogory[0]["TOURIST"];
            this.imageCatogoryTransitTemp = this.imageCatogory[0]["TRANSIT"];

            if (purposeUrl == "Business") {
              this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
            } else if (purposeUrl == "Tourist") {
              this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
            } else {
              this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
            }

            this.userFlow.setUserFlowDetails(
              "onlineCountry",
              JSON.stringify(data.data.onlineCategory)
            );
            this.imageUpload1 = this.imageCatogoryTemp;

            let temp = [];
            let i,
              j,
              temparray,
              chunk = 4;

            this.mainArr = [];

            for (i = 0, j = data.data.fieldDetails.length; i < j; i += chunk) {
              temparray = data.data.fieldDetails.slice(i, i + chunk);
              this.mainArr.push(temparray);
            }

            let i1,
              j1,
              temparray1,
              chunk1 = 2;

            this.mobileMainArr = [];

            for (
              i1 = 0, j1 = data.data.fieldDetails.length;
              i1 < j1;
              i1 += chunk1
            ) {
              temparray1 = data.data.fieldDetails.slice(i1, i1 + chunk1);
              this.mobileMainArr.push(temparray1);
            }

            this.showRequirementsDetailArr = [];
            this.selectedDataArr = [];
            for (let k = 0; k < this.mainArr.length; k++) {
              this.selectedDataArr.push(this.mainArr[k][0]);
              if (k == 0) {
                this.showRequirementsDetailArr.push(true);
              } else {
                this.showRequirementsDetailArr.push(false);
              }
            }
            this.mobileShowRequirementsDetailArr = [];
            this.mobileSelectedDataArr = [];

            for (let k = 0; k < this.mobileMainArr.length; k++) {
              this.mobileSelectedDataArr.push(this.mobileMainArr[k][0]);

              if (k == 0) {
                this.mobileShowRequirementsDetailArr.push(true);
              } else {
                this.mobileShowRequirementsDetailArr.push(false);
              }
            }
          }
        }
      });
  }

  navigate(
    quoteId: string,
    category: string,
    minTravelDate: number,
    basePrice: number,
    serviceTax: number,
    stayPeriod: string,
    imageUploads: string
  ) {
    this.preloaderService.showPreloader(true);

    this.userFlow.setUserFlowDetails("country", this.selectedCountrytype);
    this.userFlow.setUserFlowDetails(
      "purpose",
      this.purposeChooseForm1.get("purposeSelected").value
    );
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
      JSON.stringify(this.imageUpload1)
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

  onClickRequrements(i, j, item) {
    if (
      this.showRequirementsDetailArr[i] == true &&
      this.selectedDataArr[i].fieldName == this.mainArr[i][j].fieldName
    ) {
      this.showRequirementsDetailArr[i] = false;
    } else if (
      this.selectedDataArr[i].fieldName == this.mainArr[i][j].fieldName &&
      this.showRequirementsDetailArr[i] == false
    ) {
      this.showRequirementsDetailArr[i] = true;
    } else {
      this.showRequirementsDetailArr[i] = true;
    }

    this.selectedDataArr[i] = this.mainArr[i][j];
  }
  purposeChanged() {
    var purpose = this.purposeChooseForm1.get("purposeSelected").value;
    //console.log(purpose);
    var country = this.selectedCountrytype;
    var variable = this.selectedVariable;
    window.history.replaceState(
      "",
      "",
      "visa-requirements/" + country + "/" + variable + "/" + purpose
    );
    if (purpose == "Tourist") {
      this.MyQuotation = this.touristArr;
      this.imageUpload1 = this.imageCatogoryTouristTemp;
    } else if (purpose == "Business") {
      this.MyQuotation = this.businessArr;
      this.imageUpload1 = this.imageCatogoryBusinessTemp;
    } else {
      this.MyQuotation = this.transitArr;
      this.imageUpload1 = this.imageCatogoryTransitTemp;
    }
  }

  onClickRequrementsMobile(i, j, item) {
    if (
      this.mobileShowRequirementsDetailArr[i] == true &&
      this.mobileSelectedDataArr[i].fieldName ==
        this.mobileMainArr[i][j].fieldName
    ) {
      this.mobileShowRequirementsDetailArr[i] = false;
    } else if (
      this.mobileSelectedDataArr[i].fieldName ==
      this.mobileMainArr[i][j].fieldName
    ) {
      this.mobileShowRequirementsDetailArr[i] = true;
    } else {
      this.mobileShowRequirementsDetailArr[i] = true;
    }

    this.mobileSelectedDataArr[i] = this.mobileMainArr[i][j];
  }

  ngOnInit() {
    this.titleService.setTitle(
      "Apply For " + this.selectedCountrytype + " Visa Online"
    );
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: "",
      },
    ]);
  }
}
