import {
  Component,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { HomeFormService } from "./home-form.service";
import { HomeFormModel } from "./home-form.model";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { PreloaderService } from "src/app/shared/preloader.service";

@Component({
  selector: "app-home-form",
  templateUrl: "./home-form.component.html",
  styleUrls: ["./home-form.component.css"],
})
export class HomeFormComponent {
  homeForm: FormGroup;
  public homeFormData: any = {
    code: "0",
    status: "SUCCESS",
    message: "Data Fetched Successfully",
    data: {
      countries: ["China", "Sri Lanka", "Australia"],
      data: {
        "Sri Lanka": {
          countryName: "Sri Lanka",
          purpose: ["Business", "Transit", "Tourist"],
          entryType: ["Single Entry"],
          Business: ["Single Entry"],
          Transit: ["Single Entry"],
          Tourist: ["Single Entry"],
          residenceOf: ["Delhi", "Noida", "Gurugram"],
        },
        China: {
          countryName: "China",
          purpose: ["Business", "Transit", "Tourist"],
          entryType: ["Single Entry", "Double Entry", "Multiple Entry"],
          Business: ["Single Entry", "Double Entry", "Multiple Entry"],
          Transit: ["Single Entry"],
          Tourist: ["Single Entry", "Double Entry", "Multiple Entry"],
          residenceOf: ["Delhi", "Noida", "Gurugram"],
        },
        Australia: {
          countryName: "Australia",
          purpose: ["Business"],
          entryType: ["Single entry"],

          Business: ["Single Entry", "Multiple Entry"],
          Transit: ["Single Entry"],
          Tourist: ["Single Entry", "Multiple Entry"],
          residenceOf: ["Delhi"],
        },
      },
    },
  };

  public selectedResidenceOf: string = "select";
  public selectedCountry: string = "Sri Lanka";
  public selectedPurpose: string = "select";

  public country: AbstractControl;
  public purpose: AbstractControl;
  public livesIn: AbstractControl;

  public purposeNotSelected: boolean = false;
  public livesInNotSelected: boolean = false;
  staticPagesArr: Array<any> = ["United Kingdom"];

  constructor(
    private router: Router,
    private homeFormService: HomeFormService,
    private userFlow: UserFlowDetails,
    private preloaderService: PreloaderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.preloaderService.showPreloader(true);

    this.homeForm = new FormGroup({
      country: new FormControl("Sri Lanka"),
      purpose: new FormControl(""),
      livingin: new FormControl(""),
    });

    this.country = this.homeForm.get("country");
    this.purpose = this.homeForm.get("purpose");
    this.livesIn = this.homeForm.get("livingin");

    // console.log(this.homeFormData.data.countries);

    this.homeFormService.getHomeFormDataFromServer().subscribe((data) => {
      if (isPlatformBrowser(this.platformId)) {
        this.homeFormData = data;
        let activeCountry: string = this.userFlow.getCookie("activeCountry");
        let popularCountry: string = this.userFlow.getCookie("popularCountry");
        if (
          activeCountry == "" ||
          activeCountry == undefined ||
          activeCountry == null
        ) {
          this.country.setValue(this.homeFormData.data.countries[0]);
          this.selectedCountry = this.homeFormData.data.countries[0];

        } else {
          this.country.setValue(activeCountry);
          this.userFlow.setCookie("activeCountry", "");
        }
        if (
          popularCountry == "" ||
          popularCountry == undefined ||
          popularCountry == null
        ) {
          this.country.setValue(this.homeFormData.data.countries[0]);
          this.selectedCountry = this.homeFormData.data.countries[0];
        } else {
          this.country.setValue(popularCountry);
          this.userFlow.setCookie("popularCountry", "");
        }

        this.userFlow.setCookie(
          "countryList",
          JSON.stringify(data.data.countries)
        );
        this.preloaderService.showPreloader(false);
      }
    });
  }

  ngOnInit() {
    // console.log(this.homeForm.get('purpose').value == "");
  }

  countryChanged() {
    // console.log("country changed");
    let temoCountry = this.homeForm.get("country").value;
    this.homeForm.get("purpose").setValue("select");
    // this.homeForm.get('visatype').setValue('select');
    this.homeForm.get("livingin").setValue("select");
    // this.homeForm.get('purpose')
    this.selectedPurpose = "select";
    //this.selectedVisaType = 'select';
    this.selectedResidenceOf = "select";
    this.homeForm.get("country").setValue(temoCountry);
  }

  validatePurpose() {
    if (
      (this.purpose.dirty && this.purpose.value == "select") ||
      !this.purpose.touched ||
      this.purpose.pristine
    ) {
      this.purposeNotSelected = true;
      return false;
    } else {
      return true;
    }
  }

  validateLivingIn() {
    if (
      (this.livesIn.dirty && this.livesIn.value == "select") ||
      !this.livesIn.touched ||
      this.livesIn.pristine
    ) {
      this.livesInNotSelected = true;

      return false;
    } else {
      return true;
    }
  }

  validateForm() {
    //console.log("validate form method called");
    this.validatePurpose();
    //this.validatePurposeType();
    this.validateLivingIn();
    if (this.validatePurpose() == false || this.validateLivingIn() == false) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    this.purpose.valueChanges.subscribe((value) => {
      if (value == "select") {
        this.purposeNotSelected = true;
      } else {
        this.purposeNotSelected = false;
      }
    });

    this.livesIn.valueChanges.subscribe((value) => {
      if (value == "select") {
        this.livesInNotSelected = true;
      } else {
        this.livesInNotSelected = false;
      }
    });
    if (this.validateForm()) {
      let purpose = this.homeForm.get("purpose").value;
      let country1 = this.homeForm.get("country").value;
      let variable = "apply-for-" + country1 + "-visa-online";
      let countryTemp1 = this.staticPagesArr.includes(this.selectedCountry);

      switch (this.selectedCountry) {
        case "United Kingdom": {
          this.router.navigate(["visa/uk-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "South Africa": {
          this.router.navigate(["visa/south-africa-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "New Zealand": {
          this.router.navigate(["visa/new-zealand-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Ukraine": {
          this.router.navigate(["visa/ukraine-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Bahrain": {
          this.router.navigate(["visa/bahrain-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        // case "Taiwan": {
        //   this.router.navigate(["visa/taiwan-visa-online"]);
        //   this.userFlow.setCookie("selectedVisaPurpose", purpose);
        //   break;
        // }

        // case "Rwanda": {
        //   this.router.navigate(["visa/rwanda-visa-online"]);
        //   this.userFlow.setCookie("selectedVisaPurpose", purpose);
        //   break;
        // }

        case "Armenia": {
          this.router.navigate(["visa/armenia-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Japan": {
          this.router.navigate(["visa/japan-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Kenya": {
          this.router.navigate(["visa/kenya-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        // case "Brazil": {
        //   this.router.navigate(["visa/brazil-visa-online"]);
        //   this.userFlow.setCookie("selectedVisaPurpose", purpose);
        //   break;
        // }

        // case "Tajikistan": {
        //   this.router.navigate(["visa/uk-visa-online"]);
        //   this.userFlow.setCookie("selectedVisaPurpose", purpose);
        //   break;
        // }

        case "Zambia": {
          this.router.navigate(["visa/zambia-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        // case "Russia": {
        //   this.router.navigate(["visa/russia-visa-online"]);
        //   this.userFlow.setCookie("selectedVisaPurpose", purpose);
        //   break;
        // }

        case "Uzbekistan": {
          this.router.navigate(["visa/uzbekistan-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Switzerland": {
          this.router.navigate(["visa/swiss-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "UAE": {
          this.router.navigate(["visa/uae-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "France": {
          this.router.navigate(["visa/france-visa-online/"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "China": {
          this.router.navigate(["visa/china-visa-online/"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Ethiopia": {
          this.router.navigate(["visa/ethiopia-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Finland": {
          this.router.navigate(["visa/finland-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Belgium": {
          this.router.navigate(["visa/belgium-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Canada": {
          this.router.navigate(["visa/canada-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        // case "Austria": {
        //   this.router.navigate(["visa/austria-visa-online"]);
        //   this.userFlow.setCookie("selectedVisaPurpose", purpose);
        //   break;
        // }

        // case "Bhutan": {
        //   this.router.navigate(["visa/bhutan-visa-online"]);
        //   this.userFlow.setCookie("selectedVisaPurpose", purpose);
        //   break;
        // }

        case "Estonia": {
          this.router.navigate(["visa/estonia-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }


        case "Denmark": {
          this.router.navigate(["visa/denmark-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Georgia": {
          this.router.navigate(["visa/georgia-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        // case "Germany": {
        //   this.router.navigate(["visa/germany-visa-online"]);
        //   this.userFlow.setCookie("selectedVisaPurpose", purpose);
        //   break;
        // }

        // case "Iraq": {
        //   this.router.navigate(["visa/iraq-visa-online"]);
        //   this.userFlow.setCookie("selectedVisaPurpose", purpose);
        //   break;
        // }

        case "Malaysia": {
          this.router.navigate(["visa/malaysia-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "Dubai": {
          this.router.navigate(["visa/dubai-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Egypt": {
          this.router.navigate(["visa/egypt-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Maldives": {
          this.router.navigate(["visa/maldives-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "Sri Lanka": {
          this.router.navigate(["visa/sri-lanka-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "Spain": {
          this.router.navigate(["visa/spain-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Singapore": {
          this.router.navigate(["visa/singapore-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "Cambodia": {
          this.router.navigate(["visa/cambodia-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "Turkey": {
          this.router.navigate(["visa/turkey-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "Azerbaijan": {
          this.router.navigate(["visa/azerbaijan-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "Thailand": {
          this.router.navigate(["visa/thailand-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Vietnam": {
          this.router.navigate(["visa/vietnam-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "Australia": {
          this.router.navigate(["visa/australia-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "USA": {
          this.router.navigate(["visa/usa-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }
        case "Netherlands": {
          this.router.navigate(["visa/netherlands-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        case "Antigua & Barbuda": {
          this.router.navigate(["visa/antigua & barbuda-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        default: {
          this.router.navigate([
            "visa-requirements/",
            "" + country1,
            variable
          ]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
        }
      }
    }
  }
}
