import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from "@angular/core";
import {
  FormBuilder,
  Form,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { requiredFileType } from "../../shared/Custom-Image.validator";
import { AddTravellerService } from "./addTraveller.service";
import { LoginService } from "../login-signup/login/login.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { PreloaderService } from "src/app/shared/preloader.service";
import { from } from "rxjs";
import { RouterHistory } from "src/app/shared/router-history.service";
import { Title, Meta } from "@angular/platform-browser";
import { isPlatformBrowser, LowerCasePipe } from "@angular/common";

@Component({
  selector: "app-add-traveller",
  templateUrl: "./add-traveller.component.html",
  styleUrls: ["./add-traveller.component.css"],
})
export class AddTravellerComponent implements OnInit {
  public paymentForm: any = {};
  buyerEmail = "";
  orderId = "";
  amount = "";
  currency = "";
  merchantIdentifier = "";
  returnUrl = "";
  checksum = "";
  primaryAddress = "";
  intialInfo = true;
  dateOfTravelModel: any = "";
  modalWarnings: Array<any> = [];
  originalImageArr = [];
  selectedTravellerForm: number = 0;
  breadcrumRouting: string;

  list = {
    states: ["Delhi", "Haryana", "Uttar Pradesh"],
    cities: {
      Delhi: ["Delhi"],
      Haryana: ["Gurgaon"],
      "Uttar Pradesh": ["Noida"],
    },
  };
  dataSource = [
    { id: "Primary", dataToggle: "toogle1", dataToggleHash: "#toogle1" },
  ];

  traveller_Id = [];
  id = "";
  dataToogle = "";
  dataToogleHash = "";
  count = 1;
  travelDateError = false;
  primaryCity = "";
  primaryPinCode = "";
  primaryState = "";

  public userFlowDetails: any;

  public imageUploads: any;

  public onlineCategory: boolean = false;
  requestImageArr = [];
  formData1 = new FormData();

  today: Date;
  tomorrow: Date;
  tomorrowDate: any = "";

  tempImageArr = [];
  succeedToPayment: boolean;
  firstNameError: boolean;
  lastNameError: boolean;
  emailError: boolean;
  dateOfBirthError: boolean;
  passportError: boolean;
  passportExpiryError: boolean;
  passportExpiryCopyError: boolean;
  gstError: boolean;
  cellError: boolean;
  addressError: boolean;
  zipCodeError: boolean;

  passportFrontImageError: boolean;
  scrollBy: number = 0;
  errorForm = "";
  checkUploadedImages: boolean;
  category: string;
  minTravelDate: number;
  redirect: any;
  imageUpload: boolean;
  disclaimerForDubai: boolean = false;
  slideChangeMessage: string;
  dataEvent: string;

  constructor(
    private formBuilder: FormBuilder,
    private travellerService: AddTravellerService,
    private toastr: ToastrService,
    private userFlow: UserFlowDetails,
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    private preloaderService: PreloaderService,
    private routerHistory: RouterHistory,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.today = new Date();
    this.tomorrow = new Date(this.today);
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.tomorrowDate = {
      year: this.tomorrow.getFullYear(),
      month: this.tomorrow.getMonth() + 1,
      day: this.tomorrow.getDate(),
    };
  }

  travellerForm: any;
  travellers: FormArray;
  filedNameArr = [];
  travelDetails: FormGroup;
  valueAddedService: FormGroup;
  quoteId = "";
  basePrice: number = 0;
  serviceTax: number = 0;
  termsAndConditions: FormGroup;
  stayPeriod: string = "";
  minDate: any = "";
  maxDateDob: any = "";
  minDatePassportExpiry: any = "";
  minDateOfTravel: any = "";
  minDateOfCollection: any = "";
  country: string = "";
  collectionDateError = false;
  public errorMessage: Array<any> = [];

  checkCity(i) {
    let tempState = this.travellerForm.controls.travellers.controls[i].controls
      .state.value;
    this.travellerForm.controls.travellers.controls[i].controls.city.setValue(
      this.list.cities[tempState][0]
    );
  }

  checkDateOfExpiry(date: { year: any; day: any; month: any }) {
    //normal months
    if (
      date.month == 4 ||
      date.month == 6 ||
      date.month == 9 ||
      date.month == 11
    ) {
      if (date.day > 30) {
        this.minDatePassportExpiry = {
          year: date.year,
          month: date.month + 1,
          day: 1,
        };
      }
    }

    //february
    if (date.month == 2) {
      if (date.year % 4 == 0 && date.year % 100 != 0 && date.year % 400 == 0) {
        if (date.day > 29) {
          this.minDatePassportExpiry = {
            year: date.year,
            month: date.month + 1,
            day: 1,
          };
        }
      } else {
        if (date.day > 28) {
          this.minDatePassportExpiry = {
            year: date.year,
            month: date.month + 1,
            day: 1,
          };
        }
      }
    }
  }

  checkDateOfTravelOverflow(date: { month: any; year: any; day: any }) {
    if (
      date.month == 4 ||
      date.month == 6 ||
      date.month == 9 ||
      date.month == 11
    ) {
      if (date.day > 30) {
        let tempDay = date.day - 30;
        this.minDateOfTravel = {
          year: date.year,
          month: date.month + 1,
          day: tempDay,
        };
      }
    } else if (date.month == 2) {
      if (date.year % 4 == 0 && date.year % 100 != 0 && date.year % 400 == 0) {
        if (date.day > 29) {
          let tempDay = date.day - 29;
          this.minDateOfTravel = {
            year: date.year,
            month: date.month + 1,
            day: tempDay,
          };
        }
      } else {
        if (date.day > 28) {
          let tempDay = date.day - 28;
          this.minDateOfTravel = {
            year: date.year,
            month: date.month + 1,
            day: tempDay,
          };
        }
      }
    } else {
      if (date.day > 31) {
        let tempDay = date.day - 31;
        this.minDateOfTravel = {
          year: date.year,
          month: date.month + 1,
          day: tempDay,
        };
      }
    }
  }

  checkDateOfCollectionUnderFlow(date: { month: any; year: any; day: any }) {
    let prevMonth = date.month - 1;
    if (date.day < 1) {
      if (date.day == 0) {
        if (
          prevMonth == 4 ||
          prevMonth == 6 ||
          prevMonth == 9 ||
          prevMonth == 11
        ) {
          this.minDateOfCollection = {
            year: date.year,
            month: prevMonth,
            day: 30,
          };
        }
        if (prevMonth == 2) {
          if (
            date.year % 4 == 0 &&
            date.year % 100 != 0 &&
            date.year % 400 == 0
          ) {
            this.minDateOfCollection = {
              year: date.year,
              month: prevMonth,
              day: 29,
            };
          } else {
            this.minDateOfCollection = {
              year: date.year,
              month: prevMonth,
              day: 28,
            };
          }
        } else {
          this.minDateOfCollection = {
            year: date.year,
            month: prevMonth,
            day: 31,
          };
        }
      } else {
        if (
          prevMonth == 4 ||
          prevMonth == 6 ||
          prevMonth == 9 ||
          prevMonth == 11
        ) {
          this.minDateOfCollection = {
            year: date.year,
            month: prevMonth,
            day: 30 + date.day,
          };
        }
        if (prevMonth == 2) {
          if (
            date.year % 4 == 0 &&
            date.year % 100 != 0 &&
            date.year % 400 == 0
          ) {
            this.minDateOfCollection = {
              year: date.year,
              month: prevMonth,
              day: 29 + date.day,
            };
          } else {
            this.minDateOfCollection = {
              year: date.year,
              month: prevMonth,
              day: 28 + date.day,
            };
          }
        } else {
          this.minDateOfCollection = {
            year: date.year,
            month: prevMonth,
            day: 31 + date.day,
          };
        }
      }
    }
  }

  checkDateOfDob(date: { month: any; day: any; year: any }) {}

  // public myInterval: number = 1500;
  // private _activeSlideIndex: number;

  // get activeSlideIndex(): number {
  //   return this._activeSlideIndex;
  // }

  // set activeSlideIndex(newIndex: number) {
  //   if (this._activeSlideIndex !== newIndex) {
  //     console.log("Active slider index would be changed!");
  //     // here's the place for your "slide.bs.carousel" logic
  //   }
  //   this._activeSlideIndex = newIndex;
  // }

  onSlide(event) {
    if (isPlatformBrowser(this.platformId)) {

      for (let i = 0; i < 6; i++) {
        $("#slide" + i).removeClass("activeSlide");
      }

      if (event.current === 'ngb-slide-0') {
        $("#slide0").addClass("activeSlide");
      } else if (event.current === 'ngb-slide-1') {
        $("#slide1").addClass("activeSlide");
      } else if (event.current === 'ngb-slide-2') {
        $("#slide2").addClass("activeSlide");
      } else if (event.current === 'ngb-slide-3') {
        $("#slide3").addClass("activeSlide");
      } else if (event.current === 'ngb-slide-4') {
        $("#slide4").addClass("activeSlide");
      } else if (event.current === 'ngb-slide-5') {
        $("#slide5").addClass("activeSlide");
      }

    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.intialInfo = false; // ..??
    }, 10000);

    this.titleService.setTitle("Visa2fly | Add Traveller");
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: "",
      },
    ]);

    this.userFlowDetails = this.userFlow.getUserFlowDetails();

    switch (this.userFlowDetails.country) {
      case "Australia":
        this.breadcrumRouting = "/visa/australia-visa-online";
        break;
      case "Armenia":
        this.breadcrumRouting = "/visa/armenia-visa-online";
        break;
      case "Azerbaijan":
        this.breadcrumRouting = "/visa/azerbaijan-visa-online";
        break;
      // case "Brazil":
      //   this.breadcrumRouting = "/visa/brazil-visa-online";
      //   break;
      case "Bahrain":
        this.breadcrumRouting = "/visa/bahrain-visa-online";
        break;
      case "China":
        this.breadcrumRouting = "/visa/china-visa-online";
        break;
      case "Cambodia":
        this.breadcrumRouting = "/visa/cambodia-visa-online";
        break;
      case "Dubai":
        this.breadcrumRouting = "/visa/dubai-visa-online";
        break;
      case "Egypt":
        this.breadcrumRouting = "/visa/egypt-visa-online";
        break;
      case "Ethiopia":
        this.breadcrumRouting = "/visa/ethiopia-visa-online";
        break;
      case "Finland":
          this.breadcrumRouting = "/visa/finland-visa-online";
          break;
      case "France":
        this.breadcrumRouting = "/visa/france-visa-online";
        break;
      case "Japan":
        this.breadcrumRouting = "/visa/japan-visa-online";
        break;
      case "Malaysia":
        this.breadcrumRouting = "/visa/malaysia-visa-online";
        break;
      case "Maldives":
        this.breadcrumRouting = "/visa/maldives-visa-online";
        break;
      case "New Zealand":
        this.breadcrumRouting = "/visa/new-zealand-visa-online";
        break;
      case "Netherlands":
        this.breadcrumRouting = "/visa/netherlands-visa-online";
        break;
      // case "Russia":
      //   this.breadcrumRouting = "/visa/russia-visa-online";
      //   break;
      // case "Rwanda":
      //   this.breadcrumRouting = "/visa/rwanda-visa-online";
      //   break;
      case "Singapore":
        this.breadcrumRouting = "/visa/singapore-visa-online";
        break;
      case "South Africa":
        this.breadcrumRouting = "/visa/south-africa-visa-online";
        break;
      case "Spain":
        this.breadcrumRouting = "/visa/spain-visa-online";
        break;
      case "Sri Lanka":
        this.breadcrumRouting = "/visa/sri-lanka-visa-online";
        break;
      case "Switzerland":
        this.breadcrumRouting = "/visa/swiss-visa-online";
        break;
      case "Taiwan":
        this.breadcrumRouting = "/visa/taiwan-visa-online";
        break;
      // case "Tajikistan":
      //   this.breadcrumRouting = "/visa/tajikistan-visa-online";
      //   break;
      case "Thailand":
        this.breadcrumRouting = "/visa/thailand-visa-online";
        break;
      case "Turkey":
        this.breadcrumRouting = "/visa/turkey-visa-online";
        break;

      case "Ukraine":
        this.breadcrumRouting = "/visa/ukraine-visa-online";
        break;
      case "United Kingdom":
        this.breadcrumRouting = "/visa/uk-visa-online";
        break;
      case "USA":
        this.breadcrumRouting = "/visa/usa-visa-online";
        break;
      case "Uzbekistan":
        this.breadcrumRouting = "/visa/uzbekistan-visa-online";
        break;
      case "Vietnam":
        this.breadcrumRouting = "/visa/vietnam-visa-online";
        break;
      case "Zambia":
        this.breadcrumRouting = "/visa/zambia-visa-online";
        break;

      default:
        this.breadcrumRouting = `/visa-requirements/${this.userFlowDetails.country}/apply-for-${this.userFlowDetails.country}-visa-online`;
        break;
    }

    if (
      this.userFlowDetails.country === "UAE" ||
      this.userFlowDetails.country === "Dubai"
    ) {
      this.disclaimerForDubai = true;
    }

    this.imageUploads = JSON.parse(this.userFlowDetails.imageUploads);
    if (this.imageUploads == "null") {
      this.imageUploads = [];
    }

    this.imageUploads.sort((a, b) => a.sequence - b.sequence);

    this.category = this.userFlowDetails.category;
    this.imageUpload = JSON.parse(this.userFlowDetails.imageUpload);

    this.minTravelDate = parseInt(this.userFlowDetails.minTravelDate);

    if (this.userFlowDetails.onlineCountry == "true") {
      this.onlineCategory = true;
    } else {
      this.onlineCategory = false;
    }
    let data = this.userFlow.getUserFlowDetails();
    const current = new Date();

    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    this.maxDateDob = {
      year: yesterday.getFullYear(),
      month: yesterday.getMonth() + 1,
      day: yesterday.getDate(),
    };
    // this.checkDateOfDob(this.maxDateDob) ;

    this.minDateOfTravel = {
      year: this.minDate.year,
      month: this.minDate.month,
      day: this.minDate.day + this.minTravelDate + 2,
    };
    this.checkDateOfTravelOverflow(this.minDateOfTravel);

    this.minDateOfCollection = {
      year: this.minDateOfTravel.year,
      month: this.minDateOfTravel.month,
      day: this.minDateOfTravel.day - this.minTravelDate,
    };

    this.checkDateOfCollectionUnderFlow(this.minDateOfCollection);

    if (current.getMonth() >= 6) {
      let x = 12 - (current.getMonth() + 1);
      this.minDatePassportExpiry = {
        year: current.getFullYear() + 1,
        month: 6 - x,
        day: current.getDate(),
      };
    } else {
      this.minDatePassportExpiry = {
        year: current.getFullYear(),
        month: current.getMonth() + 7,
        day: current.getDate(),
      };
    }

    this.checkDateOfExpiry(this.minDatePassportExpiry);

    this.quoteId = data.quoteId;
    this.country = data.country;
    this.basePrice = JSON.parse(data.basePrice);
    this.serviceTax = JSON.parse(data.serviceTax);

    this.stayPeriod = data.stayPeriod;

    // if (this.category == "e-visa") {
    if (this.imageUpload) {
      this.travelDetails = new FormGroup({
        dateOfTravel: new FormControl("", [Validators.required]),
        dateOfCollection: new FormControl("", [Validators.nullValidator]),
      });
    } else {
      this.travelDetails = new FormGroup({
        dateOfTravel: new FormControl("", [Validators.required]),
        dateOfCollection: new FormControl("", [Validators.required]),
      });
    }

    this.termsAndConditions = new FormGroup({
      tnc: new FormControl(false, [Validators.requiredTrue]),
    });

    this.valueAddedService = new FormGroup({
      selectAll: new FormControl(false, []),
      sim: new FormControl(false, []),
      insurance: new FormControl(false, []),
      forex: new FormControl(false, []),
    });

    this.travellerForm = this.formBuilder.group({
      travellers: this.formBuilder.array([this.createTraveller()]),
    });

    let arr = (<FormArray>this.travellerForm.get("travellers")).controls;

    for (let i = 0; i < this.imageUploads.length; i++) {
      this.filedNameArr.push(this.imageUploads[i].fieldName);
    }
    arr.forEach((element: FormGroup) => {
      this.filedNameArr.forEach((fieldName) => {
        if (element.controls[fieldName]) {
          element.controls[fieldName].setValidators([
            Validators.required,
            requiredFileType("png"),
          ]);
          element.controls[fieldName].updateValueAndValidity();
        }
      });

      element.updateValueAndValidity();
    });
  }

  selectAllFn() {
    let simValue = this.valueAddedService.get("sim").value;
    let insuranceValue = this.valueAddedService.get("insurance").value;
    let forexValue = this.valueAddedService.get("forex").value;
    let selectAllValue = this.valueAddedService.get("selectAll").value;
    if (!simValue || !forexValue || !insuranceValue) {
      this.valueAddedService.setValue({
        selectAll: true,
        sim: true,
        insurance: true,
        forex: true,
      });
    } else {
      this.valueAddedService.setValue({
        selectAll: false,
        sim: false,
        insurance: false,
        forex: false,
      });
    }

    this.valueAddedService.updateValueAndValidity();
  }

  createTraveller(): FormGroup {
    // if (this.category == "e-visa") {
    if (this.imageUpload) {
      return this.formBuilder.group({
        title: ["Mr", [Validators.required]],
        firstName: ["", [Validators.required]],
        middleName: [""],
        lastName: ["", [Validators.required]],
        emailId: ["", Validators.required],
        dateOfBirthCopy: ["", [Validators.required]],
        dateOfBirth: ["", [Validators.nullValidator]],
        passportNumber: ["", [Validators.required]],
        passportExpiryDateCopy: ["", [Validators.required]],

        passportExpiryDate: ["", [Validators.nullValidator]],
        gstNumber: "",
        cellNumber: ["", [Validators.required]],
        state: ["Haryana", [Validators.required]],

        passportFrontImage: [null],
        itr: [null],
        passportBioImage: [null],
        sixMonthsBankStatement: [null],

        userImage: [null],
        noc: [null],
        panCard: [null],
        invitation: [null],
        departureFlightTicket: [null],
        arrivalFlightTicket: [null],
        hotelAccommodation: [null],
        businessCard: [null],
        insurance: [null],
      });
    } else {
      return this.formBuilder.group({
        title: ["Mr", [Validators.required]],
        firstName: ["", [Validators.required]],
        middleName: [""],
        lastName: ["", [Validators.required]],
        emailId: ["", Validators.required],
        dateOfBirthCopy: ["", [Validators.required]],
        dateOfBirth: ["", [Validators.nullValidator]],
        passportNumber: ["", [Validators.required]],
        passportExpiryDateCopy: ["", [Validators.required]],
        passportExpiryDate: ["", Validators.nullValidator],
        gstNumber: "",
        cellNumber: ["", [Validators.required]],
        addressForPickupSame: [false, [Validators.required]],
        address: ["", [Validators.required]],
        state: ["Haryana", [Validators.required]],
        city: ["Gurgaon", [Validators.required]],
        pinCode: ["", [Validators.required]],
      });
    }
  }

  get formData() {
    return <FormArray>this.travellerForm.get("travellers");
  }

  checkDateOfTravel() {
    this.travelDetails.get("dateOfCollection").setValue("");

    let temp: any = this.travelDetails.get("dateOfTravel").value;
    this.minDateOfCollection = {
      year: temp.year,
      month: temp.month,
      day: temp.day - this.minTravelDate,
    };

    this.checkDateOfCollectionUnderFlow(this.minDateOfCollection);
  }

  checkDateOfCollection() {
    // if (this.category == "Sticker") {
    if (!this.imageUpload) {
      if (
        this.travelDetails.get("dateOfCollection").value == undefined ||
        this.travelDetails.get("dateOfCollection").value == null ||
        this.travelDetails.get("dateOfCollection").value == ""
      ) {
        this.collectionDateError = true;
        let topPicker;
        if (window.innerWidth > 600) {
          topPicker = 0;
        } else {
          topPicker = 490;
        }
        window.scrollTo({
          top: topPicker + this.scrollBy,
          left: 0,
          behavior: "smooth",
        });
      } else {
        this.collectionDateError = false;
      }
    }
  }

  validateDate() {
    if (
      this.travelDetails.get("dateOfTravel").value == undefined ||
      this.travelDetails.get("dateOfTravel").value == null ||
      this.travelDetails.get("dateOfTravel").value == ""
    ) {
      this.travelDateError = true;
      let topPicker;
      if (window.innerWidth > 600) {
        topPicker = 0;
      } else {
        topPicker = 350;
      }
      window.scrollTo({
        top: topPicker + this.scrollBy,
        left: 0,
        behavior: "smooth",
      });
    } else {
      this.travelDateError = false;
    }
  }

  validateTravellerForm() {
    for (
      let index = 0;
      index < this.travellerForm.get("travellers").controls.length;
      index++
    ) {
      let i = index;

      let firstNameValue = this.travellerForm.controls.travellers.controls[i]
        .controls.firstName.value;
      let lastNameValue = this.travellerForm.controls.travellers.controls[i]
        .controls.lastName.value;
      let emailValue = this.travellerForm.controls.travellers.controls[i]
        .controls.emailId.value;
      let passportNumberValue = this.travellerForm.controls.travellers.controls[
        i
      ].controls.passportNumber.value;
      let dateOfBirthValue = this.travellerForm.controls.travellers.controls[i]
        .controls.dateOfBirthCopy.value;
      let passportExpiryDateValue = this.travellerForm.controls.travellers
        .controls[i].controls.passportExpiryDate.value;
      let passportExpiryDateCopyValue = this.travellerForm.controls.travellers
        .controls[i].controls.passportExpiryDateCopy.value;
      let cellNumberValue = this.travellerForm.controls.travellers.controls[i]
        .controls.cellNumber.value;

      if (
        firstNameValue == "" ||
        firstNameValue == null ||
        firstNameValue == undefined
      ) {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.firstName.firstNameError = true;
      } else {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.firstName.firstNameError = false;
      }

      if (
        lastNameValue == "" ||
        lastNameValue == null ||
        lastNameValue == undefined
      ) {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.lastName.lastNameError = true;
      } else {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.lastName.lastNameError = false;
      }

      if (emailValue == "" || emailValue == null || emailValue == undefined) {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.emailId.emailError = true;
      } else {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.emailId.emailError = false;
      }

      if (
        passportNumberValue == "" ||
        passportNumberValue == null ||
        passportNumberValue == undefined
      ) {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.passportNumber.passportError = true;
      } else {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.passportNumber.passportError = false;
      }

      if (
        passportExpiryDateValue == "" ||
        passportExpiryDateValue == null ||
        passportExpiryDateValue == undefined
      ) {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.passportExpiryDate.passportExpiryError = true;
      } else {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.passportExpiryDate.passportExpiryError = false;
      }

      if (
        passportExpiryDateCopyValue == "" ||
        passportExpiryDateCopyValue == null ||
        passportExpiryDateCopyValue == undefined
      ) {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.passportExpiryDateCopy.passportExpiryCopyError = true;
      } else {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.passportExpiryDateCopy.passportExpiryCopyError = false;
      }

      if (
        dateOfBirthValue == "" ||
        dateOfBirthValue == null ||
        dateOfBirthValue == undefined
      ) {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.dateOfBirth.dateOfBirthError = true;
      } else {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.dateOfBirthCopy.dateOfBirthError = false;
      }

      if (
        cellNumberValue == "" ||
        cellNumberValue == null ||
        cellNumberValue == undefined
      ) {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.cellNumber.cellError = true;
      } else {
        this.travellerForm.controls.travellers.controls[
          i
        ].controls.cellNumber.cellError = false;
      }

      // if (this.category == "sticker") {
      if (!this.imageUpload) {
        let addressValue = this.travellerForm.controls.travellers.controls[i]
          .controls.address.value;
        let pinCodeValue = this.travellerForm.controls.travellers.controls[i]
          .controls.pinCode.value;

        if (
          addressValue == "" ||
          addressValue == null ||
          addressValue == undefined
        ) {
          this.travellerForm.controls.travellers.controls[
            i
          ].controls.address.addressError = true;
        } else {
          this.travellerForm.controls.travellers.controls[
            i
          ].controls.address.addressError = false;
        }

        if (
          pinCodeValue == "" ||
          pinCodeValue == null ||
          pinCodeValue == undefined
        ) {
          this.travellerForm.controls.travellers.controls[
            i
          ].controls.pinCode.zipCodeError = true;
        } else {
          this.travellerForm.controls.travellers.controls[
            i
          ].controls.pinCode.zipCodeError = false;
        }
      }
    }
  }

  validateImage() {}

  seeValues() {
    this.validateImage();
    this.validateTravellerForm();
    this.validateDate();
    this.checkDateOfCollection();

    let tempArr =
      (<FormArray>this.travellerForm.get("travellers")).controls || [];

    tempArr.forEach((form: FormGroup, index) => {
      let dob: { year: number; month: number; day: number } = form.get(
        "dateOfBirthCopy"
      ).value;
      let doe: { year: number; month: number; day: number } = form.get(
        "passportExpiryDateCopy"
      ).value;

      let tempDob = "";
      let tempDoe = "";

      if (dob.month < 10 && dob.day < 10) {
        tempDob = dob.year + "-0" + dob.month + "-0" + dob.day;
      } else if (dob.day < 10) {
        tempDob = dob.year + "-" + dob.month + "-0" + dob.day;
      } else if (dob.month < 10) {
        tempDob = dob.year + "-0" + dob.month + "-" + dob.day;
      } else {
        tempDob = dob.year + "-" + dob.month + "-" + dob.day;
      }
      if (doe.month < 10 && doe.day < 10) {
        tempDoe = doe.year + "-0" + doe.month + "-0" + doe.day;
      } else if (doe.day < 10) {
        tempDoe = doe.year + "-" + doe.month + "-0" + doe.day;
      } else if (doe.month < 10) {
        tempDoe = doe.year + "-0" + doe.month + "-" + doe.day;
      } else {
        tempDoe = doe.year + "-" + doe.month + "-" + doe.day;
      }

      form.get("dateOfBirth").setValue(tempDob);
      form.get("passportExpiryDate").setValue(tempDoe);

      form.get("dateOfBirth").updateValueAndValidity();
      form.get("passportExpiryDate").updateValueAndValidity();
    });

    if (
      this.travellerForm.valid &&
      this.travelDetails.valid &&
      this.valueAddedService.valid
    ) {
      if (this.termsAndConditions.valid) {
        this.preloaderService.showPreloader(true);
        let otherTravellersArr: Array<any> = [];
        const fd = {};

        this.formData1.set("images", "");

        let tempArr =
          (<FormArray>this.travellerForm.get("travellers")).controls || [];

        tempArr.forEach((form: FormGroup, index) => {
          // if (this.category == "e-visa") {
          if (this.imageUpload) {
            this.filedNameArr.forEach((el) => {
              this.formData1.append("images", form.get(el).value);

              this.tempImageArr.push(form.get(el).value);
              form.get(el).setValue(form.get(el).value.name);
              form.get(el).updateValueAndValidity();
            });
          } else {
            let eliminateEnter = form
              .get("address")
              .value.replace(/[\r\n]+/g, " ");

            form.get("address").setValue(eliminateEnter);
            form.get("address").updateValueAndValidity();

            this.primaryAddress = (<FormArray>(
              this.travellerForm.get("travellers")
            )).controls[0]
              .get("address")
              .value.replace(/[\r\n]+/g, " ");

            this.primaryState = (<FormArray>(
              this.travellerForm.get("travellers")
            )).controls[0].get("state").value;
            this.primaryCity = (<FormArray>(
              this.travellerForm.get("travellers")
            )).controls[0].get("city").value;
            this.primaryPinCode = (<FormArray>(
              this.travellerForm.get("travellers")
            )).controls[0].get("pinCode").value;

            let same = form.get("addressForPickupSame").value;

            if (same) {
              form.get("address").setValue(this.primaryAddress);
              form.get("state").setValue(this.primaryState);
              form.get("city").setValue(this.primaryCity);
              form.get("pinCode").setValue(this.primaryPinCode);
              form.updateValueAndValidity();
            }
          }
        });

        let ptdata: any = this.travellerForm.get("travellers").value || [];
        ptdata["id"] = this.dataSource[0].id;
        ptdata.forEach((element: {}, index) => {
          element["id"] = this.dataSource[index].id;
        });

        let dot: {
          year: number;
          month: number;
          day: number;
        } = this.travelDetails.get("dateOfTravel").value;
        let doc: {
          year: number;
          month: number;
          day: number;
        } = this.travelDetails.get("dateOfCollection").value;

        let finalDot = "";
        let finalDoc = "";

        if (dot.month < 10 && dot.day < 10) {
          finalDot = dot.year + "-0" + dot.month + "-0" + dot.day;
        } else if (dot.day < 10) {
          finalDot = dot.year + "-" + dot.month + "-0" + dot.day;
        } else if (dot.month < 10) {
          finalDot = dot.year + "-0" + dot.month + "-" + dot.day;
        } else {
          finalDot = dot.year + "-" + dot.month + "-" + dot.day;
        }

        if (doc.month < 10 && doc.day < 10) {
          finalDoc = doc.year + "-0" + doc.month + "-0" + doc.day;
        } else if (doc.day < 10) {
          finalDoc = doc.year + "-" + doc.month + "-0" + doc.day;
        } else if (doc.month < 10) {
          finalDoc = doc.year + "-0" + doc.month + "-" + doc.day;
        } else {
          finalDoc = doc.year + "-" + doc.month + "-" + doc.day;
        }

        let other = ptdata.slice(1, ptdata.length) || [];

        fd["primaryTraveller"] = ptdata[0];
        fd["otherTravellers"] = other;
        fd["dateOfTravel"] = finalDot;
        // if (this.category == "Sticker") {
        if (!this.imageUpload) {
          fd["dateOfDocumentCollection"] = finalDoc;
        }
        fd["quoteId"] = this.quoteId;
        fd["countryName"] = this.country;
        fd["gstNumber"] = (<FormArray>(
          this.travellerForm.get("travellers")
        )).controls[0].get("gstNumber").value;
        let totalTraveller = this.dataSource.length || 1;
        fd["totalPayableAmount"] =
          (this.serviceTax + this.basePrice) * totalTraveller;

        fd["needSim"] = this.valueAddedService.get("sim").value;
        fd["needForexCard"] = this.valueAddedService.get("forex").value;
        fd["needInsurance"] = this.valueAddedService.get("insurance").value;
        fd["agreedToTcAndCancellationPolicy"] = this.termsAndConditions.get(
          "tnc"
        ).value;

        this.formData1.set("data", JSON.stringify(fd));

        let tempData =
          (<FormArray>this.travellerForm.get("travellers")).controls || [];

        this.travellerService
          .submitForm(this.formData1)
          .subscribe((data: any) => {
            if (data.code == "0") {
              this.travellerService.hitPaymentApi().subscribe((data1: any) => {
                this.buyerEmail = data1.buyerEmail;
                this.orderId = data1.orderId;
                this.amount = data1.amount;
                this.currency = data1.currency;
                this.merchantIdentifier = data1.merchantIdentifier;
                this.returnUrl = data1.returnUrl;
                this.checksum = data1.checksum;
                this.redirect = data1.paymentUrl;
                this.succeedToPayment = true;

                setTimeout(() => {
                  this.preloaderService.showPreloader(false);
                  document.forms["paymentForm"].submit();
                }, 2000);
              });
            } else if (data.code == "1000") {
              let errArr: Array<any> = data.data.applicantsFormValidationResult;
              let chunk = this.filedNameArr.length;
              let temparray = [];

              for (let i = 0, j = this.tempImageArr.length; i < j; i += chunk) {
                temparray = this.tempImageArr.slice(i, i + chunk);
                this.originalImageArr.push(temparray);
              }

              this.tempImageArr = [];

              let tempArr =
                (<FormArray>this.travellerForm.get("travellers")).controls ||
                [];

              tempArr.forEach((form: FormGroup, i) => {
                if (this.imageUpload) {
                  this.filedNameArr.forEach((el, j) => {
                    form.get(el).setValue(this.originalImageArr[i][j]);
                  });
                }
              });

              this.originalImageArr = [];
              tempArr.forEach((form: FormGroup, index) => {
                let keysArr: Array<any> = Object.keys(errArr[index]);
                keysArr.forEach((el: string) => {
                  let tempObj = errArr[index];
                  this.errorForm = tempObj.travellerId;

                  if (tempObj[el] == true) {
                    let control = form.get(el);
                    if (control != null) {
                      control.setErrors(null);
                      control.setErrors({ valueErr: true });
                    }
                  }
                });
              });
              this.preloaderService.showPreloader(false);
              this.toastr.warning("Some Details Missing " + this.errorForm);
            } else if (data.code == "500") {
              let chunk = this.filedNameArr.length;
              let temparray = [];

              for (let i = 0, j = this.tempImageArr.length; i < j; i += chunk) {
                temparray = this.tempImageArr.slice(i, i + chunk);
                this.originalImageArr.push(temparray);
              }

              this.tempImageArr = [];

              let tempArr =
                (<FormArray>this.travellerForm.get("travellers")).controls ||
                [];

              tempArr.forEach((form: FormGroup, i) => {
                // if (this.category == "e-visa") {
                if (this.imageUpload) {
                  this.filedNameArr.forEach((el, j) => {
                    form.get(el).setValue(this.originalImageArr[i][j]);
                  });
                }
              });

              this.originalImageArr = [];

              this.preloaderService.showPreloader(false);
              this.toastr.error(data.message);
            } else if (data.code == "1001") {
              let chunk = this.filedNameArr.length;
              let temparray = [];

              for (let i = 0, j = this.tempImageArr.length; i < j; i += chunk) {
                temparray = this.tempImageArr.slice(i, i + chunk);
                this.originalImageArr.push(temparray);
              }

              this.tempImageArr = [];

              let tempArr =
                (<FormArray>this.travellerForm.get("travellers")).controls ||
                [];

              tempArr.forEach((form: FormGroup, i) => {
                // if (this.category == "e-visa") {
                if (this.imageUpload) {
                  this.filedNameArr.forEach((el, j) => {
                    form.get(el).setValue(this.originalImageArr[i][j]);
                  });
                }
              });

              this.originalImageArr = [];

              this.modalWarnings = [];
              this.preloaderService.showPreloader(false);
              this.errorMessage.push(data.data.warnings.travelDateWarning);

              var modal = document.getElementById("exampleModal1");
              modal.classList.remove("fade");
              modal.classList.add("show");
              modal.style.display = "block";
            }
          });
      } else {
        this.toastr.warning("Please accept our terms and conditions");
      }
    } else {
      this.toastr.warning("Some details missing !");
      this.validateTravellerForm();

      if (this.travellerForm.invalid && this.travelDetails.valid) {
        let topPicker;
        if (window.innerWidth > 600) {
          topPicker = 350;
        } else {
          topPicker = 490;
        }
        window.scrollTo({
          top: topPicker + this.scrollBy,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }

  goToHome() {
    var modal = document.getElementById("exampleModal1");

    modal.classList.remove("show");
    modal.style.display = "none";
    modal.classList.add("fade");
    this.errorMessage = [];
    // this.router.navigate(['visa']);
  }

  setAddressSame(i: number) {
    let form = (<FormArray>this.travellerForm.get("travellers")).controls[i];

    let same = form.get("addressForPickupSame").value;

    if (!same) {
      form.get("address").setValidators(null);
      form.get("state").setValidators(null);
      form.get("city").setValidators(null);
      form.get("pinCode").setValidators(null);
      form.get("address").updateValueAndValidity();
      form.get("state").updateValueAndValidity();
      form.get("city").updateValueAndValidity();
      form.get("pinCode").updateValueAndValidity();

      form.updateValueAndValidity();
    } else {
      form.get("address").setValidators(Validators.required);
      form.get("state").setValidators(Validators.required);
      form.get("city").setValidators(Validators.required);
      form.get("pinCode").setValidators(Validators.required);
      form.get("address").updateValueAndValidity();
      form.get("state").updateValueAndValidity();
      form.get("city").updateValueAndValidity();
      form.get("pinCode").updateValueAndValidity();

      form.updateValueAndValidity();
    }
  }

  goToPayment() {
    let modalWarning = (<any>document.getElementById("modalWarning")).checked;
    var modal = document.getElementById("exampleModal1");
    if (modalWarning) {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.classList.add("fade");

      this.preloaderService.showPreloader(true);

      this.travellerService.hitPaymentApi().subscribe((data1: any) => {
        this.buyerEmail = data1.buyerEmail;
        this.orderId = data1.orderId;
        this.amount = data1.amount;
        this.currency = data1.currency;
        this.merchantIdentifier = data1.merchantIdentifier;
        this.returnUrl = data1.returnUrl;
        this.checksum = data1.checksum;
        this.redirect = data1.paymentUrl;

        setTimeout(() => {
          document.forms["paymentForm"].submit();
        }, 2000);
      });
    } else {
      this.toastr.warning("Please agree to the warning and then continue.");
    }
  }

  removeTraveller(index: number) {
    let temp = this.travellerForm.get("travellers") as FormArray;
    temp.removeAt(index);
    this.dataSource.splice(index, 1);
    this.count = this.count - 1;
    this.selectedTravellerForm = this.count;
  }

  selectedFile = null;

  check() {
    let arr = (<FormArray>this.travellerForm.get("travellers")).controls;

    arr.forEach((element: FormGroup) => {});
  }

  onFileSelected(event, index, controlName) {
    let typeErr = false;
    let sizeErr = false;

    this.selectedFile = event.target.files[0];
    let control = (<FormGroup>(
      (<unknown>(
        (<FormArray>this.travellerForm.get("travellers")).controls[index]
      ))
    )).controls[controlName];
    control.setValue(this.selectedFile);

    control.markAsDirty();
    control.markAllAsTouched();
  }

  addTraveller(): void {
    this.validateTravellerForm();
    if (this.travellerForm.invalid) {
      this.toastr.warning("Please fill in existing traveller details first");
      let topPicker;
        if (window.innerWidth > 600) {
          topPicker = 350;
        } else {
          topPicker = 490;
        }
        window.scrollTo({
          top: topPicker + this.scrollBy,
          left: 0,
          behavior: "smooth",
        });
    } else {
      if (this.count <= 9) {
        this.selectedTravellerForm = this.count;
        this.count = this.count + 1;
        this.scrollBy = 50 * this.count;
        let topPicker;
        if (window.innerWidth > 600) {
          topPicker = 350;
        } else {
          topPicker = 490;
        }
        window.scrollTo({
          top: topPicker + this.scrollBy,
          left: 0,
          behavior: "smooth",
        });
        let temp = { id: "", dataToggle: "", dataToggleHash: "" };
        temp.id = "Traveller " + this.count;
        temp.dataToggle = "toogle" + this.count;
        temp.dataToggleHash = "#toogle" + this.count;
        this.dataSource.push(temp);

        this.travellers = this.travellerForm.get("travellers") as FormArray;
        this.travellers.push(this.createTraveller());

        let tempVar = this.travellerForm.get("travellers") as FormArray;

        let arr = (<FormArray>this.travellerForm.get("travellers")).controls;

        // if (this.category == "e-visa") {
        if (this.imageUpload) {
          arr.forEach((element: FormGroup, i) => {
            if (i == arr.length - 1) {
              this.filedNameArr.forEach((fieldName) => {
                if (element.controls[fieldName]) {
                  element.controls[fieldName].setValidators([
                    Validators.required,
                    requiredFileType("png"),
                  ]);
                  element.controls[fieldName].updateValueAndValidity();
                }
              });

              element.updateValueAndValidity();
            }
          });
        }
      } else {
        this.toastr.error("Maximum Travellers Limit of 10 reached !");
      }
    }
  }

  canDeactivate() {
    if (
      this.travellerForm.pristine &&
      this.travellerForm.dirty &&
      this.travellerForm.invalid &&
      this.travelDetails.pristine &&
      this.travelDetails.dirty &&
      this.travelDetails.invalid &&
      this.valueAddedService.pristine &&
      this.valueAddedService.dirty &&
      this.valueAddedService.invalid
    ) {
      return true;
    } else {
      if (this.succeedToPayment) {
        return false;
        // } else {
        //   if (confirm("Are you sure!")) {
        // console.log("2");
        //   return false;
        // } else {
        // console.log("3");
        // this.router.navigateByUrl('/addTraveller');
        // window.history.replaceState("", "", "/addTraveller");
        // return true;
      }
    }
  }

  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
}
