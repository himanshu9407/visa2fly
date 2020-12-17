import { InsuranceService } from './../insurance.service';
import { PreloaderService } from './../../../shared/preloader.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private preloaderService: PreloaderService,
    private insuranceService: InsuranceService) { }

  ngOnInit(): void {
    this.insuranceForm = this.formBuilder.group({
      insurer: this.formBuilder.array([this.issueInsurancePolicy()]),
    });
  }

  issueInsurancePolicy(): FormGroup {
    return this.formBuilder.group({
      "birthDt": ["", [Validators.required]],
      "firstName": ["Kuldeep", [Validators.required]],
      "genderCd": ["", [Validators.required]],
      "lastName": ["", [Validators.required]],
      "relationCd": ["", [Validators.required]],
      "roleCd": ["", [Validators.required]],
      "titleCd": ["Mr", [Validators.required]],
      "citizenshipCd": ["", [Validators.required]],
      "residenceProof": ["", [Validators.required]],
      "partyAddressDOList": this.formBuilder.group({
        "addressLine1Lang1": ["", [Validators.required]],
        "addressLine2Lang1": ["", [Validators.required]],
        "addressTypeCd": ["", [Validators.required]],
        "areaCd": ["", [Validators.required]],
        "cityCd": ["", [Validators.required]],
        "pinCode": ["", [Validators.required]],
        "stateCd": ["", [Validators.required]],
        "countryCd": ["", [Validators.required]],
      }),
      "partyContactDOList": this.formBuilder.group({
        "contactNum": ["", [Validators.required]],
        "contactTypeCd": ["MOBILE", [Validators.required]],
        "stdCode": ["+91", [Validators.required]],
      }),
      "partyEmailDOList": this.formBuilder.group({
        "emailAddress": ["", [Validators.required]],
        "emailTypeCd": ["PERSONAL", [Validators.required]],
      }),
      "partyIdentityDOList": this.formBuilder.group({
        "identityNum": ["", [Validators.required]],
        "identityTypeCd": ["", [Validators.required]]
      })

    })
  }

  get getControls() {
    return (this.insuranceForm.get('insurer') as FormArray).controls;
  }

  submitForm() {
    console.log(JSON.stringify(this.insuranceForm.value));
    
    // if (this.insuranceForm.valid) {
    //   if (true) {
    //     // this.preloaderService.showPreloader(true);
    //     const fd = {};

    //     let tempArr = this.getControls || [];

    //     this.insuranceService.createPolicy(this.insuranceForm.value).subscribe(res => {
    //       console.log(res);
    //     })

    //   } else {
    //     this.toastr.warning("Please accept our terms and conditions");
    //   }
    // } else {
    //   this.toastr.warning("Some details missing !");
    //   this.checkValidateForm();
    // }
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
    if (this.insuranceForm.valid) {
      console.log("true");
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

  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

}