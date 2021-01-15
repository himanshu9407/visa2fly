import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { InsuranceService } from '../../insurance.service';

@Component({
  selector: 'app-premium-plans',
  templateUrl: './premium-plans.component.html',
  styleUrls: ['./premium-plans.component.css']
})
export class PremiumPlansComponent implements OnInit {
  premiumDetails: any;
  filterPlanForm: FormGroup;
  planType: Array<any> = [];
  policyBenefits: Array<any> = [];
  goldPolicyBenefits: Array<any> = [];
  basicPolicyBenefits: Array<any> = [];
  premiumCalculated: any;
  goldPremiumCalculated: any;
  basicPremiumCalculated: any;
  loadingSkeleton: boolean = false;
  numbers: number[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private insuranceService: InsuranceService,
    private userflowDetails: UserFlowDetails,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.premiumDetails = JSON.parse(this.userflowDetails.getLocalStorage('premiumDetails'));
    this.numbers = Array(5).fill(0).map((x,i)=>i);

    console.log(this.premiumDetails);

    this.premiumDetails.insuranceBenefitAsPerPlans.forEach(element => {
      this.planType.push(element.planType);
      if (element.planType == 'Basic') {
        this.basicPolicyBenefits = element.policyBenefits
      } else if (element.planType == 'Gold') {
        this.goldPolicyBenefits = element.policyBenefits
      }
    });

    this.premiumDetails.premiumAsPerPlan.forEach(element => {
      console.log(element);
      if (element.planType == 'Basic') {
        this.basicPremiumCalculated = element.premiumCalculated;
      } else if (element.planType == 'Gold') {
        this.goldPremiumCalculated = element.premiumCalculated;
      }
    });

    this.filterPlanForm = this.formBuilder.group({
      planFilter: ['Basic', [Validators.required]]
    });

    let planType = this.filterPlanForm.get('planFilter').value;
    this.asPerPlanType(planType);

    this.insuranceService.permiumCalculated.subscribe((res: Array<{ planType: string, premiumCalculated: number, gst: number }>) => {
      console.log(res);

      let planType = this.filterPlanForm.get('planFilter').value;
      res.forEach(element => {
        console.log(element);
        if (element.planType === 'Basic') {
          this.basicPremiumCalculated = element.premiumCalculated;
        } else if (element.planType === 'Gold') {
          this.goldPremiumCalculated = element.premiumCalculated;
        }

        this.asPerPlanType(planType);
      });

    });

    this.insuranceService.loadingSkeleton.subscribe((res: boolean) => {
      this.loadingSkeleton = res;
    });
  }

  onChangePlan(event) {
    let planType = this.filterPlanForm.get('planFilter').value;
    this.asPerPlanType(planType);

    console.log(planType);

  }

  asPerPlanType(planType: string) {
    if (planType == 'Basic') {
      this.policyBenefits = this.basicPolicyBenefits;
      this.premiumCalculated = this.basicPremiumCalculated;
      this.userflowDetails.setInsurancePlan("coverage", "US $ 50,000");
    } else if (planType == 'Gold') {
      this.policyBenefits = this.goldPolicyBenefits;
      this.premiumCalculated = this.goldPremiumCalculated;
      this.userflowDetails.setInsurancePlan("coverage", "US $ 100,000");
    }

    this.userflowDetails.setInsurancePlan("planType", planType);
  }

}
