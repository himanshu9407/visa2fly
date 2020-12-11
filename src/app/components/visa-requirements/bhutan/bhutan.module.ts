import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BhutanComponent } from './bhutan.component';
import { QuotationComponent } from './quotation/quotation.component';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FinlandComponent } from '../finland/finland.component';

const routes: Routes = [
  { path: "", component: FinlandComponent },
]

@NgModule({
  declarations: [BhutanComponent, QuotationComponent, FaqComponent, ImportantPointsComponent, RequirementsComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    SharedVisaModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class BhutanModule { }
