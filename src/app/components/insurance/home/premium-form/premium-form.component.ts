import { LoginStatusService } from 'src/app/shared/login-status.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { InsuranceService } from '../../insurance.service';
import { LoginService } from 'src/app/components/login-signup/login/login.service';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { RouterHistory } from 'src/app/shared/router-history.service';
import { catchError } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-premium-form',
  templateUrl: './premium-form.component.html',
  styleUrls: ['./premium-form.component.css']
})
export class PremiumFormComponent implements OnInit {
  getPremiumForm: FormGroup;
  minDate: any;
  today: Date;
  travellersAge: FormArray;
  count: number = 4;
  destinationNotSelected: boolean = false;
  tripStartDateNotSelected: boolean = false;
  tripEndDateNotSelected: boolean = false;
  ageOfTravellersError: boolean = false;
  enableCheckoutBtn: boolean = false;
  deniedCountryEnable: boolean = false;
  deniedCountry: string;
  activeRoute: string;
  selectedCountry: string;

  title: string = "Visa2fly | Insurance";

  constructor(
    private formBuilder: FormBuilder,
    private insuranceService: InsuranceService,
    private userflowDetails: UserFlowDetails,
    private titleService: Title,
    private router: Router,
    private userFlow: UserFlowDetails,
    private toastr: ToastrService,
    private loginStatus: LoginStatusService,
    private loginService: LoginService,
    private routerHistory: RouterHistory,
    private preloaderService: PreloaderService,
  ) { }

  ngOnInit(): void {
    this.getPremiumForm = this.formBuilder.group({
      country: ["", [Validators.required]],
      ageOfTravellers: this.formBuilder.array([
        this.formBuilder.group({
          memberAge: ['', [Validators.required]],
        }),
        this.formBuilder.group({
          memberAge: '',
        }),
        this.formBuilder.group({
          memberAge: '',
        }),
        this.formBuilder.group({
          memberAge: '',
        }),
      ]),
      tripStartDate: ["", [Validators.required]],
      tripEndDate: ["", [Validators.required]],
      anyMedicalCondition: [false],
      // frequentTraveller: [false, [Validators.required]],
      // tripFrequency: [30, [Validators.required]]
    });

    this.today = new Date();
    this.enableReviewPremiumForm();

    this.titleService.setTitle(this.title);
  }

