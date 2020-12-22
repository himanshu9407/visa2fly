import { country } from './../../../interfaces/home_formData';
import { InsuranceService } from './../insurance.service';
import { FormArray, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  getPremiumForm: FormGroup;
  minDate: any;
  today: Date;
  travellersAge: FormArray;
  count: number = 1;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private insuranceService: InsuranceService
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
      frequentTraveller: [false, [Validators.required]],
      tripFrequency: [30, [Validators.required]]
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

  addAgeOfTravellers() {
    this.travellersAge = this.getPremiumForm.get('ageOfTravellers') as FormArray;
    this.travellersAge.push(
      this.formBuilder.group({
        age: ''
      })
    );

    this.count++;
  }

  proceedBtn() {

    let country = this.getPremiumForm.get('country').value;
    let ageOfTravellers = this.getPremiumForm.get('ageOfTravellers').value
    let ageOfTravellersList = []
    let tripStartDate = this.getPremiumForm.get('tripStartDate').value;
    let tripEndDate = this.getPremiumForm.get('tripEndDate').value;
    let anyMedicalCondition = this.getPremiumForm.get('anyMedicalCondition').value;
    let frequentTraveller = this.getPremiumForm.get('frequentTraveller').value;
    let tripFrequency = this.getPremiumForm.get('tripFrequency').value;

    for (let i = 0; i < ageOfTravellers.length; i++) {
      ageOfTravellersList.push(ageOfTravellers[i].age);
    }

    let reqData = {
      country: country,
      ageOfTravellers: ageOfTravellersList,
      tripStartDate: tripStartDate,
      tripEndDate: tripEndDate,
      anyMedicalCondition: anyMedicalCondition,
      frequentTraveller: frequentTraveller,
      tripFrequency: tripFrequency
    }

    console.log(reqData);

    this.insuranceService.getPremium(reqData).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('insurance/plans');
    })

  }

}
