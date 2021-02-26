import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { VisaRequirementService } from "../visa-requirement.service";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../../login-signup/login/login.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { RequirementsService } from "../../requirements/requirements.service";
import { Title, Meta } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-behrain',
  templateUrl: './bahrain.component.html',
  styleUrls: ['./bahrain.component.css']
})
export class BahrainComponent implements OnInit {
  ngbTabTitleClass;

  selectedRequirement: boolean = false;
  selectedPurpose: Subject<any> = new Subject();

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
  selectedMobileTourist: number = 1;
  selectedMobileBusiness: number = 1;
  selectedMobileTransit: number = 1;

  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];

  public selectedCountrytype = "Bahrain";
  public onlinestatus: boolean = false;
  isBusiness: boolean = false;
  isTourist: boolean = false;
  isTransit: boolean = false;

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
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private doc) {

      this.activatedRoute.params.subscribe((params) => {
        if (params["purpose"]) {
          this.router.navigate(['visa','bahrain-visa-online']);
        }
      });
  
      this.preloaderService.showPreloader(true);

      if (this.userFlow.getCookie("selectedVisaPurpose")) {
        this.selectedVisaType = this.userFlow.getCookie("selectedVisaPurpose");
      } else {
        this.selectedVisaType = "Tourist";
      }
  
      let tempPurpose = this.selectedVisaType;
      this.userFlow.setUserFlowDetails("country", this.selectedCountrytype);
  
      this.purposeChooseForm = new FormGroup({
        purposeSelected: new FormControl(tempPurpose),
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
  
            this.MyQuotation.forEach((element) => {
              if (element.purpose == "Business") {
                this.businessArr.push(element);
                this.isBusiness = true;
              } else if (element.purpose == "Tourist") {
                this.touristArr.push(element);
                this.isTourist = true;
              } else if (element.purpose == "Transit") {
                this.transitArr.push(element);
                this.isTransit = true;
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
  
            this.userFlow.setUserFlowDetails(
              "imageUploads",
              JSON.stringify(this.imageCatogoryTemp)
            );
  
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

    this.titleService.setTitle("Bahrain Visa | Apply For Bahrain Visa Online for Indians- Visa2Fly");
      
    this.meta.updateTag({
      name: "keywords",
      content:
        "apply for Bahrain e-visa, bahrain tourist visa application, bahrain tourist visa for indian, bahrain Visa, apply for bahrain e visa, bahrain e-visa for indians",
    });
    this.meta.updateTag({
      name: "description",
      content:
        "Visa2fly offers Bahrain Visa for Indians. Indian passport holders can easily apply for a Bahrain visa online at Visa2Fly. Visa2fly offers doorstep visa services making it convenient for Indian nationals. Indian nationals can fill their Bahrain visa online with Visa2Fly here.",
    });

    // facebook and linkedin
    this.meta.updateTag({
      property: "og:title",
      content:
        "Bahrain Visa | Apply For Bahrain Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({ property: "type", content: "website" });
    this.meta.updateTag({
      property: "og:image",
      content: "https://static.visa2fly.com/country/Bahrain.jpg",
    });
    this.meta.updateTag({
      property: "og:url",
      content: "https://visa2fly.com/visa/bahrain-visa-online",
    });
    this.meta.updateTag({
      property: "og:image:alt",
      content:
        "Bahrain Visa | Apply For Bahrain Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "og:description",
      content:
        "Visa2fly offers Bahrain Visa for Indians. Indian passport holders can easily apply for a Bahrain visa online at Visa2Fly. Visa2fly offers doorstep visa services making it convenient for Indian nationals. Indian nationals can fill their Bahrain visa online with Visa2Fly here.",
    });

    // twitter
    this.meta.updateTag({
      property: "twitter:card",
      content: "summary",
    });
    this.meta.updateTag({
      property: "twitter:title",
      content:
        "Bahrain Visa | Apply For Bahrain Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:image",
      content: "https://static.visa2fly.com/country/Bahrain.jpg",
    });
    this.meta.updateTag({
      property: "twitter:image:alt",
      content:
        "Bahrain Visa | Apply For Bahrain Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:description",
      content:
        "Visa2fly offers Bahrain Visa for Indians. Indian passport holders can easily apply for a Bahrain visa online at Visa2Fly. Visa2fly offers doorstep visa services making it convenient for Indian nationals. Indian nationals can fill their Bahrain visa online with Visa2Fly here.",
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
    link.setAttribute("href", "https://visa2fly.com/visa/bahrain-visa-online");
  }

  purposeChanged() {
    var purpose = this.purposeChooseForm.get("purposeSelected").value;
    this.userFlow.setCookie("selectedVisaPurpose", purpose);

    if (purpose == "Tourist") {
      this.MyQuotation1 = this.touristArr;
      this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
      this.selectedPurpose.next(purpose);
    } else if (purpose == "Business") {
      this.MyQuotation1 = this.businessArr;
      this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
      this.selectedPurpose.next(purpose);
    } else {
      this.MyQuotation1 = this.transitArr;
      this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
      this.selectedPurpose.next(purpose);
    }

    this.userFlow.setUserFlowDetails(
      "imageUploads",
      JSON.stringify(this.imageCatogoryTemp)
    );
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
      this.selectedMobileTourist = 1;
    } else if (purposeString == "Business") {
      this.MyQuotation1 = this.businessArr;
      this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
      this.selectedVisaType = "Business";
      this.selectedBusiness = 1;
      this.selectedMobileBusiness = 1;
    } else {
      this.MyQuotation1 = this.transitArr;
      this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
      this.selectedVisaType = "Transit";
      this.selectedTransit = 1;
      this.selectedMobileTransit = 1;
    }

    this.userFlow.setCookie("selectedVisaPurpose", purposeUrl);

    this.userFlow.setUserFlowDetails(
      "imageUploads",
      JSON.stringify(this.imageCatogoryTemp)
    );
  }

}
