import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { InsuranceService } from '../insurance.service';

@Component({
  selector: 'app-insurance-plan',
  templateUrl: './insurance-plan.component.html',
  styleUrls: ['./insurance-plan.component.css']
})
export class InsurancePlanComponent implements OnInit {
  getPremiumForm: FormGroup;
  today: Date;
  minDate: any;
  destinationNotSelected: boolean = false;
  tripStartDateNotSelected: boolean = false;
  tripEndDateNotSelected: boolean = false;
  ageOfTravellersError: boolean = false;
  premiumDetails: any;

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
          age: '',
        }),
      ]),
      tripStartDate: ["", [Validators.required]],
      tripEndDate: ["", [Validators.required]],
      anyMedicalCondition: [false, [Validators.required]],
      // frequentTraveller: [false, [Validators.required]],
      // tripFrequency: [30, [Validators.required]]
    });

    this.today = new Date();
  }

  onChangeDate(event) {
    this.minDate = event.target.value;
    this.getPremiumForm.get('tripEndDate').setValue('');
  }

  get controls() {
    return (<FormArray>this.getPremiumForm.get('ageOfTravellers')).controls;
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


    for (let i = 0; i < this.controls.length; i++) {
      let ageOfTravellers = this.controls[i]['controls'].age.value;
      ageOfTravellers == "" || ageOfTravellers == null || ageOfTravellers == undefined ?
        this.ageOfTravellersError = true :
        this.ageOfTravellersError = false;
    }
  }

}
