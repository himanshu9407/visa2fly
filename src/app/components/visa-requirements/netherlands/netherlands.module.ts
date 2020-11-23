import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { NetherlandsComponent } from './netherlands.component';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsNetherlandComponent } from './important-points-netherland/important-points-netherland.component';
import { QuotationNetherlandComponent } from './quotation-netherland/quotation-netherland.component';
import { RequirementNetherlandComponent } from './requirement-netherland/requirement-netherland.component';

const routes: Routes = [
  { path: "", component: NetherlandsComponent },
]

@NgModule({
  declarations: [
    NetherlandsComponent,
    FaqComponent,
    ImportantPointsNetherlandComponent,
    QuotationNetherlandComponent,
    RequirementNetherlandComponent,
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

export class NetherlandsModule {}
