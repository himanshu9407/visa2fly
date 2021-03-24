import { LoginStatusService } from 'src/app/shared/login-status.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class PremiumFormComponent implements OnInit, OnDestroy {
  getPremiumForm: FormGroup;
  minTripEndDate: { year: number; month: number; day: number };
  today: Date;
  travellersAge: FormArray;
  count: number = 1;
  destinationNotSelected: boolean = false;
  tripStartDateNotSelected: boolean = false;
  tripEndDateNotSelected: boolean = false;
  ageOfTravellersError: boolean = false;
  enableCheckoutBtn: boolean = false;
  deniedCountryEnable: boolean = false;
  deniedCountry: string;
  activeRoute: string;
  // selectedCountry: string;

  title: string = "Visa2fly | Insurance";
  tripStartMinDate: { year: number; month: number; day: number };

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
  ) {
    this.preloaderService.showPreloader(false);
  }

  ngOnInit(): void {
    this.getPremiumForm = this.formBuilder.group({
      country: ["", [Validators.required]],
      ageOfTravellers: this.formBuilder.array([
        this.formBuilder.group({
          memberAge: [''],
        })
      ]),
      tripStartDate: ["", [Validators.required]],
      tripEndDate: ["", [Validators.required]],
      anyMedicalCondition: [false],
      // frequentTraveller: [false, [Validators.required]],
      // tripFrequency: [30, [Validators.required]]
    });

    let today = new Date();

    this.tripStartMinDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };

    // console.log(this.tripStartMinDate);


    this.enableReviewPremiumForm();

    this.titleService.setTitle(this.title);

    // console.log(this.countries);

    let routeLength = this.router.url.split('/').length;
    let endRoute = this.router.url.split('/')[routeLength - 1];

    if (endRoute == 'insurance') {
      for (let i = 1; i <= 3; i++) {
        let getPremiumForm: FormArray = this.getPremiumForm.get('ageOfTravellers') as FormArray;
        getPremiumForm.push(
          this.formBuilder.group({
            memberAge: ['', [Validators.maxLength(2)]],
          }),
        );
        this.count++;
      }
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.getPremiumForm.reset();
  }

  countryChanged(country: string) {
    // this.selectedCountry = country;

    this.userflowDetails.setInsuranceDetails("country", country);
    this.restrictedCountry(country);
  }

  public countries = [
    "China",
    "Dubai",
    "United States (US)",
    "Indonesia",
    "Pakistan",
    "Brazil",
    "Nigeria",
    "Bangladesh",
    "Russia",
    "Mexico",
    "Japan",
    "Ethiopia",
    "Philippines",
    "Egypt",
    "Vietnam",
    "DR Congo",
    "Turkey",
    "Iran",
    "Germany",
    "Thailand",
    "United Kingdom (UK)",
    "France",
    "Italy",
    "Tanzania",
    "South Africa",
    "Myanmar",
    "Kenya",
    "South Korea",
    "Colombia",
    "Spain",
    "Uganda",
    "Argentina",
    "Algeria",
    "Sudan",
    "Ukraine",
    "Iraq",
    "Afghanistan",
    "Poland",
    "Canada",
    "Morocco",
    "Saudi Arabia",
    "Uzbekistan",
    "Peru",
    "Angola",
    "Malaysia",
    "Mozambique",
    "Ghana",
    "Yemen",
    "Nepal",
    "Venezuela",
    "Madagascar",
    "Cameroon",
    "Côte d'Ivoire",
    "North Korea",
    "Australia",
    "Niger",
    "Sri Lanka",
    "Burkina",
    "Mali",
    "Romania",
    "Malawi",
    "Chile",
    "Kazakhstan",
    "Zambia",
    "Guatemala",
    "Ecuador",
    "Syria",
    "Netherlands",
    "Senegal",
    "Cambodia",
    "Chad",
    "Somalia",
    "Zimbabwe",
    "Guinea",
    "Rwanda",
    "Benin",
    "Burundi",
    "Tunisia",
    "Bolivia",
    "Belgium",
    "Haiti",
    "Cuba",
    "South Sudan",
    "Dominican Republic",
    "Czech Republic (Czechia)",
    "Greece",
    "Jordan",
    "Portugal",
    "Azerbaijan",
    "Sweden",
    "Honduras",
    "United Arab Emirates (UAE)",
    "Hungary",
    "Tajikistan",
    "Belarus",
    "Austria",
    "Papua New Guinea",
    "Serbia",
    "Israel",
    "Switzerland",
    "Togo",
    "Sierra Leone",
    "Laos",
    "Paraguay",
    "Bulgaria",
    "Libya",
    "Lebanon",
    "Nicaragua",
    "Kyrgyzstan",
    "El Salvador",
    "Turkmenistan",
    "Singapore",
    "Denmark",
    "Finland",
    "Congo",
    "Slovakia",
    "Norway",
    "Oman",
    "State of Palestine",
    "Costa Rica",
    "Liberia",
    "Ireland",
    "Central African Republic",
    "New Zealand",
    "Mauritania",
    "Panama",
    "Kuwait",
    "Croatia",
    "Moldova",
    "Georgia",
    "Eritrea",
    "Uruguay",
    "Bosnia and Herzegovina",
    "Mongolia",
    "Armenia",
    "Jamaica",
    "Qatar",
    "Albania",
    "Lithuania",
    "Namibia",
    "Gambia",
    "Botswana",
    "Gabon",
    "Lesotho",
    "North Macedonia",
    "Slovenia",
    "Guinea-Bissau",
    "Latvia",
    "Bahrain",
    "Equatorial Guinea",
    "Trinidad and Tobago",
    "Estonia",
    "Timor Leste",
    "Mauritius",
    "Cyprus",
    "Eswatini",
    "Djibouti",
    "Fiji",
    "Comoros",
    "Guyana",
    "Bhutan",
    "Solomon Islands",
    "Montenegro",
    "Luxembourg",
    "Suriname",
    "Cabo Verde",
    "Maldives",
    "Malta",
    "Brunei",
    "Belize",
    "Bahamas",
    "Iceland",
    "Vanuatu",
    "Barbados",
    "Sao Tome & Principe",
    "Samoa",
    "Saint Lucia",
    "Kiribati",
    "Micronesia",
    "Grenada",
    "St. Vincent & Grenadines",
    "Tonga",
    "Seychelles",
    "Antigua and Barbuda",
    "Andorra",
    "Dominica",
    "Marshall Islands",
    "Saint Kitts & Nevis",
    "Monaco",
    "Liechtenstein",
    "San Marino",
    "Palau",
    "Tuvalu",
    "Nauru",
    "Holy",
  ];

  onChangePlan() {
    // console.log(this.getPremiumForm);
    // console.log(this.getPremiumForm.valid);
    if (this.enableCheckoutBtn && !this.deniedCountryEnable) {

      if (!this.getPremiumForm.valid) {
      } else {
        if (this.getPremiumForm.get('tripEndDate').value != '') {
          let country = this.getPremiumForm.get("country").value;
          let ageOfTravellers = this.getPremiumForm.get('ageOfTravellers').value
          let ageOfTravellersList = []

          let tripStartDate = this.getPremiumForm.get('tripStartDate').value;
          let tripEndDate = this.getPremiumForm.get('tripEndDate').value;

          // console.log(tripStartDate);
          // console.log(tripEndDate);

          let tempTripStartDate: any;
          let tempTripEndDate: any;

          if (tripStartDate.month < 10 && tripStartDate.day < 10) {
            tempTripStartDate = tripStartDate.year + "-0" + tripStartDate.month + "-0" + tripStartDate.day;
          } else if (tripStartDate.day < 10) {
            tempTripStartDate = tripStartDate.year + "-" + tripStartDate.month + "-0" + tripStartDate.day;
          } else if (tripStartDate.month < 10) {
            tempTripStartDate = tripStartDate.year + "-0" + tripStartDate.month + "-" + tripStartDate.day;
          } else {
            tempTripStartDate = tripStartDate.year + "-" + tripStartDate.month + "-" + tripStartDate.day;
          }

          if (tripEndDate.month < 10 && tripEndDate.day < 10) {
            tempTripEndDate = tripEndDate.year + "-0" + tripEndDate.month + "-0" + tripEndDate.day;
          } else if (tripEndDate.day < 10) {
            tempTripEndDate = tripEndDate.year + "-" + tripEndDate.month + "-0" + tripEndDate.day;
          } else if (tripEndDate.month < 10) {
            tempTripEndDate = tripEndDate.year + "-0" + tripEndDate.month + "-" + tripEndDate.day;
          } else {
            tempTripEndDate = tripEndDate.year + "-" + tripEndDate.month + "-" + tripEndDate.day;
          }

          let anyMedicalCondition = this.getPremiumForm.get('anyMedicalCondition').value;
          // let frequentTraveller = this.getPremiumForm.get('frequentTraveller').value;
          // let tripFrequency = this.getPremiumForm.get('tripFrequency').value;

          for (let i = 0; i < ageOfTravellers.length; i++) {
            if (ageOfTravellers[i].memberAge !== null && ageOfTravellers[i].memberAge !== '') {
              ageOfTravellersList.push(ageOfTravellers[i].memberAge);
              // console.log(ageOfTravellers[i]);
            }
          }

          let reqData = {
            country: country,
            ageOfTravellers: ageOfTravellersList,
            tripStartDate: tempTripStartDate,
            tripEndDate: tempTripEndDate,
            anyMedicalCondition: anyMedicalCondition,
            // frequentTraveller: frequentTraveller,
            // tripFrequency: tripFrequency
          }

          // console.log(reqData);

          this.insuranceService.loadingSkeleton.next(true);
          this.insuranceService.getPremium(reqData).subscribe((res: any) => {
            // console.log(res);

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
      // console.log(this.deniedCountry);

    } else {
      this.deniedCountryEnable = false;
    }
  }

  onChangeDate(event) {
    // console.log(event);

    this.minTripEndDate = event;
    this.getPremiumForm.get('tripEndDate').setValue('');
  }

  get controls() {
    return (<FormArray>this.getPremiumForm.get('ageOfTravellers')).controls;
  }

  addAgeOfTravellers() {
    if (this.count <= 5) {

      let getPremiumForm: FormArray = this.getPremiumForm.get('ageOfTravellers') as FormArray;
      getPremiumForm.push(
        this.formBuilder.group({
          memberAge: [''],
        }),
      );
      this.count++;
    }

    // console.log(this.controls);
    // console.log(this.getPremiumForm);
  }

  onRemoveAgeOfTraveller(i) {
    (<FormArray>this.getPremiumForm.get('ageOfTravellers')).removeAt(i);
    this.count--;
  }

  validatePremiumForm() {
    let country = this.getPremiumForm.get('country').value;

    // console.log(this.getPremiumForm.get('country').value);

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

      // console.log(ageOfTravellers);
      ageOfTravellers == "" || ageOfTravellers == null || ageOfTravellers == undefined ?
        this.ageOfTravellersError = true :
        this.ageOfTravellersError = false;
    }
  }

  proceedBtn() {
    this.validatePremiumForm();
    // console.log(this.getPremiumForm);

    if (!this.getPremiumForm.valid) {
    } else {
      // console.log(this.selectedCountry);

      // let country;
      // if (this.checkParenthesis(this.selectedCountry)) {
      //   country = this.selectedCountry.replace(/ *\([^)]*\) */g, "");
      // } else {
      //   country = this.selectedCountry;
      // }

      let country = this.getPremiumForm.get('country').value;

      let ageOfTravellers = this.getPremiumForm.get('ageOfTravellers').value;
      let ageOfTravellersList = [];

      let tripStartDate = this.getPremiumForm.get('tripStartDate').value;
      let tripEndDate = this.getPremiumForm.get('tripEndDate').value;

      let tempTripStartDate: any;
      let tempTripEndDate: any;

      if (tripStartDate.month < 10 && tripStartDate.day < 10) {
        tempTripStartDate = tripStartDate.year + "-0" + tripStartDate.month + "-0" + tripStartDate.day;
      } else if (tripStartDate.day < 10) {
        tempTripStartDate = tripStartDate.year + "-" + tripStartDate.month + "-0" + tripStartDate.day;
      } else if (tripStartDate.month < 10) {
        tempTripStartDate = tripStartDate.year + "-0" + tripStartDate.month + "-" + tripStartDate.day;
      } else {
        tempTripStartDate = tripStartDate.year + "-" + tripStartDate.month + "-" + tripStartDate.day;
      }

      if (tripEndDate.month < 10 && tripEndDate.day < 10) {
        tempTripEndDate = tripEndDate.year + "-0" + tripEndDate.month + "-0" + tripEndDate.day;
      } else if (tripEndDate.day < 10) {
        tempTripEndDate = tripEndDate.year + "-" + tripEndDate.month + "-0" + tripEndDate.day;
      } else if (tripEndDate.month < 10) {
        tempTripEndDate = tripEndDate.year + "-0" + tripEndDate.month + "-" + tripEndDate.day;
      } else {
        tempTripEndDate = tripEndDate.year + "-" + tripEndDate.month + "-" + tripEndDate.day;
      }

      let anyMedicalCondition = this.getPremiumForm.get('anyMedicalCondition').value;
      // let frequentTraveller = this.getPremiumForm.get('frequentTraveller').value;
      // let tripFrequency = this.getPremiumForm.get('tripFrequency').value;

      for (let i = 0; i < ageOfTravellers.length; i++) {
        if (ageOfTravellers[i].memberAge !== "" && ageOfTravellers[i].memberAge !== null && ageOfTravellers[i].memberAge !== undefined) {
          ageOfTravellersList.push(ageOfTravellers[i].memberAge);
          // console.log(ageOfTravellers[i]);
        }
      }

      if (ageOfTravellersList.length == 0) {
        this.toastr.error("Age details are missing or invalid.");
        return;
      }

      let reqData = {
        country: country,
        ageOfTravellers: ageOfTravellersList,
        tripStartDate: tempTripStartDate,
        tripEndDate: tempTripEndDate,
        anyMedicalCondition: anyMedicalCondition,
        // frequentTraveller: frequentTraveller,
        // tripFrequency: tripFrequency
      }

      // console.log(reqData);

      this.insuranceService.getPremium(reqData).subscribe((res: any) => {
        // console.log(res);

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

    // console.log(endRoute);/


    if (endRoute == 'plans') {

      if (document.cookie.indexOf('insuranceDetails') != -1) {
        this.enableCheckoutBtn = true;

        let getPremiumForm: FormArray = this.getPremiumForm.get('ageOfTravellers') as FormArray;
        this.getPremiumForm.reset();
        getPremiumForm.clear()

        let country = this.userflowDetails.getInsuranceDetails().country;
        let ageOfTravellers = JSON.parse(this.userflowDetails.getInsuranceDetails().ageOfTravellers);
        let tripStartDate = this.userflowDetails.getInsuranceDetails().tripStartDate;
        let tripEndDate = this.userflowDetails.getInsuranceDetails().tripEndDate;
        let anyMedicalCondition = this.userflowDetails.getInsuranceDetails().anyMedicalCondition;


        this.getPremiumForm.get('country').setValue(country);
        this.getPremiumForm.get('tripStartDate').setValue(tripStartDate);
        this.getPremiumForm.get('tripEndDate').setValue(tripEndDate);
        this.getPremiumForm.get('anyMedicalCondition').setValue(anyMedicalCondition);

        this.count = 0;
        // console.log(getPremiumForm);
        for (let i = 0; i < ageOfTravellers.length; i++) {
          getPremiumForm.push(
            this.formBuilder.group({
              memberAge: [ageOfTravellers[i]]
            }),
          );
          this.count++;
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
      // console.log(res);

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

  checkParenthesis(string: string) {
    // console.log(string);

    for (let i = 0; i < string.length; i++) {
      if (string[i] === "(") {
        return true;
      }
    }
  }

  reformatingTripDate() {

  }

  validateTravellerAge(event: any) {
    if (
      (event.keyCode === 8 || event.keyCode === 46) ||
      (event.target.value.length <= 1) &&
      (/[0-9]/.test(event.key))
    ) {
      return true;
    } else {
      return false;
    }

  }
}
