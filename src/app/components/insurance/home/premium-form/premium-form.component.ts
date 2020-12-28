import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { InsuranceService } from '../../insurance.service';

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


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private insuranceService: InsuranceService,
    private userflowDetails: UserFlowDetails,
    private toastr: ToastrService
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
      anyMedicalCondition: [false, [Validators.required]],
      // frequentTraveller: [false, [Validators.required]],
      // tripFrequency: [30, [Validators.required]]
    });

    this.today = new Date();

    console.log(this.controls);


    for (let i = 0; i < this.controls.length; i++) {
      console.log(this.controls[i]);

    }

    this.enableReviewPremiumForm();
  }

  keyword = 'name';
  public countries = [
    { name: 'Albania' }, { name: 'Belgium' }, { name: 'Denmark' }, { name: 'Montenegro' }, { name: 'Turkey' }, { name: 'Ukraine' }, { name: 'Macedonia' }, { name: 'Slovenia' }, { name: 'Georgia' }, { name: 'India' }, { name: 'Russia' }, { name: 'Switzerland' }
  ];

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
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
    this.controls.push(
      this.formBuilder.group({
        'memberAge': ''
      })
    );

    this.count++;
  }

  validatePremiumForm() {
    let country = this.getPremiumForm.get('country').value.name;
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


    if (this.controls[0]['controls'].memberAge.value) {
      let ageOfTravellers = this.controls[0]['controls'].memberAge.value;
      ageOfTravellers == "" || ageOfTravellers == null || ageOfTravellers == undefined ?
        this.ageOfTravellersError = true :
        this.ageOfTravellersError = false;
    }
  }

  proceedBtn() {
    this.validatePremiumForm();
    if (!this.getPremiumForm.valid) {
    } else {
      let country = this.getPremiumForm.get('country').value.name;
      let ageOfTravellers = this.getPremiumForm.get('ageOfTravellers').value
      let ageOfTravellersList = []
      let tripStartDate = this.getPremiumForm.get('tripStartDate').value;
      let tripEndDate = this.getPremiumForm.get('tripEndDate').value;
      let anyMedicalCondition = this.getPremiumForm.get('anyMedicalCondition').value;
      // let frequentTraveller = this.getPremiumForm.get('frequentTraveller').value;
      // let tripFrequency = this.getPremiumForm.get('tripFrequency').value;

      console.log(this.getPremiumForm.get('ageOfTravellers'));


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
          this.userflowDetails.setCookie('premiumFormDetails', JSON.stringify(reqData))
          this.enableReviewPremiumForm();
          this.enableCheckoutBtn = true;
          this.router.navigateByUrl('insurance/plans');
        } else {
          this.toastr.error(res.message);
        }
      })

    }

  }

  enableReviewPremiumForm() {
    let routeLength = this.router.url.split('/').length;
    let endRoute = this.router.url.split('/')[routeLength - 1];

    if (endRoute == 'plans') {
      let premiumFormDetail = JSON.parse(this.userflowDetails.getCookie('premiumFormDetails'));
      this.enableCheckoutBtn = true;

      console.log(premiumFormDetail);


      this.getPremiumForm.get('country').setValue(premiumFormDetail.country);
      this.getPremiumForm.get('tripStartDate').setValue(premiumFormDetail.tripStartDate);
      this.getPremiumForm.get('tripEndDate').setValue(premiumFormDetail.tripEndDate);
      this.getPremiumForm.get('anyMedicalCondition').setValue(premiumFormDetail.anyMedicalCondition);

      for (let i = 0; i < premiumFormDetail.ageOfTravellers.length; i++) {
        console.log(this.controls);

        console.log(premiumFormDetail.ageOfTravellers[i]);


        this.controls[i]['controls'].memberAge.setValue(premiumFormDetail.ageOfTravellers[i]);

      }
    }
  }
}