  keyword = 'name';
  public countries = [
    { 'id': 1, 'name': "China" },
    { 'id': 2, 'name': "Dubai" },
    { 'id': 3, 'name': "United States (US)" },
    { 'id': 4, 'name': "Indonesia" },
    { 'id': 5, 'name': "Pakistan" },
    { 'id': 6, 'name': "Brazil" },
    { 'id': 7, 'name': "Nigeria" },
    { 'id': 8, 'name': "Bangladesh" },
    { 'id': 9, 'name': "Russia" },
    { 'id': 10, 'name': "Mexico" },
    { 'id': 11, 'name': "Japan" },
    { 'id': 12, 'name': "Ethiopia" },
    { 'id': 13, 'name': "Philippines" },
    { 'id': 14, 'name': "Egypt" },
    { 'id': 15, 'name': "Vietnam" },
    { 'id': 16, 'name': "DR Congo" },
    { 'id': 17, 'name': "Turkey" },
    { 'id': 18, 'name': "Iran" },
    { 'id': 19, 'name': "Germany" },
    { 'id': 20, 'name': "Thailand" },
    { 'id': 21, 'name': "United Kingdom (UK)" },
    { 'id': 22, 'name': "France" },
    { 'id': 23, 'name': "Italy" },
    { 'id': 24, 'name': "Tanzania" },
    { 'id': 25, 'name': "South Africa" },
    { 'id': 26, 'name': "Myanmar" },
    { 'id': 27, 'name': "Kenya" },
    { 'id': 28, 'name': "South Korea" },
    { 'id': 29, 'name': "Colombia" },
    { 'id': 30, 'name': "Spain" },
    { 'id': 31, 'name': "Uganda" },
    { 'id': 32, 'name': "Argentina" },
    { 'id': 33, 'name': "Algeria" },
    { 'id': 34, 'name': "Sudan" },
    { 'id': 35, 'name': "Ukraine" },
    { 'id': 36, 'name': "Iraq" },
    { 'id': 37, 'name': "Afghanistan" },
    { 'id': 38, 'name': "Poland" },
    { 'id': 39, 'name': "Canada" },
    { 'id': 40, 'name': "Morocco" },
    { 'id': 41, 'name': "Saudi Arabia" },
    { 'id': 42, 'name': "Uzbekistan" },
    { 'id': 43, 'name': "Peru" },
    { 'id': 44, 'name': "Angola" },
    { 'id': 45, 'name': "Malaysia" },
    { 'id': 46, 'name': "Mozambique" },
    { 'id': 47, 'name': "Ghana" },
    { 'id': 48, 'name': "Yemen" },
    { 'id': 49, 'name': "Nepal" },
    { 'id': 50, 'name': "Venezuela" },
    { 'id': 51, 'name': "Madagascar" },
    { 'id': 52, 'name': "Cameroon" },
    { 'id': 53, 'name': "Côte d'Ivoire" },
    { 'id': 54, 'name': "North Korea" },
    { 'id': 55, 'name': "Australia" },
    { 'id': 56, 'name': "Niger" },
    { 'id': 57, 'name': "Sri Lanka" },
    { 'id': 58, 'name': "Burkina" },
    { 'id': 59, 'name': "Mali" },
    { 'id': 60, 'name': "Romania" },
    { 'id': 61, 'name': "Malawi" },
    { 'id': 62, 'name': "Chile" },
    { 'id': 63, 'name': "Kazakhstan" },
    { 'id': 64, 'name': "Zambia" },
    { 'id': 65, 'name': "Guatemala" },
    { 'id': 66, 'name': "Ecuador" },
    { 'id': 67, 'name': "Syria" },
    { 'id': 68, 'name': "Netherlands" },
    { 'id': 69, 'name': "Senegal" },
    { 'id': 70, 'name': "Cambodia" },
    { 'id': 71, 'name': "Chad" },
    { 'id': 72, 'name': "Somalia" },
    { 'id': 73, 'name': "Zimbabwe" },
    { 'id': 74, 'name': "Guinea" },
    { 'id': 75, 'name': "Rwanda" },
    { 'id': 76, 'name': "Benin" },
    { 'id': 77, 'name': "Burundi" },
    { 'id': 78, 'name': "Tunisia" },
    { 'id': 79, 'name': "Bolivia" },
    { 'id': 80, 'name': "Belgium" },
    { 'id': 81, 'name': "Haiti" },
    { 'id': 82, 'name': "Cuba" },
    { 'id': 83, 'name': "South Sudan" },
    { 'id': 84, 'name': "Dominican Republic" },
    { 'id': 85, 'name': "Czech Republic (Czechia)" },
    { 'id': 86, 'name': "Greece" },
    { 'id': 87, 'name': "Jordan" },
    { 'id': 88, 'name': "Portugal" },
    { 'id': 89, 'name': "Azerbaijan" },
    { 'id': 90, 'name': "Sweden" },
    { 'id': 91, 'name': "Honduras" },
    { 'id': 92, 'name': "United Arab Emirates (UAE)" },
    { 'id': 93, 'name': "Hungary" },
    { 'id': 94, 'name': "Tajikistan" },
    { 'id': 95, 'name': "Belarus" },
    { 'id': 96, 'name': "Austria" },
    { 'id': 97, 'name': "Papua New Guinea" },
    { 'id': 98, 'name': "Serbia" },
    { 'id': 99, 'name': "Israel" },
    { 'id': 100, 'name': "Switzerland" },
    { 'id': 101, 'name': "Togo" },
    { 'id': 102, 'name': "Sierra Leone" },
    { 'id': 103, 'name': "Laos" },
    { 'id': 104, 'name': "Paraguay" },
    { 'id': 105, 'name': "Bulgaria" },
    { 'id': 106, 'name': "Libya" },
    { 'id': 107, 'name': "Lebanon" },
    { 'id': 108, 'name': "Nicaragua" },
    { 'id': 109, 'name': "Kyrgyzstan" },
    { 'id': 110, 'name': "El Salvador" },
    { 'id': 111, 'name': "Turkmenistan" },
    { 'id': 112, 'name': "Singapore" },
    { 'id': 113, 'name': "Denmark" },
    { 'id': 114, 'name': "Finland" },
    { 'id': 115, 'name': "Congo" },
    { 'id': 116, 'name': "Slovakia" },
    { 'id': 117, 'name': "Norway" },
    { 'id': 118, 'name': "Oman" },
    { 'id': 119, 'name': "State of Palestine" },
    { 'id': 120, 'name': "Costa Rica" },
    { 'id': 121, 'name': "Liberia" },
    { 'id': 122, 'name': "Ireland" },
    { 'id': 123, 'name': "Central African Republic" },
    { 'id': 124, 'name': "New Zealand" },
    { 'id': 125, 'name': "Mauritania" },
    { 'id': 126, 'name': "Panama" },
    { 'id': 127, 'name': "Kuwait" },
    { 'id': 128, 'name': "Croatia" },
    { 'id': 129, 'name': "Moldova" },
    { 'id': 130, 'name': "Georgia" },
    { 'id': 131, 'name': "Eritrea" },
    { 'id': 132, 'name': "Uruguay" },
    { 'id': 133, 'name': "Bosnia and Herzegovina" },
    { 'id': 134, 'name': "Mongolia" },
    { 'id': 135, 'name': "Armenia" },
    { 'id': 136, 'name': "Jamaica" },
    { 'id': 137, 'name': "Qatar" },
    { 'id': 138, 'name': "Albania" },
    { 'id': 139, 'name': "Lithuania" },
    { 'id': 140, 'name': "Namibia" },
    { 'id': 141, 'name': "Gambia" },
    { 'id': 142, 'name': "Botswana" },
    { 'id': 143, 'name': "Gabon" },
    { 'id': 144, 'name': "Lesotho" },
    { 'id': 145, 'name': "North Macedonia" },
    { 'id': 146, 'name': "Slovenia" },
    { 'id': 147, 'name': "Guinea-Bissau" },
    { 'id': 148, 'name': "Latvia" },
    { 'id': 149, 'name': "Bahrain" },
    { 'id': 150, 'name': "Equatorial Guinea" },
    { 'id': 151, 'name': "Trinidad and Tobago" },
    { 'id': 152, 'name': "Estonia" },
    { 'id': 153, 'name': "Timor Leste" },
    { 'id': 154, 'name': "Mauritius" },
    { 'id': 155, 'name': "Cyprus" },
    { 'id': 156, 'name': "Eswatini" },
    { 'id': 157, 'name': "Djibouti" },
    { 'id': 158, 'name': "Fiji" },
    { 'id': 159, 'name': "Comoros" },
    { 'id': 160, 'name': "Guyana" },
    { 'id': 161, 'name': "Bhutan" },
    { 'id': 162, 'name': "Solomon Islands" },
    { 'id': 163, 'name': "Montenegro" },
    { 'id': 164, 'name': "Luxembourg" },
    { 'id': 165, 'name': "Suriname" },
    { 'id': 166, 'name': "Cabo Verde" },
    { 'id': 167, 'name': "Maldives" },
    { 'id': 168, 'name': "Malta" },
    { 'id': 169, 'name': "Brunei" },
    { 'id': 170, 'name': "Belize" },
    { 'id': 171, 'name': "Bahamas" },
    { 'id': 172, 'name': "Iceland" },
    { 'id': 173, 'name': "Vanuatu" },
    { 'id': 174, 'name': "Barbados" },
    { 'id': 175, 'name': "Sao Tome & Principe" },
    { 'id': 176, 'name': "Samoa" },
    { 'id': 177, 'name': "Saint Lucia" },
    { 'id': 178, 'name': "Kiribati" },
    { 'id': 179, 'name': "Micronesia" },
    { 'id': 180, 'name': "Grenada" },
    { 'id': 181, 'name': "St. Vincent & Grenadines" },
    { 'id': 182, 'name': "Tonga" },
    { 'id': 183, 'name': "Seychelles" },
    { 'id': 184, 'name': "Antigua and Barbuda" },
    { 'id': 185, 'name': "Andorra" },
    { 'id': 186, 'name': "Dominica" },
    { 'id': 187, 'name': "Marshall Islands" },
    { 'id': 188, 'name': "Saint Kitts & Nevis" },
    { 'id': 189, 'name': "Monaco" },
    { 'id': 190, 'name': "Liechtenstein" },
    { 'id': 191, 'name': "San Marino" },
    { 'id': 192, 'name': "Palau" },
    { 'id': 193, 'name': "Tuvalu" },
    { 'id': 194, 'name': "Nauru" },
    { 'id': 195, 'name': "Holy" },
  ];

