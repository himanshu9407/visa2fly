import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
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
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { ToastrService } from "ngx-toastr";
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
      ),
    ]),
  ],
})
export class MaldivesComponent implements OnInit {
  ngbTabTitleClass;

  selectedRequirement: boolean = false;
  // selectedRequirement: boolean = false;
  selectedPurpose: Subject<any> = new Subject();
  
  public selectedVisaType = "Tourist";
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
  selectedMobileTourist: number = 1;
  selectedMobileBusiness: number = 1;
  selectedMobileTransit: number = 1;

  public selectedCountrytype="Maldives";

  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  activeTouristArr: Array<any> = [];

  constructor(
    private router: Router,
    private requireQuotation: VisaRequirementService,
    private userFlow: UserFlowDetails,
    private toastr: ToastrService,
    private preloaderService: PreloaderService,
    private titleService: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params["purpose"]) {
        this.router.navigate(["visa", "maldives-visa-online"]);
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

    setTimeout(() => {
      this.preloaderService.showPreloader(false);
    }, 500);
  }

  ngOnInit() {
    this.titleService.setTitle(
      "Maldives Visa | Apply For Maldives Visa Online for Indians- Visa2Fly"
    );

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
