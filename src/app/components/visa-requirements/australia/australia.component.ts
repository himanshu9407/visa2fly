import {
  Component,
  OnInit,
  Inject,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms"; "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { VisaRequirementService } from "../visa-requirement.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { Title, Meta } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";
import { Subject } from 'rxjs';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-australia",
  templateUrl: "./australia.component.html",
  styleUrls: ["./australia.component.css"]
})
export class AustraliaComponent implements OnInit {
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
  public onlinestatus: boolean = false;

  businessArr: Array<any> = [];
  touristArr: Array<any> = [];
  transitArr: Array<any> = [];
  selectedBusiness: number = 1;
  selectedTransit: number = 1;
  selectedTourist: number = 1;
  selectedMobileTourist: number = 1;
  selectedMobileBusiness: number = 1;
  selectedMobileTransit: number = 1;

  public selectedCountrytype = "Australia";
  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  public imageUpload1: Array<any> = [];
  isBusiness: boolean = false;
  isTourist: boolean = false;
  isTransit: boolean = false;

  constructor(
    private router: Router,
    private requireQuotation: VisaRequirementService,
    private userFlow: UserFlowDetails,
    private toastr: ToastrService,
    private preloaderService: PreloaderService,
    private titleService: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private doc
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params["purpose"]) {
        this.router.navigate(["visa", "australia-visa-online"]);
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

          console.log(this.MyQuotation1);

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
    this.titleService.setTitle(
      "Australia Visa | Apply For Australia Visa Online for Indians- Visa2Fly"
    );
    this.meta.updateTag({
      name: "keywords",
      content:
        "apply for australia e-visa, australia tourist visa application, australia tourist visa for indian, apply for australia e visa, australia e-visa for indians",
    });
    this.meta.updateTag({
      name: "description",
      content:
        "Planning to visit Australia? Apply your Australia e-visa online at Visa2Fly to make experience a hassle-free and convenient experience. Visa2Fly offers a swifter visa process with additional benefits like travel insurance and travel sim cards. Know more.",
    });

    // facebook and linkedin
    this.meta.updateTag({
      property: "og:title",
      content:
        "Australia Visa | Apply For Australia Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({ property: "type", content: "website" });
    this.meta.updateTag({
      property: "og:image",
      content: "https://static.visa2fly.com/country/Australia.jpg",
    });
    this.meta.updateTag({
      property: "og:url",
      content: "https://visa2fly.com/visa/australia-visa-online",
    });
    this.meta.updateTag({
      property: "og:image:alt",
      content:
        "Australia Visa | Apply For Australia Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "og:description",
      content:
        "Planning to visit Australia? Apply your Australia e-visa online at Visa2Fly to make experience a hassle-free and convenient experience. Visa2Fly offers a swifter visa process with additional benefits like travel insurance and travel sim cards. Know more.",
    });

    // twitter
    this.meta.updateTag({
      property: "twitter:card",
      content: "summary",
    });
    this.meta.updateTag({
      property: "twitter:title",
      content:
        "Australia Visa | Apply For Australia Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:image",
      content: "https://static.visa2fly.com/country/Australia.jpg",
    });
    this.meta.updateTag({
      property: "twitter:image:alt",
      content:
        "Australia Visa | Apply For Australia Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:description",
      content:
        "Planning to visit Australia? Apply your Australia e-visa online at Visa2Fly to make experience a hassle-free and convenient experience. Visa2Fly offers a swifter visa process with additional benefits like travel insurance and travel sim cards. Know more.",
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
      "https://visa2fly.com/visa/australia-visa-online"
    );
  }

  purposeChanged(event: any) {
    this.selectedVisaType = event;
    this.purposeChooseForm.get("purposeSelected").setValue(event);
    this.userFlow.setCookie("selectedVisaPurpose", event);

    if (event == "Tourist") {
      this.MyQuotation1 = this.touristArr;
      this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
      this.selectedPurpose.next(event);
    } else if (event == "Business") {
      this.MyQuotation1 = this.businessArr;
      this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
      this.selectedPurpose.next(event);
    } else {
      this.MyQuotation1 = this.transitArr;
      this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
      this.selectedPurpose.next(event);
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
