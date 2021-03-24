import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { InsuranceService } from './../insurance.service';
import { PreloaderService } from './../../../shared/preloader.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit, AfterContentInit, OnDestroy {
  insuranceForm: FormGroup;
  insurer: FormArray;
  birthDtError: boolean;
  count: number = 1;
  dataSource = [
    { id: "Member", dataToggle: "toogle1", dataToggleHash: "#toogle1" },
  ];
  selectedTravellerForm: number = 0;

  formData: any;
  termsAndConditionForm: FormGroup;

  policyDetailForm: FormGroup;
  insuranceDetails: {
    country: string,
    ageOfTravellers: Array<number>[],
    tripStartDate: {
      year: number,
      month: number,
      day: number,
    },
    tripEndDate: {
      year: number,
      month: number,
      day: number,
    },
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
  loaderOnProceed: boolean;
  pinCodeArr: Array<string> = [];
  cityListForProposal_0: Array<string> = [];
  stateListForProposal_0: Array<string> = [];

  cityListForProposal_1: Array<string> = [];
  stateListForProposal_1: Array<string> = [];



  cityList_0: Array<string> = [];
  stateList_0: Array<string> = [];

  cityList_1: Array<string> = [];
  stateList_1: Array<string> = [];

  cityList_2: Array<string> = [];
  stateList_2: Array<string> = [];

  cityList_3: Array<string> = [];
  stateList_3: Array<string> = [];

  cityList_4: Array<string> = [];
  stateList_4: Array<string> = [];

  cityList_5: Array<string> = [];
  stateList_5: Array<string> = [];

  nomineeRelationArr: Array<string> = [
    "BROTHER",
    "FATHER",
    "GRAND FATHER",
    "GRAND MOTHER",
    "BROTHER IN LAW",
    "MOTHER IN LAW",
    "SISTER IN LAW",
    "MOTHER",
    "SISTER",
    "SON",
    "DAUGHTER",
    "WIFE",
    "HUSBAND"
  ];

  // fetchPinCodeForProposal: boolean;
  // invalidPinCodeForProposal: boolean = false;
  // validPinCodeForProposal: boolean = false;

  fetchPinCodeForProposal_0: boolean;
  invalidPinCodeForProposal_0: boolean = false;
  validPinCodeForProposal_0: boolean;

  fetchPinCodeForProposal_1: boolean;
  invalidPinCodeForProposal_1: boolean = false;
  validPinCodeForProposal_1: boolean = false;

  fetchPinCodeForProposal_2: boolean;
  invalidPinCodeForProposal_2: boolean = false;
  validPinCodeForProposal_2: boolean = false;

  fetchPinCodeForProposal_3: boolean;
  invalidPinCodeForProposal_3: boolean = false;
  validPinCodeForProposal_3: boolean = false;

  fetchPinCodeForProposal_4: boolean;
  invalidPinCodeForProposal_4: boolean = false;
  validPinCodeForProposal_4: boolean = false;

  fetchPinCodeForProposal_5: boolean;
  invalidPinCodeForProposal_5: boolean = false;
  validPinCodeForProposal_5: boolean = false;

  firstName: string;
  goldPremiumGSTCalculated: any;
  basicPremiumGSTCalculated: any;
  premiumGST: any;
  minDate: { year: number; month: number; day: number; };
  minDate_0: { year: number; month: number; day: number; };
  minDate_1: { year: number; month: number; day: number; };
  minDate_2: { year: number; month: number; day: number; };
  minDate_3: { year: number; month: number; day: number; };
  minDate_4: { year: number; month: number; day: number; };
  minDate_5: { year: number; month: number; day: number; };

  maxDateDobForProposal: { year: number; month: number; day: number; };

  maxDateDob: { year: number; month: number; day: number; };
  maxDateDob_0: { year: number; month: number; day: number; };
  maxDateDob_1: { year: number; month: number; day: number; };
  maxDateDob_2: { year: number; month: number; day: number; };
  maxDateDob_3: { year: number; month: number; day: number; };
  maxDateDob_4: { year: number; month: number; day: number; };
  maxDateDob_5: { year: number; month: number; day: number; };

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private preloaderService: PreloaderService,
    private titleService: Title,
    private insuranceService: InsuranceService, private userflowDetails: UserFlowDetails) {
    this.insuranceDetails = this.userflowDetails.getInsuranceDetails();
    this.insurancePlan = this.userflowDetails.getInsurancePlanDetails();
    this.premiumDetails = JSON.parse(this.userflowDetails.getLocalStorage('premiumDetails'));
  }

  ngOnInit(): void {
    this.preloaderService.showPreloader(false);

    this.premiumDetails = JSON.parse(this.userflowDetails.getLocalStorage('premiumDetails'));
    this.premiumDetails.premiumAsPerPlan.forEach(element => {
      // console.log(element);
      if (element.planType == 'Basic') {
        this.basicPremiumCalculated = element.premiumCalculated;
        this.basicPremiumGSTCalculated = element.gst;
      } else if (element.planType == 'Gold') {
        this.goldPremiumCalculated = element.premiumCalculated;
        this.goldPremiumGSTCalculated = element.gst;
      }
    });

    if (this.insurancePlan.planType == 'Basic') {
      this.premiumCalculated = this.basicPremiumCalculated;
      this.premiumGST = this.basicPremiumGSTCalculated;
    } else if (this.insurancePlan.planType == 'Gold') {
      this.premiumCalculated = this.goldPremiumCalculated;
      this.premiumGST = this.goldPremiumGSTCalculated;
    }

    // insurance form
    this.insuranceForm = this.formBuilder.group({
      proposer: this.issueProposerDetail(),
      insurer: this.formBuilder.array([this.issueInsurancePolicy()]),
    });

    // policydetails form
    this.policyDetailForm = this.formBuilder.group({
      planType: [{ value: '' }, [Validators.required]],
      coverage: [{ value: '', disabled: true }, [Validators.required]]
    });

    // terms and condition form
    this.termsAndConditionForm = this.formBuilder.group({
      tnc: [false, [Validators.requiredTrue]],
    });

    // console.log(this.maxDateDob_ForProposal);
    this.policyDetailForm.get('planType').setValue(this.insurancePlan.planType);
    this.policyDetailForm.get('coverage').setValue(this.insurancePlan.coverage);


    this.titleService.setTitle(this.title);

    // console.log(this.getControls[0]['controls'].partyQuestionDOList.controls);

    // ($(".pinCodeAutoComplete") as any).autocomplete({
    //   source: this.pinCodeArr
    // });

    // if (this.getControls[0].get('relationCd').value == 'SELF') {
    //   let firstName = this.insuranceForm.controls.proposer.get('firstName').value;
    //   this.getControls[0].get('firstName').setValue(firstName);
    // }

    // this.insuranceForm.valueChanges.subscribe(() => {
    // for (
    //   let index = 0;
    //   index < this.getControls.length;
    //   index++
    // ) {
    //   if (this.getControls[index]['controls'].relationCd.value === 'SELF') {
    //     // let firstName = this.insuranceForm.controls.proposer.get('firstName').value;   
    //     // let lastName = this.insuranceForm.controls.proposer.get('lastName').value; 

    //     // this.getControls[index].get('firstName').setValue(this.firstName);
    //     // this.getControls[index].get('lastName').setValue(lastName);
    //   }
    // }
    // });

    const current = new Date();
    this.minDate = {
      year: current.getFullYear() - 60,
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    //console.log(this.simCart);

    let today = new Date();
    today.setDate(today.getDate() - 91);

    this.maxDateDob_0 = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.minDate_0 = {
      year: today.getFullYear() - 25,
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    this.maxDateDob_1 = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.minDate_1 = {
      year: today.getFullYear() - 25,
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    this.maxDateDob_2 = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.minDate_2 = {
      year: today.getFullYear() - 25,
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    this.maxDateDob_3 = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.minDate_3 = {
      year: today.getFullYear() - 25,
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    this.maxDateDob_4 = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.minDate_4 = {
      year: today.getFullYear() - 25,
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    this.maxDateDob_5 = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.minDate_5 = {
      year: today.getFullYear() - 25,
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    let todayProposal = new Date();

    this.maxDateDobForProposal = {
      year: todayProposal.getFullYear() - 18,
      month: todayProposal.getMonth() + 1,
      day: todayProposal.getDate(),
    };


  }

  ngOnDestroy(): void {
    this.insuranceForm.reset();
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if ((this.premiumCalculated + this.premiumGST) < 50000) {
        document.getElementById('identityProposer_1').style.display = 'none';
        this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][1].controls.identityNum.setValidators(null);
        this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][1].controls.identityNum.updateValueAndValidity();
      }
    })
  }

  onChangeProposal(event, fieldName) {
    for (
      let index = 0;
      index < this.getControls.length;
      index++
    ) {
      if (this.getControls[index]['controls'].relationCd.value === 'SELF') {


        switch (fieldName) {
          case 'firstName':
            let firstName = this.insuranceForm.controls.proposer.get('firstName').value;
            this.getControls[index].get('firstName').setValue(firstName);

          case 'lastName':
            let lastName = this.insuranceForm.controls.proposer.get('lastName').value;
            this.getControls[index].get('lastName').setValue(lastName);

          case 'birthDtCopy':
            let birthDtCopy = this.insuranceForm.controls.proposer.get('birthDtCopy').value;
            this.getControls[index].get('birthDtCopy').setValue(birthDtCopy);

          case 'genderCd':
            let genderCd = this.insuranceForm.controls.proposer.get('genderCd').value;
            this.getControls[index].get('genderCd').setValue(genderCd);

          case 'relationCd':
            let relationCd = this.insuranceForm.controls.proposer.get('relationCd').value;
            this.getControls[index].get("relationCd").setValue(relationCd);

          case 'titleCd':
            let titleCd = this.insuranceForm.controls.proposer.get('titleCd').value;
            this.getControls[index].get("titleCd").setValue(titleCd);

          case 'identityNum':
            let identityNum = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityNum').value;
            this.getControls[index]['controls'].partyIdentityDOList['controls'][0].get("identityNum").setValue(identityNum);

          case 'identityTypeCd':
            let identityTypeCd = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityTypeCd').value;
            this.getControls[index]['controls'].partyIdentityDOList['controls'][0].get("identityTypeCd").setValue(identityTypeCd);

          // case 'contactNum':
          //   let contactNum = this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0].get('contactNum').value;
          //   this.getControls[index]['controls'].partyContactDOList['controls'][0].get("contactNum").setValue(contactNum);

          // case 'stdCode':
          //   let stdCode = this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0].get('stdCode').value;
          //   this.getControls[index]['controls'].partyContactDOList['controls'][0].get("stdCode").setValue(stdCode);

          // case 'emailAddress':
          //   let emailAddress = this.insuranceForm.controls.proposer['controls'].partyEmailDOList['controls'][0].get('emailAddress').value;
          //   this.getControls[index]['controls'].partyEmailDOList['controls'][0].get("emailAddress").setValue(emailAddress);

          // case 'addressLine1Lang1':
          //   let addressLine1Lang1 = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressLine1Lang1').value.replace(/[\r\n]+/g, " ");
          //   this.getControls[index]['controls'].partyAddressDOList['controls'][0].get("addressLine1Lang1").setValue(addressLine1Lang1);

          // case 'addressLine2Lang1':
          //   let addressLine2Lang1 = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressLine2Lang1').value.replace(/[\r\n]+/g, " ");
          //   this.getControls[index]['controls'].partyAddressDOList['controls'][0].get("addressLine2Lang1").setValue(addressLine2Lang1);

          // case 'addressTypeCd':
          //   let addressTypeCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressTypeCd').value;
          //   this.getControls[index]['controls'].partyAddressDOList['controls'][0].get("addressTypeCd").setValue(addressTypeCd);

          // case 'areaCd':
          //   let areaCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('areaCd').value;
          //   this.getControls[index]['controls'].partyAddressDOList['controls'][0].get("areaCd").setValue(areaCd);

          // case 'cityCd':
          //   let cityCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('cityCd').value;
          //   this.getControls[index]['controls'].partyAddressDOList['controls'][0].get("cityCd").setValue(cityCd);

          // case 'pinCode':
          //   let pinCode = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('pinCode').value;
          //   this.getControls[index]['controls'].partyAddressDOList['controls'][0].get("pinCode").setValue(pinCode);

          // case 'stateCd':
          //   let stateCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('stateCd').value;
          //   this.getControls[index]['controls'].partyAddressDOList['controls'][0].get("stateCd").setValue(stateCd);

          // case 'countryCd':
          //   let countryCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('countryCd').value;
          //   this.getControls[index]['controls'].partyAddressDOList['controls'][0].get("countryCd").setValue(countryCd);

        }
      }
    }
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
      // addressForPickupSame: [true, [Validators.required]],
      // partyAddressDOList: this.formBuilder.array([this.partyAddressDoList()]),
      // partyContactDOList: this.formBuilder.array([this.partyContactDOList()]),
      // partyEmailDOList: this.formBuilder.array([this.partyEmailDOList()]),
      partyIdentityDOList: this.formBuilder.array([this.partyIdentityDOList()]),
      partyQuestionDOList: this.formBuilder.array([
        this.formBuilder.group({
          "questionCd": ["pedYesNo"],
          "questionType": ["radio"],
          "response_0": ["NO"],
          "response": ["NO"]
        }),
        this.formBuilder.group({
          "questionCd": ["128"],
          "questionType": ["radio"],
          "response_1": ["NO"],
          "response": ["NO"]
        }),
        this.formBuilder.group({
          "questionCd": ["114"],
          "questionType": ["radio"],
          "response_2": ["NO"],
          "response": ["NO"]
        }),
        this.formBuilder.group({
          "questionCd": ["143"],
          "questionType": ["radio"],
          "response_3": ["NO"],
          "response": ["NO"]
        }),
        this.formBuilder.group({
          "questionCd": ["129"],
          "questionType": ["radio"],
          "response_4": ["NO"],
          "response": ["NO"]
        }),
        this.formBuilder.group({
          "questionCd": ["164"],
          "questionType": ["radio"],
          "response_5": ["NO"],
          "response": ["NO"]
        }),
        this.formBuilder.group({
          "questionCd": ["210"],
          "questionType": ["radio"],
          "response_6": ["NO"],
          "response": ["NO"]
        }),
        this.formBuilder.group({
          "questionCd": ["otherDiseasesDescription"],
          "questionType": ["text"],
          "response_7": [""],
          "response": [""]
        }),
        this.formBuilder.group({
          "questionCd": ["T002"],
          "questionType": ["radio"],
          "response_8": ["NO"],
          "response": ["NO"]
        }),
        this.formBuilder.group({
          "questionCd": ["PRDDET1"],
          "questionType": ["text"],
          "response_9": ["NO"],
          "response": [""]
        }),
        this.formBuilder.group({
          "questionCd": ["T001"],
          "questionType": ["radio"],
          "response_10": ["NO"],
          "response": ["NO"]
        }),
        this.formBuilder.group({
          "questionCd": ["PRVD"],
          "questionType": ["text"],
          "response_11": ["NO"],
          "response": [""]
        })
      ])
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
      // ensureYourSelf: [false, [Validators.required]],
      citizenshipCd: [{ value: "INDIAN", disabled: true }, [Validators.required]],
      partyAddressDOList: this.formBuilder.array([
        this.formBuilder.group({
          addressLine1Lang1: ["", [Validators.required]],
          addressLine2Lang1: ["", [Validators.required]],
          addressTypeCd: ["PERMANENT"],
          areaCd: ["", [Validators.required]],
          cityCd: ["", [Validators.required]],
          pinCode: ["", [Validators.required]],
          stateCd: ["", [Validators.required]],
          countryCd: [{ value: "India", disabled: true }],
          sameAsPermanentAddress: [false, [Validators.required]],
        }),
        this.formBuilder.group({
          addressLine1Lang1: ["", [Validators.required]],
          addressLine2Lang1: ["", [Validators.required]],
          addressTypeCd: ["COMMUNICATION"],
          areaCd: ["", [Validators.required]],
          cityCd: ["", [Validators.required]],
          pinCode: ["", [Validators.required]],
          stateCd: ["", [Validators.required]],
          countryCd: [{ value: "India", disabled: true }],
          sameAsPermanentAddress: [false, [Validators.required]],
        })
      ]),
      partyContactDOList: this.formBuilder.array([this.partyContactDOList()]),
      partyEmailDOList: this.formBuilder.array([this.partyEmailDOList()]),
      partyIdentityDOList: this.partyIdentityDOListForProposal(),
      nomineeDetail: this.formBuilder.group({
        nomineeName: ["", [Validators.required]],
        nomineeRelation: ["", [Validators.required]],
      }),

    });
  }

  // partyAddressDoList() {
  //   return this.formBuilder.group({
  //     addressLine1Lang1: [""],
  //     addressLine2Lang1: [""],
  //     addressTypeCd: ["PERMANENT"],
  //     areaCd: [""],
  //     cityCd: [""],
  //     pinCode: [""],
  //     stateCd: [""],
  //     countryCd: [{ value: "India", disabled: true }],
  //   });
  // }

  partyContactDOList() {
    return this.formBuilder.group({
      contactNum: ["", [Validators.required]],
      stdCode: ["+91", [Validators.required]],
    });
  }

  partyEmailDOList() {
    return this.formBuilder.group({
      emailAddress: ["", [Validators.required]],
      // emailTypeCd: ["PERSONAL", [Validators.required]],
    });
  }

  partyIdentityDOListForProposal() {
    return this.formBuilder.array([
      this.formBuilder.group({
        identityNum: ["", [Validators.required]],
        identityTypeCd: ["PASSPORT", [Validators.required]],
      }),
      this.formBuilder.group({
        identityNum: ["", [Validators.required]],
        identityTypeCd: ["PAN", [Validators.required]],
      })
    ])
  }

  partyIdentityDOList() {
    return this.formBuilder.group({
      identityNum: ["", [Validators.required]],
      identityTypeCd: ["PASSPORT", [Validators.required]]
    });
  }

  get getControls() {
    return (this.insuranceForm.get('insurer') as FormArray).controls;
  }

  isLetter(str: any) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  onChangePinCodeForProposer(city: string, j: number) {
    if (city.length > 6 || city.length < 1) {
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.fetchPinCodeForProposal = false;
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.invalidPinCodeForProposal = true;
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.validPinCodeForProposal = false;
    } else if (city.length > 1 || city.length < 6) {
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.fetchPinCodeForProposal = true;
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.invalidPinCodeForProposal = false;
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.validPinCodeForProposal = false;
    } else {
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.fetchPinCodeForProposal = false;
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.invalidPinCodeForProposal = false;
    }

    if (this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j].get('pinCode').valid) {
      let reqBody = {
        pinCode: this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j].get('pinCode').value
      }
      this.insuranceService.pinCodeCityState(reqBody).subscribe((res: any) => {
        if (res.validValue == true) {
          if (j == 0) {
            this.cityListForProposal_0 = res.city;
            this.stateListForProposal_0 = res.state;
            this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j].get('cityCd').setValue(this.cityListForProposal_0[0]);
            this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j].get('stateCd').setValue(this.stateListForProposal_0[0]);
          } else if (j == 1) {
            this.cityListForProposal_1 = res.city;
            this.stateListForProposal_1 = res.state;
            this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j].get('cityCd').setValue(this.cityListForProposal_1[0]);
            this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j].get('stateCd').setValue(this.stateListForProposal_1[0]);
          }


          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.pinCodeFetchError = false;
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.fetchPinCodeForProposal = false;
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.validPinCodeForProposal = true;
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.invalidPinCodeForProposal = false;
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j].controls.cityCd.cityCdError = false;
        } else {
          if (j == 0) {
            this.cityListForProposal_0 = [];
            this.stateListForProposal_0 = [];
          } else if (j == 1) {
            this.cityListForProposal_1 = [];
            this.stateListForProposal_1 = [];
          }


          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j].get('cityCd').setValue('');
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j].get('stateCd').setValue('');
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.pinCodeFetchError = true;
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.fetchPinCodeForProposal = false;
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.validPinCodeForProposal = false;
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j]['controls'].pinCode.invalidPinCodeForProposal = true;
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][j].controls.cityCd.cityCdError = true;
        }
      });
    }
  }

  // onChangePinCode(city: string, i: number) {
  //   // console.log(city);

  //   if (city.length > 6 || city.length < 1) {
  //     this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.fetchPinCodeForProposal = false;
  //     this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.invalidPinCodeForProposal = true;
  //     this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.validPinCodeForProposal = false;
  //   } else if (city.length > 1 || city.length < 6) {
  //     this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.fetchPinCodeForProposal = true;
  //     this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.invalidPinCodeForProposal = false;
  //     this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.validPinCodeForProposal = false;
  //   } else {
  //     this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.fetchPinCodeForProposal = false;
  //     this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.invalidPinCodeForProposal = false;
  //   }

  //   if (this.getControls[i]['controls'].partyAddressDOList.controls[0].get('pinCode').valid) {
  //     let reqBody = {
  //       pinCode: this.getControls[i]['controls'].partyAddressDOList.controls[0].get('pinCode').value
  //     }
  //     this.insuranceService.pinCodeCityState(reqBody).subscribe((res: any) => {
  //       // res.foreach((element: any) => {
  //       // })

  //       let cityList: string;
  //       let stateList: string;

  //       if (res.validValue == true) {

  //         switch (i) {
  //           case 0:
  //             this.cityList_0 = res.city;
  //             this.stateList_0 = res.state;

  //             cityList = this.cityList_0[0];
  //             stateList = this.stateList_0[0];

  //             break;

  //           case 1:
  //             this.cityList_1 = res.city;
  //             this.stateList_1 = res.state;

  //             cityList = this.cityList_1[0];
  //             stateList = this.stateList_1[0];

  //             break;

  //           case 2:
  //             this.cityList_2 = res.city;
  //             this.stateList_2 = res.state;

  //             cityList = this.cityList_2[0];
  //             stateList = this.stateList_2[0];

  //             break;

  //           case 3:
  //             this.cityList_3 = res.city;
  //             this.stateList_3 = res.state;

  //             cityList = this.cityList_3[0];
  //             stateList = this.stateList_3[0];

  //             break;

  //           case 4:
  //             this.cityList_4 = res.city;
  //             this.stateList_4 = res.state;

  //             cityList = this.cityList_4[0];
  //             stateList = this.stateList_4[0];

  //             break;

  //           case 5:
  //             this.cityList_5 = res.city;
  //             this.stateList_5 = res.state;

  //             cityList = this.cityList_5[0];
  //             stateList = this.stateList_5[0];

  //             break;

  //         }

  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].get('cityCd').setValue(cityList);
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].get('stateCd').setValue(stateList);

  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.pinCodeFetchError = false;
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.fetchPinCodeForProposal = false;
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.validPinCodeForProposal = true;
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.invalidPinCodeForProposal = false;
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.cityCd.cityCdError = false;

  //       } else {

  //         switch (i) {
  //           case 0:
  //             this.cityList_0 = [];
  //             this.stateList_0 = [];

  //             cityList = this.cityList_0[0];
  //             stateList = this.stateList_0[0];

  //             break;

  //           case 1:
  //             this.cityList_1 = [];
  //             this.stateList_1 = [];

  //             cityList = this.cityList_1[0];
  //             stateList = this.stateList_1[0];

  //             break;

  //           case 2:
  //             this.cityList_2 = [];
  //             this.stateList_2 = [];

  //             cityList = this.cityList_2[0];
  //             stateList = this.stateList_2[0];

  //             break;

  //           case 3:
  //             this.cityList_3 = [];
  //             this.stateList_3 = [];

  //             cityList = this.cityList_3[0];
  //             stateList = this.stateList_3[0];

  //             break;

  //           case 4:
  //             this.cityList_4 = [];
  //             this.stateList_4 = [];

  //             cityList = this.cityList_4[0];
  //             stateList = this.stateList_4[0];

  //             break;

  //           case 5:
  //             this.cityList_5 = [];
  //             this.stateList_5 = [];

  //             cityList = this.cityList_5[0];
  //             stateList = this.stateList_5[0];

  //             break;

  //         }

  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].get('cityCd').setValue('');
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].get('stateCd').setValue('');
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.pinCodeFetchError = true;
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.fetchPinCodeForProposal = false;
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.validPinCodeForProposal = false;
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.pinCode.invalidPinCodeForProposal = true;
  //         this.getControls[i]['controls'].partyAddressDOList.controls[0].controls.cityCd.cityCdError = true;
  //       }
  //     });
  //   }
  // }

  submitForm() {
    this.loaderOnProceed = true;

    if (!this.insuranceForm.valid) {
      this.toastr.warning("Some details missing !");
      this.checkValidateForm();
      this.checkValidateProposer();

      this.loaderOnProceed = false;
    } else {
      if (!this.termsAndConditionForm.valid) {
        this.toastr.warning("Please accept our terms and conditions");

        this.loaderOnProceed = false;
      } else {
        // this.preloaderService.showPreloader(true);

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

        this.insuranceForm.controls.proposer['controls'].citizenshipCd.setValue('INDIAN');
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('countryCd').setValue('India');

        let identityNumTemp = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityNum').value.toUpperCase();
        this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityNum').setValue(identityNumTemp);

        let same = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][1].get('sameAsPermanentAddress').value;
        if (same) {

          let addressLine1Lang1 = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressLine1Lang1').value.replace(/[\r\n]+/g, " ");
          let addressLine2Lang1 = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressLine2Lang1').value.replace(/[\r\n]+/g, " ");
          // let addressTypeCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('addressTypeCd').value;
          let areaCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('areaCd').value;
          let cityCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('cityCd').value;
          let pinCode = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('pinCode').value;
          let stateCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('stateCd').value;
          let countryCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][0].get('countryCd').value;


          // paste it
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][1].get("addressLine1Lang1").setValue(addressLine1Lang1);
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][1].get("addressLine2Lang1").setValue(addressLine2Lang1);
          // this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][1].get("addressTypeCd").setValue(addressTypeCd);
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][1].get("areaCd").setValue(areaCd);
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][1].get("cityCd").setValue(cityCd);
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][1].get("pinCode").setValue(pinCode);
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][1].get("stateCd").setValue(stateCd);
          this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][1].get("countryCd").setValue(countryCd);
        }

        const fd = {};
        let tempArr = this.getControls || [];
        tempArr.forEach((form: FormGroup, index) => {
          form.get("citizenshipCd").setValue('INDIAN');

          // let eliminateEnter1 = form.controls.partyAddressDOList["controls"][0].get("addressLine1Lang1").value.replace(/[\r\n]+/g, " ");
          // let eliminateEnter2 = form.controls.partyAddressDOList["controls"][0].get("addressLine2Lang1").value.replace(/[\r\n]+/g, " ");

          // form.controls.partyAddressDOList["controls"][0].get("addressLine1Lang1").setValue(eliminateEnter1);
          // form.controls.partyAddressDOList["controls"][0].get("addressLine1Lang1").updateValueAndValidity();

          // form.controls.partyAddressDOList["controls"][0].get("addressLine2Lang1").setValue(eliminateEnter2);
          // form.controls.partyAddressDOList["controls"][0].get("addressLine2Lang1").updateValueAndValidity();

          // let addressLine1Lang1 = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.addressLine1Lang1.value.replace(/[\r\n]+/g, " ");
          // let addressLine2Lang1 = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.addressLine2Lang1.value.replace(/[\r\n]+/g, " ");
          // let addressTypeCd = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.addressTypeCd.value;
          // let areaCd = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.areaCd.value;
          // let cityCd = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.cityCd.value;
          // let pinCode = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.pinCode.value;
          // let stateCd = (<FormArray>(this.insuranceForm.get("insurer"))).controls[0]["controls"].partyAddressDOList.controls[0].controls.stateCd.value;

          // let same = form.get("addressForPickupSame").value;

          // if (same) {
          //   form.controls.partyAddressDOList["controls"][0].get("addressLine1Lang1").setValue(addressLine1Lang1);
          //   form.controls.partyAddressDOList["controls"][0].get("addressLine2Lang1").setValue(addressLine2Lang1);
          //   form.controls.partyAddressDOList["controls"][0].get("addressTypeCd").setValue(addressTypeCd);
          //   form.controls.partyAddressDOList["controls"][0].get("areaCd").setValue(areaCd);
          //   form.controls.partyAddressDOList["controls"][0].get("cityCd").setValue(cityCd);
          //   form.controls.partyAddressDOList["controls"][0].get("pinCode").setValue(pinCode);
          //   form.controls.partyAddressDOList["controls"][0].get("stateCd").setValue(stateCd);
          //   form.controls.partyAddressDOList["controls"][0].get("countryCd").setValue("India");
          // } else {
          //   form.controls.partyAddressDOList["controls"][0].get("countryCd").setValue("India");
          // }

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

        let tripStartDate = this.insuranceDetails.tripStartDate;
        let tripEndDate = this.insuranceDetails.tripEndDate;


        let tempTripStartDate: any;
        let tempTripEndDate: any;

        if (tripStartDate.month < 10 && tripStartDate.day < 10) {
          tempTripStartDate = "0" + tripStartDate.day + "/0" + tripStartDate.month + "/" + tripStartDate.year;
        } else if (tripStartDate.day < 10) {
          tempTripStartDate = "0" + tripStartDate.day + "/" + tripStartDate.month + "/" + tripStartDate.year;
        } else if (tripStartDate.month < 10) {
          tempTripStartDate = tripStartDate.day + "/0" + tripStartDate.month + "/" + tripStartDate.year;
        } else {
          tempTripStartDate = tripStartDate.day + "/" + tripStartDate.month + "/" + tripStartDate.year;
        }

        if (tripEndDate.month < 10 && tripEndDate.day < 10) {
          tempTripEndDate = "0" + tripEndDate.day + "/0" + tripEndDate.month + "/" + tripEndDate.year;
        } else if (tripEndDate.day < 10) {
          tempTripEndDate = "0" + tripEndDate.day + "/" + tripEndDate.month + "/" + tripEndDate.year;
        } else if (tripEndDate.month < 10) {
          tempTripEndDate = tripEndDate.day + "/0" + tripEndDate.month + "/" + tripEndDate.year;
        } else {
          tempTripEndDate = tripEndDate.day + "/" + tripEndDate.month + "/" + tripEndDate.year;
        }

        // let tripStartDate = tripStartDateDay + "/" + tripStartDateMonth + "/" + tripStartDateYear // 10/01/2021
        // let tripEndDate = tripEndDateDay + "/" + tripEndDateMonth + "/" + tripEndDateYear // 10/01/2021

        let country = this.insuranceDetails.country;
        let planType = this.userflowDetails.getInsurancePlanDetails().planType;

        // ptdata.forEach((element: {}, index) => {
        //   element["id"] = this.dataSource[index].id;
        // });
        fd["partyDOList"] = ptdata;
        fd["proposerDetail"] = proposerData;
        fd["policyCommencementDt"] = tempTripStartDate;
        fd["policyMaturityDt"] = tempTripEndDate;
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
            // console.log(res.data.amount);
            // console.log(this.premiumCalculated);
            this.newPremium = res.data.amount;
            this.oldPremium = this.premiumCalculated + this.premiumGST;


            if (this.newPremium != this.oldPremium) {
              this.loaderOnProceed = false;
              this.preloaderService.showPreloader(false);
              ($('#warningModal') as any).modal('show')
            } else {
              this.paymentInitiate(this.createPolicyBookingId);
            }
          } else if (res.code === "2020") {
            this.loaderOnProceed = false;
            this.scrollToInvalid('proposerForm');
            document.getElementById('identityProposer_1').style.display = 'block';
            this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][1].controls.identityNum.setValidators([Validators.required]);
            this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][1].controls.identityNum.updateValueAndValidity();
            this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][1].controls.identityTypeCd.identityNumError = true;
          } else {
            this.loaderOnProceed = false;
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
    // let same = this.insuranceForm.controls.proposer.get('ensureYourSelf').value;
    // let startedWith: number;

    // if (same) {
    //   startedWith = 1;
    // } else {
    //   startedWith = 0;
    // }

    for (
      // let index = startedWith;
      let index = 0;
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
      // let addressLine1Lang1 = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine1Lang1.value;
      // addressLine1Lang1 == "" || addressLine1Lang1 == null || addressLine1Lang1 == undefined ?
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine1Lang1.addressLine1Lang1Error = true :
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine1Lang1.addressLine1Lang1Error = false;

      // let addressLine2Lang1 = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine2Lang1.value;
      // addressLine2Lang1 == "" || addressLine2Lang1 == null || addressLine2Lang1 == undefined ?
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine2Lang1.addressLine2Lang1Error = true :
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.addressLine2Lang1.addressLine2Lang1Error = false;

      // let areaCd = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.areaCd.value;
      // areaCd == "" || areaCd == null || areaCd == undefined ?
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.areaCd.areaCdError = true :
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.areaCd.areaCdError = false;

      // let cityCd = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.cityCd.value;
      // cityCd == "" || cityCd == null || cityCd == undefined ?
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.cityCd.cityCdError = true :
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.cityCd.cityCdError = false;

      // let pinCode = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.pinCode.value;
      // pinCode == "" || pinCode == null || pinCode == undefined ?
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.pinCode.pinCodeError = true :
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.pinCode.pinCodeError = false;

      // let stateCd = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.stateCd.value;
      // stateCd == "" || stateCd == null || stateCd == undefined ?
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.stateCd.stateCdError = true :
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.stateCd.stateCdError = false;

      // let countryCd = this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.countryCd.value;
      // countryCd == "" || countryCd == null || countryCd == undefined ?
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.countryCd.countryCdError = true :
      //   this.getControls[index]['controls'].partyAddressDOList.controls[0].controls.countryCd.countryCdError = false;

      // partyContactDOList
      // let contactNum = this.getControls[index]['controls'].partyContactDOList.controls[0].controls.contactNum.value;
      // contactNum == "" || contactNum == null || contactNum == undefined ?
      //   this.getControls[index]['controls'].partyContactDOList.controls[0].controls.contactNum.contactNumError = true :
      //   this.getControls[index]['controls'].partyContactDOList.controls[0].controls.contactNum.contactNumError = false;

      // let stdCode = this.getControls[index]['controls'].partyContactDOList.controls[0].controls.stdCode.value;
      // stdCode == "" || stdCode == null || stdCode == undefined ?
      //   this.getControls[index]['controls'].partyContactDOList.controls[0].controls.stdCode.stdCodeError = true :
      //   this.getControls[index]['controls'].partyContactDOList.controls[0].controls.stdCode.stdCodeError = false;

      // partyEmailDOList
      // let emailAddress = this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailAddress.value;
      // emailAddress == "" || emailAddress == null || emailAddress == undefined ?
      //   this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailAddress.emailAddressError = true :
      //   this.getControls[index]['controls'].partyEmailDOList.controls[0].controls.emailAddress.emailAddressError = false;

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

    // Identity form
    let identityNum = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityNum').value;
    identityNum == "" || identityNum == null || identityNum == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].controls.identityNum.identityNumError = true :
      this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].controls.identityNum.identityNumError = false;

    let identityTypeCd = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityTypeCd').value;
    identityTypeCd == "" || identityTypeCd == null || identityTypeCd == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0]['controls'].identityTypeCd.identityTypeCdError = true :
      this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0]['controls'].identityTypeCd.identityTypeCdError = false;

    if ((this.premiumCalculated + this.premiumGST) > 50000) {
      let identityNum2 = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][1].get('identityNum2').value;
      identityNum2 == "" || identityNum2 == null || identityNum2 == undefined ?
        this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][1].controls.identityTypeCd.identityNumError = true :
        this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][1].controls.identityTypeCd.identityNumError = false;
    }


    // Contact Form
    let contactNum = this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0].get('contactNum').value;
    contactNum == "" || contactNum == null || contactNum == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0]['controls'].contactNum.contactNumError = true :
      this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0]['controls'].contactNum.contactNumError = false;

    let stdCode = this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0].get('stdCode').value;
    stdCode == "" || stdCode == null || stdCode == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0]['controls'].stdCode.stdCodeError = true :
      this.insuranceForm.controls.proposer['controls'].partyContactDOList['controls'][0]['controls'].stdCode.stdCodeError = false;

    // Email Form
    let emailAddress = this.insuranceForm.controls.proposer['controls'].partyEmailDOList['controls'][0].get('emailAddress').value;
    emailAddress == "" || emailAddress == null || emailAddress == undefined ?
      this.insuranceForm.controls.proposer['controls'].partyEmailDOList['controls'][0]['controls'].emailAddress.emailAddressError = true :
      this.insuranceForm.controls.proposer['controls'].partyEmailDOList['controls'][0]['controls'].emailAddress.emailAddressError = false;

    let nomineeName = this.insuranceForm.controls.proposer['controls'].nomineeDetail.get('nomineeName').value;
    nomineeName == "" || emailAddress == null || emailAddress == undefined ?
      this.insuranceForm.controls.proposer['controls'].nomineeDetail['controls'].nomineeName.nomineeNameError = true :
      this.insuranceForm.controls.proposer['controls'].nomineeDetail['controls'].nomineeName.nomineeNameError = false;

    let nomineeRelation = this.insuranceForm.controls.proposer['controls'].nomineeDetail.get('nomineeRelation').value;
    nomineeRelation == "" || emailAddress == null || emailAddress == undefined ?
      this.insuranceForm.controls.proposer['controls'].nomineeDetail['controls'].nomineeRelation.nomineeRelationError = true :
      this.insuranceForm.controls.proposer['controls'].nomineeDetail['controls'].nomineeRelation.nomineeRelationError = false;

    // console.log(this.insuranceForm.controls.proposer['controls'].nomineeDetail['controls']);

    // Address Form

    for (let i = 0; i < this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'].length; i++) {

      // console.log(this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'].length);
      let addressLine1Lang1 = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i].get('addressLine1Lang1').value;
      addressLine1Lang1 == "" || addressLine1Lang1 == null || addressLine1Lang1 == undefined ?
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].addressLine1Lang1.addressLine1Lang1Error = true :
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].addressLine1Lang1.addressLine1Lang1Error = false;

      let addressLine2Lang1 = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i].get('addressLine2Lang1').value;
      addressLine2Lang1 == "" || addressLine2Lang1 == null || addressLine2Lang1 == undefined ?
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].addressLine2Lang1.addressLine2Lang1Error = true :
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].addressLine2Lang1.addressLine2Lang1Error = false;

      let addressTypeCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i].get('addressTypeCd').value;
      addressTypeCd == "" || addressTypeCd == null || addressTypeCd == undefined ?
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].addressTypeCd.addressTypeCdError = true :
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].addressTypeCd.addressTypeCdError = false;

      let areaCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i].get('areaCd').value;
      areaCd == "" || areaCd == null || areaCd == undefined ?
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].areaCd.areaCdError = true :
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].areaCd.areaCdError = false;

      let cityCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i].get('cityCd').value;
      cityCd == "" || cityCd == null || cityCd == undefined ?
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].cityCd.cityCdError = true :
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].cityCd.cityCdError = false;

      let pinCode = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i].get('pinCode').value;
      pinCode == "" || pinCode == null || pinCode == undefined ?
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].pinCode.pinCodeError = true :
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].pinCode.pinCodeError = false;

      let stateCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i].get('stateCd').value;
      stateCd == "" || stateCd == null || stateCd == undefined ?
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].stateCd.stateCdError = true :
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].stateCd.stateCdError = false;

      let countryCd = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i].get('countryCd').value;
      countryCd == "" || countryCd == null || countryCd == undefined ?
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].countryCd.countryCdError = true :
        this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i]['controls'].countryCd.countryCdError = false;

      // if (this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][i].get('sameAsPermanentAddress').value == true) {
      //   break;
      // }
    }

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
    this.dataSource.splice(index, 1);
    this.count = this.count - 1;
  }

  sameAsPermanentAddress(value: any, index: number) {
    let same = this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].get('sameAsPermanentAddress').value;
    // console.log(same);
    // console.log(value);
    // console.log(index);
    if (!same) {
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.addressLine1Lang1.setValidators(null);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.addressLine2Lang1.setValidators(null);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.addressTypeCd.setValidators(null);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.areaCd.setValidators(null);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.cityCd.setValidators(null);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.pinCode.setValidators(null);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.stateCd.setValidators(null);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.countryCd.setValidators(null);

      document.getElementById("proposalAddressForm_1").style.display = "none";

    } else {
      // console.log("Fuckdown");
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.addressLine1Lang1.setValidators([
        Validators.required, Validators.pattern("^[ A-Za-z0-9-:./\n,]*$"), Validators.minLength(10), Validators.maxLength(400)
      ]);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.addressLine2Lang1.setValidators([
        Validators.required, Validators.pattern("^[ A-Za-z0-9-:./\n,]*$"), Validators.minLength(10), Validators.maxLength(400)
      ]);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.addressTypeCd.setValidators(Validators.required);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.areaCd.setValidators(Validators.required);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.cityCd.setValidators(Validators.required);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.pinCode.setValidators([Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.stateCd.setValidators(Validators.required);
      this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.countryCd.setValidators(Validators.required);

      document.getElementById("proposalAddressForm_1").style.display = "block";
    }

    this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].get('addressLine1Lang1').updateValueAndValidity();
    this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.addressLine2Lang1.updateValueAndValidity();
    this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.addressTypeCd.updateValueAndValidity();
    this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.areaCd.updateValueAndValidity();
    this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.cityCd.updateValueAndValidity();
    this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.pinCode.updateValueAndValidity();
    this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.stateCd.updateValueAndValidity();
    this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].controls.countryCd.updateValueAndValidity();

    this.insuranceForm.controls.proposer['controls'].partyAddressDOList['controls'][index].updateValueAndValidity();

    // console.log(this.getControls[index]['controls'].partyAddressDOList.controls[0].controls)
  }

  // setPrimaryAsProposer() {
  //   let same = this.insuranceForm.controls.proposer.get('ensureYourSelf').value;
  //   // let firstCollapse = document.querySelector('.no-collapsable');

  //   // console.log(same);
  //   if (same) {

  //     this.getControls[0]['controls'].firstName.setValidators(null);
  //     this.getControls[0]['controls'].lastName.setValidators(null);
  //     this.getControls[0]['controls'].birthDtCopy.setValidators(null);
  //     this.getControls[0]['controls'].genderCd.setValidators(null);
  //     this.getControls[0]['controls'].relationCd.setValidators(null);
  //     this.getControls[0]['controls'].titleCd.setValidators(null);
  //     this.getControls[0]['controls'].citizenshipCd.setValidators(null);

  //     // partyContactDOList
  //     this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.contactNum.setValidators(null);
  //     this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.stdCode.setValidators(null);

  //     // partyEmailDOList
  //     this.getControls[0]['controls'].partyEmailDOList['controls'][0].controls.emailAddress.setValidators(null);

  //     // partyIdentityDOList
  //     this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityNum.setValidators(null);

  //     this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityTypeCd.setValidators(null);

  //     // partyAddressDOList
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine1Lang1.setValidators(null);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine2Lang1.setValidators(null);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressTypeCd.setValidators(null);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.areaCd.setValidators(null);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.cityCd.setValidators(null);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.pinCode.setValidators(null);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.stateCd.setValidators(null);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.countryCd.setValidators(null);

  //     let collapse = document.querySelectorAll('#accordionInsurer .collapse')
  //     collapse.forEach((element) => {
  //       element.classList.remove('show');
  //     });
  //     this.selectedTravellerForm = null;

  //     // firstCollapse.addEventListener("click", this.stopIt);

  //   } else {

  //     // this.selectedTravellerForm = 0;

  //     this.getControls[0]['controls'].firstName.setValidators([Validators.required, Validators.pattern('^[A-Za-z]{3,32}$')]);
  //     this.getControls[0]['controls'].lastName.setValidators([Validators.required, Validators.pattern('^[A-Za-z]{3,32}$')]);
  //     this.getControls[0]['controls'].birthDtCopy.setValidators(Validators.required);
  //     this.getControls[0]['controls'].genderCd.setValidators(Validators.required);
  //     this.getControls[0]['controls'].relationCd.setValidators(Validators.required);
  //     this.getControls[0]['controls'].titleCd.setValidators(Validators.required);
  //     this.getControls[0]['controls'].citizenshipCd.setValidators(Validators.required);

  //     // partyContactDOList
  //     this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.contactNum.setValidators([Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]);
  //     this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.stdCode.setValidators(Validators.required);

  //     // partyEmailDOList
  //     this.getControls[0]['controls'].partyEmailDOList['controls'][0].controls.emailAddress.setValidators([Validators.required, Validators.pattern("^([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$")]);

  //     // partyIdentityDOList
  //     this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityNum.setValidators([Validators.required, Validators.pattern(
  //       this.getControls[0]['controls'].partyIdentityDOList.controls[0].controls.identityTypeCd.value === 'PAN' ?
  //         '^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$' : '^[A-Za-z]{1}[0-9]{7}$')]);

  //     this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityTypeCd.setValidators(Validators.required);

  //     // partyAddressDOList
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine1Lang1.setValidators([
  //       Validators.required, Validators.pattern("^[ A-Za-z0-9-:./\n,]*$"), Validators.minLength(10), Validators.maxLength(400)
  //     ]);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine2Lang1.setValidators([
  //       Validators.required, Validators.pattern("^[ A-Za-z0-9-:./\n,]*$"), Validators.minLength(10), Validators.maxLength(400)
  //     ]);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressTypeCd.setValidators(Validators.required);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.areaCd.setValidators(Validators.required);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.cityCd.setValidators(Validators.required);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.pinCode.setValidators([Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.stateCd.setValidators(Validators.required);
  //     this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.countryCd.setValidators(Validators.required);

  //     // firstCollapse.removeEventListener("click", this.stopIt);

  //   }

  //   this.getControls[0]['controls'].firstName.updateValueAndValidity();
  //   this.getControls[0]['controls'].lastName.updateValueAndValidity();
  //   this.getControls[0]['controls'].birthDtCopy.updateValueAndValidity();
  //   this.getControls[0]['controls'].genderCd.updateValueAndValidity();
  //   this.getControls[0]['controls'].relationCd.updateValueAndValidity();
  //   this.getControls[0]['controls'].titleCd.updateValueAndValidity();
  //   this.getControls[0]['controls'].citizenshipCd.updateValueAndValidity();

  //   // partyContactDOList
  //   this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.contactNum.updateValueAndValidity();
  //   this.getControls[0]['controls'].partyContactDOList['controls'][0].controls.stdCode.updateValueAndValidity();

  //   // partyEmailDOList
  //   this.getControls[0]['controls'].partyEmailDOList['controls'][0].controls.emailAddress.updateValueAndValidity();

  //   // partyIdentityDOList
  //   this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityNum.updateValueAndValidity();

  //   this.getControls[0]['controls'].partyIdentityDOList['controls'][0].controls.identityTypeCd.updateValueAndValidity();

  //   // partyAddressDOList
  //   this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine1Lang1.updateValueAndValidity();
  //   this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressLine2Lang1.updateValueAndValidity();
  //   this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.addressTypeCd.updateValueAndValidity();
  //   this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.areaCd.updateValueAndValidity();
  //   this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.cityCd.updateValueAndValidity();
  //   this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.pinCode.updateValueAndValidity();
  //   this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.stateCd.updateValueAndValidity();
  //   this.getControls[0]['controls'].partyAddressDOList['controls'][0].controls.countryCd.updateValueAndValidity();

  //   this.getControls[0].updateValueAndValidity();

  //   // console.log(this.getControls[0]['controls']);
  // }

  stopIt(e) {
    e.preventDefault();
    e.stopPropagation();
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
      this.premiumGST = this.basicPremiumGSTCalculated;
      this.policyDetailForm.get('coverage').setValue("US $ 50,000");
      this.userflowDetails.setInsurancePlan("coverage", "US $ 50,000");
    } else if (planType === "Gold") {
      this.premiumCalculated = this.goldPremiumCalculated;
      this.premiumGST = this.goldPremiumGSTCalculated;
      this.policyDetailForm.get('coverage').setValue("US $ 100,000");
      this.userflowDetails.setInsurancePlan("coverage", "US $ 100,000");
    }
    this.userflowDetails.setInsurancePlan("planType", planType);
  }

  onRelationValueChange(event, i: number, section: string) {
    // console.log(event)
    let relationArr: Array<string> = [];
    let duplicates: Array<string> = [];
    let startWith: number = 0;

    // console.log(this.getControls[i].get("titleCd").value);
    // console.log(i);
    // console.log(this.getControls[i].get("genderCd").value);

    // let same = this.insuranceForm.controls.proposer.get('ensureYourSelf').value;

    // if (same) {
    //   relationArr = ["SELF"];
    //   startWith = 1;
    // } else {
    //   relationArr = [];
    //   startWith = 0;
    // }

    this.getControls[i]['controls'].birthDt.setValue('');
    this.getControls[i]['controls'].birthDt.setValidators([Validators.nullValidator]);
    this.getControls[i]['controls'].birthDt.updateValueAndValidity();

    this.getControls[i]['controls'].birthDtCopy.setValue('');
    this.getControls[i]['controls'].birthDtCopy.setValidators([Validators.required]);
    this.getControls[i]['controls'].birthDtCopy.updateValueAndValidity();

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

      // console.log(index);
      // console.log(i);

    }

    // console.log(typeof this.getControls[i]['controls'].relationCd.value + '  ' + this.getControls[i]['controls'].relationCd.value);
    // console.log(this.getControls[i]['controls'].relationCd.duplicatesError = false);
    // console.log(this.getControls[i]['controls'].relationCd.value == 'SELF');
    // console.log(this.getControls[i]['controls'].relationCd.duplicatesError = false && this.getControls[i]['controls'].relationCd.value == 'SELF');

    if (!this.getControls[i]['controls'].relationCd.duplicatesError && this.getControls[i]['controls'].relationCd.value == 'SELF') {
      let birthDtCopy = this.insuranceForm.controls.proposer.get('birthDtCopy').value;
      let firstName = this.insuranceForm.controls.proposer.get('firstName').value;
      let genderCd = this.insuranceForm.controls.proposer.get('genderCd').value;
      let lastName = this.insuranceForm.controls.proposer.get('lastName').value;
      let titleCd = this.insuranceForm.controls.proposer.get('titleCd').value;
      let identityNum = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityNum').value;
      let identityTypeCd = this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][0].get('identityTypeCd').value;

      this.getControls[i].get('birthDtCopy').setValue(birthDtCopy);
      this.getControls[i].get('firstName').setValue(firstName);
      this.getControls[i].get("genderCd").setValue(genderCd);
      this.getControls[i].get('lastName').setValue(lastName);
      this.getControls[i].get("titleCd").setValue(titleCd);
      this.getControls[i]['controls'].partyIdentityDOList['controls'][0].get("identityNum").setValue(identityNum);
      this.getControls[i]['controls'].partyIdentityDOList['controls'][0].get("identityTypeCd").setValue(identityTypeCd);

      // console.log(this.getControls[i]['controls'].birthDtCopy);
      // console.log(this.getControls[i]['controls'].birthDt);

      this.getControls[i]['controls'].firstName.firstNameError = false;
      this.getControls[i]['controls'].lastName.lastNameError = false;
      this.getControls[i]['controls'].titleCd.titleCdError = false;
      this.getControls[i]['controls'].genderCd.genderCdError = false;
      this.getControls[i]['controls'].birthDt.birthDtError = false;
      this.getControls[i]['controls'].birthDtCopy.birthDtCopyError = false;

      this.getControls[i]['controls'].partyIdentityDOList.controls[0].controls.identityNum.identityNumError = false;


      // this.getControls[i].get('birthDtCopy').setValidators(null);
      // this.getControls[i].get('genderCd').setValidators(null);
      // this.getControls[i].get('lastName').setValidators([null]);
      // this.getControls[i]['controls'].lastName.lastNameError = false;

      // this.getControls[i].get('titleCd').setValidators(null);

      // // partyIdentityDOList
      // this.getControls[i].get('partyIdentityDOList')['controls'][0].controls.identityNum.setValidators([null]);

      // this.getControls[i].get('partyIdentityDOList')['controls'][0].controls.identityTypeCd.setValidators(null);

      //   // partyAddressDOList
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.addressLine1Lang1.setValidators([
      //   //   Validators.required, Validators.pattern("^[ A-Za-z0-9-:./\n,]*$"), Validators.minLength(10), Validators.maxLength(400)
      //   // ]);
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.addressLine2Lang1.setValidators([
      //   //   Validators.required, Validators.pattern("^[ A-Za-z0-9-:./\n,]*$"), Validators.minLength(10), Validators.maxLength(400)
      //   // ]);
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.addressTypeCd.setValidators(Validators.required);
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.areaCd.setValidators(Validators.required);
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.cityCd.setValidators(Validators.required);
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.pinCode.setValidators([Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]);
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.stateCd.setValidators(Validators.required);
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.countryCd.setValidators(Validators.required);


      //   this.getControls[i]['controls'].firstName.updateValueAndValidity();
      //   this.getControls[i]['controls'].lastName.updateValueAndValidity();
      //   this.getControls[i]['controls'].birthDtCopy.updateValueAndValidity();
      //   this.getControls[i]['controls'].genderCd.updateValueAndValidity();
      //   this.getControls[i]['controls'].relationCd.updateValueAndValidity();
      //   this.getControls[i]['controls'].titleCd.updateValueAndValidity();
      //   this.getControls[i]['controls'].citizenshipCd.updateValueAndValidity();

      //   // partyContactDOList
      //   // this.getControls[i]['controls'].partyContactDOList['controls'][0].controls.contactNum.updateValueAndValidity();
      //   // this.getControls[i]['controls'].partyContactDOList['controls'][0].controls.stdCode.updateValueAndValidity();

      //   // partyEmailDOList
      //   // this.getControls[i]['controls'].partyEmailDOList['controls'][0].controls.emailAddress.updateValueAndValidity();

      //   // partyIdentityDOList
      //   this.getControls[i]['controls'].partyIdentityDOList['controls'][0].controls.identityNum.updateValueAndValidity();

      //   this.getControls[i]['controls'].partyIdentityDOList['controls'][0].controls.identityTypeCd.updateValueAndValidity();

      //   // partyAddressDOList
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.addressLine1Lang1.updateValueAndValidity();
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.addressLine2Lang1.updateValueAndValidity();
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.addressTypeCd.updateValueAndValidity();
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.areaCd.updateValueAndValidity();
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.cityCd.updateValueAndValidity();
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.pinCode.updateValueAndValidity();
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.stateCd.updateValueAndValidity();
      //   // this.getControls[i]['controls'].partyAddressDOList['controls'][0].controls.countryCd.updateValueAndValidity();

      //   this.getControls[i].updateValueAndValidity();
    }

    if (this.getControls[i].get("relationCd").value === "SPOUSE" || this.getControls[i].get("relationCd").value === "DAUGHTER") {
      this.getControls[i].get("titleCd").setValue('MS');
      this.getControls[i].get("genderCd").setValue('FEMALE');
    } else if (this.getControls[i].get("relationCd").value === "SON") {
      this.getControls[i].get("titleCd").setValue('MR');
      this.getControls[i].get("genderCd").setValue('MALE');
    }

    let yesterday = new Date();

    if (this.getControls[i].get("relationCd").value === "SON" || this.getControls[i].get("relationCd").value === "DAUGHTER") {
      // console.log(typeof i);
      switch (i) {

        case 0:
          yesterday.setDate(yesterday.getDate() - 91);
          this.maxDateDob_0 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_0 = {
            year: yesterday.getFullYear() - 25,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };

          break;
        case 1:
          yesterday.setDate(yesterday.getDate() - 91);
          this.maxDateDob_1 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_1 = {
            year: yesterday.getFullYear() - 25,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
        case 2:

          yesterday.setDate(yesterday.getDate() - 91);
          this.maxDateDob_2 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_2 = {
            year: yesterday.getFullYear() - 25,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
        case 3:
          yesterday.setDate(yesterday.getDate() - 91);
          this.maxDateDob_3 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_3 = {
            year: yesterday.getFullYear() - 25,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
        case 4:
          yesterday.setDate(yesterday.getDate() - 91);
          this.maxDateDob_4 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_4 = {
            year: yesterday.getFullYear() - 25,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
        case 5:
          yesterday.setDate(yesterday.getDate() - 91);
          this.maxDateDob_5 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_5 = {
            year: yesterday.getFullYear() - 25,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
      }
      // console.log(this.maxDateDob_0);
      console.log(this.minDate_0);
    } else if (this.getControls[i].get("relationCd").value === "SPOUSE" || this.getControls[i].get("relationCd").value === "SELF") {
      // console.log("relatedCd 1");
      switch (i) {
        case 0:
          yesterday.setFullYear(yesterday.getFullYear() - 18);
          this.maxDateDob_0 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_0 = {
            year: yesterday.getFullYear() - 42,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
        case 1:
          yesterday.setFullYear(yesterday.getFullYear() - 18);
          this.maxDateDob_1 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_1 = {
            year: yesterday.getFullYear() - 42,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
        case 2:
          yesterday.setFullYear(yesterday.getFullYear() - 18);
          this.maxDateDob_2 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_2 = {
            year: yesterday.getFullYear() - 42,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
        case 3:
          yesterday.setFullYear(yesterday.getFullYear() - 18);
          this.maxDateDob_3 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_3 = {
            year: yesterday.getFullYear() - 42,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
        case 4:
          yesterday.setFullYear(yesterday.getFullYear() - 18);
          this.maxDateDob_4 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_4 = {
            year: yesterday.getFullYear() - 42,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
        case 5:
          yesterday.setFullYear(yesterday.getFullYear() - 18);
          this.maxDateDob_5 = {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
          };
          this.minDate_5 = {
            year: yesterday.getFullYear() - 42,
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate()
          };
          break;
      }
    }



  }

  validatingGender(event: string, i: number, section: string) {
    // console.log(event);
    // console.log(i);

    if (section == 'partyDoList') {
      if (event == 'MALE') {
        this.getControls[i].get("titleCd").setValue('MR');
      } else {
        this.getControls[i].get("titleCd").setValue('MS');
      }
      this.getControls[i].get("relationCd").setValue("");
    } else if (section == 'proposal') {
      if (event == 'MALE') {
        this.insuranceForm.controls.proposer.get('titleCd').setValue('MR');
      } else {
        this.insuranceForm.controls.proposer.get('titleCd').setValue('MS');
      }
    }
  }

  validatingTitle(event: string, i: number, section: string) {
    // console.log(event);
    // console.log(i);

    if (section == 'partyDoList') {
      if (event == 'MS') {
        this.getControls[i].get("genderCd").setValue('FEMALE');
      } else {
        this.getControls[i].get("genderCd").setValue('MALE');
      }
      this.getControls[i].get("relationCd").setValue("");
    } else if (section == 'proposal') {
      if (event == 'MS') {
        this.insuranceForm.controls.proposer.get('genderCd').setValue('FEMALE');
      } else {
        this.insuranceForm.controls.proposer.get('genderCd').setValue('MALE');
      }
    }

  }

  // validatingRelation(event: string, i: number, section: string) {

  // }

  handleQuestions(event: string, i: number, j: number, inputType: string) {
    // let question = this.getControls[i]['controls'].partyQuestionDOList.controls[i].get('response_' + i).value;
    this.getControls[i]['controls'].partyQuestionDOList.controls[j].get('response').setValue(event);

    // console.log(this.getControls[i]['controls'].partyQuestionDOList.controls[j].get('response').value);
    // console.log(i);
    // console.log(j);
    // console.log(event);

    if ((j == 6 || j == 8 || j == 10) && event == 'YES') {
      document.getElementById("question_" + (j + 1) + "_" + i).style.display = 'block';
    } else if ((j == 6 || j == 8 || j == 10) && event == 'NO') {
      document.getElementById("question_" + (j + 1) + "_" + i).style.display = 'none';
    }
  }

  textCounterForQuestions(field: any, id: number, i: number, maxlimit: number) {
    var length: any = field.length;
    length = maxlimit - length;
    $('#characterInfo_' + id + '_' + i).text(length + " characters remaining");
  }

  setkjnkj() {
    this.scrollToInvalid('proposerForm');
    document.getElementById('identityProposer_1').style.display = 'block';
    this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][1].controls.identityNum.setValidators([Validators.required]);
    this.insuranceForm.controls.proposer['controls'].partyIdentityDOList['controls'][1].controls.identityNum.updateValueAndValidity();
  }

  avoidSpace(event: any) {
    var k = event ? event.which : event.keyCode;
    console.log(k);

    if (k == 32) return false;
  }

  allowAlphabetOnly(event: any) {
    if (event.keyCode > 64 && event.keyCode < 91) {
      return true;
    } else if (event.keyCode == 8 || event.keyCode == 46) {
      return true;
    } else if (event.keyCode > 36 && event.keyCode < 41) {
      return true;
    } else {
      return false;
    }
  }

  validateNumber(event: any) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      return true;
    } else if (/[0-9]/.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

  validateIdentityType(event: any, identityInput: HTMLInputElement, identityType: string): boolean {

    if (identityType == 'PAN') {
      if (
        ((identityInput.value.length <= 4) || (identityInput.value.length == 9)) &&
        (/[A-Za-z]/.test(event.key))
      ) {
        return true;
      } else if (
        ((identityInput.value.length >= 5) && (identityInput.value.length <= 8)) &&
        (/[0-9]/.test(event.key))
      ) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    } else if (identityType == 'PASSPORT') {
      if (event.keyCode == 8 || event.keyCode == 46) {
        return true;
      } else if (
        identityInput.value.length === 0 &&
        (/[A-Za-z]/.test(event.key))
      ) {
        return true;
      } else if (
        ((identityInput.value.length > 0) && (identityInput.value.length < 8)) &&
        (/[0-9]/.test(event.key))
      ) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }

  }
}