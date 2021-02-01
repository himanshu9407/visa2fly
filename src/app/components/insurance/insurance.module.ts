import { PremiumBannerComponent } from './home/premium-banner/premium-banner.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { InsuranceBookingStatusComponent } from './insurance-booking-status/insurance-booking-status.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PremiumFormComponent } from './home/premium-form/premium-form.component';
import { PremiumPlansComponent } from './home/premium-plans/premium-plans.component';
import { AuthenticationGuard } from 'src/app/shared/AuthenticationGuard.service';

const routes: Routes = [
  {
    path: "", component: HomeComponent, children: [
      { path: "", component: PremiumBannerComponent },
      { path: "plans", component: PremiumPlansComponent },
    ]
  },
  { path: "application-form", component: ApplicationFormComponent, canActivate: [AuthenticationGuard] },
  { path: "application-details", component: ApplicationDetailsComponent, canActivate: [AuthenticationGuard] },
  // { path: "payment/handle", component: InsuranceBookingStatusComponent },
  { path: "insurancePaymentHandler", component: InsuranceBookingStatusComponent },
]

@NgModule({
  declarations: [HomeComponent, ApplicationFormComponent, ApplicationDetailsComponent, InsuranceBookingStatusComponent, PremiumFormComponent, PremiumPlansComponent, PremiumBannerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class InsuranceModule { }
