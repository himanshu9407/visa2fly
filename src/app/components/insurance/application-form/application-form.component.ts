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
  termsAndConditions: FormGroup;
  valueAddedService: FormGroup;
  premiumFormDetail: any;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private preloaderService: PreloaderService,
    private insuranceService: InsuranceService, private userflowDetails: UserFlowDetails) {
    this.premiumFormDetail = JSON.parse(this.userflowDetails.getCookie('premiumFormDetails'));

    // this.getPremiumForm.get('country').setValue(premiumFormDetail.country);
    // this.getPremiumForm.get('country').setValue(premiumFormDetail.country);
    // this.getPremiumForm.get('tripStartDate').setValue(premiumFormDetail.tripStartDate);
    // this.getPremiumForm.get('tripEndDate').setValue(premiumFormDetail.tripEndDate);
    // this.getPremiumForm.get('anyMedicalCondition').setValue(premiumFormDetail.anyMedicalCondition);
  }

  ngOnInit(): void {
    this.insuranceForm = this.formBuilder.group({
      insurer: this.formBuilder.array([this.issueInsurancePolicy()]),
    });

    this.termsAndConditions = this.formBuilder.group({
      tnc: [false, [Validators.requiredTrue]],
    });

    this.valueAddedService = this.formBuilder.group({
      selectAll: [false, []],
      sim: [false, []],
      insurance: [false, []],
      forex: [false, []],
    });

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    this.maxDateDob = {
      year: yesterday.getFullYear(),
      month: yesterday.getMonth() + 1,
      day: yesterday.getDate(),
    };
  }

  issueInsurancePolicy(): FormGroup {
    return this.formBuilder.group({
      birthDtCopy: ["", [Validators.required]],
      birthDt: ["", [Validators.required]],
      firstName: ["", [Validators.required,]],
      genderCd: ["", [
        Validators.required,
      ]],
      lastName: ["", [Validators.required,]],
      relationCd: ["", [Validators.required]],
      roleCd: ["", [Validators.required]],
      titleCd: ["Mr", [Validators.required]],
      citizenshipCd: ["", [Validators.required]],
      residenceProof: ["", [Validators.required]],
      addressForPickupSame: [false, [Validators.required]],
      partyAddressDOList: this.formBuilder.group({
        addressLine1Lang1: ["", [Validators.required]],
        addressLine2Lang1: ["", [Validators.required]],
        addressTypeCd: ["", [Validators.required]],
        areaCd: ["", [Validators.required]],
        cityCd: ["", [Validators.required]],
        pinCode: ["", [Validators.required]],
        stateCd: ["", [Validators.required]],
        countryCd: ["", [Validators.required]],
      }),
      partyContactDOList: this.formBuilder.group({
        contactNum: ["", [Validators.required]],
        contactTypeCd: ["MOBILE", [Validators.required]],
        stdCode: ["+91", [Validators.required]],
      }),
      partyEmailDOList: this.formBuilder.group({
        emailAddress: ["", [Validators.required]],
        emailTypeCd: ["PERSONAL", [Validators.required]],
      }),
      partyIdentityDOList: this.formBuilder.group({
        identityNum: ["", [Validators.required]],
        identityTypeCd: ["", [Validators.required]]
      })

    })
  }

  get getControls() {
    return (this.insuranceForm.get('insurer') as FormArray).controls;
  }

  submitForm() {
    $('html, body').animate({
      scrollTop: $("#Primary").offset().top
    }, 500);

    console.log(JSON.stringify(this.insuranceForm.value));

    if (this.insuranceForm.valid) {
      if (true) {
        // this.preloaderService.showPreloader(true);
        const fd = {};

        let tempArr = this.getControls || [];

        let ptdata: any = this.insuranceForm.get("insurer").value || [];
        ptdata["id"] = this.dataSource[0].id;

        let tripStartDateDay = this.premiumFormDetail.tripStartDate.split('-')[2];
        let tripStartDateMonth = this.premiumFormDetail.tripStartDate.split('-')[1];
        let tripStartDateYear = this.premiumFormDetail.tripStartDate.split('-')[0];

        let tripEndDateDay = this.premiumFormDetail.tripEndDate.split('-')[2];
        let tripEndDateMonth = this.premiumFormDetail.tripEndDate.split('-')[1];
        let tripEndDateYear = this.premiumFormDetail.tripEndDate.split('-')[0];

        let tripStartDate = tripStartDateDay + "/" + tripStartDateMonth + "/" + tripStartDateYear // 10/01/2021
        let tripEndDate = tripEndDateDay + "/" + tripEndDateMonth + "/" + tripEndDateYear // 10/01/2021

        // ptdata.forEach((element: {}, index) => {
        //   element["id"] = this.dataSource[index].id;
        // });
        fd["partyDOList"] = ptdata;
        fd["policyCommencementDt"] = tripStartDate;
        fd["policyMaturityDt"] = tripEndDate,
          // fd["maxTripPeriod"] = "45",
          // fd["tripTypeCd"] = "SINGLE"

          // this.formData.set("data", JSON.stringify(fd));

          console.log(fd);


        this.insuranceService.createPolicy(this.insuranceForm.value).subscribe(res => {
          console.log(res);
        })

      } else {
        this.toastr.warning("Please accept our terms and conditions");
      }
    } else {
      this.toastr.warning("Some details missing !");
      this.checkValidateForm();
    }
  }

  checkValidateForm() {
    for (
      let index = 0;
      index < this.getControls.length;
      index++
    ) {
      let citizenshipCd = this.getControls[index]['controls'].citizenshipCd.value;
      citizenshipCd == "" || citizenshipCd == null || citizenshipCd == undefined ?
        this.getControls[index]['controls'].citizenshipCd.citizenshipCdError = true :
        this.getControls[index]['controls'].citizenshipCd.citizenshipCdError = false;

      let residenceProof = this.getControls[index]['controls'].residenceProof.value;
      residenceProof == "" || residenceProof == null || residenceProof == undefined ?
        this.getControls[index]['controls'].residenceProof.residenceProofError = true :
        this.getControls[index]['controls'].residenceProof.residenceProofError = false;

      let birthDt = this.getControls[index]['controls'].birthDt.value;
      birthDt == "" || birthDt == null || birthDt == undefined ?
        this.getControls[index]['controls'].birthDt.birthDtError = true :
        this.getControls[index]['controls'].birthDt.birthDtError = false;

      let firstName = this.getControls[index]['controls'].firstName.value;
      firstName == "" || firstName == null || firstName == undefined ?
        this.getControls[index]['controls'].firstName.firstNameError = true :
        this.getControls[index]['controls'].firstName.firstNameError = false;

      let genderCd = this.getControls[index]['controls'].genderCd.value;
      genderCd == "" || genderCd == null || genderCd == undefined ?
        this.getControls[index]['controls'].genderCd.genderCdError = true :
        this.getControls[index]['controls'].genderCd.genderCdError = false;

      let lastName = this.getControls[index]['controls'].lastName.value;
      lastName == "" || lastName == null || lastName == undefined ?
        this.getControls[index]['controls'].lastName.lastNameError = true :
        this.getControls[index]['controls'].lastName.lastNameError = false;

      let relationCd = this.getControls[index]['controls'].relationCd.value;
      relationCd == "" || relationCd == null || relationCd == undefined ?
        this.getControls[index]['controls'].relationCd.relationCdError = true :
        this.getControls[index]['controls'].relationCd.relationCdError = false;

      let roleCd = this.getControls[index]['controls'].roleCd.value;
      roleCd == "" || roleCd == null || roleCd == undefined ?
        this.getControls[index]['controls'].roleCd.roleCdError = true :
        this.getControls[index]['controls'].roleCd.roleCdError = false;

      let titleCd = this.getControls[index]['controls'].titleCd.value;
      titleCd == "" || titleCd == null || titleCd == undefined ?
        this.getControls[index]['controls'].titleCd.titleCdError = true :
        this.getControls[index]['controls'].titleCd.titleCdError = false;


      // partyAddressDOList
      let addressLine1Lang1 = this.getControls[index]['controls'].partyAddressDOList.controls.addressLine1Lang1.value;
      addressLine1Lang1 == "" || addressLine1Lang1 == null || addressLine1Lang1 == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls.addressLine1Lang1.addressLine1Lang1Error = true :
        this.getControls[index]['controls'].partyAddressDOList.controls.addressLine1Lang1.addressLine1Lang1Error = false;

      let addressLine2Lang1 = this.getControls[index]['controls'].partyAddressDOList.controls.addressLine2Lang1.value;
      addressLine2Lang1 == "" || addressLine2Lang1 == null || addressLine2Lang1 == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls.addressLine2Lang1.addressLine2Lang1Error = true :
        this.getControls[index]['controls'].partyAddressDOList.controls.addressLine2Lang1.addressLine2Lang1Error = false;

      let addressTypeCd = this.getControls[index]['controls'].partyAddressDOList.controls.addressTypeCd.value;
      addressTypeCd == "" || addressTypeCd == null || addressTypeCd == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls.addressTypeCd.addressTypeCdError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls.addressTypeCd.addressTypeCdError = false;

      let areaCd = this.getControls[index]['controls'].partyAddressDOList.controls.areaCd.value;
      areaCd == "" || areaCd == null || areaCd == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls.areaCd.areaCdError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls.areaCd.areaCdError = false;

      let cityCd = this.getControls[index]['controls'].partyAddressDOList.controls.cityCd.value;
      cityCd == "" || cityCd == null || cityCd == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls.cityCd.cityCdError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls.cityCd.cityCdError = false;

      let pinCode = this.getControls[index]['controls'].partyAddressDOList.controls.pinCode.value;
      pinCode == "" || pinCode == null || pinCode == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls.pinCode.pinCodeError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls.pinCode.pinCodeError = false;

      let stateCd = this.getControls[index]['controls'].partyAddressDOList.controls.stateCd.value;
      stateCd == "" || stateCd == null || stateCd == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls.stateCd.stateCdError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls.stateCd.stateCdError = false;

      let countryCd = this.getControls[index]['controls'].partyAddressDOList.controls.countryCd.value;
      countryCd == "" || countryCd == null || countryCd == undefined ?
        this.getControls[index]['controls'].partyAddressDOList.controls.countryCd.countryCdError = true :
        this.getControls[index]['controls'].partyAddressDOList.controls.countryCd.countryCdError = false;

      // partyContactDOList
      let contactNum = this.getControls[index]['controls'].partyContactDOList.controls.contactNum.value;
      contactNum == "" || contactNum == null || contactNum == undefined ?
        this.getControls[index]['controls'].partyContactDOList.controls.contactNum.contactNumError = true :
        this.getControls[index]['controls'].partyContactDOList.controls.contactNum.contactNumError = false;

      let contactTypeCd = this.getControls[index]['controls'].partyContactDOList.controls.contactTypeCd.value;
      contactTypeCd == "" || contactTypeCd == null || contactTypeCd == undefined ?
        this.getControls[index]['controls'].partyContactDOList.controls.contactTypeCd.contactTypeCdError = true :
        this.getControls[index]['controls'].partyContactDOList.controls.contactTypeCd.contactTypeCdError = false;

      let stdCode = this.getControls[index]['controls'].partyContactDOList.controls.stdCode.value;
      stdCode == "" || stdCode == null || stdCode == undefined ?
        this.getControls[index]['controls'].partyContactDOList.controls.stdCode.stdCodeError = true :
        this.getControls[index]['controls'].partyContactDOList.controls.stdCode.stdCodeError = false;

      // partyEmailDOList
      let emailAddress = this.getControls[index]['controls'].partyEmailDOList.controls.emailAddress.value;
      emailAddress == "" || emailAddress == null || emailAddress == undefined ?
        this.getControls[index]['controls'].partyEmailDOList.controls.emailAddress.emailAddressError = true :
        this.getControls[index]['controls'].partyEmailDOList.controls.emailAddress.emailAddressError = false;

      let emailTypeCd = this.getControls[index]['controls'].partyEmailDOList.controls.emailTypeCd.value;
      emailTypeCd == "" || emailTypeCd == null || emailTypeCd == undefined ?
        this.getControls[index]['controls'].partyEmailDOList.controls.emailTypeCd.emailTypeCdError = true :
        this.getControls[index]['controls'].partyEmailDOList.controls.emailTypeCd.emailTypeCdError = false;

      // partyIdentityDOList
      let identityTypeCd = this.getControls[index]['controls'].partyIdentityDOList.controls.identityTypeCd.value;
      identityTypeCd == "" || identityTypeCd == null || identityTypeCd == undefined ?
        this.getControls[index]['controls'].partyIdentityDOList.controls.identityTypeCd.identityTypeCdError = true :
        this.getControls[index]['controls'].partyIdentityDOList.controls.identityTypeCd.identityTypeCdError = false;

      let identityNum = this.getControls[index]['controls'].partyIdentityDOList.controls.identityNum.value;
      identityNum == "" || identityNum == null || identityNum == undefined ?
        this.getControls[index]['controls'].partyIdentityDOList.controls.identityNum.identityNumError = true :
        this.getControls[index]['controls'].partyIdentityDOList.controls.identityNum.identityNumError = false;
    }
  }

  addInsurer() {
    this.checkValidateForm();
    if (!this.insuranceForm.valid) {

      this.toastr.warning("Please fill in existing traveller details first");
    } else {
      if (this.count <= 9) {
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
}