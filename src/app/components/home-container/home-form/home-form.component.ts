import {
  Component,
  PLATFORM_ID,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { HomeFormService } from "./home-form.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { element } from "protractor";
import { visaFormData } from "src/app/interfaces/visa-form";

@Component({
  selector: "app-home-form",
  templateUrl: "./home-form.component.html",
  styleUrls: ["./home-form.component.css"],
})
export class HomeFormComponent {
  homeFormData: visaFormData;

  resideInArr: Array<string> = [];
  purposeArr: Array<string> = [];

  homeForm: FormGroup;

  country: AbstractControl;
  purpose: AbstractControl;
  livesIn: AbstractControl;

  purposeNotSelected: boolean = false;
  livesInNotSelected: boolean = false;

  countryNotSelected: boolean;
  countryList: string[];
  tempCountryList: string[];

  constructor(
    private router: Router,
    private homeFormService: HomeFormService,
    private userFlow: UserFlowDetails,
    private preloaderService: PreloaderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.preloaderService.showPreloader(true);

    this.homeForm = new FormGroup({
      country: new FormControl("Armenia"),
      purpose: new FormControl(null),
      livingin: new FormControl(null),
    });

    this.country = this.homeForm.get("country");
    this.purpose = this.homeForm.get("purpose");
    this.livesIn = this.homeForm.get("livingin");

    this.homeFormService.homeFormData.subscribe((res: visaFormData) => {
      this.homeFormData = res;
      this.countryList = this.homeFormData.countries;

      if (isPlatformBrowser(this.platformId)) {
        let activeCountry: string = this.userFlow.getCookie("activeCountry");
        let popularCountry: string = this.userFlow.getCookie("popularCountry");
        if (
          activeCountry == "" ||
          activeCountry == undefined ||
          activeCountry == null
        ) {
          this.country.setValue(this.homeFormData.countries[0]);
          this.homeForm.get('country').setValue(this.homeFormData.countries[0]);
          this.sortPurposeArr(this.homeFormData.data[this.homeForm.get('country').value]['purpose'])
          this.resideInArr = this.homeFormData.data[this.homeForm.get('country').value]['residenceOf'];

        } else {
          this.country.setValue(activeCountry);
          this.userFlow.setCookie("activeCountry", "");
        }
        if (
          popularCountry == "" ||
          popularCountry == undefined ||
          popularCountry == null
        ) {
          this.country.setValue(this.homeFormData.countries[0]);
          this.homeForm.get('country').setValue(this.homeFormData.countries[0]);
          this.sortPurposeArr(this.homeFormData.data[this.homeForm.get('country').value]['purpose'])
          this.resideInArr = this.homeFormData.data[this.homeForm.get('country').value]['residenceOf'];
        } else {
          this.country.setValue(popularCountry);
          this.userFlow.setCookie("popularCountry", "");
        }
      }

      this.preloaderService.showPreloader(false);

    });



    this.homeFormService.countryInputModel.subscribe((res: string) => {
      this.country.setValue(res);
      this.homeForm.get('country').setValue(res);
      this.countryChanged(res);
    });

    this.homeFormService.visaTypeInputModel.subscribe((res: string) => {
      this.purpose.setValue(res);
    });

    this.homeFormService.resideInInputModel.subscribe((res: string) => {
      this.livesIn.setValue(res);
    });
  }

  ngOnInit() {
    // console.log(this.homeForm.get('purpose').value == "");
  }

  countryChanged(event: string) {
    if (event == undefined || event == null || event == "") {
      this.homeForm.get("purpose").setValue(null);
      this.homeForm.get("livingin").setValue(null);
      this.countryNotSelected = true;
    } else {
      this.homeForm.get("purpose").setValue(null);
      this.homeForm.get("livingin").setValue(null);
      this.sortPurposeArr(this.homeFormData.data[event]['purpose'])
      this.resideInArr = this.homeFormData.data[event]['residenceOf'];
      this.countryNotSelected = false;
    }
  }

  validateCountry() {
    if (
      !(this.country.value == undefined || this.country.value == null || this.country.value == "")
    ) {
      return true;
    } else {
      this.countryNotSelected = true;
      return false;
    }
  }

  validatePurpose() {
    if (
      !(this.purpose.value == undefined || this.purpose.value == null || this.purpose.value == "")
    ) {
      return true;
    } else {
      this.purposeNotSelected = true;
      return false;
    }
  }

  validateLivingIn() {
    if (
      !(this.livesIn.value == undefined || this.livesIn.value == null || this.livesIn.value == "")
    ) {
      return true;
    } else {
      this.livesInNotSelected = true;
      return false;
    }
  }

  validateForm() {
    this.validatePurpose();
    this.validateLivingIn();
    this.validateCountry()

    if (this.validateCountry() && this.validatePurpose() && this.validateLivingIn()) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    // console.log(this.homeForm.value);
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

    this.country.valueChanges.subscribe((value) => {
      if (value == "" || value == undefined || value == null) {
        this.countryNotSelected = true;
      } else {
        this.countryNotSelected = false;
      }
    });

    if (this.validateForm()) {
      let purpose = this.homeForm.get("purpose").value;
      let country = this.homeForm.get("country").value;
      let variable = "apply-for-" + country + "-visa-online";

      switch (country) {
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

        case "Russia": {
          this.router.navigate(["visa/russia-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

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

        case "Germany": {
          this.router.navigate(["visa/germany-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

        // case "Iraq": {
        //   this.router.navigate(["visa/iraq-visa-online"]);
        //   this.userFlow.setCookie("selectedVisaPurpose", purpose);
        //   break;
        // }

        case "Malta": {
          this.router.navigate(["visa/malta-visa-online"]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
          break;
        }

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
            "" + country,
            variable
          ]);
          this.userFlow.setCookie("selectedVisaPurpose", purpose);
        }
      }
    }
  }

  sortPurposeArr(purposeArr: Array<string>) {
    this.purposeArr = [];
    let purposeCustomArr: Array<{ purpose: string, order: number }> = []
    purposeArr.forEach(element => {
      if (element == "Tourist") {
        purposeCustomArr.push({
          purpose: "Tourist",
          order: 1
        })
      } else if (element == "Business") {
        purposeCustomArr.push({
          purpose: "Business",
          order: 2
        })
      } else if (element == "Transit") {
        purposeCustomArr.push({
          purpose: "Transit",
          order: 3
        })
      }
    });

    purposeCustomArr.sort(function (a, b) {
      return a.order - b.order || a.purpose.localeCompare(b.purpose);
    });

    purposeCustomArr.forEach(element => {
      this.purposeArr.push(element.purpose);
    })
  }

  @ViewChild('countryInput') countryInput: ElementRef;
  @ViewChild('visaTypeInput') visaTypeInput: ElementRef;
  @ViewChild('resideInInput') resideInInput: ElementRef;

  focusInputField(input: string) {
    setTimeout(() => {
      if (input == 'country') {
        this.countryInput.nativeElement.focus()
      } else if (input == 'visaType') {
        this.visaTypeInput.nativeElement.focus()
      } else if (input == 'resideIn') {
        this.resideInInput.nativeElement.focus()
      }
    }, 10)
  }

  inputSearchFn(term: string, item: any) {
    // console.log(term);
    // console.log(item);
    term = term.toLocaleLowerCase();
    return item.toLocaleLowerCase().indexOf(term) > -1 || item.toLocaleLowerCase().indexOf(term) > -1;
  }

  visaTypeSearchFn(term: string, item: any) {
    // console.log(term);
    // console.log(item);
    term = term.toLocaleLowerCase();
    return item.toLocaleLowerCase().indexOf(term) > -1 || item.toLocaleLowerCase().indexOf(term) > -1;
  }

  resideInSearchFn(term: string, item: any) {
    // console.log(term);
    // console.log(item);
    term = term.toLocaleLowerCase();
    return item.toLocaleLowerCase().indexOf(term) > -1 || item.toLocaleLowerCase().indexOf(term) > -1;
  }
}
