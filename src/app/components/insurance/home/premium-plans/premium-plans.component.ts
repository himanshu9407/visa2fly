import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
  coverageType: Array<any> = [];
  policyBenefits: Array<any> = [];
  goldPolicyBenefits: Array<any> = [];
  basicPolicyBenefits: Array<any> = [];
  premiumCalculated: any;
  goldPremiumCalculated: any;
  basicPremiumCalculated: any;
  loadingSkeleton: boolean = false;
  numbers: number[];

  title: string = "Visa2fly | Insurance Plans";
  basicPremiumGSTCalculated: any;
  goldPremiumGSTCalculated: any;
  premiumGST: any;
  platinumPolicyBenefits: any;
  platinumPremiumCalculated: any;
  platinumPremiumGSTCalculated: any;

  constructor(
    private formBuilder: FormBuilder,
    private insuranceService: InsuranceService,
    private userflowDetails: UserFlowDetails,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    /** After proceed to get quotation. Here you need to fetch the details to display on the screen. */
    this.premiumDetails = JSON.parse(this.userflowDetails.getLocalStorage('premiumDetails'));
    this.numbers = Array(5).fill(0).map((x, i) => i);

    /** get plantype list */
    this.planType = this.premiumDetails.planTypes;
    /** get coverages list */
    this.coverageType = this.premiumDetails.coverages;

    /** we get coverage value without dollar sign so we need to add this as compatible with other fields */
    let reformatCoverage = "$" + this.premiumDetails.planToDisplay.premiumCovered;
    this.filterPlanForm = this.formBuilder.group({
      /** you've already a plan description in the api to display to the user */
      planFilter: [this.premiumDetails.planToDisplay.planType, [Validators.required]],
      coverageFilter: [reformatCoverage, [Validators.required]]
    });

    let planType = this.filterPlanForm.get('planFilter').value;
    let coverages = this.filterPlanForm.get('coverageFilter').value;
    this.asPerPlanType(planType, coverages);

    // this.insuranceService.permiumCalculated.subscribe((res: Array<{ planType: string, premiumCalculated: number, gst: number }>) => {
    //   let planType = this.filterPlanForm.get('planFilter').value;
    //   res.forEach(element => {
    //     if (element.planType === 'Basic') {
    //       this.basicPremiumCalculated = element.premiumCalculated;
    //     } else if (element.planType === 'Gold') {
    //       this.goldPremiumCalculated = element.premiumCalculated;
    //     }

    //     /** asPerPlan as according to input entry */
    //     this.asPerPlanType(planType, coverages);
    //   });

    // });

    this.insuranceService.loadingSkeleton.subscribe((res: boolean) => {
      this.loadingSkeleton = res;
    });

    this.titleService.setTitle(this.title);
  }


  /** asPerPlan as according to input entry */
  onChangePlan() {
    let planType = this.filterPlanForm.get('planFilter').value;
    let coverages = this.filterPlanForm.get('coverageFilter').value;
    this.asPerPlanType(planType, coverages);
  }

  asPerPlanType(planType: string, coverages: string) {
    this.premiumDetails.insuranceBenefitAsPerPlans.forEach(element => {
      console.log(element);
      if (element.planType === planType && element.coverage === coverages) {
        this.policyBenefits = element.policyBenefits;
      }
    });

    this.premiumDetails.premiumAsPerPlans[planType].forEach(element => {
      if (element.premiumCovered === parseInt(coverages.slice(1))) {
        this.userflowDetails.setInsurancePlan("gst", JSON.stringify(element.gst));
        this.userflowDetails.setInsurancePlan("planType", planType);
        this.userflowDetails.setInsurancePlan("premiumCalculated", JSON.stringify(element.premiumCalculated));
        this.userflowDetails.setInsurancePlan("premiumCovered", JSON.stringify(element.premiumCovered));
        this.userflowDetails.setInsurancePlan("premiumCurrency", element.premiumCurrency);

        this.premiumGST = element.gst;
        this.premiumCalculated = element.premiumCalculated;
      }
    });;
  }

}
