import { NgModule } from '@angular/core';
import { UnitedKingdomComponent } from './united-kingdom.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsUkComponent } from './important-points-uk/important-points-uk.component';
import { QuotationUkComponent } from './quotation-uk/quotation-uk.component';
import { RequirementsUkComponent } from './requirements-uk/requirements-uk.component';

const routes: Routes = [
  { path: "", component: UnitedKingdomComponent },
]

@NgModule({
  declarations: [
    UnitedKingdomComponent,
    FaqComponent,
    ImportantPointsUkComponent,
    QuotationUkComponent,
    RequirementsUkComponent
  ],

  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    
    SharedVisaModuleModule,
    RouterModule.forChild(routes)
  ]
})

export class UnitedKingdomModule {}
