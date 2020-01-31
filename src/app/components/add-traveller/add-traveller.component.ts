import { Component, OnInit, HostListener } from "@angular/core";
import {
  FormBuilder,
  Form,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { ToastService } from "src/app/shared/toast.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { requiredFileType } from "../../shared/Custom-Image.validator";
import { element } from "protractor";
import { AddTravellerService } from "./addTraveller.service";
import { LoginService } from "../login-signup/login/login.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { PreloaderService } from "src/app/shared/preloader.service";
import { from } from "rxjs";
import { RouterHistory } from 'src/app/shared/router-history.service';

@Component({
  selector: "app-add-traveller",
  templateUrl: "./add-traveller.component.html",
  styleUrls: ["./add-traveller.component.css"]
})
export class AddTravellerComponent implements OnInit {
  // model: NgbDateStruct;
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
  // firstCity = "Gurgaon"
  // firstState = "Haryana"

  list = {
    states: ["Delhi", "Haryana", "Uttar Pradesh"],
    cities: {
      Delhi: ["Delhi"],
      Haryana: ["Gurgaon"],
      "Uttar Pradesh": ["Noida"]
    }
  };
  dataSource = [
    { id: "Primary", dataToggle: "toogle1", dataToggleHash: "#toogle1" }
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

  constructor(
    private formBuilder: FormBuilder,
    private travellerService: AddTravellerService,
    private toastService: ToastService,
    private userFlow: UserFlowDetails,
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router,
    private preloaderService: PreloaderService,
    private routerHistory: RouterHistory
  ) {
    this.today = new Date();
    this.tomorrow = new Date(this.today);
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.tomorrowDate = {
      year: this.tomorrow.getFullYear(),
      month: this.tomorrow.getMonth() + 1,
      day: this.tomorrow.getDate()
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
          day: 1
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
            day: 1
          };
        }
      } else {
        if (date.day > 28) {
          this.minDatePassportExpiry = {
            year: date.year,
            month: date.month + 1,
            day: 1
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
          day: tempDay
        };
      }
    } else if (date.month == 2) {
      if (date.year % 4 == 0 && date.year % 100 != 0 && date.year % 400 == 0) {
        if (date.day > 29) {
          let tempDay = date.day - 29;
          this.minDateOfTravel = {
            year: date.year,
            month: date.month + 1,
            day: tempDay
          };
        }
      } else {
        if (date.day > 28) {
          let tempDay = date.day - 28;
          this.minDateOfTravel = {
            year: date.year,
            month: date.month + 1,
            day: tempDay
          };
        }
      }
    } else {
      if (date.day > 31) {
        let tempDay = date.day - 31;
        this.minDateOfTravel = {
          year: date.year,
          month: date.month + 1,
          day: tempDay
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
            day: 30
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
              day: 29
            };
          } else {
            this.minDateOfCollection = {
              year: date.year,
              month: prevMonth,
              day: 28
            };
          }
        } else {
          this.minDateOfCollection = {
            year: date.year,
            month: prevMonth,
            day: 31
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
            day: 30 + date.day
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
              day: 29 + date.day
            };
          } else {
            this.minDateOfCollection = {
              year: date.year,
              month: prevMonth,
              day: 28 + date.day
            };
          }
        } else {
          this.minDateOfCollection = {
            year: date.year,
            month: prevMonth,
            day: 31 + date.day
          };
        }
      }
    }
  }

  checkDateOfDob(date: { month: any; day: any; year: any }) {}

  ngOnInit() {
    setTimeout(() => {
      this.intialInfo = false; // ..??
    }, 10000);

    this.userFlowDetails = this.userFlow.getUserFlowDetails();

    this.imageUploads = JSON.parse(this.userFlowDetails.imageUploads);
    // console.log(this.imageUploads);
    if (this.imageUploads == "null") {
      this.imageUploads = [];
    }

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
      day: current.getDate()
    };

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    this.maxDateDob = {
      year: yesterday.getFullYear(),
      month: yesterday.getMonth() + 1,
      day: yesterday.getDate()
    };
    // this.checkDateOfDob(this.maxDateDob) ;

    this.minDateOfTravel = {
      // {year: minDate.year, month: minDate.month, day: minDate.day +3}

      year: this.minDate.year,
      month: this.minDate.month,
      day: this.minDate.day + 4
    };
    this.checkDateOfTravelOverflow(this.minDateOfTravel);
    // console.log(this.minDateOfTravel);

    this.minDateOfCollection = {
      // {year: minDate.year, month: minDate.month, day: minDate.day +1}
      year: this.dateOfTravelModel.year,
      month: this.dateOfTravelModel.month,
      day: this.dateOfTravelModel.day - 3
    };

    this.checkDateOfCollectionUnderFlow(this.minDateOfCollection);
    // console.log(this.minDateOfCollection);

    if (current.getMonth() >= 6) {
      // console.log("greater than 6 month");
      let x = 12 - (current.getMonth() + 1);
      this.minDatePassportExpiry = {
        year: current.getFullYear() + 1,
        month: 6 - x,
        day: current.getDate()
      };
      // console.log(x);
    } else {
      // console.log("less than 6 month");

      this.minDatePassportExpiry = {
        year: current.getFullYear(),
        month: current.getMonth() + 7,
        day: current.getDate()
      };
    }

    // console.log(this.minDatePassportExpiry);
    this.checkDateOfExpiry(this.minDatePassportExpiry);

    this.quoteId = data.quoteId;
    // console.log(data);
    this.country = data.country;
    this.basePrice = JSON.parse(data.basePrice);
    this.serviceTax = JSON.parse(data.serviceTax);

    // console.log(this.basePrice);
    // console.log(this.serviceTax);
    this.stayPeriod = data.stayPeriod;

    if (this.onlineCategory) {
      this.travelDetails = new FormGroup({
        dateOfTravel: new FormControl("", [Validators.required]),
        dateOfCollection: new FormControl("", [Validators.nullValidator])
      });
    } else {
      this.travelDetails = new FormGroup({
        dateOfTravel: new FormControl("", [Validators.required]),
        dateOfCollection: new FormControl("", [Validators.required])
      });
    }

    this.termsAndConditions = new FormGroup({
      tnc: new FormControl(false, [Validators.requiredTrue])
    });

    this.valueAddedService = new FormGroup({
      selectAll: new FormControl(false, []),
      sim: new FormControl(false, []),
      insurance: new FormControl(false, []),
      forex: new FormControl(false, [])
    });

    this.travellerForm = this.formBuilder.group({
      travellers: this.formBuilder.array([this.createTraveller()])
    });

    let arr = (<FormArray>this.travellerForm.get("travellers")).controls;

    for (let i = 0; i < this.imageUploads.length; i++) {
      this.filedNameArr.push(this.imageUploads[i].fieldName);
    }
    //console.log(this.filedNameArr)
    // console.log((<FormGroup><undefined>(<FormArray>this.travellerForm.get('travellers')).controls[0]).controls[this.filedNameArr[3]])
    arr.forEach((element: FormGroup) => {
      this.filedNameArr.forEach(fieldName => {
        if (element.controls[fieldName]) {
          element.controls[fieldName].setValidators([
            Validators.required,
            requiredFileType("png")
          ]);
          // console.log(element.controls[fieldName]);
          element.controls[fieldName].updateValueAndValidity();
        }
      });

      element.updateValueAndValidity();
    });
  }

  selectAllFn() {
    // console.log('fn callled');

    let simValue = this.valueAddedService.get("sim").value;
    let insuranceValue = this.valueAddedService.get("insurance").value;
    let forexValue = this.valueAddedService.get("forex").value;
    let selectAllValue = this.valueAddedService.get("selectAll").value;
    if (!simValue || !forexValue || !insuranceValue) {
      this.valueAddedService.setValue({
        selectAll: true,
        sim: true,
        insurance: true,
        forex: true
      });
    } else {
      this.valueAddedService.setValue({
        selectAll: false,
        sim: false,
        insurance: false,
        forex: false
      });
    }

    this.valueAddedService.updateValueAndValidity();
  }

  createTraveller(): FormGroup {
    if (this.onlineCategory) {
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

        passportFrontImage: [null],
        passportBioImage: [null],
        sixMonthsBankStatement: [null],
        insurance: [null],
        userImage: [null],
        departureFlightTicket: [null],
        arrivalFlightTicket: [null],
        hotelAccommodation: [null],
        businessCard: [null]
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
        pinCode: ["", [Validators.required]]
      });
    }
  }

  get formData() {
    return <FormArray>this.travellerForm.get("travellers");
  }

  checkDateOfTravel() {
    this.travelDetails.get("dateOfCollection").setValue("");

    // console.log(this.travelDetails.get('dateOfTravel').value);

    let temp: any = this.travelDetails.get("dateOfTravel").value;
    this.minDateOfCollection = {
      // {year: minDate.year, month: minDate.month, day: minDate.day +1}
      year: temp.year,
      month: temp.month,
      day: temp.day - 3
    };

    this.checkDateOfCollectionUnderFlow(this.minDateOfCollection);
    // console.log(this.minDateOfCollection);
    // console.log("hello world");
  }

  validateDate() {
    if (
      this.travelDetails.get("dateOfTravel").value == undefined ||
      this.travelDetails.get("dateOfTravel").value == null ||
      this.travelDetails.get("dateOfTravel").value == ""
    ) {
      this.travelDateError = true;
      // window.scroll(0,0);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } else {
      this.travelDateError = false;
    }
  }
  checkDateOfCollection() {
    if (!this.onlineCategory) {
      if (
        this.travelDetails.get("dateOfCollection").value == undefined ||
        this.travelDetails.get("dateOfCollection").value == null ||
        this.travelDetails.get("dateOfCollection").value == ""
      ) {
        this.collectionDateError = true;
        // window.scroll(0,0);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } else {
        this.collectionDateError = false;
      }
    }
  }

  seeValues() {
    this.validateDate();
    this.checkDateOfCollection();
    // console.log(this.filedNameArr);
    this.formData1.set("images", "");
    if (
      this.travellerForm.valid &&
      this.travelDetails.valid &&
      this.valueAddedService.valid
    ) {
      if (this.termsAndConditions.valid) {
        this.preloaderService.showPreloader(true);
        let otherTravellersArr: Array<any> = [];
        const fd = {};

        let tempArr =
          (<FormArray>this.travellerForm.get("travellers")).controls || [];
        tempArr.forEach((form: FormGroup, index) => {
          if (this.onlineCategory) {
            this.filedNameArr.forEach(el => {
              this.formData1.append("images", form.get(el).value);
              this.tempImageArr.push(form.get(el).value);
              form.get(el).setValue(form.get(el).value.name);
              // form.re
              // console.log(this.tempImageArr);
            });
          } else {
            this.primaryAddress = (<FormArray>(
              this.travellerForm.get("travellers")
            )).controls[0].get("address").value;
            this.primaryState = (<FormArray>(
              this.travellerForm.get("travellers")
            )).controls[0].get("state").value;
            this.primaryCity = (<FormArray>(
              this.travellerForm.get("travellers")
            )).controls[0].get("city").value;
            this.primaryPinCode = (<FormArray>(
              this.travellerForm.get("travellers")
            )).controls[0].get("pinCode").value;
            // console.log("inside other travellers")
            let same = form.get("addressForPickupSame").value;

            if (same) {
              form.get("address").setValue(this.primaryAddress);
              form.get("state").setValue(this.primaryState);
              form.get("city").setValue(this.primaryCity);
              form.get("pinCode").setValue(this.primaryPinCode);
              form.updateValueAndValidity();
            }
          }

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

        let ptdata: any = this.travellerForm.get("travellers").value || [];
        ptdata["id"] = this.dataSource[0].id;
        // console.log("hell world");
        ptdata.forEach((element: {}, index) => {
          element["id"] = this.dataSource[index].id;
          // console.log(element);
        });

        // console.log(ptdata[0]);
        // console.log(tempArr);

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
        if (!this.onlineCategory) {
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

        // this.formData1.append('totalPayableAmount',""+(this.serviceTax+this.basePrice)*totalTraveller);

        // this.formData1.append('needSim',this.valueAddedService.get('sim').value);
        // this.formData1.append('needForexCard',this.valueAddedService.get('forex').value);
        // this.formData1.append('needInsurance',this.valueAddedService.get('insurance').value);
        // this.formData1.append('agreedToTcAndCancellationPolicy',this.termsAndConditions.get('tnc').value);
        fd["needSim"] = this.valueAddedService.get("sim").value;
        fd["needForexCard"] = this.valueAddedService.get("forex").value;
        fd["needInsurance"] = this.valueAddedService.get("insurance").value;
        fd["agreedToTcAndCancellationPolicy"] = this.termsAndConditions.get(
          "tnc"
        ).value;

        this.formData1.set("data", JSON.stringify(fd));

        let tempData =
          (<FormArray>this.travellerForm.get("travellers")).controls || [];

        // console.log(tempData.values());

        // console.log(this.travellerForm.get('travellers').value);

        this.travellerService
          .submitForm(this.formData1)
          .subscribe((data: any) => {
            // console.log(data);

            if (data.code == "0") {
              this.travellerService.hitPaymentApi().subscribe((data1: any) => {
                // console.log(data1);
                this.buyerEmail = data1.buyerEmail;
                this.orderId = data1.orderId;
                this.amount = data1.amount;
                this.currency = data1.currency;
                this.merchantIdentifier = data1.merchantIdentifier;
                this.returnUrl = data1.returnUrl;
                this.checksum = data1.checksum;
                this.succeedToPayment = true;
                // this.paymentUrl = data1.paymentUrl;

                // console.log(document.forms["paymentForm"]);

                // console.log(this.paymentForm);
                setTimeout(() => {
                  this.preloaderService.showPreloader(false);
                  document.forms["paymentForm"].submit();
                }, 2000);
              });
            } else if (data.code == "1000") {
              // console.log(data.data.applicantsFormValidationResult);

              let errArr: Array<any> = data.data.applicantsFormValidationResult;

              let chunk = this.filedNameArr.length;
              let temparray = [];

              for (let i = 0, j = this.tempImageArr.length; i < j; i += chunk) {
                temparray = this.tempImageArr.slice(i, i + chunk);
                this.originalImageArr.push(temparray);
              }

              this.tempImageArr = [];

              // console.log(this.originalImageArr);

              let tempArr =
                (<FormArray>this.travellerForm.get("travellers")).controls ||
                [];

              tempArr.forEach((form: FormGroup, i) => {
                if (this.onlineCategory) {
                  this.filedNameArr.forEach((el, j) => {
                    form.get(el).setValue(this.originalImageArr[i][j]);
                    // form.re
                  });
                }
              });

              this.originalImageArr = [];

              // tempArr.forEach((form:FormGroup,index) => {
              //   console.log(form.get('dateOfBirth').value);
              //   let respDob : string = form.get('dateOfBirth').value;
              //   let year = respDob.substring(0,4);
              //   let month = respDob.substring(5,7);
              //   let day = respDob.substring(8,10);
              //   console.log(year+"*"+month+"*"+day);
              //   let dateObj = {year : year,month : month,day : day};

              //   form.get('dateOfBirth').setValue(dateObj);

              //   });
              tempArr.forEach((form: FormGroup, index) => {
                // console.log(Object.keys(errArr[index]));
                let keysArr: Array<any> = Object.keys(errArr[index]);
                keysArr.forEach((el: string) => {
                  let tempObj = errArr[index];
                  if (tempObj[el] == true) {
                    let control = form.get(el);
                    if (control != null) {
                      // control.s
                      control.setErrors(null);
                      control.setErrors({ valueErr: true });
                      // console.log(this.travellerForm.controls.travellers.controls[0].controls.dateOfBirth.value)
                      // control.get
                      // control.updateValueAndValidity();
                      // console.log(control.getError("valueErr") + el);
                      // control.
                      // console.log(control);
                    }
                  }
                });

                // })
              });
              // console.log(tempArr);
              this.preloaderService.showPreloader(false);
            } else if (data.code == "1001") {
              this.modalWarnings = [];
              this.preloaderService.showPreloader(false);
              // console.log(data.data.warnings);
              // for (var key in data.data.warnings) {
              // console.log(key, data.data.warnings[key]);
              // this.modalWarnings.push(data.data.warnings[key]);
              // }
              this.errorMessage.push(data.data.warnings);
              var modal = document.getElementById("exampleModal1");
              modal.classList.remove("fade");
              modal.classList.add("show");
              modal.style.display = "block";
            } else {
              tempArr.forEach((form: FormGroup, index) => {
                if (this.onlineCategory) {
                  this.formData1.delete("images");
                }
              });
              this.preloaderService.showPreloader(false);
              this.toastService.showNotification(data.message, 4000);
            }
          });

        // console.log(fd);
      } else {
        this.toastService.showNotification(
          "Please accept out terms and conditions",
          4000
        );
      }
    } else {
      this.toastService.showNotification("Travel details missing!", 4000);
    }

    // });
  }

  // showWarning (item : boolean){

  //   let modalWarning = (<any>document.getElementById('modalWarning')).value;

  //   if(item && modalWarning ) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  goToHome() {
    var modal = document.getElementById("exampleModal1");

    modal.classList.remove("show");
    modal.style.display = "none";
    modal.classList.add("fade");
    // this.router.navigate(['visa']);
  }
  setAddressSame(i: number) {
    // let same = form.get('addressForPickupSame').value;
    let form = (<FormArray>this.travellerForm.get("travellers")).controls[i];
    let same = form.get("addressForPickupSame").value;
    // console.log(same);

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
    // console.log(modalWarning);
    if (modalWarning) {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.classList.add("fade");

      this.preloaderService.showPreloader(true);

      this.travellerService.hitPaymentApi().subscribe((data1: any) => {
        // console.log(data1);
        this.buyerEmail = data1.buyerEmail;
        this.orderId = data1.orderId;
        this.amount = data1.amount;
        this.currency = data1.currency;
        this.merchantIdentifier = data1.merchantIdentifier;
        this.returnUrl = data1.returnUrl;
        this.checksum = data1.checksum;
        // this.paymentUrl = data1.paymentUrl;

        // console.log(document.forms["paymentForm"]);

        // console.log(this.paymentForm);
        setTimeout(() => {
          document.forms["paymentForm"].submit();
        }, 2000);
      });
    } else {
      this.toastService.showNotification(
        "Please agree to the warning and then continue.",
        4000
      );
    }
  }

  callMe() {
    // console.log("hellow orld");
  }

  removeTraveller(index: number) {
    let temp = this.travellerForm.get("travellers") as FormArray;
    temp.removeAt(index);
    this.dataSource.splice(index, 1);
    this.count = this.count - 1;
  }

  selectedFile = null;

  check() {
    let arr = (<FormArray>this.travellerForm.get("travellers")).controls;

    arr.forEach((element: FormGroup) => {
      // console.log(element.value);
    });
  }

  onFileSelected(event, index, controlName) {
    let typeErr = false;
    let sizeErr = false;

    this.selectedFile = event.target.files[0];
    // this.requestImageArr.push(this.selectedFile);
    // let fileReader = new FileReader();

    // fileReader.onload = (e) => {
    //   console.log(fileReader.result);
    // }

    // fileReader.readAsBinaryString(this.selectedFile);
    // control.setValue(a);

    let control = (<FormGroup>(
      (<unknown>(
        (<FormArray>this.travellerForm.get("travellers")).controls[index]
      ))
    )).controls[controlName];
    control.setValue(this.selectedFile);

    // control.setValue(control.value.name);
    control.markAsDirty();
    control.markAllAsTouched();
  }

  onUpload() {}

  addTraveller(): void {
    // console.log(this.travellerForm.controls.travellers.control);
    console.log((<FormArray>this.travellerForm.get("travellers")).value);
    if (!this.travellerForm.valid) {
      this.toastService.showNotification(
        "Please fill in existing traveller details first",
        4000
      );
    } else {
      if (this.count <= 9) {
        this.count = this.count + 1;
        let temp = { id: "", dataToggle: "", dataToggleHash: "" };
        temp.id = "Traveller " + this.count;
        temp.dataToggle = "toogle" + this.count;
        temp.dataToggleHash = "#toogle" + this.count;
        this.dataSource.push(temp);

        this.travellers = this.travellerForm.get("travellers") as FormArray;
        this.travellers.push(this.createTraveller());

        // for (let i = 0; i < this.imageUploads.length; i++) {

        //   this.filedNameArr.push(this.imageUploads[i].fieldName);
        // }
        let tempVar = this.travellerForm.get("travellers") as FormArray;

        let arr = (<FormArray>this.travellerForm.get("travellers")).controls;

        if (this.onlineCategory) {
          arr.forEach((element: FormGroup, i) => {
            if (i == arr.length - 1) {
              this.filedNameArr.forEach(fieldName => {
                if (element.controls[fieldName]) {
                  element.controls[fieldName].setValidators([
                    Validators.required,
                    requiredFileType("png")
                  ]);
                  // console.log(element.controls[fieldName]);
                  element.controls[fieldName].updateValueAndValidity();
                }
              });

              element.updateValueAndValidity();
            }
          });
        }
      } else {
        this.toastService.showNotification(
          "Maximum Travellers Limit of 10 reached !",
          6000
        );
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
      // console.log("1");
      return true;
    } else if (this.succeedToPayment) {
      return false;
    } else {
      if (confirm("Are you sure!")) {
        // console.log("2");
        return false;
      } else {
        // console.log("3");
        // this.router.navigateByUrl('/addTraveller');
        window.history.replaceState("", "", "/addTraveller") ;
        return true;
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
