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
import { PreloaderService } from "src/app/shared/preloader.service";
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';


export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-antigua',
  templateUrl: './antigua.component.html',
  styleUrls: ['./antigua.component.css'],
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
export class AntiguaComponent implements OnInit {

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

  public selectedCountrytype = "Antigua & Barbuda";
  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  public imageUpload1: Array<any> = [];

  constructor(private router: Router,
    private requireQuotation: VisaRequirementService,
    private userFlow: UserFlowDetails,
    private toastr: ToastrService,
    private preloaderService: PreloaderService,
    private titleService: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private doc) {


      // this.userControlDetail = this.userFlow.getUserFlowDetails();
      // console.log(this.userControlDetail.purpose);
  
      // this.preloaderService.showPreloader(true);
  
      if (this.userFlow.getCookie("selectedVisaPurpose")) {
        this.selectedVisaType = this.userFlow.getCookie("selectedVisaPurpose");
      } else {
        this.selectedVisaType = "Tourist";
      }
  
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
      "Antigua & Barbuda Visa | Apply For Antigua & Barbuda Visa Online for Indians- Visa2Fly"
    );
    this.meta.updateTag({
      name: "keywords",
      content:
        "apply for antigua & barbuda e-visa, antigua & barbuda tourist visa application, antigua & barbuda tourist visa for indian, apply for antigua & barbuda e visa, antigua & barbuda e-visa for indians",
    });
    this.meta.updateTag({
      name: "description",
      content:
        "Visa2fly offers Antigua & Barbuda visa for Indians. Indian passport holders can easily apply for a Antigua & Barbuda visa online at Visa2Fly. Visa2fly offers doorstep visa services making it convenient for Indian nationals. Indian nationals can fill their Antigua & Barbuda visa online with Visa2Fly here.",
    });

    // facebook and linkedin
    this.meta.updateTag({
      property: "og:title",
      content:
        "Antigua & Barbuda Visa | Apply For Antigua & Barbuda Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({ property: "type", content: "website" });
    this.meta.updateTag({
      property: "og:image",
      content: "https://static.visa2fly.com/country/Antigua.jpg",
    });
    this.meta.updateTag({
      property: "og:url",
      content: "https://visa2fly.com/visa/antigua & barbuda-visa-online",
    });
    this.meta.updateTag({
      property: "og:image:alt",
      content:
        "Antigua & Barbuda Visa Visa | Apply For Antigua & Barbuda Visa Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "og:description",
      content:
        "Visa2fly offers Antigua & Barbuda visa for Indians. Indian passport holders can easily apply for a Antigua & Barbuda visa online at Visa2Fly. Visa2fly offers doorstep visa services making it convenient for Indian nationals. Indian nationals can fill their Antigua & Barbuda visa online with Visa2Fly here.",
    });

    // twitter
    this.meta.updateTag({
      property: "twitter:card",
      content: "summary",
    });
    this.meta.updateTag({
      property: "twitter:title",
      content:
        "Antigua & Barbuda Visa | Apply For Antigua & Barbuda Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:image",
      content: "https://static.visa2fly.com/country/Antigua.jpg",
    });
    this.meta.updateTag({
      property: "twitter:image:alt",
      content:
        "Antigua & Barbuda Visa | Apply For Antigua & Barbuda Visa Online for Indians- Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:description",
      content:
        "Visa2fly offers Antigua & Barbuda visa for Indians. Indian passport holders can easily apply for a Antigua & Barbuda visa online at Visa2Fly. Visa2fly offers doorstep visa services making it convenient for Indian nationals. Indian nationals can fill their Antigua & Barbuda visa online with Visa2Fly here.",
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
      "https://visa2fly.com/visa/antigua & barbuda-visa-online"
    );
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