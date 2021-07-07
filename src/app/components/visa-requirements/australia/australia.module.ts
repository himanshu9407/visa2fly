import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AustraliaComponent } from './australia.component';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { QuotationComponent } from './quotation/quotation.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

const routes: Routes = [
  {
    path: "",
    component: AustraliaComponent,
    // resolve: {quotationRes: AustraliaResolver} 
  },
]

@NgModule({
  declarations: [
    AustraliaComponent,
    FaqComponent,
    ImportantPointsComponent,
    QuotationComponent,
    RequirementsComponent
  ],

  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    SharedVisaModuleModule,
    RouterModule.forChild(routes),
    SlickCarouselModule,
  ]
})
export class AustraliaModule { }