  selectEvent(item: { name: string, id: number }) {
    this.getPremiumForm.get("country").setValue(item.name);
    this.selectedCountry = item.name;

    this.userflowDetails.setInsuranceDetails("country", item.name);
    this.restrictedCountry(item.name);
  }

  onChangePlan() {
    console.log(this.getPremiumForm);
    console.log(this.getPremiumForm.valid);
    if (this.enableCheckoutBtn && !this.deniedCountryEnable) {

      if (!this.getPremiumForm.valid) {
      } else {
        let country = this.getPremiumForm.get("country").value;
        if (typeof country === 'object' && country !== null) {
          country = country.name
        }

        if (this.checkParenthesis(country)) {
          country = country.replace(/ *\([^)]*\) */g, "");
        } else {
          country = country;
        }
        let ageOfTravellers = this.getPremiumForm.get('ageOfTravellers').value
        let ageOfTravellersList = []
        let tripStartDate = this.getPremiumForm.get('tripStartDate').value;
        let tripEndDate = this.getPremiumForm.get('tripEndDate').value;
        let anyMedicalCondition = this.getPremiumForm.get('anyMedicalCondition').value;
        // let frequentTraveller = this.getPremiumForm.get('frequentTraveller').value;
        // let tripFrequency = this.getPremiumForm.get('tripFrequency').value;

        for (let i = 0; i < ageOfTravellers.length; i++) {
          if (ageOfTravellers[i].memberAge !== null && ageOfTravellers[i].memberAge !== '') {
            ageOfTravellersList.push(ageOfTravellers[i].memberAge);
            console.log(ageOfTravellers[i]);

          }
        }

        let reqData = {
          country: country,
          ageOfTravellers: ageOfTravellersList,
          tripStartDate: tripStartDate,
          tripEndDate: tripEndDate,
          anyMedicalCondition: anyMedicalCondition,
          // frequentTraveller: frequentTraveller,
          // tripFrequency: tripFrequency
        }

        console.log(reqData);

        this.insuranceService.loadingSkeleton.next(true);
        this.insuranceService.getPremium(reqData).subscribe((res: any) => {
          console.log(res);

          if (res.code === '0') {
            this.userflowDetails.setLocalStorage('premiumDetails', JSON.stringify(res.data));
            this.userflowDetails.setInsuranceDetails('country', country);
            this.userflowDetails.setInsuranceDetails('ageOfTravellers', JSON.stringify(ageOfTravellersList));
            this.userflowDetails.setInsuranceDetails('tripStartDate', tripStartDate);
            this.userflowDetails.setInsuranceDetails('tripEndDate', tripEndDate);
            this.userflowDetails.setInsuranceDetails('anyMedicalCondition', anyMedicalCondition);

            this.insuranceService.permiumCalculated.next(res.data.premiumAsPerPlan);
            this.insuranceService.loadingSkeleton.next(false);

            this.enableReviewPremiumForm();
            this.enableCheckoutBtn = true;
          } else {
            this.toastr.error(res.message);
          }
        });

      }
    }
  }

  restrictedCountry(country: string) {
    let searchItem = country;
    if (searchItem == 'Cuba' ||
      searchItem === 'Iran' ||
      searchItem === 'North Korea' ||
      searchItem === 'Sudan' ||
      searchItem === 'Syria' ||
      searchItem === 'Afghanistan' ||
      searchItem === 'Belarus' ||
      searchItem === 'Myanmar' ||
      searchItem === 'Egypt' ||
      searchItem === 'Iraq' ||
      searchItem === 'Libya' ||
      searchItem === 'Somalia' ||
      searchItem === 'Yemen') {
      this.deniedCountryEnable = true;
      this.deniedCountry = searchItem;
      console.log(this.deniedCountry);

    } else {
      this.deniedCountryEnable = false;
    }
  }

  onChangeSearch(search: string) {
    console.log(search);
    // fetch remote res from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    console.log(e);
    // do something
  }

  onChangeDate(event) {
    this.minDate = event.target.value;
    this.getPremiumForm.get('tripEndDate').setValue('');
  }

  get controls() {
    return (<FormArray>this.getPremiumForm.get('ageOfTravellers')).controls;
  }

  addAgeOfTravellers() {
    if (this.count <= 5) {
      this.controls.push(
        this.formBuilder.group({
          'memberAge': ''
        })
      );
      this.count++;
    }
  }

  onRemoveAgeOfTraveller(i) {
    (<FormArray>this.getPremiumForm.get('ageOfTravellers')).removeAt(i);
    this.count--;
  }

  validatePremiumForm() {
    let country = this.getPremiumForm.get('country').value;

    console.log(this.getPremiumForm.get('country').value);

    country == "" || country == null || country == undefined ?
      this.destinationNotSelected = true :
      this.destinationNotSelected = false;

    let tripStartDate = this.getPremiumForm.get('tripStartDate').value;
    tripStartDate == "" || tripStartDate == null || tripStartDate == undefined ?
      this.tripStartDateNotSelected = true :
      this.tripStartDateNotSelected = false;

    let tripEndDate = this.getPremiumForm.get('tripEndDate').value;
    tripEndDate == "" || tripEndDate == null || tripEndDate == undefined ?
      this.tripEndDateNotSelected = true :
      this.tripEndDateNotSelected = false;


    if (!this.controls[0]['controls'].memberAge.valid) {
      let ageOfTravellers = this.controls[0]['controls'].memberAge.value;

      console.log(ageOfTravellers);
      ageOfTravellers == "" || ageOfTravellers == null || ageOfTravellers == undefined ?
        this.ageOfTravellersError = true :
        this.ageOfTravellersError = false;
    }
  }

  proceedBtn() {
    this.validatePremiumForm();
    console.log(!this.getPremiumForm.valid);

    if (!this.getPremiumForm.valid) {
    } else {
      console.log(this.selectedCountry);

      let country;
      if (this.checkParenthesis(this.selectedCountry)) {
        country = this.selectedCountry.replace(/ *\([^)]*\) */g, "");
      } else {
        country = this.selectedCountry;
      }

      let ageOfTravellers = this.getPremiumForm.get('ageOfTravellers').value
      let ageOfTravellersList = []
      let tripStartDate = this.getPremiumForm.get('tripStartDate').value;
      let tripEndDate = this.getPremiumForm.get('tripEndDate').value;
      let anyMedicalCondition = this.getPremiumForm.get('anyMedicalCondition').value;
      // let frequentTraveller = this.getPremiumForm.get('frequentTraveller').value;
      // let tripFrequency = this.getPremiumForm.get('tripFrequency').value;

      for (let i = 0; i < ageOfTravellers.length; i++) {
        if (ageOfTravellers[i].memberAge !== "") {
          ageOfTravellersList.push(ageOfTravellers[i].memberAge);
        }
      }

      let reqData = {
        country: country,
        ageOfTravellers: ageOfTravellersList,
        tripStartDate: tripStartDate,
        tripEndDate: tripEndDate,
        anyMedicalCondition: anyMedicalCondition,
        // frequentTraveller: frequentTraveller,
        // tripFrequency: tripFrequency
      }

      console.log(reqData);

      this.insuranceService.getPremium(reqData).subscribe((res: any) => {
        console.log(res);

        if (res.code === '0') {
          this.userflowDetails.setLocalStorage('premiumDetails', JSON.stringify(res.data));
          this.userflowDetails.setInsuranceDetails('country', country);
          this.userflowDetails.setInsuranceDetails('ageOfTravellers', JSON.stringify(ageOfTravellersList));
          this.userflowDetails.setInsuranceDetails('tripStartDate', tripStartDate);
          this.userflowDetails.setInsuranceDetails('tripEndDate', tripEndDate);
          this.userflowDetails.setInsuranceDetails('anyMedicalCondition', anyMedicalCondition);

          this.enableReviewPremiumForm();
          this.enableCheckoutBtn = true;
          this.router.navigateByUrl('insurance/plans');
        } else {
          this.toastr.error(res.message);
        }
      });

    }

  }

  enableReviewPremiumForm() {
    let routeLength = this.router.url.split('/').length;
    let endRoute = this.router.url.split('/')[routeLength - 1];

    console.log(endRoute);


    if (endRoute == 'plans') {

      if (document.cookie.indexOf('insuranceDetails') != -1) {
        this.enableCheckoutBtn = true;

        let country = this.userflowDetails.getInsuranceDetails().country;
        let ageOfTravellers = JSON.parse(this.userflowDetails.getInsuranceDetails().ageOfTravellers);
        let tripStartDate = this.userflowDetails.getInsuranceDetails().tripStartDate;
        let tripEndDate = this.userflowDetails.getInsuranceDetails().tripEndDate;
        let anyMedicalCondition = this.userflowDetails.getInsuranceDetails().anyMedicalCondition;

        this.getPremiumForm.get('country').setValue(country);
        this.getPremiumForm.get('tripStartDate').setValue(tripStartDate);
        this.getPremiumForm.get('tripEndDate').setValue(tripEndDate);
        this.getPremiumForm.get('anyMedicalCondition').setValue(anyMedicalCondition);

        for (let i = 0; i < ageOfTravellers.length; i++) {
          this.controls[i]['controls'].memberAge.setValue(ageOfTravellers[i]);
        }
      } else {
        this.router.navigateByUrl('insurance');
        this.toastr.error("Please fill the travel details.")
      }

      // this.getPremiumForm.get('country').disable();
    }
  }

  onCheckout() {
    this.preloaderService.showPreloader(true);
    let token = this.loginService.getAuthToken();
    this.loginStatus.verifyAuthToken(token).subscribe((res: any) => {
      console.log(res);

      if (res.code === '0') {
        this.router.navigate(["insurance/application-form"]);
        this.preloaderService.showPreloader(false);
      } else if (res.code == "301") {
        this.loginService.setAuthToken("");
        this.loginStatus.setUserStatus(false);
        this.loginStatus.setUserLoggedIn(false);
        this.preloaderService.showPreloader(false);
        this.userFlow.setCookie("profile", JSON.stringify({}));
        this.routerHistory.pushHistory("insurance-form");
        this.router.navigate(["slcontainer/login"]);
        this.preloaderService.showPreloader(false);
      } else {
        this.routerHistory.pushHistory("insurance-form");
        this.router.navigate(["slcontainer/login"]);
        this.preloaderService.showPreloader(false);
      }

    });
  }

  checkParenthesis(string) {
    console.log(string);

    for (let i = 0; i < string.length; i++) {
      if (string[i] === "(") {
        return true;
      }


    }
  }
}
