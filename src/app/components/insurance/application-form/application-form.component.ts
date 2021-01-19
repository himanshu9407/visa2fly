import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { InsuranceService } from './../insurance.service';
import { PreloaderService } from './../../../shared/preloader.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  insuranceForm: FormGroup;
  insurer: FormArray;
  birthDtError: boolean;
  count: number = 1;
  dataSource = [
    { id: "Primary", dataToggle: "toogle1", dataToggleHash: "#toogle1" },
  ];
  selectedTravellerForm: number = 0;
  maxDateDob: { year: number; month: number; day: number; };
  formData: any;
  termsAndConditionForm: FormGroup;

  policyDetailForm: FormGroup;
  insuranceDetails: {
    country: string,
    ageOfTravellers: Array<number>[],
    tripStartDate: string,
    tripEndDate: string,
    anyMedicalCondition: boolean
  };
  insurancePlan: {
    coverage: string,
    planType: string,
  };

  residenceProofError: boolean;
  setResposeArr: Array<any> = [];
  premiumDetails: any;
  basicPremiumCalculated: any;
  goldPremiumCalculated: any;
  premiumCalculated: any;
  actionUrl: string;
  returnUrl: string;
  proposalNumber: string;

  public paymentForm: any = {};
  newPremium: number;
  oldPremium: number;
  createPolicyBookingId: string;
  agreeWarningForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private preloaderService: PreloaderService,
    private insuranceService: InsuranceService, private userflowDetails: UserFlowDetails) {

    this.insuranceDetails = this.userflowDetails.getInsuranceDetails();
    console.log(this.insuranceDetails);
    // console.log(this.premiumFormDetail);

    this.insurancePlan = this.userflowDetails.getInsurancePlanDetails();

    this.premiumDetails = JSON.parse(this.userflowDetails.getLocalStorage('premiumDetails'));
    console.log(this.premiumDetails.noOfTraveller);

    // this.getPremiumForm.get('country').setValue(premiumFormDetail.country);
    // this.getPremiumForm.get('country').setValue(premiumFormDetail.country);
    // this.getPremiumForm.get('tripStartDate').setValue(premiumFormDetail.tripStartDate);
    // this.getPremiumForm.get('tripEndDate').setValue(premiumFormDetail.tripEndDate);
    // this.getPremiumForm.get('anyMedicalCondition').setValue(premiumFormDetail.anyMedicalCondition);
  }

  ngOnInit(): void {
    this.preloaderService.showPreloader(false);

    this.insuranceForm = this.formBuilder.group({
      insurer: this.formBuilder.array([this.issueInsurancePolicy()]),
    });

    this.policyDetailForm = this.formBuilder.group({
      planType: [{ value: '' }, [Validators.required]],
      coverage: [{ value: '', disabled: true }, [Validators.required]]
    })

    this.termsAndConditionForm = this.formBuilder.group({
      tnc: [false, [Validators.requiredTrue]],
    });

    this.agreeWarningForm = this.formBuilder.group({
      agree: [false, [Validators.requiredTrue]],
    });

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    this.maxDateDob = {
      year: yesterday.getFullYear(),
      month: yesterday.getMonth() + 1,
      day: yesterday.getDate(),
    };

    this.policyDetailForm.get('planType').setValue(this.insurancePlan.planType);
    this.policyDetailForm.get('coverage').setValue(this.insurancePlan.coverage);

    this.premiumDetails = JSON.parse(this.userflowDetails.getLocalStorage('premiumDetails'));
    this.premiumDetails.premiumAsPerPlan.forEach(element => {
      console.log(element);
      if (element.planType == 'Basic') {
        this.basicPremiumCalculated = element.premiumCalculated;
      } else if (element.planType == 'Gold') {
        this.goldPremiumCalculated = element.premiumCalculated;
      }
    });


    if (this.insurancePlan.planType == 'Basic') {
      this.premiumCalculated = this.basicPremiumCalculated;
    } else if (this.insurancePlan.planType == 'Gold') {
      this.premiumCalculated = this.goldPremiumCalculated;
    }

    console.log(this.getControls);
  }

  issueInsurancePolicy(): FormGroup {
    return this.formBuilder.group({
      birthDtCopy: ["", [Validators.required]],
      birthDt: ["", [Validators.required]],
      firstName: ["", [Validators.required,]],
      genderCd: ["MALE", [Validators.required]],
      lastName: ["", [Validators.required,]],
      relationCd: ["SELF", [Validators.required]],
      // roleCd: ["", [Validators.required]],
      titleCd: ["MR", [Validators.required]],
      citizenshipCd: [{ value: "IND", disabled: true }, [Validators.required]],
      // residenceProof: ["", [Validators.required]],
      addressForPickupSame: [false, [Validators.required]],
      partyAddressDOList: this.formBuilder.array([this.partyAddressDoList()]),
      partyContactDOList: this.formBuilder.array([this.partyContactDOList()]),
      partyEmailDOList: this.formBuilder.array([this.partyEmailDOList()]),
      partyIdentityDOList: this.formBuilder.array([this.partyIdentityDOList()])
    })
  }

  partyAddressDoList() {
    return this.formBuilder.group({
      addressLine1Lang1: ["", [Validators.required]],
      addressLine2Lang1: ["", [Validators.required]],
      addressTypeCd: ["PERMANENT", [Validators.required]],
      areaCd: ["", [Validators.required]],
      cityCd: ["", [Validators.required]],
      pinCode: ["", [Validators.required]],
      stateCd: ["", [Validators.required]],
      countryCd: ["", [Validators.required]],
    });
  }

  partyContactDOList() {
    return this.formBuilder.group({
      contactNum: ["", [Validators.required]],
      // contactTypeCd: ["MOBILE", [Validators.required]],
      stdCode: ["+91", [Validators.required]],
    });
  }

  partyEmailDOList() {
    return this.formBuilder.group({
      emailAddress: ["", [Validators.required]],
      // emailTypeCd: ["PERSONAL", [Validators.required]],
    });
  }

  partyIdentityDOList() {
    return this.formBuilder.group({
      identityNum: ["", [Validators.required]],
      identityTypeCd: ["PAN", [Validators.required]]
    });
  }

  get getControls() {
    return (this.insuranceForm.get('insurer') as FormArray).controls;
  }

  submitForm() {
    ($('#warningModal') as any).modal('show')
    // this.checkValidateForm();
    console.log(JSON.stringify(this.insuranceForm.value));

    let tempArr =
      (<FormArray>this.insuranceForm.get("insurer")).controls || [];

    tempArr.forEach((form: FormGroup) => {
      let birthDtVar: { year: number; month: number; day: number } = form.get(
        "birthDtCopy"
      ).value;

      let tempBirthDt = "";

      if (birthDtVar.month < 10 && birthDtVar.day < 10) {
        tempBirthDt = "0" + birthDtVar.day + "/0" + birthDtVar.month + "/" + birthDtVar.year;
      } else if (birthDtVar.day < 10) {
        tempBirthDt = "0" + birthDtVar.day + "/" + birthDtVar.month + "/" + birthDtVar.year;
      } else if (birthDtVar.month < 10) {
        tempBirthDt = birthDtVar.day + "/0" + birthDtVar.month + "/" + birthDtVar.year;
      } else {
        tempBirthDt = birthDtVar.day + "/" + birthDtVar.month + "/" + birthDtVar.year;
      }

      console.log(tempBirthDt);


      form.get("birthDt").setValue(tempBirthDt);
      form.get("birthDt").updateValueAndValidity();
    });

    if (!this.insuranceForm.valid) {
      this.toastr.warning("Some details missing !");
      this.checkValidateForm();
    } else {
      if (!this.termsAndConditionForm.valid) {
        this.toastr.warning("Please accept our terms and conditions");
      } else {
        // this.preloaderService.showPreloader(true);
        const fd = {};

        let tempArr = this.getControls || [];

        let ptdata: any = this.insuranceForm.get("insurer").value || [];
        ptdata["id"] = this.dataSource[0].id;

        let tripStartDateDay = this.insuranceDetails.tripStartDate.split('-')[2];
        let tripStartDateMonth = this.insuranceDetails.tripStartDate.split('-')[1];
        let tripStartDateYear = this.insuranceDetails.tripStartDate.split('-')[0];

        let tripEndDateDay = this.insuranceDetails.tripEndDate.split('-')[2];
        let tripEndDateMonth = this.insuranceDetails.tripEndDate.split('-')[1];
        let tripEndDateYear = this.insuranceDetails.tripEndDate.split('-')[0];

        let tripStartDate = tripStartDateDay + "/" + tripStartDateMonth + "/" + tripStartDateYear // 10/01/2021
        let tripEndDate = tripEndDateDay + "/" + tripEndDateMonth + "/" + tripEndDateYear // 10/01/2021

        let country = this.insuranceDetails.country;
        let planType = this.userflowDetails.getInsurancePlanDetails().planType;

        // ptdata.forEach((element: {}, index) => {
        //   element["id"] = this.dataSource[index].id;
        // });
        fd["partyDOList"] = ptdata;
        fd["policyCommencementDt"] = tripStartDate;
        fd["policyMaturityDt"] = tripEndDate;
        fd["country"] = country;
        fd["planType"] = planType;
        // fd["maxTripPeriod"] = "45",
        // fd["tripTypeCd"] = "SINGLE"

        // this.formData.set("data", JSON.stringify(fd));

        console.log(fd);

        this.insuranceService.createPolicy(fd).subscribe((res: any) => {
          if (res.code === "0") {
            this.createPolicyBookingId = res.data.bookingId;
            this.premiumDetails = JSON.parse(this.userflowDetails.getLocalStorage('premiumDetails'));
            console.log(this.premiumDetails.noOfTraveller);
            
            if (this.premiumDetails.noOfTraveller !== this.getControls.length) {
              this.newPremium = res.data.amount;
              this.oldPremium = this.premiumCalculated;
              ($('#warningModal') as any).modal('show')
            } else {
              this.paymentInitiate(this.createPolicyBookingId);
            }
          } else {
            this.toastr.error(res.message);
          }
        });

        this.setResposeArr = [];
      }
    }
  }

  paymentInitiate(bookingId: string) {
    this.preloaderService.showPreloader(true);
    this.insuranceService.paymentInitiate(bookingId).subscribe((res: any) => {
      if (res.code == "0") {
        this.actionUrl = res.actionUrl;
        this.returnUrl = res.returnUrl;
        this.proposalNumber = res.proposalNumber;
  
        setTimeout(() => {
          this.preloaderService.showPreloader(false);
          document.forms["paymentForm"].submit();
        }, 5000);
      }
    });
  }

  warningModal() {
    if (!this.agreeWarningForm.valid) {
      this.toastr.warning("Please agree to the warning and then continue.")
    } else {
      this.paymentInitiate(this.createPolicyBookingId);
      ($('#warningModal') as any).modal('hide');
    }
  }

  checkValidateForm() {
    for (
      let index = 0;
      index < this.getControls.length;
      index++
    ) {
      console.log(index);
      console.log(this.getControls.length);

      // let citizenshipCd = this.getControls[index]['controls'].citizenshipCd.value;
      // citizenshipCd == "" || citizenshipCd == null || citizenshipCd == undefined ?
      //   this.getControls[index]['controls'].citizenshipCd.citizenshipCdError = true :
      //   this.getControls[index]['controls'].citizenshipCd.citizenshipCdError = false;

      // let residenceProof = this.getControls[index]['controls'].residenceProof.value;
      // residenceProof == "" || residenceProof == null || residenceProof == undefined ?
      //   this.getControls[index]['controls'].residenceProof.residenceProofError = true :
      //   this.getControls[index]['controls'].residenceProof.residenceProofError = false;

      let birthDt = this.getControls[index]['controls'].birthDtCopy.value;
      birthDt == "" || birthDt == null || birthDt == undefined ?
        this.getControls[index]['controls'].birthDt.birthDtError = true :
        this.getControls[index]['controls'].birthDt.birthDtError = false;

      let firstName = this.getControls[index]['controls'].firstName.value;
      firstName == "" || firstName == null || firstName == undefined ?
        this.getControls[index]['controls'].firstName.firstNameError = true :
        this.getControls[index]['controls'].firstName.firstNameError = false;

      // let genderCd = this.getControls[index]['controls'].genderCd.value;
      // genderCd == "" || genderCd == null || genderCd == undefined ?
      //   this.getControls[index]['controls'].genderCd.genderCdError = true :
      //   this.getControls[index]['controls'].genderCd.genderCdError = false;

      let lastName = this.getControls[index]['controls'].lastName.value;
      lastName == "" || lastName == null || lastName == undefined ?
        this.getControls[index]['controls'].lastName.lastNameError = true :
        this.getControls[index]['controls'].lastName.lastNameError = false;

      // let relationCd = this.getControls[index]['controls'].relationCd.value;
      // relationCd == "" || relationCd == null || relationCd == undefined ?
      //   this.getControls[index]['controls'].relationCd.relationCdError = true :
      //   this.getControls[index]['controls'].relationCd.relationCdError = false;

      // let roleCd = this.getControls[index]['controls'].roleCd.value;
      // roleCd == "" || roleCd == null || roleCd == undefined ?
      //   this.getControls[index]['controls'].roleCd.roleCdError = true :
      //   this.getControls[index]['controls'].roleCd.roleCdError = false;

      let titleCd = this.getControls[index]['controls'].titleCd.value;
      titleCd == "" || titleCd == null || titleCd == undefined ?
        this.getControls[index]['controls'].titleCd.titleCdError = true :
        this.getControls[index]['controls'].titleCd.titleCdError = false;


      // partyAddressDOList
      let addressLine1Lang1 = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine1Lang1.value;
      addressLine1Lang1 == "" || addressLine1Lang1 == null || addressLine1Lang1 == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine1Lang1.addressLine1Lang1Error = true :
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine1Lang1.addressLine1Lang1Error = false;

      let addressLine2Lang1 = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine2Lang1.value;
      addressLine2Lang1 == "" || addressLine2Lang1 == null || addressLine2Lang1 == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine2Lang1.addressLine2Lang1Error = true :
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine2Lang1.addressLine2Lang1Error = false;

      // let addressTypeCd = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressTypeCd.value;
      // addressTypeCd == "" || addressTypeCd == null || addressTypeCd == undefined ?
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressTypeCd.addressTypeCdError = true :
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressTypeCd.addressTypeCdError = false;

      let areaCd = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.areaCd.value;
      areaCd == "" || areaCd == null || areaCd == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.areaCd.areaCdError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.areaCd.areaCdError = false;

      let cityCd = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.cityCd.value;
      cityCd == "" || cityCd == null || cityCd == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.cityCd.cityCdError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.cityCd.cityCdError = false;

      let pinCode = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.pinCode.value;
      pinCode == "" || pinCode == null || pinCode == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.pinCode.pinCodeError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.pinCode.pinCodeError = false;

      let stateCd = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.stateCd.value;
      stateCd == "" || stateCd == null || stateCd == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.stateCd.stateCdError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.stateCd.stateCdError = false;

      let countryCd = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.countryCd.value;
      countryCd == "" || countryCd == null || countryCd == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.countryCd.countryCdError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.countryCd.countryCdError = false;

      // partyContactDOList
      let contactNum = this.getControls[index]['controls'].partyContactDOList.controls[0].controls.contactNum.value;
      contactNum == "" || contactNum == null || contactNum == undefined ?
        this.getControls[index]['controls'].partyContactDOList.controls[0].controls.contactNum.contactNumError = true :
        this.getControls[index]['controls'].partyContactDOList.controls[0].controls.contactNum.contactNumError = false;

      // let contactTypeCd = this.getControls[index]['controls'].partyContactDOList.controls[0].controls.contactTypeCd.value;
      // contactTypeCd == "" || contactTypeCd == null || contactTypeCd == undefined ?
      //   this.getControls[index]['controls'].partyContactDOList.controls[0].controls.contactTypeCd.contactTypeCdError = true :
      //   this.getControls[index]['controls'].partyContactDOList.controls[0].controls.contactTypeCd.contactTypeCdError = false;

      let stdCode = this.getControls[index]['controls'].partyContactDOList.controls[0].controls.stdCode.value;
      stdCode == "" || stdCode == null || stdCode == undefined ?
        this.getControls[index]['controls'].partyContactDOList.controls[0].controls.stdCode.stdCodeError = true :
        this.getControls[index]['controls'].partyContactDOList.controls[0].controls.stdCode.stdCodeError = false;

      // partyEmailDOList
      let emailAddress = this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailAddress.value;
      emailAddress == "" || emailAddress == null || emailAddress == undefined ?
        this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailAddress.emailAddressError = true :
        this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailAddress.emailAddressError = false;

      // let emailTypeCd = this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailTypeCd.value;
      // emailTypeCd == "" || emailTypeCd == null || emailTypeCd == undefined ?
      //   this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailTypeCd.emailTypeCdError = true :
      //   this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailTypeCd.emailTypeCdError = false;

      // partyIdentityDOList
      // let identityTypeCd = this.getControls[index]['controls'].partyIdentityDOList.controls[0].controls.identityTypeCd.value;
      // identityTypeCd == "" || identityTypeCd == null || identityTypeCd == undefined ?
      //   this.getControls[index]['controls'].partyIdentityDOList.controls[0].controls.identityTypeCd.identityTypeCdError = true :
      //   this.getControls[index]['controls'].partyIdentityDOList.controls[0].controls.identityTypeCd.identityTypeCdError = false;

      let identityNum = this.getControls[index]['controls'].partyIdentityDOList.controls[0].controls.identityNum.value;
      identityNum == "" || identityNum == null || identityNum == undefined ?
        this.getControls[index]['controls'].partyIdentityDOList.controls[0].controls.identityNum.identityNumError = true :
        this.getControls[index]['controls'].partyIdentityDOList.controls[0].controls.identityNum.identityNumError = false;
    }
  }

  addInsurer() {
    this.checkValidateForm();
    if (!this.insuranceForm.valid) {

      this.toastr.warning("Please fill in existing traveller details first");
    } else {
      if (this.count <= 5) {
        this.selectedTravellerForm = this.count;
        this.count = this.count + 1;

        let temp = { id: "", dataToggle: "", dataToggleHash: "" };
        temp.id = "Insurer " + this.count;
        temp.dataToggle = "toogle" + this.count;
        temp.dataToggleHash = "#toogle" + this.count;
        this.dataSource.push(temp);

        this.insurer = this.insuranceForm.get("insurer") as FormArray;
        this.insurer.push(this.issueInsurancePolicy());

      } else {
        this.toastr.error("Maximum Travellers Limit of 10 reached !");
      }
    }
  }

  onRemoveInsurer(index) {
    let temp = this.insuranceForm.get("insurer") as FormArray;
    temp.removeAt(index);
    console.log(temp.length);

    console.log(this.dataSource.splice(index, 1));

    this.count = this.count - 1;
    this.selectedTravellerForm = this.count;
    console.log(this.selectedTravellerForm);

  }

  setAddressSame(index: number) {
    let same = this.getControls[index]['controls'].addressForPickupSame.value;

    if (!same) {
      this.getControls[index]['controls'].partyAddressDOList.controls.addressLine1Lang1.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls.addressLine2Lang1.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls.addressTypeCd.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls.areaCd.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls.cityCd.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls.pinCode.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls.stateCd.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls.countryCd.setValidators(null);

      this.getControls[index]['controls'].partyAddressDOList.controls.addressLine1Lang1.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.addressLine2Lang1.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.addressTypeCd.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.areaCd.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.cityCd.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.pinCode.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.stateCd.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.countryCd.updateValueAndValidity();

      this.getControls[index].updateValueAndValidity();
    } else {
      this.getControls[index]['controls'].partyAddressDOList.controls.addressLine1Lang1.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls.addressLine2Lang1.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls.addressTypeCd.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls.areaCd.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls.cityCd.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls.pinCode.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls.stateCd.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls.countryCd.setValidators(Validators.required);

      this.getControls[index]['controls'].partyAddressDOList.controls.addressLine1Lang1.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.addressLine2Lang1.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.addressTypeCd.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.areaCd.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.cityCd.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.pinCode.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.stateCd.updateValueAndValidity();
      this.getControls[index]['controls'].partyAddressDOList.controls.countryCd.updateValueAndValidity();

      this.getControls[index].updateValueAndValidity();
    }
  }

  scrollToInvalid(id: string) {
    $('html, body').animate({
      scrollTop: $("#" + id).offset().top
    }, 500);
  }

  onChangePlan() {
    let planType = this.policyDetailForm.get('planType').value;

    if (planType === "Basic") {
      this.premiumCalculated = this.basicPremiumCalculated;
      this.policyDetailForm.get('coverage').setValue("US $ 50,000");
      this.userflowDetails.setInsurancePlan("coverage", "US $ 50,000");
    } else if (planType === "Gold") {
      this.premiumCalculated = this.goldPremiumCalculated;
      this.policyDetailForm.get('coverage').setValue("US $ 100,000");
      this.userflowDetails.setInsurancePlan("coverage", "US $ 100,000");
    }
    this.userflowDetails.setInsurancePlan("planType", planType);
  }

  // setRespose() {
  //   for (
  //     let index = 0;
  //     index < this.getControls.length;
  //     index++
  //   ) {
  //     this.setResposeArr.push(
  //       {
  //         birthDt: this.getControls[index]['controls'].birthDt.value,
  //         firstName: this.getControls[index]['controls'].firstName.value,
  //         genderCd: this.getControls[index]['controls'].genderCd.value,
  //         lastName: this.getControls[index]['controls'].lastName.value,
  //         citizenshipCd: this.getControls[index]['controls'].citizenshipCd.value,
  //         relationCd: this.getControls[index]['controls'].relationCd.value,
  //         titleCd: this.getControls[index]['controls'].titleCd.value,
  //         partyAddressDOList: [
  //           {
  //             addressLine1Lang1: this.getControls[index]['controls'].partyAddressDOList.controls.addressLine1Lang1.value,
  //             addressLine2Lang1: this.getControls[index]['controls'].partyAddressDOList.controls.addressLine2Lang1.value,
  //             addressTypeCd: this.getControls[index]['controls'].partyAddressDOList.controls.addressTypeCd.value,
  //             areaCd: this.getControls[index]['controls'].partyAddressDOList.controls.areaCd.value,
  //             cityCd: this.getControls[index]['controls'].partyAddressDOList.controls.cityCd.value,
  //             pinCode: this.getControls[index]['controls'].partyAddressDOList.controls.pinCode.value,
  //             stateCd: this.getControls[index]['controls'].partyAddressDOList.controls.stateCd.value,
  //             countryCd: this.getControls[index]['controls'].partyAddressDOList.controls.countryCd.value
  //           }
  //         ],
  //         partyContactDOList: [
  //           {
  //             contactNum: this.getControls[index]['controls'].partyContactDOList.controls.contactNum.value,
  //             stdCode: this.getControls[index]['controls'].partyContactDOList.controls.stdCode.value
  //           }
  //         ],
  //         partyEmailDOList: [
  //           {
  //             emailAddress: this.getControls[index]['controls'].partyEmailDOList.controls.emailAddress.value,
  //           }
  //         ],
  //         partyIdentityDOList: [
  //           {
  //             identityNum: this.getControls[index]['controls'].partyIdentityDOList.controls.identityNum.value,
  //             identityTypeCd: this.getControls[index]['controls'].partyIdentityDOList.controls.identityTypeCd.value,
  //           }
  //         ]
  //       }
  //     );

  //   }

  //   console.log(this.setResposeArr);
  //   return this.setResposeArr;
  // }
}