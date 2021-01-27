import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { InsuranceService } from './../insurance.service';
import { PreloaderService } from './../../../shared/preloader.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

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
    { id: "Self", dataToggle: "toogle1", dataToggleHash: "#toogle1" },
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

  relationOptionArr: Array<string> = ["SELF", "SPOUSE", "SON", "DAUGHTER"];
  disabledRelationOptionArr: Array<string> = [];

  title: string = "Visa2fly | Insurance Application Form";
  maxDateDobForProposal: { year: number; month: number; day: number; };

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private preloaderService: PreloaderService,
    private titleService: Title,
    private insuranceService: InsuranceService, private userflowDetails: UserFlowDetails) {

    this.insuranceDetails = this.userflowDetails.getInsuranceDetails();
    // console.log(this.insuranceDetails);
    // console.log(this.premiumFormDetail);

    this.insurancePlan = this.userflowDetails.getInsurancePlanDetails();

    this.premiumDetails = JSON.parse(this.userflowDetails.getLocalStorage('premiumDetails'));
    // console.log(this.premiumDetails.noOfTraveller);

    // this.getPremiumForm.get('country').setValue(premiumFormDetail.country);
    // this.getPremiumForm.get('country').setValue(premiumFormDetail.country);
    // this.getPremiumForm.get('tripStartDate').setValue(premiumFormDetail.tripStartDate);
    // this.getPremiumForm.get('tripEndDate').setValue(premiumFormDetail.tripEndDate);
    // this.getPremiumForm.get('anyMedicalCondition').setValue(premiumFormDetail.anyMedicalCondition);
  }

  ngOnInit(): void {
    this.preloaderService.showPreloader(false);

    this.insuranceForm = this.formBuilder.group({
      proposer: this.issueProposerDetail(),
      insurer: this.formBuilder.array([this.issueInsurancePolicy()]),
    });

    this.policyDetailForm = this.formBuilder.group({
      planType: [{ value: '' }, [Validators.required]],
      coverage: [{ value: '', disabled: true }, [Validators.required]]
    })

    this.termsAndConditionForm = this.formBuilder.group({
      tnc: [false, [Validators.requiredTrue]],
    });

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    this.maxDateDob = {
      year: yesterday.getFullYear(),
      month: yesterday.getMonth() + 1,
      day: yesterday.getDate(),
    };

    this.maxDateDobForProposal = {
      year: yesterday.getFullYear() - 18,
      month: yesterday.getMonth() + 1,
      day: yesterday.getDate(),
    };

    // console.log(this.maxDateDobForProposal);


    this.policyDetailForm.get('planType').setValue(this.insurancePlan.planType);
    this.policyDetailForm.get('coverage').setValue(this.insurancePlan.coverage);

    this.premiumDetails = JSON.parse(this.userflowDetails.getLocalStorage('premiumDetails'));
    this.premiumDetails.premiumAsPerPlan.forEach(element => {
      // console.log(element);
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

    // console.log(this.insuranceForm);
    this.titleService.setTitle(this.title);

    // $('#Self').on('click', function (e) {
    //   // if (this.insuranceForm.controls.proposer.get('ensureYourSelf').value) {
    //     e.stopPropagation();
    //   // }
    // });

  //   $('#toggle1').on('shown.bs.collapse', function () {
  //     $('[data-toggle=collapse]').prop('disabled',true);
  // });

    // $("[data-toggle='collapse'] [data-toggle='modal']").click(function(event) {
  //     event.stopPropagation();
  //     var thisModal = $(this).attr('data-target');
  // });

      // console.log("ffjj")
  }

  issueInsurancePolicy(): FormGroup {
    return this.formBuilder.group({
      birthDt: ["", [Validators.nullValidator]],
      birthDtCopy: ["", [Validators.required]],
      firstName: ["", [Validators.required,]],
      genderCd: ["MALE", [Validators.required]],
      lastName: ["", [Validators.required,]],
      relationCd: ["", [Validators.required]],
      // roleCd: ["", [Validators.required]],
      titleCd: ["MR", [Validators.required]],
      citizenshipCd: [{ value: "INDIAN", disabled: true }, [Validators.required]],
      // residenceProof: ["", [Validators.required]],
      samePrimaryDetailsAsProposer: [false, [Validators.required]],
      addressForPickupSame: [true, [Validators.required]],
      partyAddressDOList: this.formBuilder.array([this.partyAddressDoList()]),
      partyContactDOList: this.formBuilder.array([this.partyContactDOList()]),
      partyEmailDOList: this.formBuilder.array([this.partyEmailDOList()]),
      partyIdentityDOList: this.formBuilder.array([this.partyIdentityDOList()])
    });
  }

  issueProposerDetail(): FormGroup {
    return this.formBuilder.group({
      birthDt: ["", [Validators.nullValidator]],
      birthDtCopy: ["", Validators.required],
      firstName: ["", [Validators.required]],
      genderCd: ["MALE", [Validators.required]],
      lastName: ["", [Validators.required]],
      relationCd: ["SELF", [Validators.required]],
      titleCd: ["MR", [Validators.required]],
      ensureYourSelf: [false, [Validators.required]],
      citizenshipCd: [{ value: "INDIAN", disabled: true }, [Validators.required]],
      partyAddressDOList: this.formBuilder.array([this.partyAddressDoListForProposal()]),
      partyContactDOList: this.formBuilder.array([this.partyContactDOList()]),
      partyEmailDOList: this.formBuilder.array([this.partyEmailDOList()]),
      partyIdentityDOList: this.formBuilder.array([this.partyIdentityDOList()]),
    });
  }

  partyAddressDoList() {
    return this.formBuilder.group({
      addressLine1Lang1: [""],
      addressLine2Lang1: [""],
      addressTypeCd: ["PERMANENT"],
      areaCd: [""],
      cityCd: [""],
      pinCode: [""],
      stateCd: ["New Delhi"],
      countryCd: [{ value: "India", disabled: true }],
    });
  }

  partyAddressDoListForProposal() {
    return this.formBuilder.group({
      addressLine1Lang1: ["", [Validators.required]],
      addressLine2Lang1: ["", [Validators.required]],
      addressTypeCd: ["PERMANENT", [Validators.required]],
      areaCd: ["", [Validators.required]],
      cityCd: ["", [Validators.required]],
      pinCode: ["", [Validators.required]],
      stateCd: ["New Delhi", [Validators.required]],
      countryCd: [{ value: "India", disabled: true }],
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

  isLetter(str: any) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  submitForm() {
    // console.log(this.insuranceForm);
    // console.log(this.insuranceForm.get("insurer").value)
    // console.log(this.insuranceForm.get("proposer").value)

    if (!this.insuranceForm.valid) {
      this.toastr.warning("Some details missing !");
      this.checkValidateForm();
      this.checkValidateProposer();
    } else {
      if (!this.termsAndConditionForm.valid) {
        this.toastr.warning("Please accept our terms and conditions");
      } else {
        this.preloaderService.showPreloader(true);

        let birthDtVar: { year: number; month: number; day: number } = this.insuranceForm.controls.proposer['controls'].birthDtCopy.value;

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

        // console.log(tempBirthDt);
        this.insuranceForm.controls.proposer['controls'].birthDt.setValue(tempBirthDt);
        this.insuranceForm.controls.proposer['controls'].birthDt.updateValueAndValidity();

        this.insuranceForm.controls.proposer['controls'].citizenshipCd.setValue('IND');
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('countryCd').setValue('India');

        let same = this.insuranceForm.controls.proposer.get('ensureYourSelf').value;
        if (same) {

          let birthDtCopy = this.insuranceForm.controls.proposer.get('birthDtCopy').value;
          let firstName = this.insuranceForm.controls.proposer.get('firstName').value;
          let genderCd = this.insuranceForm.controls.proposer.get('genderCd').value;
          let lastName = this.insuranceForm.controls.proposer.get('lastName').value;
          let relationCd = this.insuranceForm.controls.proposer.get('relationCd').value;
          let titleCd = this.insuranceForm.controls.proposer.get('titleCd').value;

          let identityNumTemp = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityNum').value.toUpperCase();
          this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityNum').setValue(identityNumTemp);

          let identityNum = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityNum').value;

          let identityTypeCd = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityTypeCd').value;



          let contactNum = this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0].get('contactNum').value;
          let stdCode = this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0].get('stdCode').value;

          let emailAddress = this.insuranceForm.controls.proposer['controls'].partyEmailDOList['controls'][0].get('emailAddress').value;

          let addressLine1Lang1 = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressLine1Lang1').value.replace(/[\r\n]+/g, " ");
          let addressLine2Lang1 = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressLine2Lang1').value.replace(/[\r\n]+/g, " ");
          let addressTypeCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressTypeCd').value;
          let areaCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('areaCd').value;
          let cityCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('cityCd').value;
          let pinCode = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('pinCode').value;
          let stateCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('stateCd').value;
          let countryCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('countryCd').value;


          // paste it 

          this.getControls[0].get('birthDtCopy').setValue(birthDtCopy);
          this.getControls[0].get('firstName').setValue(firstName);
          this.getControls[0].get('lastName').setValue(lastName);
          this.getControls[0].get("genderCd").setValue(genderCd);
          this.getControls[0].get("relationCd").setValue(relationCd);
          this.getControls[0].get("titleCd").setValue(titleCd);

          this.getControls[0]['controls'].partyIdentityDOList['controls'][0].get("identityNum").setValue(identityNum);
          this.getControls[0]['controls'].partyIdentityDOList['controls'][0].get("identityTypeCd").setValue(identityTypeCd);

          this.getControls[0]['controls'].partyContactDOList['controls'][0].get("contactNum").setValue(contactNum);
          this.getControls[0]['controls'].partyContactDOList['controls'][0].get("stdCode").setValue(stdCode);

          this.getControls[0]['controls'].partyEmailDOList['controls'][0].get("emailAddress").setValue(emailAddress);

          this.getControls[0]['controls'].partyAddressDOList['controls'][0].get("addressLine1Lang1").setValue(addressLine1Lang1);
          this.getControls[0]['controls'].partyAddressDOList['controls'][0].get("addressLine2Lang1").setValue(addressLine2Lang1);
          this.getControls[0]['controls'].partyAddressDOList['controls'][0].get("addressTypeCd").setValue(addressTypeCd);
          this.getControls[0]['controls'].partyAddressDOList['controls'][0].get("areaCd").setValue(areaCd);
          this.getControls[0]['controls'].partyAddressDOList['controls'][0].get("cityCd").setValue(cityCd);
          this.getControls[0]['controls'].partyAddressDOList['controls'][0].get("pinCode").setValue(pinCode);
          this.getControls[0]['controls'].partyAddressDOList['controls'][0].get("stateCd").setValue(stateCd);
          this.getControls[0]['controls'].partyAddressDOList['controls'][0].get("countryCd").setValue(countryCd);
        }

        const fd = {};
        let tempArr = this.getControls || [];
        tempArr.forEach((form: FormGroup, index) => {
          form.get("citizenshipCd").setValue('IND');

          let eliminateEnter1 = form.controls.partyAddressDOList["controls"][0].get("addressLine1Lang1").value.replace(/[\r\n]+/g, " ");
          let eliminateEnter2 = form.controls.partyAddressDOList["controls"][0].get("addressLine2Lang1").value.replace(/[\r\n]+/g, " ");

          form.controls.partyAddressDOList["controls"][0].get("addressLine1Lang1").setValue(eliminateEnter1);
          form.controls.partyAddressDOList["controls"][0].get("addressLine1Lang1").updateValueAndValidity();

          form.controls.partyAddressDOList["controls"][0].get("addressLine2Lang1").setValue(eliminateEnter2);
          form.controls.partyAddressDOList["controls"][0].get("addressLine2Lang1").updateValueAndValidity();

          let addressLine1Lang1 = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.addressLine1Lang1.value.replace(/[\r\n]+/g, " ");
          let addressLine2Lang1 = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.addressLine2Lang1.value.replace(/[\r\n]+/g, " ");
          let addressTypeCd = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.addressTypeCd.value;
          let areaCd = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.areaCd.value;
          let cityCd = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.cityCd.value;
          let pinCode = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.pinCode.value;
          let stateCd = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.stateCd.value;

          let same = form.get("addressForPickupSame").value;

          if (same) {
            form.controls.partyAddressDOList["controls"][0].get("addressLine1Lang1").setValue(addressLine1Lang1);
            form.controls.partyAddressDOList["controls"][0].get("addressLine2Lang1").setValue(addressLine2Lang1);
            form.controls.partyAddressDOList["controls"][0].get("addressTypeCd").setValue(addressTypeCd);
            form.controls.partyAddressDOList["controls"][0].get("areaCd").setValue(areaCd);
            form.controls.partyAddressDOList["controls"][0].get("cityCd").setValue(cityCd);
            form.controls.partyAddressDOList["controls"][0].get("pinCode").setValue(pinCode);
            form.controls.partyAddressDOList["controls"][0].get("stateCd").setValue(stateCd);
            form.controls.partyAddressDOList["controls"][0].get("countryCd").setValue("India");
          } else {
            form.controls.partyAddressDOList["controls"][0].get("countryCd").setValue("India");
          }

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

          // console.log(tempBirthDt);
          form.get("birthDt").setValue(tempBirthDt);
          form.get("birthDt").updateValueAndValidity();

          let identityNum = form.controls.partyIdentityDOList["controls"][0].controls.identityNum.value.toUpperCase();

          form.controls.partyIdentityDOList["controls"][0].controls.identityNum.setValue(identityNum);

          // console.log(form.controls.partyIdentityDOList["controls"][0].controls.identityNum.value);
        });

        let ptdata: any = this.insuranceForm.get("insurer").value || [];
        let proposerData: any = this.insuranceForm.get("proposer").value || [];
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
        fd["proposerDetail"] = proposerData;
        fd["policyCommencementDt"] = tripStartDate;
        fd["policyMaturityDt"] = tripEndDate;
        fd["country"] = country;
        fd["planType"] = planType;
        // fd["maxTripPeriod"] = "45",
        // fd["tripTypeCd"] = "SINGLE"

        // this.formData.set("data", JSON.stringify(fd));

        // console.log(fd);

        
        this.insuranceService.createPolicy(fd).subscribe((res: any) => {
          if (res.code === "0") {
            this.createPolicyBookingId = res.data.bookingId;
            this.premiumDetails = JSON.parse(this.userflowDetails.getLocalStorage('premiumDetails'));
            console.log(typeof res.data.amount);
            console.log(typeof this.premiumCalculated);
            
            
            if (this.newPremium != this.oldPremium) {
              this.preloaderService.showPreloader(false);
              this.newPremium = res.data.amount;
              this.oldPremium = this.premiumCalculated;
              ($('#warningModal') as any).modal('show')
            } else {
              this.paymentInitiate(this.createPolicyBookingId);
            }
          } else {
            this.toastr.error(res.message);
            this.preloaderService.showPreloader(false);
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
        this.actionUrl = res.data.actionUrl;
        this.returnUrl = res.data.returnUrl;
        this.proposalNumber = res.data.proposalNumber;

        setTimeout(() => {
          this.preloaderService.showPreloader(false);
          document.forms["paymentForm"].submit();
        }, 10000);
      }
    });
  }

  warningModal() {
    this.paymentInitiate(this.createPolicyBookingId);
    ($('#warningModal') as any).modal('hide');
  }

  checkValidateForm() {
    let same = this.insuranceForm.controls.proposer.get('ensureYourSelf').value;
    let startedWith: number;

    if (same) {
      startedWith = 1;
    } else {
      startedWith = 0;
    }

    for (
      let index = startedWith;
      index < this.getControls.length;
      index++
    ) {
      // console.log(index);
      // console.log(this.getControls.length);

      let birthDt = this.getControls[index]['controls'].birthDtCopy.value;
      birthDt == "" || birthDt == null || birthDt == undefined ?
        this.getControls[index]['controls'].birthDt.birthDtError = true :
        this.getControls[index]['controls'].birthDt.birthDtError = false;

      let firstName = this.getControls[index]['controls'].firstName.value;
      firstName == "" || firstName == null || firstName == undefined ?
        this.getControls[index]['controls'].firstName.firstNameError = true :
        this.getControls[index]['controls'].firstName.firstNameError = false;

      let lastName = this.getControls[index]['controls'].lastName.value;
      lastName == "" || lastName == null || lastName == undefined ?
        this.getControls[index]['controls'].lastName.lastNameError = true :
        this.getControls[index]['controls'].lastName.lastNameError = false;

      let relationCd = this.getControls[index]['controls'].relationCd.value;
      relationCd == "" || relationCd == null || relationCd == undefined ?
        this.getControls[index]['controls'].relationCd.relationCdError = true :
        this.getControls[index]['controls'].relationCd.relationCdError = false;

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

      let stdCode = this.getControls[index]['controls'].partyContactDOList.controls[0].controls.stdCode.value;
      stdCode == "" || stdCode == null || stdCode == undefined ?
        this.getControls[index]['controls'].partyContactDOList.controls[0].controls.stdCode.stdCodeError = true :
        this.getControls[index]['controls'].partyContactDOList.controls[0].controls.stdCode.stdCodeError = false;

      // partyEmailDOList
      let emailAddress = this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailAddress.value;
      emailAddress == "" || emailAddress == null || emailAddress == undefined ?
        this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailAddress.emailAddressError = true :
        this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailAddress.emailAddressError = false;

      let identityNum = this.getControls[index]['controls'].partyIdentityDOList.controls[0].controls.identityNum.value;
      identityNum == "" || identityNum == null || identityNum == undefined ?
        this.getControls[index]['controls'].partyIdentityDOList.controls[0].controls.identityNum.identityNumError = true :
        this.getControls[index]['controls'].partyIdentityDOList.controls[0].controls.identityNum.identityNumError = false;
    }
  }

  checkValidateProposer() {
    let birthDt = this.insuranceForm.controls.proposer.get('birthDtCopy').value;
    birthDt == "" || birthDt == null || birthDt == undefined ?
      this.insuranceForm.controls.proposer['controls'].birthDt.birthDtError = true :
      this.insuranceForm.controls.proposer['controls'].birthDt.birthDtError = false;

    let firstName = this.insuranceForm.controls.proposer.get('firstName').value;
    firstName == "" || firstName == null || firstName == undefined ?
      this.insuranceForm.controls.proposer['controls'].firstName.firstNameError = true :
      this.insuranceForm.controls.proposer['controls'].firstName.firstNameError = false;

    let genderCd = this.insuranceForm.controls.proposer.get('genderCd').value;
    genderCd == "" || genderCd == null || genderCd == undefined ?
      this.insuranceForm.controls.proposer['controls'].genderCd.genderCdError = true :
      this.insuranceForm.controls.proposer['controls'].genderCd.genderCdError = false;

    let lastName = this.insuranceForm.controls.proposer.get('lastName').value;
    lastName == "" || lastName == null || lastName == undefined ?
      this.insuranceForm.controls.proposer['controls'].lastName.lastNameError = true :
      this.insuranceForm.controls.proposer['controls'].lastName.lastNameError = false;

    let relationCd = this.insuranceForm.controls.proposer.get('relationCd').value;
    relationCd == "" || relationCd == null || relationCd == undefined ?
      this.insuranceForm.controls.proposer['controls'].relationCd.relationCdError = true :
      this.insuranceForm.controls.proposer['controls'].relationCd.relationCdError = false;

    let titleCd = this.insuranceForm.controls.proposer.get('titleCd').value;
    titleCd == "" || titleCd == null || titleCd == undefined ?
      this.insuranceForm.controls.proposer['controls'].titleCd.titleCdError = true :
      this.insuranceForm.controls.proposer['controls'].titleCd.titleCdError = false;

    let identityNum = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityNum').value;
    identityNum == "" || identityNum == null || identityNum == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].controls.identityNum.identityNumError = true :
      this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].controls.identityNum.identityNumError = false;

    let identityTypeCd = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityTypeCd').value;
    identityTypeCd == "" || identityTypeCd == null || identityTypeCd == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0]['controls'].identityTypeCd.identityTypeCdError = true :
      this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0]['controls'].identityTypeCd.identityTypeCdError = false;

    let contactNum = this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0].get('contactNum').value;
    contactNum == "" || contactNum == null || contactNum == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0]['controls'].contactNum.contactNumError = true :
      this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0]['controls'].contactNum.contactNumError = false;

    let stdCode = this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0].get('stdCode').value;
    stdCode == "" || stdCode == null || stdCode == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0]['controls'].stdCode.stdCodeError = true :
      this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0]['controls'].stdCode.stdCodeError = false;

    let emailAddress = this.insuranceForm.controls.proposer['controls'].partyEmailDOList['controls'][0].get('emailAddress').value;
    emailAddress == "" || emailAddress == null || emailAddress == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyEmailDOList['controls'][0]['controls'].emailAddress.emailAddressError = true :
      this.insuranceForm.controls.proposer['controls'].partyEmailDOList['controls'][0]['controls'].emailAddress.emailAddressError = false;

    let addressLine1Lang1 = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressLine1Lang1').value;
    addressLine1Lang1 == "" || addressLine1Lang1 == null || addressLine1Lang1 == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].addressLine1Lang1.addressLine1Lang1Error = true :
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].addressLine1Lang1.addressLine1Lang1Error = false;

    let addressLine2Lang1 = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressLine2Lang1').value;
    addressLine2Lang1 == "" || addressLine2Lang1 == null || addressLine2Lang1 == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].addressLine2Lang1.addressLine2Lang1Error = true :
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].addressLine2Lang1.addressLine2Lang1Error = false;

    let addressTypeCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressTypeCd').value;
    addressTypeCd == "" || addressTypeCd == null || addressTypeCd == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].addressTypeCd.addressTypeCdError = true :
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].addressTypeCd.addressTypeCdError = false;

    let areaCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('areaCd').value;
    areaCd == "" || areaCd == null || areaCd == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].areaCd.areaCdError = true :
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].areaCd.areaCdError = false;

    let cityCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('cityCd').value;
    cityCd == "" || cityCd == null || cityCd == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].cityCd.cityCdError = true :
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].cityCd.cityCdError = false;

    let pinCode = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('pinCode').value;
    pinCode == "" || pinCode == null || pinCode == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].pinCode.pinCodeError = true :
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].pinCode.pinCodeError = false;

    let stateCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('stateCd').value;
    stateCd == "" || stateCd == null || stateCd == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].stateCd.stateCdError = true :
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].stateCd.stateCdError = false;

    let countryCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('countryCd').value;
    countryCd == "" || countryCd == null || countryCd == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].countryCd.countryCdError = true :
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0]['controls'].countryCd.countryCdError = false;
  }

  addInsurer() {
    this.checkValidateForm();
    this.checkValidateProposer();
    if (!this.insuranceForm.valid) {
      this.toastr.warning("Please fill in existing traveller details first");
    } else {
      if (this.count <= 5) {
        let collapse = document.querySelectorAll('#accordionInsurer .collapse')
        collapse.forEach((element) => {
          element.classList.remove('show');
        });

        // console.log(this.count)
        this.selectedTravellerForm = this.count;
        this.count = this.count + 1;

        let temp = { id: "", dataToggle: "", dataToggleHash: "" };
        temp.id = "Member" + this.count;
        temp.dataToggle = "toogle" + this.count;
        temp.dataToggleHash = "#toogle" + this.count;
        this.dataSource.push(temp);

        this.insurer = this.insuranceForm.get("insurer") as FormArray;
        this.insurer.push(this.issueInsurancePolicy());

      } else {
        this.toastr.error("Maximum Travellers Limit of 6 reached !");
      }
    }
  }

  onRemoveInsurer(index: number) {
    let temp = this.insuranceForm.get("insurer") as FormArray;
    temp.removeAt(index);
    // console.log(temp.length);
    this.dataSource.splice(index, 1);
    this.count = this.count - 1;

    // if (index == this.getControls.length - 1) {
    //   this.selectedTravellerForm = index;
    // } else {
    //   this.selectedTravellerForm = index - 1;
    // }
  }

  setAddressSame(value, index: number) {
    let same = this.getControls[index]['controls'].addressForPickupSame.value;
    if (!same) {
      // console.log("Fuckup");
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine1Lang1.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine2Lang1.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressTypeCd.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.areaCd.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.cityCd.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.pinCode.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.stateCd.setValidators(null);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.countryCd.setValidators(null);
    } else {
      // console.log("Fuckdown");
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine1Lang1.setValidators([
        Validators.required, Validators.pattern("^[ A-Za-z0-9-:./\n,]*$"), Validators.minLength(10), Validators.maxLength(400)
      ]);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine2Lang1.setValidators([
        Validators.required, Validators.pattern("^[ A-Za-z0-9-:./\n,]*$"), Validators.minLength(10), Validators.maxLength(400)
      ]);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressTypeCd.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.areaCd.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.cityCd.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.pinCode.setValidators([Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.stateCd.setValidators(Validators.required);
      this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.countryCd.setValidators(Validators.required);
    }

    this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine1Lang1.updateValueAndValidity();
    this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine2Lang1.updateValueAndValidity();
    this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressTypeCd.updateValueAndValidity();
    this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.areaCd.updateValueAndValidity();
    this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.cityCd.updateValueAndValidity();
    this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.pinCode.updateValueAndValidity();
    this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.stateCd.updateValueAndValidity();
    this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.countryCd.updateValueAndValidity();

    this.getControls[index].updateValueAndValidity();

    // console.log(this.getControls[index]['controls'].partyAddressDOList.controls[0].controls)
  }

  setPrimaryAsProposer() {
    let same = this.insuranceForm.controls.proposer.get('ensureYourSelf').value;

    // console.log(same);
    if (same) {

      this.getControls[0]['controls'].firstName.setValidators(null);
      this.getControls[0]['controls'].lastName.setValidators(null);
      this.getControls[0]['controls'].birthDtCopy.setValidators(null);
      this.getControls[0]['controls'].genderCd.setValidators(null);
      this.getControls[0]['controls'].relationCd.setValidators(null);
      this.getControls[0]['controls'].titleCd.setValidators(null);
      this.getControls[0]['controls'].citizenshipCd.setValidators(null);

      // partyContactDOList
      this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.contactNum.setValidators(null);
      this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.stdCode.setValidators(null);

      // partyEmailDOList
      this.getControls[0]['controls'].partyEmailDOList['controls'][0].controls.emailAddress.setValidators(null);

      // partyIdentityDOList
      this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityNum.setValidators(null);

      this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityTypeCd.setValidators(null);

      // partyAddressDOList
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine1Lang1.setValidators(null);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine2Lang1.setValidators(null);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressTypeCd.setValidators(null);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.areaCd.setValidators(null);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.cityCd.setValidators(null);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.pinCode.setValidators(null);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.stateCd.setValidators(null);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.countryCd.setValidators(null);

      let collapse = document.querySelectorAll('#accordionInsurer .collapse')
      collapse.forEach((element) => {
        element.classList.remove('show');
      });
      this.selectedTravellerForm = null;

    } else {

      // this.selectedTravellerForm = 0;

      this.getControls[0]['controls'].firstName.setValidators([Validators.required, Validators.pattern('^[A-Za-z]{3,32}$')]);
      this.getControls[0]['controls'].lastName.setValidators([Validators.required, Validators.pattern('^[A-Za-z]{3,32}$')]);
      this.getControls[0]['controls'].birthDtCopy.setValidators(Validators.required);
      this.getControls[0]['controls'].genderCd.setValidators(Validators.required);
      this.getControls[0]['controls'].relationCd.setValidators(Validators.required);
      this.getControls[0]['controls'].titleCd.setValidators(Validators.required);
      this.getControls[0]['controls'].citizenshipCd.setValidators(Validators.required);

      // partyContactDOList
      this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.contactNum.setValidators([Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]);
      this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.stdCode.setValidators(Validators.required);

      // partyEmailDOList
      this.getControls[0]['controls'].partyEmailDOList['controls'][0].controls.emailAddress.setValidators([Validators.required, Validators.pattern("^([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$")]);

      // partyIdentityDOList
      this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityNum.setValidators([Validators.required, Validators.pattern(
        this.getControls[0]['controls'].partyIdentityDOList.controls[0].controls.identityTypeCd.value === 'PAN' ?
          '^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$' : '^[A-Za-z]{1}[0-9]{7}$')]);

      this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityTypeCd.setValidators(Validators.required);

      // partyAddressDOList
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine1Lang1.setValidators([
        Validators.required, Validators.pattern("^[ A-Za-z0-9-:./\n,]*$"), Validators.minLength(10), Validators.maxLength(400)
      ]);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine2Lang1.setValidators([
        Validators.required, Validators.pattern("^[ A-Za-z0-9-:./\n,]*$"), Validators.minLength(10), Validators.maxLength(400)
      ]);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressTypeCd.setValidators(Validators.required);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.areaCd.setValidators(Validators.required);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.cityCd.setValidators(Validators.required);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.pinCode.setValidators([Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.stateCd.setValidators(Validators.required);
      this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.countryCd.setValidators(Validators.required);

    }

    this.getControls[0]['controls'].firstName.updateValueAndValidity();
    this.getControls[0]['controls'].lastName.updateValueAndValidity();
    this.getControls[0]['controls'].birthDtCopy.updateValueAndValidity();
    this.getControls[0]['controls'].genderCd.updateValueAndValidity();
    this.getControls[0]['controls'].relationCd.updateValueAndValidity();
    this.getControls[0]['controls'].titleCd.updateValueAndValidity();
    this.getControls[0]['controls'].citizenshipCd.updateValueAndValidity();

    // partyContactDOList
    this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.contactNum.updateValueAndValidity();
    this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.stdCode.updateValueAndValidity();

    // partyEmailDOList
    this.getControls[0]['controls'].partyEmailDOList['controls'][0].controls.emailAddress.updateValueAndValidity();

    // partyIdentityDOList
    this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityNum.updateValueAndValidity();

    this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityTypeCd.updateValueAndValidity();

    // partyAddressDOList
    this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine1Lang1.updateValueAndValidity();
    this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine2Lang1.updateValueAndValidity();
    this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressTypeCd.updateValueAndValidity();
    this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.areaCd.updateValueAndValidity();
    this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.cityCd.updateValueAndValidity();
    this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.pinCode.updateValueAndValidity();
    this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.stateCd.updateValueAndValidity();
    this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.countryCd.updateValueAndValidity();

    this.getControls[0].updateValueAndValidity();

    // console.log(this.getControls[0]['controls']);
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

  onRelationValueChange() {
    let relationArr: Array<string> = [];
    let duplicates:  Array<string> = [];
    let startWith: number = 0;

    let same = this.insuranceForm.controls.proposer.get('ensureYourSelf').value;

    if (same) {
      relationArr = ["SELF"];
      startWith = 1;
    } else {
      relationArr = [];
      startWith = 0;
    }

    for (
      let index = startWith;
      index < this.getControls.length;
      index++
    ) {
      let relationCd = this.getControls[index]['controls'].relationCd.value;
      if (relationCd == "SPOUSE" || relationCd == "SELF") {
        // this.relationOptionArr =  this.relationOptionArr.filter(function (e) { return e !== value });

        relationArr.push(relationCd);

        var uniq = relationArr.map((name) => {
          return {
            count: 1,
            name: name
          }
        }).reduce((a, b) => {
          a[b.name] = (a[b.name] || 0) + b.count
          return a
        }, {});

        // console.log(uniq);

        duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);

        // console.log(duplicates);

        
      }
      // relationArr = [];
      if (duplicates[0] == "SPOUSE" || duplicates[0] == "SELF") {
        this.getControls[index]['controls'].relationCd.duplicatesError = true
      } else {
        this.getControls[index]['controls'].relationCd.duplicatesError = false;
      }

    }
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