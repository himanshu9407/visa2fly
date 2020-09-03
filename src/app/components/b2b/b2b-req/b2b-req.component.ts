import { Component, OnInit } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  state
} from "@angular/animations";
import { ToastService } from "src/app/shared/toast.service";
import { RequirementsService } from "../../requirements/requirements.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { LoginService } from "../../login-signup/login/login.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { B2bReqService } from "./b2b-req.service";
import { ToastrService } from 'ngx-toastr';
import { HomeServiceService } from "src/app/home-service.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: "app-b2b-req",
  templateUrl: "./b2b-req.component.html",
  styleUrls: ["./b2b-req.component.css"],
  animations: [
    trigger("simpleFadeAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(800)]),
      transition(
        ":leave",
        animate(800, style({ opacity: 0, background: "green" }))
      ),
    ]),
  ],
})
export class B2bReqComponent implements OnInit {
  userControlDetail: any;
  selectedVisaType: any;

  public userFlowDetails: any;
  public requirementsData: any;

  businessArr: Array<any> = [];
  touristArr: Array<any> = [];
  transitArr: Array<any> = [];

  public onlinestatus: boolean = false;

  MyQuotation: Array<any> = [];
  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  public imageUpload1: Array<any> = [];

  Quotation: Array<any> = [];
  public purposeApi: Array<any> = [];
  public purposeApiNew: Array<any> = [];

  MyQuotation1: any;
  importantInfo: any;

  public faqs: Array<any> = [];
  public dataSource: Array<{
    id: string;
    dataToggle: string;
    dataToggleHash: string;
  }> = [];

  public mainArr: Array<any> = [[]];
  public mobileMainArr: Array<any> = [[]];

  public selectedPurposeType: any;
  public selectedCountrytype: any;

  public selectedDataArr: Array<any> = [this.mainArr[0][0]];
  public mobileSelectedDataArr: Array<any> = [this.mobileMainArr[0][0]];

  public showRequirementsDetailArr = [true];
  public mobileShowRequirementsDetailArr = [true];

  purposeChooseForm: FormGroup;

  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  selectedItem: string;
  id: any;

  constructor(
    private router: Router,
    private myservice: HomeServiceService,
    private reqService: B2bReqService,
    private userFlow: UserFlowDetails,
    private routerHistory: RouterHistory,
    private toastr: ToastrService,
    private titleService: Title,
    private meta: Meta,
    private loginStatus: LoginStatusService,
    private loginService: LoginService,
    private preloaderService: PreloaderService,
    private activateRoute: ActivatedRoute
  ) {
    this.preloaderService.showPreloader(true);
    this.activateRoute.params.subscribe((params: any) => {
      this.selectedPurposeType = params.purpose;
      this.selectedCountrytype = params.country;
    });
    let tempPurpose = this.selectedPurposeType;
    this.id = this.userFlow.getB2BUserFlowDetails().id;
    this.purposeChooseForm = new FormGroup({
      purposeSelected: new FormControl(tempPurpose)
    });
    this.reqService
      .getRequirementsData(this.selectedCountrytype)
      .then((data: any) => {
        if (data.code == "0") {
          this.requirementsData = data;
          this.Quotation = data.data.displayQuotes;
          this.Quotation.forEach(element => {
            this.purposeApi.push(element.purpose);
            if (element.purpose == "Tourist") {
              this.touristArr.push(element);
              this.userFlow.setUserFlowDetails("imageUpload", element.imageUpload);
            } else if (element.purpose == "Business") {
              this.businessArr.push(element);
              this.userFlow.setUserFlowDetails("imageUpload", element.imageUpload);
            } else {
              this.transitArr.push(element);
              this.userFlow.setUserFlowDetails("imageUpload", element.imageUpload);
            }
          });

          for (var value of this.purposeApi) {
            if (this.purposeApiNew.indexOf(value) === -1) {
              this.purposeApiNew.push(value);
            }
          }

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

          if (this.onlinestatus) {
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


            let temp1 = JSON.parse(this.userFlow.getCookie("userFlowDetails"));
            this.userFlow.setUserFlowDetails(
              "onlineCountry",
              JSON.stringify(data.data.onlineCategory)
            );
            this.imageUpload1 = this.imageCatogoryTemp;
          }

          let temp = [];
          let i,
            j,
            temparray,
            chunk = 3;

          this.mainArr = [];

          for (i = 0, j = data.data.fieldDetails.length; i < j; i += chunk) {
            temparray = data.data.fieldDetails.slice(i, i + chunk);
            this.mainArr.push(temparray);
          }

          let i1,
            j1,
            temparray1,
            chunk1 = 1;

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

        setTimeout(() => {
          this.preloaderService.showPreloader(false);
        }, 1000);
      });
  }

  navigate(
    quoteId: string,
    category: string,
    minTravelDate: number,
    basePrice: number,
    serviceTax: number,
    stayPeriod: string,
    imageUpload: Boolean
  ) {
    this.preloaderService.showPreloader(true);

    this.userFlow.setB2BUserFlowDetails("country", this.selectedCountrytype);
    this.userFlow.setB2BUserFlowDetails(
      "purpose",
      this.purposeChooseForm.get("purposeSelected").value
    );
    this.userFlow.setB2BUserFlowDetails("quoteId", quoteId);
    this.userFlow.setB2BUserFlowDetails("category", category);
    this.userFlow.setB2BUserFlowDetails(
      "minTravelDate",
      JSON.stringify(minTravelDate)
    );

    this.userFlow.setB2BUserFlowDetails("basePrice", JSON.stringify(basePrice));
    this.userFlow.setB2BUserFlowDetails(
      "serviceTax",
      JSON.stringify(serviceTax)
    );
    this.userFlow.setB2BUserFlowDetails("stayPeriod", stayPeriod);
    this.userFlow.setUserFlowDetails("imageUpload", JSON.stringify(imageUpload));
    this.userFlow.setB2BUserFlowDetails(
      "imageUploads",
      JSON.stringify(this.imageUpload1)
    );


    this.reqService.verifyQuotation(quoteId).subscribe((data: any) => {
      if (data.code == "0") {
        
        this.router.navigate(["b2b/b2b-add-traveller"]);
      } else {
        this.preloaderService.showPreloader(false);
        this.toastr.error("" + data.message);
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
    var purpose = this.purposeChooseForm.get("purposeSelected").value;
    var country = this.selectedCountrytype;
    window.history.replaceState(
      "",
      "",
      "visa-requirement/" + country + "/" + purpose
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
    this.titleService.setTitle("Apply For " + this.selectedCountrytype + " Visa Online");
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      },
    ]);
  }

  setActiveItem(index: string, id: string) {
    this.selectedItem = index;

    if ($("#requiredSource" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveItemMobile(index: string, id: string) {
    this.selectedItem = index;

    if ($("#requiredSourceMobile" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }
}
