import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { InsurancePlanComponent } from './insurance-plan/insurance-plan.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "plans", component: InsurancePlanComponent },
  { path: "application-form", component: ApplicationFormComponent },
  { path: "application-details", component: ApplicationDetailsComponent},
]

@NgModule({
  declarations: [HomeComponent, ApplicationFormComponent, ApplicationDetailsComponent, InsurancePlanComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class InsuranceModule { }
