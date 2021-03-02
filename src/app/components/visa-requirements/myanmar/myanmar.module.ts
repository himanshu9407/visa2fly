import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { MyanmarComponent } from './myanmar.component';
import { ImportantPointsMyanmarComponent } from './important-points-myanmar/important-points-myanmar.component';
import { QuotationMyanmarComponent } from './quotation-myanmar/quotation-myanmar.component';
import { RequirementMyanmarComponent } from './requirement-myanmar/requirement-myanmar.component';

const routes: Routes = [
  { path: "", component: MyanmarComponent },
]

@NgModule({
  declarations: [
    MyanmarComponent,
    FaqComponent,
    ImportantPointsMyanmarComponent,
    QuotationMyanmarComponent,
    RequirementMyanmarComponent,
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

export class MyanmarModule {}
